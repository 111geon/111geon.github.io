---
layout: post
title:  "Python - Importing Modules and Packages"
author: Younggeon
categories: [ Web-Programming ]
tags: [ Python ]
image: https://cdn.pixabay.com/photo/2018/01/29/10/28/day-of-birth-3115764_960_720.jpg
---

> Python이 module이나 package를 import 할 때 어떤 방식으로 하는지, relative path를 쓸 때 주의해야할 점은 무엇인지 알아보자.

---

## Search Order

Python에서 module이나 package를 import 하면 인터프리터는 다음과 같은 순서로 모듈을 찾는다.

1. sys.modules: 이미 import된 모듈을 저장하고 있는 dictionary. 한번 import된 모듈은 또 다시 찾지 않아도 되도록 하는 기능을 한다.
2. built-in modules: 파이썬 공식 라이브러리. 파이썬에 기본적으로 포함되어 있다.
3. sys.path: 경로 string들을 가지고 있는 list. 파이썬은 list안에 string 경로들을 하나 하나 들어가서 확인하며 import 하려는 module이 있는지 찾는다.

sys도 built-in module이므로 import해서 sys.modules나 sys.path를 확인할 수 있다. 마지막으로 파이썬이 sys.path에서도 import 하려는 module를 찾을 수 없으면 `ModuleNotFoundError`를 반환한다.

---

## Absolute Path vs Relative Path

- Absolute Path: import를 하는 파일이나 경로에 상관없이 항상 경로가 동일하다. 최상단 디렉토리가 경로의 기준이 되는데 최상단 디렉토리의 기준은 패키지가 아닌(__init__이 없는 ) 디렉토리가 나올 때 까지 상위 디렉토리로 올라가는 듯 하다.
- Relative Path: 최상단이 아닌 import를 하려고 하는 모듈의 위치(.)를 기준으로 경로를 정의. 하나의 패키지에서 다른 패키지의 클래스, 변수, 함수 등을 불러올 때 주로 사용한다.

<img src="/assets/images/스크린샷, 2021-04-21 13-38-24.png" alt="directory tree">

한 패키지 안에 있는 모듈이 다른 패키지 안에 있는 모듈을 상대경로로 import하려고 할 때, 그 모듈을 바로 실행하면 "attempted relative import with no known parent package" 에러가 난다. 이때 최상단 디렉토리의 main.py에서 아까 실행시켰던 모듈을 import하여 실행시키면 문제가 없다. 이것은 파이썬 파일을 실행시킬 때 파이썬 인터프리터는 \__name__=\__main__, \__package__=None 으로 하여, 해당 파일이 최상단 디렉토리에 있어 부모 디렉토리가 없다고 정해버리기 때문이다. 이를 해결하기 위해, 1. 모듈을 python3 -m module.py 로 실행시키거나, 2. 상위 디렉토리의 파이썬 파일에서 이 모듈을 import하여 실행시키거나, 3. 절대경로로 import 방법을 수정해야한다.

---

## \__init__.py

\__init__.py은 해당 디렉토리가 패키지라는 것을 알려주는 것 외에도 기능이 더 있다. 그 중 하나로 패키지를 읽으면 바로 \__init__.py를 실행시키는 성질을 이용하여, \__init__.py 안에 현재 패키지 안에 있는 서브 패키지를 import하는 방식이 있다. 이렇게 하면 최상단 디렉토리의 main.py에서 해당 패키지만 import해도 그 안에 있는 서브 패키지들의 함수를 쓸 수 있다. 또, 초기에 선언해야하는 변수 등을 \__init__.py에서 관리할 수 있다.

---

## 참고자료

<https://stackoverflow.com/questions/16981921/relative-imports-in-python-3>
<https://napuzba.com/a/import-error-relative-no-parent>
