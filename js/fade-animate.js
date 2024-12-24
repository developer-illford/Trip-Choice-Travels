document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with the "animate" class
    var animatedElements = document.querySelectorAll('.animate');

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight * 3 / 4 &&
            rect.bottom >= 0
        );
    }

    function handleScroll() {
        animatedElements.forEach(function (el) {
            // Check if each element is in the viewport
            if (isElementInViewport(el)) {
                // Add the specific animation class to trigger the animation
                el.classList.add('fade-in');
            }
        });

        // Filter out elements that have been animated and remove them from the list
        animatedElements = Array.prototype.filter.call(animatedElements, function (el) {
            return !el.classList.contains('fade-in');
        });

        // If all elements have been animated, remove the scroll event listener
        if (animatedElements.length === 0) {
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // Add a scroll event listener to trigger the animation
    window.addEventListener('scroll', handleScroll);

    // Trigger the check on page load
    handleScroll();
});


//    counter animation
let hasScrolled = false;
let happyTravelersCounted = false;
let destinationsCounted = false;
let positiveReviewsCounted = false;


function startCounting(elementId, targetValue, showPlus = true) {
    const element = document.getElementById(elementId);
    let currentValue = 0;
    const increment = 5; // Adjust this value for speed
    const animationDuration = 2000; // Adjust this value for the animation duration

    function updateCount(timestamp) {
        if (!currentValue) currentValue = timestamp;

        const progress = (timestamp - currentValue) / animationDuration;
        const incrementValue = Math.ceil(targetValue * progress);

        if (incrementValue < targetValue) {
            element.textContent = showPlus ? `${incrementValue.toLocaleString()}+` : `${incrementValue.toLocaleString()}`;
            requestAnimationFrame((timestamp) => updateCount(timestamp));
        } else {
            element.textContent = showPlus ? `${targetValue.toLocaleString()}+` : `${targetValue.toLocaleString()}`;
        }
    }

    requestAnimationFrame((timestamp) => updateCount(timestamp));
}

function handleVisibility() {
    if (!hasScrolled) {
        // If user hasn't scrolled, set the flag to true and return
        hasScrolled = true;
        return;
    }

    const happyTravelersElement = document.getElementById("happyTravelersCount");
    const destinationsElement = document.getElementById("destinationsCount");
    const positiveReviewsElement = document.getElementById("positiveReviewsCount");

    if (!happyTravelersCounted && isInViewport(happyTravelersElement)) {
        startCounting("happyTravelersCount", 3500);
        happyTravelersCounted = true;
    }

    if (!destinationsCounted && isInViewport(destinationsElement)) {
        startCounting("destinationsCount", 10);
        destinationsCounted = true;
    }

    if (!positiveReviewsCounted && isInViewport(positiveReviewsElement)) {
        startCounting("positiveReviewsCount", 4.9, false);
        positiveReviewsCounted = true;
    }
}

function isInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight * 3 / 4 &&
        rect.bottom >= 0
    );
}

document.addEventListener("DOMContentLoaded", handleVisibility);
window.addEventListener("scroll", handleVisibility);

$(".hover").mouseleave(
    function () {
      $(this).removeClass("hover");
    }
);
    
    //  testimonial

    const reviewWrap = document.getElementById("reviewWrap");
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");
    const imgDiv = document.getElementById("imgDiv");
    const personName = document.getElementById("personName");
    const profession = document.getElementById("profession");
    const description = document.getElementById("description");
    const surpriseMeBtn = document.getElementById("surpriseMeBtn");
    const chicken = document.querySelector(".chicken");
    
    let isChickenVisible;
    
    let people = [
        {
            photo:
                'url("https://cdn.pixabay.com/photo/2022/01/23/08/29/indian-woman-6960117_640.jpg")',
            name: "Susan Thomas",
            profession: "Amazing experience",
            description:
                "The customer service at Trip Choice travels is outstanding. The staff was responsive, friendly, and knowledgeable. They promptly addressed all my queries and concerns, providing me with a sense of confidence and reassurance."
        },
    
        {
            photo:
                "url('https://cdn.pixabay.com/photo/2022/01/23/08/29/indian-woman-6960124_640.jpg')",
            name: "Anna ",
            profession: "A Fantastic Malaysian Adventure",
            description:
                "I am delighted to share my outstanding experience with Trip Choice travels. From the moment I contacted them to the end of my journey, the level of service, attention to detail, and overall quality of the trip exceeded my expectations." },
    
        {
            photo:
                "url('https://cdn.pixabay.com/photo/2019/03/15/10/21/fashion-4056729_640.jpg')",
            name: "Simon  Johnson",
            profession: "Amazing experience",
            description:
                "The customer service at Trip Choice travels is outstanding. The staff was responsive, friendly, and knowledgeable. They promptly addressed all my queries and concerns, providing me with a sense of confidence and reassurance.   "     },
   
    ];
    
    imgDiv.style.backgroundImage = people[0].photo;
    personName.innerText = people[0].name;
    profession.innerText = people[0].profession;
    description.innerText = people[0].description;
    let currentPerson = 0;
    
    //Select the side where you want to slide
    function slide(whichSide, personNumber) {
        let reviewWrapWidth = reviewWrap.offsetWidth + "px";
        let descriptionHeight = description.offsetHeight + "px";
        //(+ or -)
        let side1symbol = whichSide === "left" ? "" : "-";
        let side2symbol = whichSide === "left" ? "-" : "";
    
        let tl = gsap.timeline();
    
        if (isChickenVisible) {
            tl.to(chicken, {
                duration: 0.4,
                opacity: 0
            });
        }
    
        tl.to(reviewWrap, {
            duration: 0.4,
            opacity: 0,
            translateX: `${side1symbol + reviewWrapWidth}`
        });
    
        tl.to(reviewWrap, {
            duration: 0,
            translateX: `${side2symbol + reviewWrapWidth}`
        });
    
        setTimeout(() => {
            imgDiv.style.backgroundImage = people[personNumber].photo;
        }, 400);
        setTimeout(() => {
            description.style.height = descriptionHeight;
        }, 400);
        setTimeout(() => {
            personName.innerText = people[personNumber].name;
        }, 400);
        setTimeout(() => {
            profession.innerText = people[personNumber].profession;
        }, 400);
        setTimeout(() => {
            description.innerText = people[personNumber].description;
        }, 400);
    
        tl.to(reviewWrap, {
            duration: 0.4,
            opacity: 1,
            translateX: 0
        });
    
        if (isChickenVisible) {
            tl.to(chicken, {
                duration: 0.4,
                opacity: 1
            });
        }
    }
    
    function setNextCardLeft() {
        if (currentPerson === 2) {
            currentPerson = 0;
            slide("left", currentPerson);
        } else {
            currentPerson++;
        }
    
        slide("left", currentPerson);
    }
    
    function setNextCardRight() {
        if (currentPerson === 0) {
            currentPerson = 2;
            slide("right", currentPerson);
        } else {
            currentPerson--;
        }
    
        slide("right", currentPerson);
    }
    
    leftArrow.addEventListener("click", setNextCardLeft);
    rightArrow.addEventListener("click", setNextCardRight);
    
   
    
    window.addEventListener("resize", () => {
        description.style.height = "100%";
    });
    
//  testimonial section ends

// return to top
      // When the user scrolls down 20px from the top of the document, show the "scroll to top" button
  window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("scroll-to-top").style.display = "block";
    } else {
      document.getElementById("scroll-to-top").style.display = "none";
    }
  };

  // When the user clicks on the "scroll to top" button, scroll to the top of the document
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // return to top ends here

//   custompackage form

function openForm() {
    var overlay = document.getElementById("customPackageOverlay");
    overlay.style.display = "flex";
  }

  function closeForm() {
    document.getElementById("customPackageOverlay").style.display = "none";
  }