// JS CODE FOR SIDE NAVIGATION // JS CODE FOR SIDE NAVIGATION // JS CODE FOR SIDE NAVIGATION
function showSidebar(){
    const sidebar = document.querySelector(".sidebar")
    sidebar.style.display = "flex"
}

function hideSidebar(){
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none"
}









// JS CODE FOR IMAGE SLIDE (PROFILE) // JS CODE FOR IMAGE SLIDE (PROFILE) // JS CODE FOR IMAGE SLIDE (PROFILE)
const pics = document.querySelectorAll(".pic");
const dots = document.querySelectorAll(".dot");
let slideShow;

function getCurrentPicNumber() {
  // the current pic is the one whose CSS property "left" equals "0px"
  for (let i = 1; i <= 4; i++) {
    let pic = document.getElementById("pic" + i);
    let leftCssString = getComputedStyle(pic).getPropertyValue("left");
    if (leftCssString === "0px") {
      return i;
    }
  }
}

function displayPic(newNum) {
  //validate input: it must be between 1 and 4
  if (newNum < 1 || newNum > 4) return;
  //calculate distance
  const distance = newNum - getCurrentPicNumber();
  //shift all pics by the distance
  for (let i = 1; i <= 4; i++) {
    let pic = document.getElementById("pic" + i);
    let leftCssString = getComputedStyle(pic).getPropertyValue("left");
    let leftCssNum = Number(leftCssString.slice(0, leftCssString.length - 2));
    pic.style.left = leftCssNum - distance * 1000 + "px";
  }
  document.getElementById("dot" + newNum).checked = true;
}

function moveLeft() {
  const currentPicNumber = getCurrentPicNumber();
  if (currentPicNumber > 1) {
    displayPic(currentPicNumber - 1);
  } else {
    displayPic(4);
  }
}

function moveRight() {
  const currentPicNumber = getCurrentPicNumber();
  if (currentPicNumber < 4) {
    displayPic(currentPicNumber + 1);
  } else {
    displayPic(1);
  }
}

function startShow() {
  slideShow = setInterval(() => {
    moveRight();
  }, 2000);
}

function stopShow() {
  clearInterval(slideShow);
}

document.querySelector("#leftArrow").addEventListener("click", () => {
  moveLeft();
});
document.querySelector("#rightArrow").addEventListener("click", () => {
  moveRight();
});
document.querySelector("#dot1").addEventListener("click", () => {
  displayPic(1);
});
document.querySelector("#dot2").addEventListener("click", () => {
  displayPic(2);
});
document.querySelector("#dot3").addEventListener("click", () => {
  displayPic(3);
});
document.querySelector("#dot4").addEventListener("click", () => {
  displayPic(4);
});
document.querySelector("#play").addEventListener("click", () => {
  startShow();
});
document.querySelector("#stop").addEventListener("click", () => {
  stopShow();
});

startShow();





// JS CODE FOR COUNTUP // JS CODE FOR COUNTUP // JS CODE FOR COUNTUP // JS CODE FOR COUNTUP
// How long you want the animation to take, in ms
const animationDuration = 2000;
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
const frameDuration = 1000 / 60;
// Use that to calculate how many frames we need to complete the animation
const totalFrames = Math.round( animationDuration / frameDuration );
// An ease-out function that slows the count as it progresses
const easeOutQuad = t => t * ( 2 - t );

// The animation function, which takes an Element
const animateCountUp = el => {
	let frame = 0;
	const countTo = parseInt( el.innerHTML, 10 );
	// Start the animation running 60 times per second
	const counter = setInterval( () => {
		frame++;
		// Calculate our progress as a value between 0 and 1
		// Pass that value to our easing function to get our
		// progress on a curve
		const progress = easeOutQuad( frame / totalFrames );
		// Use the progress value to calculate the current count
		const currentCount = Math.round( countTo * progress );

		// If the current count has changed, update the element
		if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
			el.innerHTML = currentCount;
		}

		// If we’ve reached our last frame, stop the animation
		if ( frame === totalFrames ) {
			clearInterval( counter );
		}
	}, frameDuration );
};

// Run the animation on all elements with a class of ‘countup’
const runAnimations = () => {
	const countupEls = document.querySelectorAll( '.countup' );
	countupEls.forEach( animateCountUp );
};







// JS FOR FORM SUBMISSION TO EMAIL // JS FOR FORM SUBMISSION TO EMAIL // JS FOR FORM SUBMISSION TO EMAIL
const form = document.querySelector(".form-and-contactinfo form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${message.value}`;

    Email.send({
        SecureToken : "b8121448-f881-491b-98df-b997b369e860",
        To : 'alexoseni.as@gmail.com',
        From : "alexoseni.as@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if (message == "OK") {
            Swal.fire({
                title: "Success!",
                text: "Message sent Successfully!",
                icon: "success"
            });
        }
      }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
            errorTxtEmail.innerText = "Enter a valid email address";
        }
        else {
            errorTxtEmail.innerText = "Email Address can't be blank";
        }
    }
    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")) {
       
        sendEmail();

        form.reset();
        return false
    }

});
