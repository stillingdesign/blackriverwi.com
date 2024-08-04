import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Featured Slider
function sliderFeatured() {
    const sliders = document.querySelectorAll('[data-slider-featured]');
    sliders.forEach(slider => {
        const back = slider.querySelector('[data-slider-back]');
        const next = slider.querySelector('[data-slider-next]');
        const timer = slider.querySelector('[data-slider-timer]');
        const slides = slider.querySelectorAll('[data-slider-slide]');
        const interval = 5000;
        let active = 1;
        let autoplayInterval;

        function timeBar() {
            const tl = gsap.timeline({repeat: -1, repeateDelay: 1});
            tl
                .set(timer, { overwrite: true, width: 0, scaleX: 1, duration: 0 })
                .to(timer, { width: '100%', duration: (interval / 1000) - 1, ease: 'linear' })
                .to(timer, { scaleX: 0, duration: 1, ease: 'power3.inOut' })
        }
        timeBar();

        function startAutoplay() { autoplayInterval = setInterval(nextSlide, interval); }
        function stopAutoplay() { clearInterval(autoplayInterval); }

        function nextSlide() {
            timeBar();
            const slideCurrent = slider.querySelector(`[data-slider-slide="${active}"]`);
            const slideNext = slider.querySelector(`[data-slider-slide="${active + 1}"]`) || slider.querySelector(`[data-slider-slide="1"]`);
            const imgCurrent = slider.querySelector(`[data-slider-img="${active}"]`);
            const imgNext = slider.querySelector(`[data-slider-img="${active + 1}"]`) || slider.querySelector(`[data-slider-img="1"]`);
            const indicateCurrent = slider.querySelector(`[data-slider-indicate="${active}"]`);
            const indicateNext = slider.querySelector(`[data-slider-indicate="${active + 1}"]`) || slider.querySelector(`[data-slider-indicate="1"]`);
            const tl = gsap.timeline({
                onComplete: function() {
                    active++;
                    if (active > slides.length) {
                        active = 1;
                    }
                }
            });
            tl
                .set(back, { pointerEvents: 'none' }, 0)
                .set(next, { pointerEvents: 'none' }, 0)
                .set(imgNext, { autoAlpha: 1 }, 0)
                .to(slideCurrent, { x: '-100%', duration: 1, autoAlpha: 0, ease: 'power3.inOut' }, 0)
                .to(slideNext, { x: '0', duration: 1, autoAlpha: 1, ease: 'power3.inOut' }, 0)
                .to(imgCurrent, { x: '-100%', duration: 1, ease: 'power3.inOut' }, 0)
                .to(imgNext, { x: '0', duration: 1, ease: 'power3.inOut' }, 0)
                .to(indicateCurrent, { opacity:0.2, overwrite: true, duration: 1, ease: 'power3.inOut' }, 0)
                .to(indicateNext, { opacity:1, overwrite: true, duration: 1, ease: 'power3.inOut' }, 0)
                .set(slideCurrent, { x: '100%' })
                .set(imgCurrent, { autoAlpha: 0, x: '100%' })
                .set(back, { pointerEvents: 'auto' })
                .set(next, { pointerEvents: 'auto' });
        }

        function prevSlide() {
            timeBar();
            const slideCurrent = slider.querySelector(`[data-slider-slide="${active}"]`);
            const slidePrev = slider.querySelector(`[data-slider-slide="${active - 1}"]`) || slider.querySelector(`[data-slider-slide="${slides.length}"]`);
            const imgCurrent = slider.querySelector(`[data-slider-img="${active}"]`);
            const imgPrev = slider.querySelector(`[data-slider-img="${active - 1}"]`) || slider.querySelector(`[data-slider-slide="${slides.length}"]`);
            const indicateCurrent = slider.querySelector(`[data-slider-indicate="${active}"]`);
            const indicatePrev = slider.querySelector(`[data-slider-indicate="${active - 1}"]`) || slider.querySelector(`[data-slider-slide="${slides.length}"]`);
            const tl = gsap.timeline({
                onComplete: function() {
                    active--;
                    if (active < 1) {
                        active = slides.length;
                    }
                }
            });
            tl
                .set(back, { pointerEvents: 'none' }, 0)
                .set(next, { pointerEvents: 'none' }, 0)
                .set(slidePrev, { x: '-100%' }, 0)
                .set(imgPrev, { x: '-100%', autoAlpha: 1 }, 0)
                .to(slideCurrent, { x: '100%', duration: 1, autoAlpha: 0, ease: 'power3.inOut' }, 0)
                .to(slidePrev, { x: '0', duration: 1, autoAlpha: 1, ease: 'power3.inOut' }, 0)
                .to(imgCurrent, { x: '100%', duration: 1, ease: 'power3.inOut' }, 0)
                .to(imgPrev, { x: '0', duration: 1, ease: 'power3.inOut' }, 0)
                .to(indicateCurrent, { opacity:0.2, overwrite: true, duration: 1, ease: 'power3.inOut' }, 0)
                .to(indicatePrev, { opacity:1, overwrite: true, duration: 1, ease: 'power3.inOut' }, 0)
                .set(slideCurrent, { x: '100%' })
                .set(imgCurrent, { x: '100%', autoAlpha: 0 })
                .set(back, { pointerEvents: 'auto' })
                .set(next, { pointerEvents: 'auto' });
        }

        next.addEventListener('click', function() {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        });

        back.addEventListener('click', function() {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        });

        startAutoplay();
    });
}

// onload run functions
window.addEventListener('load', function() {
    if (document.querySelector('[data-slider-featured]')) {
        sliderFeatured();
    }
});