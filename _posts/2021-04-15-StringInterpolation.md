---
layout: post
title:  "Python - Literal String Interpolation"
author: Younggeon
categories: [ Web-Programming ]
tags: [ Python ]
image: https://cdn.pixabay.com/photo/2016/11/13/21/46/sheep-1822137_960_720.jpg
---

> Python의 Literal String Interpolation에 대해 알아보자

---

## String Interpolation이란

String 안에, 즉 따옴표("") 안에 원하는 변수나 함수, 연산식 등을 넣어서 값을 변화시키고 싶을 때 사용하는 기능이다.

```Python

word1 = "Hello"
word2 = "World"
example = "{}, {}".format(word1, word2)

```

보통 위와 같이 formatting 방식을 사용하였다. 위의 경우 {}안에 순서대로 .format() 안에 있는 변수들이 차례로 들어간다. {}의 개수가 많아져 복잡해지면 `"{a}, {b}".format(a=word1, b=word2)` 와 같이 매개변수를 넣어주는 것도 가능한 것으로 알고 있다.

---

## Literal String Interpolation

이 String Interpolation 방식은 다양하게 여러가지 있지만 Python 3.6 버전에 나온 Literal String Interpolation 방식이 최선의 방식으로 현재는 여겨진다. 이 방식은 기존의 방식보다 편하고 성능적으로도 빠르기 때문.

```Python

word1 = "Hello"
word2 = "World"
example = f"{word1}, {word2}"

```

위와 같이 따옴표 앞에 f가 붙는 것이 특징이며 기존에 .format() 안에 있던 추가적인 매개변수가 필요 없다.
