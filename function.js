function handleLoad() {
  copyrightYear();
  heroSliderInit();
  heroSliderAutoPlay();
  handleResize();
}

function handleResize() {
  heroSliderResizer();
}

window.onload = handleLoad;
window.onresize = handleResize;

// For footer copyright year
function copyrightYear() {
  const thisYear = document.getElementById('thisYear');
  const year = new Date().getFullYear();

  thisYear.innerHTML = year;
}

// For resizing the hero slider to fit a 59:30 ratio (design size: 1180 x 600)
function heroSliderResizer() {
  const heroSliderElement = document.getElementById('heroSlider');
  const width = heroSliderElement.clientWidth;
  const height = width * 0.5084;

  heroSliderElement.style.height = height + 'px';
}

// For initializing the hero slider with 4 slides and their respective background images
function heroSliderInit() {
  const slideURLs = [
    'https://i.imgur.com/6EHdAre.jpeg', // <-- CHANGE HERE: Slide 1 BG Image URL
    'https://i.imgur.com/tGkafIu.jpeg', // <-- CHANGE HERE: Slide 2 BG Image URL
    'https://i.imgur.com/UqKso0l.jpeg', // <-- CHANGE HERE: Slide 3 BG Image URL
    'https://i.imgur.com/XbQ6Y91.jpeg', // <-- CHANGE HERE: Slide 4 BG Image URL
  ];

  const viewportWidth = window.innerWidth;

  for (let i = 1; i <= slideURLs.length; i++) {
    const slide = document.getElementById(`slide${i}`);
    const slideURL = slideURLs[i - 1];

    // Set the background image and gradient for each slide
    if (viewportWidth < 640) {
      // CHANGE HERE: Background style for viewport width below 640px
      slide.style.background = `
          linear-gradient(
          180deg, 
          rgba(0,0,0,0.5) 20%, 
          rgba(0,0,0,0.2) 80%, 
          rgba(0,0,0,0) 100%), 
          url('${slideURL}'
          )`;
    } else {
      //  CHANGE HERE: Change the gradient style
      slide.style.background = `
          linear-gradient(
          90deg, 
          rgba(0,0,0,0.5) 0%, 
          rgba(0,0,0,0) 50%), 
          url('${slideURL}'
          )`;
    }

    slide.style.backgroundSize = 'cover';
  }
}

// For slider controls
const slideButtons = document.querySelectorAll('.slide-btn');

slideButtons.forEach((button) => {
  button.addEventListener('click', function () {
    const slideValue = this.getAttribute('data-slide');

    // Handle button active state
    slideButtons.forEach((btn) => btn.classList.remove('active'));
    this.classList.toggle('active');

    // Handle slide activation
    const heroSliderElement = document.getElementById('heroSlider');
    const slides = heroSliderElement.querySelectorAll('.slide');

    // Deactivate others slides
    slides.forEach((slide) => slide.classList.remove('active'));

    // Activate the selected slide
    slides[slideValue - 1].classList.add('active');
  });
});

// Automatically play the hero slider by cycling through slides
function heroSliderAutoPlay() {
  const timeInterval = 4000; // <-- CHANGE HERE: Set time interval for auto-play
  const heroSliderElement = document.getElementById('heroSlider');
  const slides = heroSliderElement.querySelectorAll('.slide');
  const slideButtons = document.querySelectorAll('.slide-btn');
  let currentSlide = 1; // Initialize the "current slide" index

  // Activate the first slide
  let interval = setInterval(function () {
    slides[currentSlide - 1].classList.remove('active');
    slideButtons[currentSlide - 1].classList.remove('active');
    currentSlide++;

    // Loop again after last slide
    if (currentSlide > slides.length) {
      currentSlide = 1;
    }

    // Activate the current slide and button
    slides[currentSlide - 1].classList.add('active');
    slideButtons[currentSlide - 1].classList.add('active');
  }, timeInterval);

  // Event listener to clear the auto-play interval when mouse enters the slider
  heroSliderElement.addEventListener('mouseenter', function () {
    clearInterval(interval);
  });

  // Event listener to restart auto-play interval when mouse leaves the slider
  heroSliderElement.addEventListener('mouseleave', function () {
    interval = setInterval(function () {
      // Deactivate the current slide and button
      slides[currentSlide - 1].classList.remove('active');
      slideButtons[currentSlide - 1].classList.remove('active');

      // Increment the current slide index
      currentSlide++;

      // Loop again after last slide
      if (currentSlide > slides.length) {
        currentSlide = 1;
      }

      // Activate the next slide and button
      slides[currentSlide - 1].classList.add('active');
      slideButtons[currentSlide - 1].classList.add('active');
    }, timeInterval);
  });
}

// For 精選案例's tooltips
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.case-content').forEach((content) => {
    // Trim leading and trailing spaces from the <p> content
    content.textContent = content.textContent.trim();

    content.addEventListener('mouseenter', (event) => {
      // Check if viewport is larger than or equal to 768px
      if (window.innerWidth < 768) {
        return; // Exit the function if viewport is smaller than 768px
      }

      // Attempt to get line height or use a default
      const computedStyle = getComputedStyle(content);
      let lineHeight = parseFloat(computedStyle.lineHeight);

      // If line-height is 'normal', fallback to a default pixel value
      if (isNaN(lineHeight)) {
        lineHeight = parseFloat(computedStyle.fontSize) * 1.2; // A common approximation
      }

      const elementHeight = content.scrollHeight;
      const lines = Math.round(elementHeight / lineHeight);

      if (lines > 4) {
        // Display tooltip if text spans more than 4 lines

        // Create and append the tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = content.textContent;

        document.body.appendChild(tooltip);

        // Function to update tooltip position
        const updatePosition = (e) => {
          tooltip.style.left = `${e.pageX + 10}px`; // Offset to avoid cursor overlap
          tooltip.style.top = `${e.pageY + 10}px`;
        };

        updatePosition(event); // Set initial position
        tooltip.style.display = 'block';

        content.addEventListener('mousemove', updatePosition);

        content.addEventListener(
          'mouseleave',
          () => {
            tooltip.remove(); // Cleanup on mouse leave
            content.removeEventListener('mousemove', updatePosition);
          },
          { once: true }
        );
      }
    });
  });
});
