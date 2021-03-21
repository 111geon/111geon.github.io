---
layout: post
title:  "Making Introduction Page"
author: Younggeon
categories: [ Web-Programming ]
tags: [ HTML, CSS ]
image: assets/images/2021-03-21-MakingIntroductionPage/bear-saying-hello.jpg
---

> HTML과 CSS를 이용하여 자기소개 페이지를 만들어보자 🙄

---

## 🏃 Example

<img src="/assets/images/2021-03-21-MakingIntroductionPage/origin.jpg" title="introduction page example" alt="web page introducing me" />

인스타그램 게시글의 컨셉으로 자기소개 페이지를 만들어보자.   
인스타를 보면서 레이아웃을 따라하여, 좋아요 버튼 옆에 github, linkedin, 이메일 주소 등 링크를 달고 댓글란에는 이력을 넣어서 유쾌한 자기소개 페이지를 만들어 보았다.   
이 블로그의 사이드 바에서 "About Me" 코너에 들어가면 확인할 수 있다.

---

## 🔨 구조를 분해해 보자

<img src="/assets/images/2021-03-21-MakingIntroductionPage/section.jpg" title="introduction page structure" alt="introduction page structure" />

CSS의 grid 기능을 이용하여 페이지에 구역을 나누고 해당 구역에 이미지나 텍스트를 넣어주자.   
- [section 1~4](#section-14)
- [section 5~8](#section-58)
- [section 9~10](#section-910)

#### section 1~4

<img src="/assets/images/2021-03-21-MakingIntroductionPage/section-1234.jpg" title="introduction page section 1~4" alt="introduction page section 1~4" />

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

> 크기 단위를 rem을 이용하는 이유는 브라우저의 크기에 따라 변하는 웹 페이지를 만들기 위함이다.
> rem은 최상위 태그인 html의 font-size를 기준으로 크기를 정하는 단위이다.
> 그리고 미디어 쿼리를 이용하여 html 태그의 font-size를 vw 단위로 설정하면 브라우저의 가로 길이에 따라 웹 페이지의 크기를 바꿔줄 수 있다.
> vw는 현재 브라우저의 가로 길이를 기준으로 크기를 정하는 단위이다.

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




#### section 5~8

<img src="/assets/images/2021-03-21-MakingIntroductionPage/section-5678.jpg" title="introduction page section 5~8" alt="introduction page section 5~8" />

#### section 9~10

<img src="/assets/images/2021-03-21-MakingIntroductionPage/section-910.jpg" title="introduction page section 9~10" alt="introduction page section 9~10" />
