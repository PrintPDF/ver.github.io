(function() {
    const images = Array.from(document.getElementsByClassName("carousel__img"));
    const totalImages = images.length;
    let currentImageIndex = 0;
    let intervalId = null;

    const container = document.getElementById('carousel__container');
    const dotsContainer = document.getElementById('dotsContainer');

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalImages; i++) {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.dataset.index = i;
            dot.addEventListener('click', function() {
                goToImage(parseInt(this.dataset.index));
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentImageIndex);
        });
    }

    function goToImage(index) {
        if (index < 0) index = totalImages - 1;
        if (index >= totalImages) index = 0;
        images.forEach((img) => {
            img.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        });
        images.forEach((img) => {
            img.style.transform = `translateX(${-index * 100}%)`;
        });
        currentImageIndex = index;
        updateDots();
    }

    function showNextImage() {
        goToImage(currentImageIndex + 1);
    }

    function startCarousel() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(showNextImage, 5000);
    }

    function stopCarousel() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function init() {
        createDots();
        images.forEach((img) => {
            img.style.transition = "none";
            img.style.transform = "translateX(0)";
        });
        void images[0].offsetHeight;
        images.forEach((img) => {
            img.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        });

        if (container) {
            container.addEventListener('mouseenter', stopCarousel);
            container.addEventListener('mouseleave', startCarousel);
        }

        startCarousel();
    }

    if (totalImages > 1) {
        init();
    } else {
        images.forEach(img => img.style.transform = "translateX(0)");
    }
})();