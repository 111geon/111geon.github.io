---
layout: post
title:  "Django에서 bcrypt와 jwt 이용하기"
author: Younggeon
categories: [ Web-Server ]
tags: [ Django, Database ]
image: https://cdn.pixabay.com/photo/2018/05/14/16/25/cyber-security-3400657_960_720.jpg
---

> Django에서 database를 모델링할 때 many-to-many 관계를 구현하는 법에 대해서 알아보자.

---

## Many-To-Many Field란

관계형 테이블의 한 종류로 A, B 테이블이 있을 때 A 테이블의 한 row와 연결되는 B 테이블의 row가 다수가 될 수 있는 동시에 B 테이블의 한 row와 연결되는 A 테이블의 row도 다수가 될 수 있는 관계를 뜻한다. 예를 들어 영화배우만을 정리한 테이블 A와 영화이름만을 정리한 테이블 B가 있을 때, 한명의 배우는 여러 영화에 출연할 수 있는 동시에 하나의 영화에는 여러명의 배우가 출연할 수 있기 때문에 A와 B 이 둘은 many-to-many 관계로 엮일 수 있다. 이와 같은 관계에서는 필연적으로 A 테이블의 row들이 B 테이블의 어떤 row들과 짝을 이루고 있는지를 나타내는 bridge table이 존재해야 한다.

---

# Model

<img src="/assets/images/2021-05-02-djangomanytomany/Screen_Shot_2021-03-31_at_9.37.14_PM.png" alt="tables of actors and movies and a bridge table">

```python

from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=45)
    release_date = models.DateField()
    running_time = models.IntegerField()
#    actor = models.ManyToManyField('Actor', through='Movie_Actor')

    class Meta:  # MySQL 상 table의 이름을 "movies"로 짓고싶다.
        db_table = "movies"

class Actor(models.Model):
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    date_of_birth = models.DateField()
    movie = models.ManyToManyField('Movie', through='Movie_Actor')

    class Meta:
        db_table = "actors"

class Movie_Actor(models.Model):
    actor = models.ForeignKey('Actor', on_delete=models.CASCADE)
    movie = models.ForeignKey('Movie', on_delete=models.CASCADE)

    class Meta:
        db_table = "movies_actors"

```

위 model의 CharField, DateField, IntegerField는 각각 문자열, 날짜정보, 정수형 정보를 넣는 Field를 뜻하며 해당 테이블에 독자적으로 존재하는 column이기에 특별히 신경써야할 부분은 없다.

Many-to-many 관계를 만들기 위해서 신경써줘야하는 부분은 Movie 클래스와 Actor 클래스 사이에 이 둘의 관계 정보를 넣는 Movie_Actor 클래스를 추가로 모델링해줘야한다는 것이다. 이 테이블의 actor column과 movie column은 각각 Actor 테이블과 Movie 테이블을 참조하는 ForeignKey로 생성해준다.

또 추가로 Movie 클래스 또는 Actor 클래스에 ManyToManyField column을 추가로 정의해주어야 한다. 두 클래스 모두에 정의를 해주면 오류가 나게 되며 해당 Field의 첫번째 argument는 상대 클래스, through argument는 위에서 만든 bridge table을 넣어준다.

---

## The Hard Way

Django에서는 many-to-many 관계에 있는 두 테이블을 연결할 때 ManyToManyField를 지원함으로써 실제로 데이터를 불러오는 과정을 매우 편리하게 할 수 있도록 도와준다.

위 Actor class에 movie라는 column이 있다는 것이 의미하는 것은, Actor 클래스의 하나의 객체(Actor 테이블의 하나의 row)에 movie attribute이 있다는 의미이며, 이는 하나의 actor 객체(한 명의 actor)가 있을 때 actor.movie로 접근하면 해당 actor와 짝을 이루는 movie 객체로 바로 접근할 수 있다는 뜻이다. 반대로 movie.actor_set으로 접근하면 하나의 movie와 짝을 이루는 actor 객체에도 바로 접근할 수 있다는 듯이다.

만약에 이와 같은 기능이 지원되지 않았다면, 두 테이블의 관계는 Movie_Actor bridge table의 foreignkey를 이용해서만 알 수 있었을 것이고 따라서 하나의 movie와 짝을 이루는 actor 객체를 찾기 위해서

1. movie를 참조하는 Movie_Actor의 객체 찾기
2. 해당 객체에서의 actor_id 찾기
3. Actor table에서 해당 id를 갖는 객체 찾기

의 과정을 거쳐야할 것이다. 데이터의 양이 많아질수록, 구현하려는 로직이 복잡해질수록 이런 과정은 굉장히 불편하게 느껴질 것이다.

---

## 데이터 넣기

Django project의 manage.py가 있는 위치에서 가상환경을 킨 상태로 `python manage.py shell`을 실행한다. manage.py의 환경변수들을 그대로 가져온 채로 shell에서 python을 실행한다는 의미이다.

그 상태에서,

```python

>>> a1 = Actor(first_name="4", last_name="D", date_of_birth="1997-09-12")
>>> a1.save()
>>> m1 = Movie(title='라', release_date="2023-01-01", running_time=150)
>>> m1.save()
>>> a1.movie.add(m1)
# >>> m1.actor_set.add(a1) 도 가능하다.

```

actor 객체와 movie 객체를 각각 만들어서 save를 해주고, a1에서 movie 접근하여 add()를 하거나 m1에서 actor_set으로 접근하여 add()를 한다.

그러면 MySQL에서 bridge table을 확인하면 값이 들어가 있는 것을 볼 수 있다.

 ```MySQL

 mysql> select * from movies;
+----+-------+--------------+--------------+
| id | title | release_date | running_time |
+----+-------+--------------+--------------+
|  3 | 가    | 2020-01-01   |          120 |
|  4 | 나    | 2021-01-01   |          130 |
|  5 | 다    | 2022-01-01   |          140 |
|  6 | 라    | 2023-01-01   |          150 |
+----+-------+--------------+--------------+
4 rows in set (0.00 sec)

mysql> select * from actors;
+----+------------+-----------+---------------+
| id | first_name | last_name | date_of_birth |
+----+------------+-----------+---------------+
|  1 | 1          | A         | 1994-09-12    |
|  2 | 2          | B         | 1995-09-12    |
|  3 | 3          | C         | 1996-09-12    |
+----+------------+-----------+---------------+
3 rows in set (0.02 sec)

mysql> select * from movies_actors;
+----+----------+----------+
| id | actor_id | movie_id |
+----+----------+----------+
|  1 |        1 |        3 |
|  2 |        1 |        4 |
|  3 |        2 |        4 |
|  4 |        2 |        5 |
|  5 |        3 |        3 |
|  6 |        3 |        5 |
|  7 |        4 |        6 |
+----+----------+----------+
7 rows in set (0.00 sec)

```

---

## View 만들기

```python

import json

from django.http import JsonResponse
from django.views import View
from movies.models import Movie, Actor

class MovieView(View):
    def get(self, request):
        movies = Movie.objects.all()
        results = []
        for movie in movies:
            actors_list = movie.actor_set.all()
            actors = [actor.last_name for actor in actors_list]
            results.append({
                "title": movie.title,
                "release_date": movie.release_date,
                "running_time": movie.running_time,
                "featured_actors": actors
                })
        return JsonResponse({'results': results}, status=200)

class ActorView(View):
    def get(self, request):
        actors = Actor.objects.all()
        results = []
        for actor in actors:
            movies_list = actor.movie.all()
            movies = [movie.title for movie in movies_list]
            results.append({
                "first_name": actor.first_name,
                "last_name": actor.last_name,
                "date_of_birth": actor.date_of_birth,
                "featured_movies": movies
                })
        return JsonResponse({'results': results}, status=200)

```

View에 GET 메소드를 정의할 때도 간단하게 할 수 있다. 위의 MovieView(View) 클래스는 movies에 대한 request를 받았을 때 results 리스트에 title, release_date, running_time, 출연한 배우 이름 목록을 담아서 JsonResponse를 하는 GET 메소드이다. 이때 movie 객체에 대한 featured_actors를 담기 위해 movie.actor_set.all()로 movie와 짝을 이루는 모든 actors 객체를 가져온 뒤 list comprehension을 이용하여 actors 리스트에 actor.last_name들을 담아내는 방식을 이용했다.

---

## GET 해보기

그러면 만든 view가 잘 작동하는지 확인해보자.

```bash

$ http -v GET 127.0.0.1:8000/movies/
$ http -v GET 127.0.0.1:8000/movies/actors/

```

<img src="/assets/images/2021-05-02-djangomanytomany/스크린샷, 2021-04-30 01-59-33.png" alt="result data of movie(view)">

<img src="/assets/images/2021-05-02-djangomanytomany/스크린샷, 2021-04-30 01-59-40.png" alt="result data of movie(view)">

---

## 마무리

- Django의 ManyToManyField를 이용하여 many-to-many의 관계를 갖는 테이블을 정의하고 조작하는 방법을 알게 되었다!
