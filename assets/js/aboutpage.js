let i = 0;

const image_source = [];
image_source.push("/assets/images/KakaoTalk_20210305_000309488.jpg");
image_source.push("/assets/images/me_in_seamarq_1_cut.jpg");
image_source.push("/assets/images/KakaoTalk_20210324_181515589.jpg");

const dot_source = [];
dot_source.push("/assets/images/clipart477493_grey.png");
dot_source.push("/assets/images/clipart477493 (1).png");

for(let j=0; j<image_source.length; j++) {
  document.querySelector('.item:nth-child('+(j+1)+')').innerHTML = "<img src="+image_source[j]+" />";
}

document.querySelector('li.blue-dot:nth-child('+(i+1)+') img').src = dot_source[1];

function seeNextImg() {
  if(i < image_source.length - 1) {
    i += 1;
  }

  document.querySelector('ul.slider').style.left = -(100.5 * i) + '%' ;

  for(let k=0; k<image_source.length; k++) {
    document.querySelector('li.blue-dot:nth-child('+(k+1)+') img').src = dot_source[0];
  }
  document.querySelector('li.blue-dot:nth-child('+(i+1)+') img').src = dot_source[1];
}

function seeBeforeImg() {
  if(i > 0) {
    i -= 1;
  }
  document.querySelector('ul.slider').style.left = -(100.5 * i) + '%' ;

  for(let k=0; k<image_source.length; k++) {
    document.querySelector('li.blue-dot:nth-child('+(k+1)+') img').src = dot_source[0];
  }
  document.querySelector('li.blue-dot:nth-child('+(i+1)+') img').src = dot_source[1];
}

// // 애니메이션 재실행
// document.querySelector('figure li').classList.remove('effect');
// void document.querySelector('figure li').offsetWidth;
// document.querySelector('figure li').classList.add('effect');
