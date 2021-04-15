---
layout: post
title:  "HTML의 Layout"
author: Younggeon
categories: [ TIL ]
tags: [ CSS ]
image: https://cdn.pixabay.com/photo/2016/11/24/20/30/architecture-1857175_960_720.jpg
---

> HTML의 layout을 구성하는 CSS 속성에 대해 알아보자.

---

## Introduction

HTML의 요소들은 내용을 담고있지만, 자체적으로 눈에 보이는 레이아웃을 구성하지는 못하고 그저 위에서 아래로, 왼쪽에서 오른쪽으로 요소들을 쌓아나갈 뿐이다. 레이아웃을 구성하기 위해서 필요한 것은 CSS로, CSS의 여러 속성을 이용하면 HTML의 요소들을 눈에 보기 좋게 배치할 수 있다.

- [Position](#position)
- [Display](#display)
- [Float](#float)
- [Flex](#flex)

---

## Position

```CSS
.example {
  position: absolute;
  position: relative;
  position: fixed;

  top: 10px;
  right: 20px;
  bottom: 10%;
  left: 20%;
}
```

Position은 원하는 요소를 다른 요소 위에 겹치고 싶을 때 사용하는 속성이다. Position의 default 값은 static으로 이 경우 요소들은 위에서 아래로, 왼쪽에서 오른쪽으로 그저 차곡차곡 쌓이게 될 것이다. Position을 설정하면 필연적으로 top, right, bottom, left 속성에 픽셀값 또는 상대값을 주어서 요소를 이동시키게 된다.

- Aboslute 속성값은 해당 요소를 부모 요소의 원점(보통 왼쪽 위 끝점)을 기준으로 위치를 정한다는 의미이다. 이때, 부모 요소의 position은 relative이어야 의도된 바대로 위치를 조정할 수 있다.

- Relative 속성값은 default인 static 값과 겉보기에 다르지 않다(그냥 아래로 쌓임). 다만 relative 속성값의 경우, top, right, bottom, left 속성에 값을 부여함으로써 static과는 달리 요소의 위치를 움직여 줄 수 있다.

- Fixed 속성값은 요소의 위치를 부모요소가 아닌 브라우저상 보여지는 화면을 기준으로 정한다. 따라서 스크롤을 내리는 등 웹페이지 안에서 이동을 하여도 고정적으로 보여주고 싶은 요소가 있을 때 이 속성값을 사용하게 된다.

---

## Display

```CSS
.example {
  display: block;
  display: inline;
  display: inline-block;
}
```

CSS의 display 속성은 해당 요소를 어떻게 취급하여 위치시킬 것인지를 정한다. 예를 들어, 글의 문단을 나타내는 \<p>태그는 위에서 아래로 쌓여가는 모습이 자연스러울 것이다. 반대로 이미지를 나타내는 \<img>태그는 위에서 아래로 쌓여가면 공간만 낭비될 뿐 글자를 순서대로 써가며 글을 만들 듯이 왼쪽에서 오른쪽으로 쌓여가는 것이 자연스러울 것이다.

| Display의 속성값 | Description |
| :---: | :--- |
| Inline | 횡방향으로(왼쪽에서 오른쪽) 요소가 쌓여간다. Inline으로 속성값이 부여된 요소들은 딱 content 만큼의 공간 영역만을 차지하기 때문에 padding, margin 등의 값을 줄 수 없다.
| Block | 종방향으로(위에서 아래) 요소가 쌓여간다. Block으로 속성값이 부여된 요소들은 부모 요소의 너비를 온전하게 차지하여 하나의 행을 이룬다. padding, margin 등의 값을 변경해가며 안에 있는 content를 마음대로 배치할 수 있다.
| inline-block | Inline 처럼 횡방향으로 요소를 쌓아가되, block 처럼 padding, margin 등의 값을 변경해가며 content의 배치를 변경할 수 있다. 작은 block이 inline 처럼 쌓여간다고 보면 된다. |

---

## Float

```CSS
.example {
  float: left;
  float: right;
}
```
<img src="/assets/images/2021-04-15-HTML-Layout/2021-04-15 13-30-53.png" alt="image floating on paragraph"> <center><a href="https://www.w3schools.com/css/css_float.asp">출처: www.w3schools.com</a></center>

Float 속성을 사용한 한 예로 위 그림처럼 이미지(파인애플)를 글 위에 띄어놓는 것을 볼 수 있다. 이 경우 글은 이미지의 영역을 침범하지 않고 그 주위를 감싸게 된다.

Float를 이용하면 이미지 등의 요소를 어디에 위치할지 정해줄 수 있는데 `float: left`의 경우 요소를 왼쪽을 기준으로 배치시켜 오른쪽으로 쌓아갈 수 있도록 할 수 있고, `float: right`의 경우 요소를 오른쪽으로 기준시켜 왼쪽으로 쌓아갈 수 있다.

<img src="/assets/images/2021-04-15-HTML-Layout/2021-04-15 13-41-17.png" alt="image overflowing over div"> <center><a href="https://learnlayout.com/clearfix.html">출처: learnlayout.com</a></center>

Float의 경우 문제점이 있는데, float된 요소의 크기보다 부모 요소의 크기가 더 작으면 float된 요소가 튀어나와 보기 안좋을 수 있다. 이를 해결하기 위해서는 \<div>태그 안에 가장 마지막에 \<br class="clear"> 와 같이 clear 클래스를 갖는 아무 태그나 넣어 주고 clear 클래스에 대해 CSS에서 `.clear {clear: both;}` 와 같이 clear를 해주어야 한다.

이와 같은 불편함 때문에 요즘에는 float 대신 flex를 사용하는 웹페이지가 많아지고 있다.

---

## Flex

```html
<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```

```css
.container {
  display: flex;
}
```

Flex는 Container의 역할을 하는 부모 요소 안에 item들을 inline-block 처럼 쌓아갈 때 매우 유용한 속성이다. 이 item들을 어디를 기준으로 어떤 방식으로 배열할지 설정해줄 수 있는 속성이 많아서 레이아웃을 깔끔하게 만들 수 있다. Flex 관련해서는 활용할 수 있는 속성이 무지 많지만 대표적인 속성들만 정리해보았다.

- flex-direction: item들을 수평으로 쌓을지, 수직으로 쌓을지, 어디를 기준으로(왼쪽, 오른쪽, 아래, 위) 쌓기 시작할지 를 정할 수 있다.
- flex-wrap: item들이 쌓여서 container의 영역을 벗어나려고할 때, 어떻게 줄바꿈할지 정할 수 있다.
- justify-content: 주축 방향(쌓여가는 방향)으로 시작점부터 정렬할지, 끝점부터 정렬할지, 가운데 정렬할지, 균등하게 정렬할지를 정할 수 있다.
- align-content: 교차축 방향(주축 방향과 수직)으로 시작점부터 정렬할지, 끝점부터 정렬할지, 가운데 정렬할지, 균등하게 정렬할지를 정할 수 있다.

---

## 마무리

> 페이지의 레이아웃을 구성할 수 있는 CSS 속성들을 정리해보았다.
