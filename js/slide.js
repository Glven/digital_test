export function slider (id) {
    const sliderWrapper = document.getElementById(id);
    const sliderItems = sliderWrapper.children
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let itemsPerPage = getItemsPerPage();
    let currentIndex = 0;


    function updateSliderItemsStyles () {
        Array.from(sliderItems).forEach(si => {
            si.style.flex = '0 0 auto'
            si.style.width = `${98 / itemsPerPage}%`
        })
    }


    function getItemsPerPage() {
        if (window.innerWidth > 1200) return 5
        if (window.innerWidth > 768 && window.innerWidth <= 1200) return 4
        if (window.innerWidth > 600 && window.innerWidth <= 768) return 3
        if (window.innerWidth > 450 && window.innerWidth <= 600) return 2
        return 1
    }

    function updateSlider() {
        const itemWidth = sliderWrapper.children[0].offsetWidth
        sliderWrapper.style.transform = `translateX(-${currentIndex * itemWidth * itemsPerPage}px)`
    }

    function nextSlide() {
        const totalItems = sliderWrapper.children.length;
        const maxIndex = Math.ceil(totalItems / itemsPerPage) - 1
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

    window.addEventListener('resize', () => {
        itemsPerPage = getItemsPerPage()
        updateSliderItemsStyles()
        updateSlider()
    })
}