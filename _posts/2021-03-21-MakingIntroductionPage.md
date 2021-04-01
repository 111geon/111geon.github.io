---
layout: post
title:  "인스타그램 같은 자기소개 페이지 만들기"
author: Younggeon
categories: [ Web-Programming ]
tags: [ HTML, CSS, Grid, Flex ]
image: assets/images/2021-03-21-MakingIntroductionPage/bear-saying-hello.jpg
---

> HTML과 CSS를 이용하여 자기소개 페이지를 만들어보자 🙄

---

## 🏃 Example

<img src="/assets/images/2021-03-21-MakingIntroductionPage/origin.jpg" width="50%" height="50%" title="introduction page example" alt="web page introducing me" />

인스타그램 게시글의 컨셉으로 자기소개 페이지를 만들어보자.   

인스타를 보면서 레이아웃을 따라하여, 좋아요 버튼 옆에 github, linkedin, 이메일 주소 등 링크를 달고 댓글란에는 이력을 넣어서 유쾌한 자기소개 페이지를 만들어 보았다.   

이 블로그의 사이드 바에서 "About Me" 코너에 들어가면 확인할 수 있다.

---

## 🔨 구조를 분해해 보자

<img src="/assets/images/2021-03-21-MakingIntroductionPage/section.jpg" width="50%" height="50%" title="introduction page structure" alt="introduction page structure" />

CSS의 grid 기능을 이용하여 페이지에 구역을 나누고 해당 구역에 이미지나 텍스트를 넣어주자.   

- [section 1~4](#section-14)
- [section 5~8](#section-58)
- [section 9~10](#section-910)

---

#### section 1~4

<img src="/assets/images/2021-03-21-MakingIntroductionPage/section-1234.jpg" width="50%" height="50%" title="introduction page section 1~4" alt="introduction page section 1~4" />

###### grid 나누기:

우선 1~3을 하나의 block, 4를 하나의 block으로 생각해야한다. html에서 block은 위에서 아래로 쌓여가는 구조이기 때문이다.   

section 1~3은 grid를 이용해서 나누어 준다.

```html
<header>
  <div id="profile_pic">
    <img src="assets/images/me_round.jpg" />
  </div>
  <div id="profile_name">
    <p>
      <span class="boldic big">YangYoungGeon<br></span>
      <span class="small">Backend Developer</span>
    </p>
  </div>
  <div id="dotdotdot">
    <input type="checkbox" id="dotBtn">
    <label for="dotBtn" class="dotBtn"><img src="assets/images/dotdotdot.png" /></label>        
  </div>
</header>
```

이와 같이 header 안에 3개의 div가 들어가있는 형태이다.   

이를 grid로 나누어서 넣어주기 위해서는 아래와 같은 CSS 설정을 해주면 된다.

```CSS
header {
  display: grid;
  grid-template-columns: 5.625rem auto 3.125rem;
  grid-template-rows: 5.625rem;
}
```

display attribute의 속성값을 grid로 설정한 후, grid-template-columns와 grid-template-rows로 grid의 크기와 갯수를 설정한다.   

여기서 section 1과 section 3은 각각 일정한 크기로 고정하여, 프로필 사진과 더보기 버튼(점 3개)을 왼쪽 끝과 오른쪽 끝에 붙일 수 있도록 한다.   

###### 사진 크기 정하기, 위치 정하기, 둥글게 만들기

```CSS
#profile_pic img{
  margin: 0.4375rem 0 0 0.3125rem;
  max-width: 4.6875rem;
  padding: 0.625rem;
  border-radius: 100%;
}
```

다음과 같이 margin, max-width, padding, border-radius 속성을 이용하여 사진의 크기, 위치, 모양을 정해준다.   

profile 이름인 "YangYoungGeon"과 "Backend Developer" 텍스트는 line-height 속성을 이용하여 간격을 정해준다.

###### 미디어 쿼리:

크기 단위를 rem을 이용하는 이유는 브라우저의 크기에 따라 변하는 웹 페이지를 만들기 위함이다.   

rem은 최상위 태그인 html의 font-size를 기준으로 크기가 정해지는 단위이다.   

미디어 쿼리를 이용하여 html 태그의 font-size를 vw 단위로 설정하면 브라우저의 가로 길이에 따라 html의 font-size가 변화하게 되고, 이에 맞물려 rem 단위로 크기가 설정된 모든 요소의 크기가 변화하게 된다.   

vw는 현재 브라우저의 가로 길이를 기준으로 크기가 정해지는 단위이다.   

```CSS
@media(max-width: 650px){
  html{
    font-size: 2.7vw;
  }

  .article-post {
    font-size: 18px;
  }
}
```

이는 브라우저의 가로 길이가 650px보다 작아지면 해당 CSS 스타일링이 적용이 되는 코드이다.   

---

#### section 5~8

<img src="/assets/images/2021-03-21-MakingIntroductionPage/section-5678.jpg" width="50%" height="50%" title="introduction page section 5~8" alt="introduction page section 5~8" />

section 5와 6은 위에 section 1~3 과 같은 방식으로 만들어 준다.   

section 6 부분에는 이후에 JavaScript를 이용하여 사진을 넘겨서 다른 사진을 보여주는 기능을 추가할 예정이다.   

section 7 부분은 내게 좋아요를 누른 사람의 아이콘이 겹쳐있는 모양이 필요한데 여기서 쓰이는 기능이 position 기능이다.

###### github 아이콘 모양에 내 github 주소 링크 달기:

아래와 같이 a 태그에 img 태그를 넣어서 github 아이콘을 누르면 내 주소로 가도록 만들어주자.   

이때 target 속성을 "_blank"로 지정해야 새 창에서 github로 이동하게 되어 사용자의 불편을 덜 수 있다.

```html
<a target="_blank" href="https://github.com/111geon"><img src="assets/images/GitHub-Mark-32px.png" /></a>
```

###### position을 이용하여 사진 겹치기:

position 속성을 relative로 설정하고 right, left 속성을 이용하여 사진이 겹치도록 이동시켜주어야한다.   

그리고 z-index를 이용하여 레이어의 높이를 설정함으로써 원하는 사진이 밑으로 가도록 만들어주자.   

```CSS
.likes #below{
  position: relative;
  right: 2rem;
  z-index: -1;
}

.likes #belowtwo{
  position: relative;
  right: 4.1rem;
  z-index: -2;
}

.likes span{
  position: relative;
  right: 3.5rem;
  display: block;
  margin-top: 0.15rem;
}
```

위와 같이 설정하면 사진이 겹쳐 보이기는 하는데, 실제로 레이아웃 상 자리를 차지하는 위치는 사진이 이동하기 전의 본래의 위치이다.   

따라서 element가 박스를 벗어나도 표시가 될 수 있도록 아래와 같이 overflow, white-space 설정을 해주어야 한다.

```CSS
.likes {
  grid-template-columns: 9.5rem auto;
  grid-template-rows: 2.3rem;
  overflow: visible;
  white-space: nowrap;
}
```

---

#### section 9~10

<img src="/assets/images/2021-03-21-MakingIntroductionPage/section-910.jpg" width="50%" height="50%" title="introduction page section 9~10" alt="introduction page section 9~10" />

section 9와 10에서는 위의 section들을 만들면서 배운 내용들을 그대로 적용하면 되어서 새로 학습할 내용이 없다.   

strong, em, span 태그 등에 굵은 글씨, 빨간색 글씨, 회색 글씨 등의 style을 넣어서 마음대로 꾸며주었다.   

또, 이력에 들어가는 회사 로고 및 이름을 클릭했을 때 해당 회사의 사이트로 이동할 수 있도록 링크를 걸어주었다.   

다만, 긴글이 들어가는 소개글 부분에는 word-break: break-word 속성을 넣어줘야 소개글이 단어 단위로 줄바꿈이 일어나서 가독성을 높일 수 있다.

---

## 🤸 Effects

이 페이지에는 에니메이션이 3개가 들어간다.

- [회전action](#회전action)
- [좋아요action](#좋아요action)
- [슬라이드action](#슬라이드action)

---

#### 회전action

section3의 버튼을 누르면 그림이 돌아가는 단순한 에니메이션이다.   


```html
<input type="checkbox" id="dotBtn">
<label for="dotBtn" class="dotBtn"><img src="assets/images/dotdotdot.png" /></label>     
```

이와 같이 input, label 태그를 이용하여 그림을 checkbox로 만들어준 후에,

```CSS
input{
  position: fixed;
  left: -999px;
}

label{
  cursor: pointer;
}

#dotdotdot img:hover{
  cursor: pointer;
}

#dotBtn:checked ~ label > img{
  transform: rotate(18000deg);
  transition-duration: 6s;
}
```

CSS에서 input은 화면에 보이지 않게 저멀리 보내놓는다.   

label 위에 커서가 올라가면 손모양으로 변하게 만들어준다.   

그림을 클릭하면 회전하도록 transform 속성을 이용하여 설정해준다.   

이때 선택자의 의미는 #dotBtn이라는 id를 가진 태그가 체크상태가 되면 그 뒤에 나오는 label 태그의 바로 밑에 있는 img 태그에 적용된다는 뜻이다.

---

#### 좋아요action

좋아요 버튼 위에 마우스가 올라가면 빨갛게 색이 바뀌고 클릭을 하면 색이 바뀐 상태로 유지되는 기능이다.   

이는 위의 회전action과 같은 원리로 만드는 것이 가능하다.      

JavaScript를 이용하면 더 쉽게 만들 수 있다고 하나, CSS의 filter 기능을 이용하여 만들어 보았다.   

```CSS
#heart_icon img:hover{
  -webkit-filter: opacity(0.5) drop-shadow(0 0 0 red);
  filter: opacity(0.5) drop-shadow(0 0 0 red);
  transition-duration: 0.17s;
}

#heartBtn:checked ~ label > img{
  -webkit-filter: opacity(0.5) drop-shadow(0 0 0 red);
  filter: opacity(0.5) drop-shadow(0 0 0 red);
}
```

여기서 opacity는 투명도를, drop-shadow가 필터 효과의 위치와 색을 의미한다.   
[다양한 webkit-filter 기능 참고](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

---

#### 슬라이드action

마지막으로 콘텐츠들이 한번에 팡하고 나오는 것이 아니라 각 단계별로 슬라이드 효과로 나타나는 전체적인 등장 효과를 만들어 보았다.   

프로필 이름, 사진, 소개글 및 댓글이 차례대로 나타나는 것을 의도했다.  

아래는 각 브라우저 별로 fadein 효과를 @로 정의해주고 opacity를 0에서 1로 변화시켜 내용이 점점 나타나게 설정해준 것이다.   

animation-delay를 이용하여 각각의 요소의 애니메이션이 시작하는 시점을 다르게 설정해줄 수 있고,   

animation-fill-mode: forwards 설정을 하면 애니메이션이 끝난 상태로 속성을 계속 유지한다.

```CSS
header {
    animation: fadein 1s;
    -moz-animation: fadein 1s;
    /* Firefox */
    -webkit-animation: fadein 1s;
    /* Safari and Chrome */
    -o-animation: fadein 1s;
    /* Opera */

    opacity: 0;
    animation-fill-mode: forwards;
    animation-delay: 0;
}

figure {
    animation: fadein 1s;
    -moz-animation: fadein 1s;
    /* Firefox */
    -webkit-animation: fadein 1s;
    /* Safari and Chrome */
    -o-animation: fadein 1s;
    /* Opera */

    opacity: 0;
    animation-fill-mode: forwards;
    animation-delay: 0.5s;
}

section {
    animation: fadein 1s;
    -moz-animation: fadein 1s;
    /* Firefox */
    -webkit-animation: fadein 1s;
    /* Safari and Chrome */
    -o-animation: fadein 1s;
    /* Opera */

    opacity: 0;
    animation-fill-mode: forwards;
    animation-delay: 1s;
}

@keyframes fadein {
    from {
        opacity: 0;
        margin-top: 5rem;
    }

    to {
        opacity: 1;
        margin-top: 0;
    }
}

@-moz-keyframes fadein {

    /* Firefox */
    from {
        opacity: 0;
        margin-top: 5rem;
    }

    to {
        opacity: 1;
        margin-top: 0;
    }
}

@-webkit-keyframes fadein {

    /* Safari and Chrome */
    from {
        opacity: 0;
        margin-top: 5rem;
    }

    to {
        opacity: 1;
        margin-top: 0;
    }
}

@-o-keyframes fadein {

    /* Opera */
    from {
        opacity: 0;
        margin-top: 5rem;
    }

    to {
        opacity: 1;
        margin-top: 0;
    }
}
```

---

## 🔎 번외편: grid와 flex

자기소개 페이지는 grid 만으로 만들었지만 grid와 flex를 함께 이용하면 더욱 깔끔하고 세련되게 웹페이지를 구성할 수 있다.   

이 블로그의 home에 가면 볼 수 있는 grid와 flex의 이용을 알아보자.   

<img src="/assets/images/2021-03-21-MakingIntroductionPage/home-grid.png" width="100%" height="100%" title="homepage grid" alt="homepage grid" />

가장 최근의 글만 특별하게 큰 공간을 차지하면서도 grid를 유지하고, grid 안의 각 item 들은 flex로 박스들을 수직적으로 쌓아가는 방식으로 만들어져있다.   

그리고, 날짜 정보 같은 text를 오른쪽 끝으로 보내고 싶다면 float: right 속성을 이용하면 간단하게 해결할 수 있다.   

#### container의 grid

```CSS
.blog-grid-container {
    width: auto;
    margin: 50px auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 30px;
  }
```

container는 3개의 columns가 있는 것을 확인할 수 있었다. grid-gap을 이용하여 깔끔하게 표현한 것이 인상적이었다.   

#### 첫번째 item의 grid 설정

```CSS
.firstpage .blog-grid-item:nth-child(1) {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1em;
    padding: 0;
  }

.blog-grid-item {
    color: #333;
    padding: 0;
    display: flex;
    align-items: center;
}
```

첫번째 아이템은 grid-column-start와 grid-column-end를 이용하여 더 넓은 공간을 차지할 수 있도록 만들어져있다.   

그리고 display: flex; flex-direction: column으로 그림과 텍스트가 아래로 차곡차곡 쌓이도록 되어있다.   

[flex에 대해 정리가 엄청 잘되어있는 블로그 참고](https://heropy.blog/2018/11/24/css-flexible-box/)

```CSS
.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
}
```

여기 item에서 flex: 1 1 auto로 설정한다는 건 flex-grow: 1; flex-shrink: 1; flex-basis: auto로 설정한다는 의미이며,   

이는 모든 요소가 늘어나고 줄어들 때 같은 비율로 크기가 변화하며 기본 크기는 상위 요소의 width, height를 따른다는 의미이다.   

#### 이외 flex 요소들 정리

- 주 축(main-axis): items가 쌓여가는 방향을 의미. flex-direction: row이면 주 축은 수평선이 된다.
- 교차 축(cross-axis): 주 축과 수직인 축
- 시작점(flex-start)과 끝점(flex-end): 주 축이 시작하는 지점과 끝나는 지점
- flex-wrap: items의 줄바꿈 설정 (nowrap: 한줄로만 표시, items가 늘어나면 각각의 크기는 점점 작아짐)
- justify-content: 주 축 방향으로의 정렬 방법 (flex-start: 왼쪽부터 차곡차곡)
- align-content: 교차 축 방향으로의 정렬 방법 (space-around: 균등한 여백으로 정렬)

CSS는 너무 내용이 많아서 여기까지만 알아보도록 하자..

> 끝
