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

// For mobile menu
document.addEventListener('DOMContentLoaded', function () {
  const menuIconOpen = document.getElementById('menuIconOpen');
  const menuIconClose = document.getElementById('menuIconClose');
  const mobileMenu = document.getElementById('mobileMenu');

  // Event listener for opening the mobile menu
  menuIconOpen.addEventListener('click', function () {
    mobileMenu.style.setProperty('display', 'flex', 'important'); // Set mobile menu to flex with !important
    document.body.classList.add('no-scroll'); // Disable scrolling
  });

  // Event listener for closing the mobile menu
  menuIconClose.addEventListener('click', function () {
    mobileMenu.style.display = 'none'; // Hide the mobile menu
    document.body.classList.remove('no-scroll'); // Enable scrolling
  });
});

// For resizing the hero slider to fit a 59:30 ratio (design size: 1180 x 600)
function heroSliderResizer() {
  const heroSliderElement = document.getElementById('heroSlider');
  const viewportWidth = window.innerWidth;
  const width = heroSliderElement.clientWidth;
  let height;
  if (viewportWidth < 640) {
    height = width; // 1:1 on mobile
  } else {
    height = width * 0.5084; // Remain 59:30 ratio on desktop
  }

  heroSliderElement.style.height = height + 'px';
  heroSliderInit();
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
          rgba(0,0,0,0.3) 80%, 
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

// For 我們的服務's Client logos
document.addEventListener('DOMContentLoaded', function () {
  const imageList = [
    // CHANGE HERE: Add more images list here below
    'https://i.imgur.com/6WTAEzP.png',
    'https://i.imgur.com/oJ7Nc2N.jpeg',
    'https://i.imgur.com/tM0xd07.jpeg',
    'https://i.imgur.com/MTNHmm3.png',
    'https://i.imgur.com/58Yqllo.png',
    'https://i.imgur.com/poU6TUJ.jpeg',
    // below from https://www.schooland.hk/ss/school-badge
    'https://www.schooland.hk/img/ssb/ablmcc-badge.jpg',
    'https://www.schooland.hk/img/ssb/ats-badge.jpg',
    'https://www.schooland.hk/img/ssb/chms-badge.jpg',
    'https://www.schooland.hk/img/ssb/lstc-badge.jpg',
    'https://www.schooland.hk/img/ssb/hebron-badge.jpg',
    'https://www.schooland.hk/img/ssb/blmcss-badge.jpg',
    'https://www.schooland.hk/img/ssb/bwlss-badge.jpg',
    'https://www.schooland.hk/img/ssb/belilios-badge.jpg',
    'https://www.schooland.hk/img/ssb/bethel-badge.jpg',
    'https://www.schooland.hk/img/ssb/bhjs-badge.jpg',
    'https://www.schooland.hk/img/ssb/bfhmc-badge.jpg',
    'https://www.schooland.hk/img/ssb/bhnkc-badge.jpg',
    'https://www.schooland.hk/img/ssb/bhscmc-badge.jpg',
    'https://www.schooland.hk/img/ssb/bkkss-badge.jpg',
    'https://www.schooland.hk/img/ssb/bmf-badge.jpg',
    'https://www.schooland.hk/img/ssb/bstc-badge.jpg',
    'https://www.schooland.hk/img/ssb/bshlmc-badge.jpg',
    'https://www.schooland.hk/img/ssb/bthc-badge.jpg',
    'https://www.schooland.hk/img/ssb/btkchc-badge.jpg',
    'https://www.schooland.hk/img/ssb/bwflc-badge.jpg',
    'https://www.schooland.hk/img/ssb/bwwtc-badge.jpg',
    'https://www.schooland.hk/img/ssb/byknmc-badge.jpg',
    'https://www.schooland.hk/img/ssb/canossa-badge.jpg',
    'https://www.schooland.hk/img/ssb/ccm-badge.jpg',
    'https://www.schooland.hk/img/ssb/ccvc-badge.jpg',
    'https://www.schooland.hk/img/ssb/ccym-badge.jpg',
    'https://www.schooland.hk/img/ssb/cfs-badge.jpg',
    'https://www.schooland.hk/img/ssb/cmos-badge.jpg',
    'https://www.schooland.hk/img/ssb/csjss-badge.jpg',
    'https://www.schooland.hk/img/ssb/tmmarden-badge.jpg',
    'https://www.schooland.hk/img/ssb/cwcc-badge.jpg',
    'https://www.schooland.hk/img/ssb/cys-badge.jpg',
    'https://www.schooland.hk/img/ssb/calfss-badge.jpg',
    'https://www.schooland.hk/img/ssb/cbt-badge.jpg',
    'https://www.schooland.hk/img/ssb/cdgfss-badge.jpg',
    'https://www.schooland.hk/img/ssb/chw-badge.jpg',
    'https://www.schooland.hk/img/ssb/cpu-badge.jpg',
    'https://www.schooland.hk/img/ssb/carmelss-badge.jpg',
    'https://www.schooland.hk/img/ssb/chuenyuen-badge.jpg',
  ];

  const clientLogoImages = document.querySelectorAll('#clientLogo img');
  let usedImages = []; // Track used images

  function getRandomImage() {
    if (imageList.length === 0) {
      // Reset the imageList when all images have been used
      imageList.push(...usedImages);
      usedImages = [];
    }

    // Get a random index and select image
    const randomIndex = Math.floor(Math.random() * imageList.length);
    const selectedImage = imageList[randomIndex];

    // Move the selected image to usedImages and remove it from imageList
    usedImages.push(selectedImage);
    imageList.splice(randomIndex, 1);

    return selectedImage;
  }

  // Function to get a random interval within a defined range
  function getRandomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function changeImage(img) {
    const change = () => {
      // Pick a new random image
      const newImage = getRandomImage();

      // Apply fade out effect
      img.classList.remove('fade-in');
      img.classList.add('fade');

      setTimeout(() => {
        img.src = newImage;

        // After changing the image, apply fade in effect
        img.classList.remove('fade');
        img.classList.add('fade-in');
      }, 1000); // Delay for fade out to complete before changing the src

      // Set a new random interval for the next change
      const newInterval = getRandomInterval(3000, 20000); // Random interval between 3s and 20s
      setTimeout(change, newInterval); // Change the image again after the new interval
    };

    // Perform the first change immediately
    change();
  }

  // Initialize the changeImages function for each image
  clientLogoImages.forEach((img) => {
    img.classList.add('fade-in'); // Initialize fade-in effect for the first load
    changeImage(img);
  });
});

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

// For NFC page slider Tabs
function setupRadioToggle() {
  // Get the radio buttons
  const radio1 = document.getElementById('radio-1');
  const radio2 = document.getElementById('radio-2');

  // Add event listeners for radio 1 and radio 2
  radio1.addEventListener('click', function () {
    // When radio 1 is clicked, show all case-1 elements and hide all case-2 elements
    toggleDisplay('.case-1', true);
    toggleDisplay('.case-2', false);
  });

  radio2.addEventListener('click', function () {
    // When radio 2 is clicked, hide all case-1 elements and show all case-2 elements
    toggleDisplay('.case-1', false);
    toggleDisplay('.case-2', true);
  });

  // Function to toggle display based on class name
  function toggleDisplay(selector, show) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (show) {
        // Check if the element has the class "abc"
        if (element.classList.contains('grouped-list')) {
          element.style.display = 'flex';
        } else if (element.tagName.toLowerCase() === 'span') {
          element.style.display = 'inline-block';
        } else {
          element.style.display = 'block';
        }
      } else {
        element.style.display = 'none';
      }
    });
  }

  // Initialize by simulating a click on the checked radio button
  if (radio1.checked) {
    radio1.click();
  } else if (radio2.checked) {
    radio2.click();
  }
}

setupRadioToggle();

// For resizing the YouTube Player to fit a 16:9 ratio
function ytPlayerResizer() {
  const ytPlayer = document.getElementById('yt-player');
  if (ytPlayer) {
    // Ensure the element exists
    const width = ytPlayer.clientWidth;
    let height;
    height = width * 0.5625; // Maintain 16:9 aspect ratio
    ytPlayer.style.height = height + 'px';
  }
}
ytPlayerResizer();
window.addEventListener('resize', ytPlayerResizer);
