---
layout: post
title:  "Python - Function Parameter"
author: Younggeon
categories: [ Web-Programming ]
tags: [ Python ]
image: https://cdn.pixabay.com/photo/2019/04/02/04/32/masala-4096891_960_720.jpg
---

> Python에서 function의 재료인 parameter에 대해 알아보자.

---

## Function

```Python

def plus(a, b):
    return a+b

plus(1, 2)  # 3

```

함수에서 다루는 변수는 두개이다. 위의 plusOne 함수에서 내부적으로 다루는 변수 a, b와 함수 외부에서 함수로 입력해주는 숫자 1, 2이다. 여기서 a, b를 매개변수(parameter), 1, 2를 인수(argument)라고 한다. 일반적으로 위와 같이 매개변수의 순서에 맞게 인수를 넣어주게 되고, 이 때 이러한 인수를 **positional arguments**라고 한다. 그렇다면 특별하게 인수에 기본값을 넣어주거나, 정해지지 않은 수의 인수를 받거나, dictionary 형태로 parameter를 다루는 방식에 대해서 알아보자.

---

## Default Arguments

```Python

def default_parameter(age, name="YG"):
    print(age, name)
    return

default_parameter(20)  # 20 YG
default_parameter(21, "SA")  # 21 SA

```

이 방식은 특정 parameter에 argument가 들어오지 않았을 때 해당 parameter에 이미 정해진 값이 들어올 수 있도록 하는 방식이다. Default argument를 이용하면 의도하지 않은 argument가 parameter에 들어가는 일을 방지할 수 있어 좀 더 안전하게 함수 정의가 가능하다.

```Python

def default_parameter2(name="YG", age):  # non-default argument follows default argument
    print(age, name)
    return

default_parameter2(20)  # What?

```

다만, 위와 같이 함수가 정의될 때 default argument가 positional argument보다 먼저 선언이 되면, 함수가 호출될 때 argument 20이 parameter name을 위한 것인지, age를 위한 것인지 알 수가 없기 때문에 함수가 선언되는 과정에서 컴파일러 에러를 발생시키게 된다. 따라서, positional argument와 default argument를 함께 사용할 때는 반드시 default argument를 positional argument보다 뒤에서 선언해야 한다.

---

## Variable Arguments

```python

def func_param_with_var_args(name, age, *args):
    print(name, age, args)  # 정우성 20 ('seoul', '01012341234')
    return

func_param_with_var_args("정우성", 20, "seoul", "01012341234")

```

함수를 정의하는 단계에서 인수가 얼마나 많이 들어올지 모르는 경우가 있을 수 있다. 이 경우 parameter 앞에 asterisk(\*)를 붙여준 vairable arguments(\*args)를 이용하여 positional arguments("정우성", 20)가 parameters(name, age)에 들어간 후 남은 arguments("seoul", "01012341234")를 tuple 형태로 합쳐서 parameter args에 배정한다. 이를 위해 당연히 **variable arguments는 positional arguments의 뒤에서 선언되어야 한다.**

```python

# Tuple unpacking
packed_tuple = (1, 2)
print(packed_tuple)  # (1, 2)
print(*packed_tuple)  # 1 2

# Dictionary unpacking
packed_dict = {'1': 'a', '2': 'b'}
print(packed_dict)  # {'1': 'a', '2': 'b'}
print(*packed_dict)  # 1 2

```

Variable argument는 python의 **unpacking** 기능과 같은 맥락이라고 보면 된다. Unpacking이란 list, tuple, dictionary, set처럼 여러 개의 원소가 포함되어 있는 자료구조를 해체하여 각 원소들을 반환하는 것을 의미한다(dictionary의 경우 key를 반환한다). 이 경우에도 변수 앞에 asterisk(\*)를 붙여 표현한다. 이를 통해 위위의 예제 `def func_param_with_var_args`의 경우 `*args = "seoul", "01012341234"` 이므로 `args = ('seoul', '01012341234')` 로 parameter가 설정된 것으로 이해할 수 있다.

---

## Keyword Arguments

```python

def keyword_arguments(name, age, **kwargs):
    print(name, age, kwargs)
    return

keyword_arguments("YG", 20, 특징="못생김", 직업="백수")  # YG 20 {'특징': '못생김', '직업': '백수'}

```

Variable arguments가 tuple로 인수를 받는다고 하면, keyword arguments는 dictionary를 인수로 받기 위한 parameter이다. 위의 `특징="못생김", 직업="백수"`처럼 argument를 key=value 형태로 건네주는 방식이다. 이 경우도 variable arguments와 같이 정해진 parameter 수 이상의 많은 arguments를 넣어줄 수 있다. Positional arguments 나 variable arguments와 다른 형태(key, value)로 argument를 넘겨주기 때문에 함수를 정의할 때 keyword argument는 가장 뒤에서 선언되어야 한다.

```python

def keyword_arguments(name, age, **kwargs):
    print(name, age, kwargs)
    return

keyword_arguments("YG", age=21, 특징="못생김", 직업="백수")  # case 1: YG 21 {'특징': '못생김', '직업': '백수'}
keyword_arguments(age=21, "YG", 특징="못생김", 직업="백수")  # case 2: positional argument follows keyword argument
keyword_arguments(20, name="YG", 특징="못생김", 직업="백수")  # case 3: keyword_arguments() got multiple values for argument 'name'
keyword_arguments(age=20, name="YG", 특징="못생김", 직업="백수")  # case 4: YG 20 {'특징': '못생김', '직업': '백수'}

```

- Keyword argument는 꼭 dictionary 형태(**kwargs)로 건네지지 않아도 되며, argument를 대입할 parameter를 구체적으로 명시하기 위해 사용할 수도 있다(case 1).
- 다만 이경우 default argument와 같이 positional argument의 앞에서 keyword argument가 나오면 default argument에서의 이유와 동일하게("YG"가 name을 위한 것인지, age를 위한 것인지 알 수가 없음) 컴파일러 오류가 발생한다(case 2).
- 또 case 3과 같이, 순서대로 parameter에 대입되는 positional argument 특성에 의해 parameter "name"에 20이 대입된 후 parameter "name"을 가르키는 keyword argument(name="YG")가 다시 또 대입되면 같은 "name"에 두개의 값이 들어가기 때문에 오류가 발생한다.
- 이런 경우에는 case 4와 같이 "age"와 "name"을 모두 keyword argument로 넣어주거나, parameter의 순서를 맞춰주면 된다.

---

## Parameter의 순서

```python

def every_parameter(name, age, *args, address=0, **kwargs):
    print("name:", name)
    print("age:", age)
    print("args:", args)
    print("address:", address)
    print("kwargs:", kwargs)

every_parameter("정우성", "20", "incheon", "seoul", mobile="01012341234", homenumber="03212341234", address="seoul")
# name: 정우성
# age: 20
# args: ('incheon', 'seoul')
# address: seoul
# kwargs: {'mobile': '01012341234', 'homenumber': '03212341234'}

```

일반적이지는 않겠지만 positional argument, default argument, variable argument, keyword argument가 모두 들어가있을 때 parameter의 순서는 위와 같다. 기본적으로 positional argument(name, age), variable argument(\*args), keyword argument(\*\*kwargs) 순서로 나와야하는데 default argument가 추가되는 경우 \*args에 흡수(?)되지 않도록 이 뒤에 나와야 오류가 나지 않는 것을 확인했다.
