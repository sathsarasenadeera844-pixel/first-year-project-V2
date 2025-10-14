document.addEventListener("DOMContentLoaded", function () {
            // Wrap the initialization in a timeout
            setTimeout(function() {
                const swiper = new Swiper(".menu-slider", {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    loop: true,
                    speed: 5000, 
                    allowTouchMove: false, 
                    autoplay: {
                        delay: 0, 
                        disableOnInteraction: false,
                    },
                    breakpoints: {
                        320: { slidesPerView: 1.3, spaceBetween: 10 },
                        768: { slidesPerView: 2.3, spaceBetween: 20 },
                        1024: { slidesPerView: 3.3, spaceBetween: 25 },
                        1280: { slidesPerView: 4, spaceBetween: 30 },
                    },
                    on: {
                        init() {
                            this.update();
                            this.el.querySelector(".swiper-wrapper").style.transitionTimingFunction = "linear";
                        },
                    },
                });
                // You can also try: swiper.update(); 
            }); // Wait 100ms before initializing/starting
        });