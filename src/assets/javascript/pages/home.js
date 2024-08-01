import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Featured Slider
function sliderFeatured() {
    const sliders = document.querySelectorAll('[data-slider-featured]');
    sliders.forEach(slider => {
        const back = slider.querySelector('[data-slider-back]');
        const next = slider.querySelector('[data-slider-next]');
        const slides = slider.querySelectorAll('[data-slider-slide]');
        let active = 1;
    
        function nextSlide() {
            console.log(`[data-slider-slide="${active}"]`);
            const slideCurrent = slider.querySelector(`[data-slider-slide="${active}"]`);
            const slideNext = slider.querySelector(`[data-slider-slide="${active + 1}"]`) || slider.querySelector(`[data-slider-slide="1"]`);
            const tl = gsap.timeline({
                onComplete: function() {
                    active++;
                    if (active > slides.length) {
                        active = 1;
                    }
                }
            });
            tl
                .set(back, { pointerEvents: 'none' },0)
                .set(next, { pointerEvents: 'none' },0)
                .to(slideCurrent, { x: '-100%', duration: 1, autoAlpha:0, ease: 'power3.inOut' }, 0)
                .to(slideNext, { x: '0', duration: 1, autoAlpha:1, ease: 'power3.inOut' }, 0)
                .set(slideCurrent, { x: '100%' })
                .set(back, { pointerEvents: 'auto' })
                .set(next, { pointerEvents: 'auto' })
        }

        function prevSlide() {
            console.log(`[data-slider-slide="${active}"]`);
            const slideCurrent = slider.querySelector(`[data-slider-slide="${active}"]`);
            const slidePrev = slider.querySelector(`[data-slider-slide="${active - 1}"]`) || slider.querySelector(`[data-slider-slide="${slides.length}"]`);
            const tl = gsap.timeline({
                onComplete: function() {
                    active--;
                    if (active < 1) {
                        active = slides.length;
                    }
                }
            });
            tl
                .set(back, { pointerEvents: 'none' },0)
                .set(next, { pointerEvents: 'none' },0)
                .set(slidePrev, { x: '-100%' }, 0)
                .to(slideCurrent, { x: '100%', duration: 1, autoAlpha:0, ease: 'power3.inOut' }, 0)
                .to(slidePrev, { x: '0', duration: 1, autoAlpha:1, ease: 'power3.inOut' }, 0)
                .set(slideCurrent, { x: '100%' })
                .set(back, { pointerEvents: 'auto' })
                .set(next, { pointerEvents: 'auto' })
        }
    
        next.addEventListener('click', function() { nextSlide(); });
        back.addEventListener('click', function() { prevSlide(); });
    });    
}

// onload run functions
window.addEventListener('load', function() {
    if (document.querySelector('[data-slider-featured]')) { sliderFeatured(); }
});