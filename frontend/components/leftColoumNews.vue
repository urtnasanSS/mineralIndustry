<template>
  <div>
    <!-- <div class="left_coloum_top">
      <img src="img/f48235f96fadaa78fbd96a76aa929d17.png" width="100%">
      <h3>
        “Эрдэнэс-Тавантолгой” ХК-ийн Хувьцаа эзэмшигчдийн ээлжит хурал 2020 оны 04 дүгээр сарын 24-ний өдрийн 09:00
        цагт нээлтэй хуралдлаа.
      </h3>
    </div> -->
    <div class="s">
      <!-- Full-width images with number and caption text -->
      <div class="mySlides fade">
        <div class="numbertext">1 / 3</div>
        <img src="img1.jpg" style="width:100%">
        <div class="text">Caption Text</div>
      </div>

      <div class="mySlides fade">
        <div class="numbertext">2 / 3</div>
        <img src="img2.jpg" style="width:100%">
        <div class="text">Caption Two</div>
      </div>

      <div class="mySlides fade">
        <div class="numbertext">3 / 3</div>
        <img src="img3.jpg" style="width:100%">
        <div class="text">Caption Three</div>
      </div>

      <!-- Next and previous buttons -->
      <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
      <a class="next" onclick="plusSlides(1)">&#10095;</a>
    </div>
    <br>

    <!-- The dots/circles -->
    <div style="text-align:center">
      <span class="dot" onclick="currentSlide(1)"></span>
      <span class="dot" onclick="currentSlide(2)"></span>
      <span class="dot" onclick="currentSlide(3)"></span>
    </div>
    <div id="left_coloum_mid">
      <div id="upper_line" style="width: 100%;">
        <hr style=" float:left; width: 4px; height: 18px; margin: 0; padding: 0; background-color: #1a3675;">
        <p>Мэдээ мэдээлэл </p>
      </div>
      <div class="left_coloum_mid_1" style="width: 50%; float: left; padding-right: 5%;">
        <img src="img/f48235f96fadaa78fbd96a76aa929d17.png">
        <h3 style="text-align: left;">
          “Эрдэнэс-Тавантолгой” ХК-ийн Хувьцаа эзэмшигчдийн ээлжит хурал 2020 оны 04 дүгээр сарын 24-ний өдрийн 09:00
          цагт нээлтэй хуралдлаа.
        </h3>
      </div>
      <div class="left_coloum_mid_2" style="width: 50%; float: left;  padding-left: 5%;">
        <img src="img/f48235f96fadaa78fbd96a76aa929d17.png">
        <h3>
          “Эрдэнэс-Тавантолгой” ХК-ийн Хувьцаа эзэмшигчдийн ээлжит хурал 2020 оны 04 дүгээр сарын 24-ний өдрийн 09:00
          цагт нээлтэй хуралдлаа.
        </h3>
      </div>
    </div>
  </div>
</template>
<script>
let slideIndex = 1
showSlides(slideIndex)

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n)
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n)
}

function showSlides(n) {
  let i
  const slides = document.getElementsByClassName('mySlides')
  const dots = document.getElementsByClassName('dot')
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '')
  }
  slides[slideIndex - 1].style.display = 'block'
  dots[slideIndex - 1].className += ' active'
 }
</script>
<style>
* {box-sizing:border-box}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.mySlides {
  display: none;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
/* #left_coloum_top h3{
width: 1040px;
height: 48px;
font-family: SegoeUI;
font-size: 18px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: normal;
text-align: left;
color: #000000;
}
#left_coloum_top img{
width: 100%; height: auto;
float: left;
} */
#left_coloum_mid {
/* overflow to handle inner floating block */
overflow: hidden;
}
.left_coloum_mid_1 img{
width: 100%; height: auto;
float: left;}
.left_coloum_mid_1 h3{
height: 63px;
font-family: SegoeUI;
font-size: 16px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.31;
letter-spacing: normal;
text-align: left;
color: #000000;
float: left;
}

.left_coloum_mid_2 img{
float: right;
width: 100%; height: auto;
}

.left_coloum_mid_2 h3{
height: 63px;
font-family: SegoeUI;
font-size: 16px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.31;
letter-spacing: normal;
text-align: left;
color: #000000;
float: right;
}
#upper_line p{
margin: 1% 1% 1% 1%;
width: auto;
height: auto;
font-family: SegoeUI;
font-size: 18px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: normal;
text-align: left;
color: #000000;
}
</style>
