window.addEventListener('load', function () {
    setTimeout(function () {
      document.getElementById('preloader').style.display = 'none';
      document.querySelector('.content').style.display = 'block';
      document.body.style.overflowY = 'auto'; // Enable vertical scrolling only
      document.body.style.overflowX = 'hidden'; // Disable horizontal scrolling
    }, 2000);
  });
  



// Cache selectors for better performance
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');
const sliders = document.querySelectorAll(".cards");
        
// Toggle dropdown menu function
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

  
// Intersection Observer setup
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle('show', entry.isIntersecting);
    });
});

// Observe hidden elements
const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right');
hiddenElements.forEach((el) => observer.observe(el));





// Slider functionality
sliders.forEach((slider) => {
    let isDown = false;
    let startX;
    let scrollLeft;
    let sliderItems;

    slider.addEventListener("pointerdown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("pointerleave", () => {
        isDown = false;
        slider.classList.remove("active");
    });

    slider.addEventListener("pointerup", () => {
        isDown = false;
        slider.classList.remove("active");
    });

    slider.addEventListener("pointermove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;

        handleImageClarity(slider);
    });

    slider.addEventListener("wheel", (e) => {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
        
        handleImageClarity(slider);
    }, { passive: false });

    function handleImageClarity(slider) {
        sliderItems = sliderItems || slider.querySelectorAll("li");
        sliderItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const isCenter = rect.left <= (window.innerWidth / 2) && rect.right >= (window.innerWidth / 2);
            if (isCenter) {
                sliderItems.forEach((item) => {
                    item.classList.remove("center");
                });
                item.classList.add("center");
            }
        });
    }
});
    