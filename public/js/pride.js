const testimonialPage = document.querySelector(".quotes-slide[data-slider-slide-index='1']");
testimonialPage.classList.add("quotes-slide--active");


document.querySelector(".quotes").addEventListener("mouseout", function(){
  document.querySelector(".quotes-slide--active").classList.remove("quotes-slide--active")
  document.querySelector(".quotes-slide[data-slider-slide-index='1']").classList.add("quotes-slide--active")
});


document.querySelectorAll(".quotes-slide").forEach( 
  elem => elem.addEventListener("mouseover", function(){
    document.querySelector(".quotes-slide--active").classList.remove("quotes-slide--active")
    this.classList.add("quotes-slide--active")
  })
)

var galleryThumbs = new Swiper('.gallery-thumbs', {
	effect: 'coverflow',
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: '2',
	
	coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 50,
        modifier: 6,
        slideShadows : false,
	  },
	  
  });
  
  
var galleryTop = new Swiper('.swiper-container.testimonial', {
	speed: 400,
	spaceBetween: 50,
	autoplay: {
	  delay: 3000,
	  disableOnInteraction: false,
	},
	direction: 'vertical',
	pagination: {
	  clickable: true,
	  el: '.swiper-pagination',
	  type: 'bullets',
	},
	thumbs: {
		swiper: galleryThumbs
	  }
  });
  
