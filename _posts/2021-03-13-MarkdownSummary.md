---
layout: post
title:  "Markdown Summary"
author: Younggeon
categories: [ Web-Programming ]
tags: [ Markdown, HTML ]
image: assets/images/2021-03-13-Markdown/1200px-Markdown-mark.svg.png
---

> Markdown에 대한 간단 정리 👻

---

## 💡 Example

<img src="/assets/images/2021-03-13-Markdown/Markdown_Example.jpg" title="markdown example" alt="markdown example" />

Markdown(좌)을 이용하면 HTML문서(우)를 편하게 만들 수 있다!

---

## 📌 Markdown 요소 정리

[Header(H1~H6)](#headerh1h6)   
[BlockQuote](#blockquote)   
[목록 만들기](#목록-만들기)   
[코드](#코드)   
[수평선](#수평선)   
[링크](#링크)   
[자동연결](#자동연결)   
[텍스트 효과](#텍스트-효과)   
[텍스트 줄바꿈](#텍스트-줄바꿈)   
[이모티콘](#이모티콘)   
[표](#표)   
[이미지](#이미지)   
[동영상](#동영상)   
[오디오](#오디오)   
[TOC 만들기](#toc-만들기)

#### Header(H1~H6):
글머리.   
앞에 '#' 붙이기(1개~6개).

#### BlockQuote:
블록인용문자.   
앞에 '>' 붙이기.

#### 목록 만들기:
숫자, '*', '+', '-' 앞에 붙이기.   
앞에 스페이스 4개가 있으면 하위 목록으로 표현 가능.   
1. a
    - b
    - c
2. d

#### 코드:
코드 블록:   
\`\`\`python   
Code   
\`\`\`   
인라인 코드:   
\'Code\'

#### 수평선:
\-\-\-

#### 링크:
\[Google\]\(https://google.com, "google link"\)

#### 자동연결:
\<address@example.com\>

#### 텍스트 효과:
\* *기운* \*   
\*\* **굵은** \*\*   
\~\~ ~~취소선~~ \~\~   
\<u\> <u>밑줄</u> \</u\>   
\<sub\> <sub>밑첨자</sub> \</sub\>   
\<sup\> <sup>윗첨자</sup> \</sup\>   

#### 텍스트 줄바꿈:
띄어쓰기 3칸 이상

#### 이모티콘:
<https://emojipedia.org/>

#### 표:
\| a \| b \| c \|   
\|\:\-\-\-\|\:\-\-\-\:\|\-\-\-\:\|   
\| 왼쪽정렬 \| 중앙정렬 \| 오른쪽정렬 \|   

#### 이미지:
```
<img src="/path/to/img.jpg" width="40%" height="30%" title="제목" alt="대체문구" />
```

#### 동영상:
```
<video width="320px" height="240px" controls autoplay muted>   
    <source src="movie.mp4" type="video/mp4">   
    Your browser does not support the video tag.   
</video>   
```

#### 오디오:
```
<audio controls>   
    <source src="horse.mp3" type="audio/mpeg">   
    Your browser does not support the audio element.   
</audio>
```

#### TOC 만들기:
Header(H1~H6)로 가는 목차: \[Header\(H1~H6\)\]\(#headerh1h6\)   
\(주소\) 규칙(HTML상 Header에 붙는 id 기준):    
> 1. All text is converted to lowercase.
> 2. All non-word text (e.g., punctuation, HTML) is removed.
> 3. All spaces are converted to hyphens.
> 4. Two or more hyphens in a row are converted to one.
> 5. If a header with the same ID has already been generated, a unique incrementing number is appended, starting at 1.
