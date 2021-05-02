---
layout: post
title:  "Django에서 Many-To-Many Field 구현하기"
author: Younggeon
categories: [ Web-Server ]
tags: [ Django, Database ]
image: https://cdn.pixabay.com/photo/2016/12/09/18/30/database-schema-1895779_960_720.png
---

> Django에서 database를 모델링할 때 many-to-many 관계를 구현하는 법에 대해서 알아보자.

---

## ERD

---

## ORM(Object-Relational Mapping)

model.py에서는 python script로 Aquery에서 만들었던 database의 ERD를 구현한다. Django는 이를 MySQL 문법에 맞게 변형하여 MySQL에서 DataBase를 만든다.

---

## Django ORM과 SQL 관계

#### 전부 보기
SELECT * FROM Person;
persons = Person.objects.all()
for person in persons:
    print(person.name)
    print(person.gender)
    print(person.age)
#### 특정 column 선택
SELECT name, age FROM Person;
Person.objects.only('name', 'age')
#### 중복 제거
SELECT DISTINCT name, age FROM Person;
Person.objects.values('name', 'age').distinct()
#### 개수 제한
SELECT * FROM Person OFFSET 5 LIMIT 5;
Person.objects.all()[5:10]
#### where=filter
SELECT * FROM Person WHERE id = 1;
Person.objects.filter(id=1)
#### 사이
SELECT * FROM Person WHERE age BETWEEN 10 AND 20;
Person.objects.filter(age__range=(10, 20))
#### 이상 이하
WHERE age > 18;
WHERE age >= 18;
WHERE age < 18;
WHERE age <= 18;
WHERE age != 18;
Person.objects.filter(age__gt=18)
Person.objects.filter(age__gte=18)
Person.objects.filter(age__lt=18)
Person.objects.filter(age__lte=18)
Person.objects.exclude(age=18)
#### 문자 포함
WHERE name like '%A%';
WHERE name like binary '%A%';
WHERE name like 'A%';
WHERE name like binary 'A%';
WHERE name like '%A';
WHERE name like binary '%A';
Person.objects.filter(name__icontains='A')  # 대소문자 구분 안
Person.objects.filter(name__contains='A')  # 대소문자 구분
Person.objects.filter(name__istartswith='A')
Person.objects.filter(name__startswith='A')
Person.objects.filter(name__iendswith='A')
Person.objects.filter(name__endswith='A')
#### AND, OR, NOT
WHERE gender='male' AND age > 25;
Person.objects.filter(gender='male', age__gt=25)
WHERE gender='male' OR age > 25;
from django.db.models import Q
Person.objects.filter(Q(gender='male') | Q(age__gt=25))
WHERE NOT gender='male';
Person.objects.exclude(gender='male')
#### NULL / NOT NULL 확인
WHERE age is NULL;
WHERE age is NOT NULL;
Person.objects.filter(age__isnull=True)
Person.objects.filter(age__isnull=False)
Person.objects.filter(age=None)
Person.objects.exclude(age=None)
#### ORDER BY 쓰기
SELECT * FROM Person order by age;  # default가 ascending
Person.objects.order_by('age')
SELECT * FROM Person ORDER BY age DESC;  # descending
Person.objects.order_by('-age')
#### Row 만들기
INSERT INTO Person VALUES ('Jack', '23', 'male');
Person.objects.create(name='jack', age=23, gender='male)
#### 값 바꾸기
#### 하나의 row 바꾸기
UPDATE Person SET age = 20 WHERE id = 1;
person = Person.objects.get(id=1)
person.age = 20
person.save()
#### 여러 row 바꾸기
UPDATE Person SET age = age * 1.5;
from django.db.models import F
Person.objects.update(age=F('age')*1.5)
#### 지우기
DELETE FROM Person;
Person.objects.all().delete()
DELETE FROM Person WHERE age < 10;
Person.objects.filter(age__lt=10).delete()
#### 최소값
SELECT MIN(age) FROM Person;
from django.db.models import Min
Person.objects.all().aggregate(Min('age'))  # {'age__min': 0}
#### 최대값
SELECT MAX(age) FROM Person;
from django.db.models import Max
Person.objects.all().aggregate(Max('age'))
#### 평균값
SELECT AVG(age) FROM Person;
from django.db.models import Avg
Person.objects.all().aggregate(Avg('age'))
#### 총합
SELECT SUM(age) FROM Person;
from django.db.models import Sum
Person.objects.all().aggregate(Sum('age'))
#### 갯수세기
SELECT COUNT(*) FROM Person;
Person.objects.count()
#### 그룹화
SELECT gender, COUNT('gender') as count FROM Person GROUP BY gender;  # Person 테이블의 gender를 기준으로 'gender' 열에서 갯수를 세어서 count라는 이름의 column으로 만들어서 그룹화하고 왼쪽에는 gender column을 놓도록
from django.db.models import Count
Person.objects.values('gender').annotate(count=Count('gender'))
#### 조건 그룹화
SELECT gender, COUNT('gender') as count FROM Person GROUP BY gender HAVING count > 1;  # Count of Person by gender if number of person is greater than 1
Person.objects.annotate(count=Count('gender')).values('gender', 'count').filter(count__gt=1)
#### 두개의 테이블 (Publisher <- Book)
#### book의 1번 행과 관련된 publisher 찾기
SELECT name FROM Book LEFT JOIN Publisher ON Book.publisher_id = Publisher.id WHERE Book.id=1;
book = Book.objects.select_related('publisher').get(id=1)
book.publisher.name
#### publisher의 1번 행과 관련된 book 찾기
SELECT * FROM Book WHERE Book.publisher_id = 1;
publisher = Publisher.objects.prefetch_related('book_set').get(id=1)
books = publisher.book_set.all()

---

## 마무리
