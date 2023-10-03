var question = 1;
var submission = "";
var fullAnswer = "";
const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

function displayImage(){
    if (question == 1){
        displayQ1();
    }
    if (question == 2){
        displayQ2();
    }
}
function displayQ1(){
    document.getElementById("opt1").src = "color-images/red.jpg";
    
}
function displayQ2(){
    resetBorder();
    document.getElementById("opt1").src = "activity-images/cooking.jpg";
    document.getElementById("opt2").src = "activity-images/singing.jpg";
    document.getElementById("opt3").src = "activity-images/gardening.jpg";
    document.getElementById("opt4").src = "activity-images/painting.jpg";
    document.getElementById("opt5").src = "activity-images/sports.jpg";
    document.getElementById("opt6").src = "activity-images/dancing.jpg";
    document.getElementById("opt1").alt = "cooking";
    document.getElementById("opt2").alt = "singing";
    document.getElementById("opt3").alt = "gardening";
    document.getElementById("opt4").alt = "painting";
    document.getElementById("opt5").alt = "sports";
    document.getElementById("opt6").alt = "dancing";

}
document.getElementById("submitbutton").addEventListener('click', function() {
    fullAnswer += " " + submission;
    question++;
    displayImage();
    document.getElementById("answer").innerHTML = fullAnswer;
    submission = "";
});

function resetBorder(){
    document.getElementById("opt1").style.border = "";
    document.getElementById("opt2").style.border = "";
    document.getElementById("opt3").style.border = "";
    document.getElementById("opt4").style.border = "";
    document.getElementById("opt5").style.border = "";
    document.getElementById("opt6").style.border = "";
}

//Image event listeners please fix this code
// Select all elements with the "option" class
var options = document.querySelectorAll(".option");

// Define a function to reset the border for all options
function resetBorder() {
  options.forEach(function(option) {
    option.style.border = "";
  });
}

// Add click event listeners to each option
options.forEach(function(option) {
  option.addEventListener("click", function() {
    resetBorder();
    option.style.border = "5px solid green";
    submission = option.getAttribute("alt");
  });
});
