---
layout: post
title:  "Network 기초 정리"
author: Younggeon
categories: [ Web-Server ]
tags: [ Network, ip, DNS ]
image: assets/images/2021-03-31-NetworkBasic/social-media-3846597.png
---

> Internet이 어떻게 동작하는지에 대한 기초적인 지식 기록 🕸️

---

## 🚴 Example

<img src="/assets/images/2021-03-28-ImageSlide/Peek 2021-03-28 02-12.gif" width="50%" height="50%" title="image slide gif" alt="image slide gif" />

이전에 만들었던 <a href="https://111geon.github.io/about" target="_blank">자기소개 페이지</a>에서 사진을 여러장 보여줄 수 있도록 이미지 슬라이드 기능을 추가하였다. 좌우 버튼을 눌러 이전 사진, 다음 사진을 볼 수 있도록 하는 방식이다. 사진의 밑에는 현재 보고있는 사진이 몇번째 사진인지 알 수 있도록 파란점으로 표현하였다. 이 기능을 구현하기 위해 웹 브라우저 위에서 작동하는 언어인 JavaScript를 이용해보자.

---

## 🧱 Structure

<img src="/assets/images/2021-03-28-ImageSlide/스크린샷, 2021-03-28 19-26-03.jpg" title="image slide structure" alt="image slide structure" />

1. [Container의 크기를 사진의 크기와 동일하게 설정하고 Container를 벗어나는 요소는 보이지 않게 설정한다.](#1-container-만들기)
2. [Container 안에 3장의 사진을 일렬로 배열한다.](#2-사진-넣기)
3. [버튼을 눌렀을 때 3장의 사진이 함께 좌우로 움직이도록 한다.](#3-버튼-만들기)
4. [Container 밑에 사진의 개수만큼 회색점을 그리고, n번째 사진을 보고있을 때 n번째 회색점을 파란점으로 바꾼다.](#4-사진-indicator-만들기)

---

## ⚙️ Work

#### 1. Container 만들기

##### [ HTML ]

```html
<figure>
  <div class="button-container">
    <input class="prev-button" type="image" src="/assets/images/left-arrow.png" onclick="seeBeforeImg()">
    <input class="next-button" type="image" src="/assets/images/right-arrow.png" onclick="seeNextImg()">
  </div>
  <div class="img-container">
    <ul class="slider">
      <li class="item"></li>
      <li class="item"></li>
      <li class="item"></li>
    </ul>
  </div>
</figure>
```

전체 영역인 \<figure> 안에 버튼을 담는 div.button-container가 있고 이미지를 담는 div.img-container가 있다. 그 안에 이미지들이 \<ul>안에 정렬되어있는 구조이다.

##### [ CSS ]

```css
figure {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
}
```

가장 상위 태그인 \<figure>의 position은 relative로 설정해야한다. 그렇지 않으면 사진이 나올 공간에 영역 확보가 되지 않아서 밑에 있는 요소들이 위로 올라와 사진과 겹쳐져 버린다. 후에 나오겠지만 \<figure> 아래에 있는 container와 이미지들의 position을 absolute로 설정해야하기 때문에 이런일이 벌어진다.

\<figure> 영역에 높이를 정하는 것은 다소 까다로웠는데 높이를 결정할 수 있는 요소가 하위 태그에 position: absolute로 있기 때문에 height 값을 미리 설정해줄 수 없었다. 이에 \<figure>의 height는 0으로 하였고 그대신 padding-bottom을 100%로 하여 하위 태그에 있는 이미지의 크기를 반영하여 영역을 잡아줄 수 있도록 하였다.

```CSS
div.img-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
}

div.button-container {
  width: 100%;
  height: 100%;
  position: absolute;
}
```

img-container는 \<figure> 위에 올라가 원하는 영역에서만 사진을 보이게 하는 역할을 한다. 그렇기 때문에 overflow 속성을 hidden으로 설정한다. 이미 \<figure>에서 영역의 높이를 확보해두었기 때문에 여기서는 position: absolute에 height: 100%로 설정해두어도 된다.

button-container 좌우 버튼을 담는 container이므로 overflow: hidden 설정을 할 필요가 없다.

---

#### 2. 사진 넣기

##### [ HTML ]

```html
<div class="img-container">
  <ul class="slider">
    <li class="item"></li>
    <li class="item"></li>
    <li class="item"></li>
  </ul>
</div>
```

사진들은 img-container 안에 있는 \<ul>안에 item으로 배열된다. 이때 아직 \<li> 태그 안에 \<img> 태그가 없다. 불러올 이미지가 많아지면서 로딩 시간이 길어지게 되었고, 이로 인해 html parsing 단계에서 이미지를 로드하게 되면 페이지가 깔끔하게 불러와지지 않았다. 이에, html 문서를 먼저 parsing 하고 다 끝난 후에 javascript로 \<li> 태그에 \<img>를 넣어주는 방식으로 변경하여 페이지 로딩을 부드럽게 개선하였다. [JavaScript Parsing](#-additional)

```html
<script src = "/assets/js/aboutpage.js"></script>
```

js 파일을 로딩하는 script를 \<body> 태그의 가장 마지막에 배치하였다.

##### [ JavaScript ]

```JavaScript
const image_source = [];
image_source.push("/assets/images/KakaoTalk_20210305_000309488.jpg");
image_source.push("/assets/images/me_in_seamarq_1_cut.jpg");
image_source.push("/assets/images/KakaoTalk_20210324_181515589.jpg");

for(let j=0; j<image_source.length; j++) {
  document.querySelector('.item:nth-child('+(j+1)+')').innerHTML = "<img src="+image_source[j]+" />";
}
```

올릴 사진의 경로를 list 안에 넣어두고, for 문을 사용하여 li.item 태그들 안에 이미지 태그들을 생성하여 넣어주었다.

##### [ CSS ]

```css
ul.slider {
  max-width: 100%;
  margin: 0;
  padding: 0;

  list-style: none;
  white-space: nowrap;

  position: absolute;
  left: 0%;

  -webkit-transition: left 0.25s;
  -o-transition: left 0.25s;
  transition: left 0.25s;
}

li.item, .blue-dot {
  display: inline;
  margin-right: -2px;
  padding: 0;
}
```

이미지를 담을 \<ul> 태그는 올릴 사진 3개를 묶은 덩어리로 생각할 수 있다. 우선 list-style: none을 통해 목록 앞에 붙는 장식을 없애고 white-space: nowrap 설정으로 목록이 수평적으로 배열될 수 있도록 한다. 추가로 li.item 태그의 display: inline 설정을 해주어야 수평적으로 이미지가 나올 수 있다. 이때, 이미지가 조금씩 떨어져서 출력되므로 margin-right를 적당한 음수값으로 잡아준다.

이미지 슬라이드 효과를 위해선 \<ul>이 javascript에 의해 좌우로 움직일 수 있어야한다. 이를 위해 position: absolute, left: 0%로 설정하고 javascript로 left를 조절하여 이미지가 좌우로 움직일 수 있도록 한다. 여기서 transition 속성을 이용하여 슬라이드 효과의 속도를 조절할 수 있다.

---

#### 3. 버튼 만들기

##### [ HTML ]

```html
<div class="button-container">
  <input class="prev-button" type="image" src="/assets/images/left-arrow.png" onclick="seeBeforeImg()">
  <input class="next-button" type="image" src="/assets/images/right-arrow.png" onclick="seeNextImg()">
</div>
```

버튼은 \<input> 태그를 이용해서 쉽게 만들 수 있다. 보통 type에 "button"을 넣지만 원하는 이미지를 버튼으로 쓰고 싶다면 type을 "image"로 하면 된다. src에 원하는 이미지 경로를 넣고, onclick 속성에 JavaScript 함수를 넣으면 된다.

##### [ JavaScript ]

```JavaScript
let i = 0;

function seeNextImg() {
  if(i < image_source.length - 1) {
    i += 1;
  }
  document.querySelector('ul.slider').style.left = -(100.5 * i) + '%' ;
}

function seeBeforeImg() {
  if(i > 0) {
    i -= 1;
  }
  document.querySelector('ul.slider').style.left = -(100.5 * i) + '%' ;
}
```

좌우 버튼을 눌렀을 때 작동하는 function을 정의한 내용이다.

우선 현재 몇번째 사진을 보고있는지 가르키기위해 전역변수 i를 선언하고 함수를 정의했다. i가 0에서 3 사이를 벗어나지 않도록 if구문 안에서 i를 증감시켜주면 된다. 이 i에 따라 \<ul>태그의 left 속성을 바꿔주면 슬라이드 효과를 만들어줄 수 있다.

##### [ CSS ]

```CSS
.prev-button {
  z-index: 999;
  position: relative;
  margin: 47% 2%;
  width: 6%;
  opacity: 0.5;
  border: 0;
  outline: 0;
}

.next-button {
  float: right;
  z-index: 999;
  position: relative;
  margin: 47% 2%;
  width: 6%;
  opacity: 0.5;
  border: 0;
  outline: 0;
}
```

마지막으로 버튼의 css 스타일링이다. z-index:999로 이미지를 맨 위로 올리고 margin과 크기, opacity를 적절하게 설정해준다. 오른쪽에 있는 next-button은 float:right로 설정한다. 버튼을 클릭했을 때, 영역의 테두리에 선택 표시가 뜨는 것 싫어서 border:0, outline:0 설정을 해주었다.

---

#### 4. 사진 Indicator 만들기

##### [ HTML ]

```html
<div>
  <ul class="blue-dot">
    <li class="blue-dot"><img src="/assets/images/clipart477493_grey.png" /></li>
    <li class="blue-dot"><img src="/assets/images/clipart477493_grey.png" /></li>
    <li class="blue-dot"><img src="/assets/images/clipart477493_grey.png" /></li>
  </ul>
</div>
```

몇번째 사진을 보고있는지 가르키는 indicator는 파란색 점으로 나타내기로 했다. 우선 처음 페이지를 불러오는 시점에서는 회색점 3개를 불러온다.

##### [ JavaScript ]

```JavaScript
const dot_source = [];
dot_source.push("/assets/images/clipart477493_grey.png");
dot_source.push("/assets/images/clipart477493 (1).png");

document.querySelector('li.blue-dot:nth-child('+(i+1)+') img').src = dot_source[1];

function seeNextImg() {
  if(i < image_source.length - 1) {
    i += 1;
  }
  for(let k=0; k<image_source.length; k++) {
    document.querySelector('li.blue-dot:nth-child('+(k+1)+') img').src = dot_source[0];
  }
  document.querySelector('li.blue-dot:nth-child('+(i+1)+') img').src = dot_source[1];
}

function seeBeforeImg() {
  if(i > 0) {
    i -= 1;
  }
  for(let k=0; k<image_source.length; k++) {
    document.querySelector('li.blue-dot:nth-child('+(k+1)+') img').src = dot_source[0];
  }
  document.querySelector('li.blue-dot:nth-child('+(i+1)+') img').src = dot_source[1];
}
```

사진을 넣을 때와 같이 dot_source 리스트에 회색점과 파란색점 경로를 넣어주고 :nth-child 선택자를 이용하여 i번째 점의 src를 파란색점으로 바꿔주는 방식이다. 각 버튼을 누를 때마다 점들을 회색점으로 초기화하고 i번째 점을 파란색점으로 만들어 주어야하기 때문에 각 함수에 해당 코드를 넣어준다.

완성!

---

## ➕ Additional

용량이 큰 이미지를 여러장 불러오는 작업은 클라이언트의 네트워크 환경에 따라 매우 오래걸리는 일이 될수도 있다. 이러한 작업을 html이 불러와지는 중간 단계에서 진행하면 웹 페이지가 매끄럽게 로딩되지 못한다. 이를 해결하기 위해 생각할 수 있는 방법은 다음과 같을 것이다.
1. 이미지 로딩 작업을 \<head>에서 진행하고 이미지 로딩이 모두 완료된 후에 html 문서를 불러오도록 한다.
2. 우선 html 문서를 불러온 후, 이미지 로딩 작업은 마지막에 처리한다.

필자의 경우엔 유의미한 정보인 텍스트 정보를 먼저 보여주고 사진은 나중에 보여줘도 괜찮다고 판단하여 후자의 방법을 채택했다.

하기 내용은 이와 관련하여 알게 된 것들을 정리한 것이다.

---


#### [ JavaScript Parsing ]
크기가 큰 JavaScript 파일을 어떤식으로 불러오냐에 따라 클라이언트의 UX는 꽤 달라질 수 있다. 다음은 js 파일을 동기적 또는 비동기적으로 처리하는 4가지 방법을 정리한 내용이다.   
[출처: 드림코딩 by 엘리](https://www.youtube.com/watch?v=tJieVCgGzhs&t=2s)

##### 1. \<head>에 \<script>가 호출되는 경우:
처음부터 완전한 페이지의 모습을 볼 수 있지만, js의 크기가 큰 경우 페이지가 열리는데 시간이 너무 오래 걸릴 수 있다.
##### 2. \<body>의 끝에 \<script>가 호출되는 경우:
html 요소를 빠르게 보여줄 수 있지만, js에 의존적인 요소가 많다면 UX가 안좋을 수 있다.
##### 3. \<head>에 async를 붙여 \<script>를 호출하는 경우:
html을 pasrsing 하면서 js를 fetching하고, fetching이 끝나면 js를 execute하는 방법, 병렬처리로 다운로드가 빠르나 js가 언제 다운로드될 지 모르기 때문에 이를 주의해야 한다.
##### 4. \<head>에 defer을 붙여 \<script>에 호출하는 경우:
html을 parsing하면서 js를 fetching하고, html parsing이 끝나면 js를 execute. 호출하는 js가 많을 때, 호출 순서대로 js를 실행한다. 순서가 보장되기 때문에 안전하다.

---

#### [ JavaScript Callback, Promise, Async & Await ]
다음은 JavaScript가 비동기적인 작업을 처리하는 방식에 대해서 알아본 내용이다.

##### - Callback:
함수 안에 인자로 들어가는 함수. 비동기적으로 처리되는 작업을 받아서 결과가 나온 후에 다음 함수에 넘겨주는 방식으로 만들어, 비동기적으로 처리되는 작업의 결과를 이용하기 위해 쓸 수 있다.
##### - Promise:
비동기적으로 처리되는 작업의 결과를 이용하는 callback의 역할을 동일하게 하되, 좀 더 가독성 좋고 깔끔하게 정리할 수 있다. 함수에 상태가 부여된다(pending, fulfilled, rejected).
  - resolve: 함수 작업이 성공적으로 완료되었을 때 호출되는 작업,
  - rejected: 오류 발생시 호출되는 작업.

##### - Async & Await:
promise와 같이 비동기적인 작업을 처리하는데 사용하지만 promise.then보다 더 세련되게 result 값을 받기 위해 await를 사용한다.

---

## ✔️ 마무리

- JavaScript로 DOM을 다룸으로써 이미지 슬라이드 기능을 만들어 보았다.
- JavaScript에서 load가 큰 작업을 처리하는 방식들에 대해서 알아보았다.
