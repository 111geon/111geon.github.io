---
layout: post
title:  "Semantic Web에 대하여"
author: Younggeon
categories: [ Web-Programming ]
tags: [ HTML ]
image: https://cdn.pixabay.com/photo/2017/06/12/03/33/seo-2394237_960_720.jpg
---

> Semantic Web이 무엇인지, 왜 중요한지 간단히 알아보도록 하자.

---

## Example

<img src="https://almosthumor.files.wordpress.com/2011/09/html5demo1.jpg" width="50%" height="50%" title="" alt="" />

Semantic Web은 Semantic Tags에 의해 구성된다.

---

## Semantic Web이란

말 그대로 의미를 가지고 있는 웹이다. 여기서 의미를 가지는 주체는 HTML 코드 자체가 된다. 무슨 말일까.

일반적으로, Web page는 web browser에 의해 HTML 문서로부터 만들어져, 사용자에게 보여진다. 사용자는 이 웹 페이지를 **직접 확인하여** 어떤 요소가 있는지, 각각의 요소들은 어떤 기능을 위해 존재하는지, 얼마나 큰 중요도를 가지고 있는지 등을 파악하며 페이지를 읽고, 필요한 정보를 가져가게 된다.

여기서 문제는 사람이 아닌 컴퓨터가 HTML 문서를 볼 때 발생한다. 사람은 웹 페이지를 시각적으로 읽어들이면서 각 요소의 특성을 파악하는 것이 가능하지만, 컴퓨터가 HTML 문서를 볼 때는 이런 각 요소들의 의도를 알아내는 것이 쉽지 않다. 이를 해결하기 위해, HTML5 이후로 \<div>, \<span> 등 불특정적인 태그들보다 좀 더 **의미를 가지는** Semantic Tags가 나왔고, 이들로 구성된 웹을 Semantic Web이라고 한다.

---

## Semantic tags

| Tag 이름 | Description |
| :---: | :--- |
|\<form> | \<input> 등 데이터를 주고 받는 부분이 있는 영역 |
|\<table> | 데이터를 표로 나타내는 영역 |
|\<article> |	자체적으로 내용을 가지고 있는 영역 |
|\<aside> |	주 내용에서 따로 나오는 내용을 가지고 있는 영역 |
|\<details> |	추가적인 세부사항을 가지고 있는 영역 |
|\<summary> |	\<details>에 대해 설명하는 내용 |
|\<figure> |	그림, 사진, 도표, 코드와 같은 시각적인 내용을 가지고 있는 영역 |
|\<figcaption> |	\<figure>에 대해 설명하는 내용 |
|\<footer> |	문서의 끝을 나타내는 영역 |
|\<header> |	문서의 앞을 나타내는 영역 |
|\<main> |	문서의 주 내용을 보여주는 영역 |
|\<mark> |	강조되는 텍스트를 나타냄 |
|\<nav> |	문서 내부에서 이동할 수 있는 링크를 나타내는 영역 |
|\<section> |	문서 내부에서 부분적인 내용을 나타내는 영역 |
|\<time> |	날짜나 시간을 나타내는 영역 |
|  | 출처: [w3schools.com](https://www.w3schools.com/html/html5_semantic_elements.asp) |

이미지를 넣을 때 사용하는 \<img> 태그 또한 태그만 보고도 이미지라는 것을 알 수 있기 때문에 semantic tag라고 할 수 있다. 이미지를 넣는 또 다른 방법으로는 \<div> 태그를 이용해서 영역을 설정한 후, 해당 영역의 background에 이미지를 넣는 방법이 있다. 이와 같은 방법은 문서의 내용과 상관이 없는 단순 꾸밈용 이미지인 경우에 사용하는 것이 바람직하며, semantic web을 만들기 위해서, 문서의 내용과 관련이 있는 이미지는 \<img> 태그를 이용하는 것이 바람직할 것이다.

---

## SEO

Semantic tag가 갖는 의의는 **컴퓨터가 HTML문서만을 읽었을 때 각 요소들의 의미를 알 수 있다**는 것이다. 우리가 구글 검색창에 검색을 해서 인터넷 상의 정보를 빠르게 찾아낼 수 있는 이유는 구글이 만든 로봇(크롤링 봇)이 쉬지 않고 인터넷을 돌아다니며 웹 페이지들을 구글의 데이터베이스에 저장해두기 때문인데, 이 과정에서 구글의 로봇이 웹 페이지들을 보는 방법은 HTML 문서를 보는 것이다. 그렇기 때문에 semantic web을 만드는 것이 중요한 것이다. 크롤링 봇은 태그만으로 내용을 짐작할 수 있는 semantic webpage를 더 쉽게 파악하여 데이터베이스에 저장하고 검색 순위 노출에 더 좋은 점수를 부여한다. 내가 생산한 정보는 더 많은 사람에게 알려질 수록 더 큰 의미를 가질 것이기 때문에 이런 SEO(Search Engine Optimization) 과정은 매우 중요하다.

---

## 마무리

> 더 활발한 정보의 공유, 더 좋은 인터넷을 위해 semantic tags를 이용하여 semantic web을 구축하자!
