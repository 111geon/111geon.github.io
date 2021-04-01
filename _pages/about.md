---
layout: page
permalink: /about
comments: false
---
<html>
  <head>
    <meta charset="utf-8">
    <title>About me</title>
    <link rel="stylesheet" href="assets/css/style.css">
  </head>
  <body>
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
        <input class="checkbox" type="checkbox" id="dotBtn">
        <label for="dotBtn" class="dotBtn"><img src="assets/images/dotdotdot.png" /></label>        
      </div>
    </header>

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

    <section>
      <div id="heart_icon">
        <input class="checkbox" type="checkbox" id="heartBtn">
        <label for="heartBtn" class="heartBtn"><img src="assets/images/instagram_heart.png" /></label>

        <a target="_blank" href="https://github.com/111geon"><img src="assets/images/GitHub-Mark-32px.png" /></a>
        <a target="_blank" href="https://www.linkedin.com/in/young-geon-yang-289a7b176/"><img src="assets/images/iconfinder_linkedin_square_black_107092.png" /></a>
        <a target="_blank" href="mailto:yangdaz3@gmail.com"><img src="assets/images/iconfinder_icon-email_211660.png" /></a>
      </div>
      <div>
        <ul class="blue-dot">
          <li class="blue-dot"><img src="/assets/images/clipart477493_grey.png" /></li>
          <li class="blue-dot"><img src="/assets/images/clipart477493_grey.png" /></li>
          <li class="blue-dot"><img src="/assets/images/clipart477493_grey.png" /></li>
        </ul>
      </div>
    </section>
    <section class="likes">
      <div>
        <img src="assets/images/wecode.png" />
        <img id="below" src="assets/images/HHI_square.jpg" />
        <img id="belowtwo" src="assets/images/me_round.jpg" />
      </div>
      <div>
        <span>Liked by <strong>Wecode</strong> and <strong>others</strong></span>
      </div>
    </section>
    <section class="description">
      <strong>YangYoungGeon</strong> Hi, I am Young-Geon and I am passionate about web development and asset investment. I enjoy meditation and riding bike for my health. Sometimes I listen to music like R&B, Hiphop, and Jazz, or watch a good movie to relax.
      <br>
      <div>
        <span>March 12, 2021</span>
      </div>
    </section>
    <section class="comment">
      <div>
        <a target="_blank" href="https://wecode.co.kr/"><img src="assets/images/wecode.png" /></a>
      </div>
      <div>
        <a target="_blank" href="https://wecode.co.kr/"><strong>Wecode</strong></a> He carried out the curriculum for <em>HTML, CSS, Web crawling, Python, Django, RDBMS, AWS, Docker</em> in excellent performance!
        <br>
        <span>April, 2021 ~ </span>
      </div>
    </section>
    <section class="comment">
      <div>
        <a target="_blank" href="http://english.hhi.co.kr/"><img src="assets/images/HHI_square.jpg" /></a>
      </div>
      <div>
        <a target="_blank" href="http://english.hhi.co.kr/"><strong>Hyundai_Heavy_Industries</strong></a> He put a lot of effort into our company as a <em>Naval Architect</em> for 1 year and 9 months at initial design department of shipbuilding division. Especially, his work of simple python program was helpful for automation of hard work.
        <br>
        <span>July, 2019 ~ April, 2021</span>
      </div>
    </section>

    <script src = "/assets/js/aboutpage.js"></script>

  </body>
</html>
