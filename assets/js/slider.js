const swiper = new Swiper('.slider-wrapper', {
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 20,
  loop: true, 
  updateOnWindowResize: true,
  initialSlide: 3,
  pagination: {
    el: '.p1',
    clickable: true,
  },
  
  breakpoints: {
      0: {
          slidesPerView: 1,
          spaceBetween: 6,
          centeredSlides: false,
          width: 50,
          lazy: false,
          freeMode: true,
          roundLengths: true,
          updateOnWindowResize: true,
      },
      480: {
          slidesPerView: 2,
          centeredSlides: true,
          spaceBetween: 20,
          freeMode: false,
          slidesPerGroup: 1,
          lazy: false,
          roundLengths: true
      },
      1024: {
          slidesPerView: 3,
          spaceBetween: 20,
          freeMode: false,
          lazy: false,
          centeredSlides: true,
          slidesPerGroup: 1,
          width: 600,
          roundLengths: false
      },
  },
});

const swiper2 = new Swiper('.slider-wrapper2', {
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 20,
  loop: true, 
  initialSlide: 3,
  pagination: {
    el: '.p2',
    clickable: true,
  updateOnWindowResize: true,
  },
  
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 6,
      centeredSlides: false,
      width: 50,
      lazy: false,
      freeMode: true,
      roundLengths: true
  },
  480: {
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: 20,
      freeMode: false,
      slidesPerGroup: 1,
      lazy: false,
      roundLengths: true
  },
  1024: {
      slidesPerView: 3,
      spaceBetween: 20,
      freeMode: false,
      lazy: false,
      centeredSlides: true,
      slidesPerGroup: 1,
      width: 600,
      roundLengths: false
      },
  },
});

swiper.on('resize', function () {
  swiper.update();
});

