export function slider (id) {
    const sliderWrapper = document.getElementById(id);
    const sliderItems = sliderWrapper.children
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('slider-dots')
    let sliderDotsElem = []
    let totalItems;
    let maxIndex;
    let startX;
    let endX;

    let itemsPerPage = getItemsPerPage();
    let currentIndex = 0;


    function updateSliderItemsStyles () {
        Array.from(sliderItems).forEach(si => {
            si.style.width = `${98 / itemsPerPage}%`
        })
    }


    function getItemsPerPage() {
        if (window.innerWidth > 1200) return 5
        if (window.innerWidth > 768 && window.innerWidth <= 1200) return 4
        if (window.innerWidth > 600 && window.innerWidth <= 768) return 3
        return 2
    }

    function updateSlider() {
        const itemWidth = sliderWrapper.children[0].offsetWidth
        sliderWrapper.style.transform = `translateX(-${currentIndex * (itemWidth + 8) * itemsPerPage}px)`
    }

    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++
            updateSlider()
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--
            updateSlider()
        }
    }

    nextBtn.addEventListener('click', nextSlide)
    prevBtn.addEventListener('click', prevSlide)

    const updateSliderFunc = () => {
        totalItems = sliderItems.length
        maxIndex = Math.ceil(totalItems / itemsPerPage) - 1
        itemsPerPage = getItemsPerPage()
        updateSliderItemsStyles()
        updateSlider()
        updateSliderDots()
    }

    updateSliderFunc()
    
    window.addEventListener('resize', updateSliderFunc)

    sliderWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX
    }, {passive: true})

    sliderWrapper.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX
    }, {passive: true})

    sliderWrapper.addEventListener('touchend', () => {
        swipeCalc()
    })

    function swipeCalc() {
        if (!startX || !endX) return;
        
        const diff = endX - startX

        if (diff > 0) {
            prevSlide()
        } else {
            nextSlide()
        }

        switchNewDotsElem()
    }

    function switchNewDotsElem () {
        for ( let i = 0; i < sliderDotsElem.length; i++ ) {
            sliderDotsElem[i].classList.remove('active')
            if (i === currentIndex) {
                sliderDotsElem[i].classList.add('active')
            }
        }
    }

    function updateSliderDots () {
        if (window.innerWidth >= 768) return;

        sliderDotsElem = []

        for (let i = 0; i <= maxIndex; i++) {
            const dotsElem = document.createElement('span')
            dotsElem.classList.add('slider-dots__elem')
            if (i === currentIndex) {
                dotsElem.classList.add('active')
            }
            sliderDotsElem.push(dotsElem)
        }

        if (sliderDots.children.length === sliderDotsElem.length) return;

        sliderDots.innerHTML = ''

        sliderDotsElem.forEach((elem, index) => {
            sliderDots.appendChild(elem)
            elem.addEventListener('click', () => {
                swipeSlides(index, currentIndex)
                currentIndex = index;
                switchNewDotsElem()
            })
        })
    }

    function swipeSlides (currentIndex, prevIndex) {
        const isToNext = currentIndex > prevIndex

        while (currentIndex !== prevIndex) {
            if (isToNext) {
                nextSlide()
                currentIndex--;
            } else {
                prevSlide()
                currentIndex++;
            }
        }
    }
}