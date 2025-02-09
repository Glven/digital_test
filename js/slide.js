export function slider(id) {
    const sliderWrapper = document.getElementById(id);
    const sliderItems = [...sliderWrapper.children];
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('slider-dots');
    let sliderDotsElem = [];
    let totalItems;
    let maxIndex;
    let startX = null;
    let endX = null;

    let itemsPerPage = getItemsPerPage();
    let currentIndex = 0;

    sliderWrapper.style.transition = "transform 0.3s ease-in-out";

    function getItemsPerPage() {
        if (window.innerWidth > 1200) return 5;
        if (window.innerWidth > 768) return 4;
        if (window.innerWidth > 600) return 3;
        return 2;
    }

    function updateSliderItemsStyles() {
        const width = `${98 / itemsPerPage}%`;
        sliderItems.forEach((item) => {
            item.style.width = width;
        });
    }

    function updateSlider() {
        const itemWidth = sliderItems[0].offsetWidth;
        requestAnimationFrame(() => {
            sliderWrapper.style.transform = `translateX(-${currentIndex * (itemWidth + 8) * itemsPerPage}px)`;
            switchNewDotsElem();
        });
    }

    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    function updateSliderFunc() {
        itemsPerPage = getItemsPerPage();
        totalItems = sliderItems.length;
        maxIndex = Math.max(0, Math.ceil(totalItems / itemsPerPage) - 1);
        updateSliderItemsStyles();
        updateSlider();
        updateSliderDots();
    }

    window.addEventListener('resize', updateSliderFunc);
    updateSliderFunc();

    sliderWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        endX = startX;
    }, { passive: true });

    sliderWrapper.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', () => {
        const diff = endX - startX;
        
        if (Math.abs(diff) > 30) {
            if (diff > 0) prevSlide();
            else nextSlide();
        }
    });

    function switchNewDotsElem() {
        sliderDotsElem.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateSliderDots() {
        if (window.innerWidth >= 768) return;

        if (sliderDots.children.length === maxIndex + 1) return;

        sliderDots.innerHTML = "";
        sliderDotsElem = Array.from({ length: maxIndex + 1 }, (_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('slider-dots__elem');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            sliderDots.appendChild(dot);
            return dot;
        });
    }
}
