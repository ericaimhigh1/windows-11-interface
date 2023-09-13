
// Windows 11 Calculator with Dark Mode, Slide-in Menu and Click to Copy - HTML, CSS & JavaScript
// Follow me on;
// Twitter: https://twitter.com/ericaimhigh
// Instagram: https://instagram.com/@ericaimhigh_
// Threads: https://threads.net/@ericaimhigh_


//WINDOW DRAGGING

// Call the dragElements function with the elements having the "drag" class
dragElements(document.querySelectorAll(".drag"));

function dragElements(elements) {
    // Loop through each element with the "drag" class
    elements.forEach(function (element) {
        dragElement(element);
    });
}

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    let header = elmnt.querySelector(".dragheader");

    if (header) {
        // if present, the header is where you move the DIV from:
        header.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}



//Bring the selected window to front
let windows = document.querySelectorAll(".parent");

windows.forEach(function (window) {
    window.addEventListener("click", function () {
        windows.forEach(function (otherWindow) {
            otherWindow.classList.remove("selected");
        });

        window.classList.add("selected");
    });
});





// Open New Program from Icon Shortcut, Hide to OR Unhide from Taskbar
let images = document.querySelectorAll(".task-icon");

// Add click event listeners to each image
images.forEach(function (image) {
    image.addEventListener("click", function () {
        // Get the name attribute of the clicked image
        let imageName = image.getAttribute("name");


        let targetParentDiv = document.getElementById(imageName);
        if (targetParentDiv) {
            if (targetParentDiv.classList.contains("default")) {
                targetParentDiv.classList.remove("default");



                //make it selected and remove selected from other parent divs
                let parentDivs = document.querySelectorAll(".parent");
                parentDivs.forEach(function (parentDiv) {
                    parentDiv.classList.remove("selected");
                });

                if (imageName !== "start") {
                    targetParentDiv.classList.add("selected");
                    let startMenu = document.querySelector(".start-menu");
                    if (!startMenu.classList.contains("default")) {
                        startMenu.classList.add("default");
                        startMenu.classList.remove("selected");
                    }
                }

                // if (imageName !== "start") {
                //     let startMenu = document.querySelector(".start-menu");
                //     if (!startMenu.classList.contains("default")) {
                //         startMenu.classList.add("default");
                //         startMenu.classList.remove("selected");
                //     }
                // }

            } else if (targetParentDiv.classList.contains("hide")) {
                targetParentDiv.classList.remove("hide");
            } else if (!targetParentDiv.classList.contains("default") && !targetParentDiv.classList.contains("hide")) {
                if (targetParentDiv.classList.contains("selected")) {
                    targetParentDiv.classList.add("hide");

                } else {

                    let startMenu = document.querySelector(".start-menu");
                    if (!startMenu.classList.contains("default")) {
                        startMenu.classList.add("default");
                        startMenu.classList.remove("selected");
                    } else {
                        let parentDivs = document.querySelectorAll(".parent");
                        parentDivs.forEach(function (parentDiv) {
                            parentDiv.classList.remove("selected");
                        });

                        if (imageName !== "start") {
                            targetParentDiv.classList.add("selected");

                        }
                    }




                }
            }

        }

    });
});




// Get Baterry Status

navigator.getBattery().then(function (battery) {
    batteryIcon = document.querySelector(".battery")

    if (battery.charging) {
        batteryIcon.classList.remove("fa-battery");
        batteryIcon.classList.add("fa-battery-bolt");
    } else {
        batteryIcon.classList.add("fa-battery");
        batteryIcon.classList.remove("fa-battery-bolt");
    }

    battery.addEventListener('chargingchange', function () {
        if (battery.charging) {
            batteryIcon.classList.remove("fa-battery");
            batteryIcon.classList.add("fa-battery-bolt");
        } else {
            batteryIcon.classList.add("fa-battery");
            batteryIcon.classList.remove("fa-battery-bolt");
        }
    });

    if (!battery.charging) {
        navigator.getBattery().then(function (battery) {
            const batteryPercentage = battery.level * 100;
            alert('Battery percentage: ' + batteryPercentage + '%');
            if (batteryPercentage <= 25) {
                batteryIcon.classList.remove("fa-battery");
                batteryIcon.classList.add("fa-battery-quarter");
            } else if (batteryPercentage <= 50) {
                batteryIcon.classList.remove("fa-battery");
                batteryIcon.classList.add("fa-battery-half");
            } else if (batteryPercentage <= 75) {
                batteryIcon.classList.remove("fa-battery");
                batteryIcon.classList.add("fa-battery-three-quarters");
            }
        });
    }

});



// Get Network Status
// let networkIcon = document.querySelector(".network")
// if (navigator.onLine) {
//     networkIcon.classList.remove("fa-light", "fa-globe");
//     networkIcon.classList.add("fa-regular", "fa-wifi");
//     alert('Device is online.');
// } else {
//     alert('Device is offline.');
// }

let networkIcon = document.querySelector(".network");

function updateNetworkStatus() {
    if (navigator.onLine) {
        networkIcon.classList.remove("fa-light", "fa-globe");
        networkIcon.classList.add("fa-regular", "fa-wifi");
    }
}

// Initial check
updateNetworkStatus();

// Listen for online and offline events
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);








//Dark Mode Switch
let themeBtn = document.querySelector(".theme");

let theme = localStorage.getItem("theme");
if (theme) {
    document.body.classList.add(theme);
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark")
    } else {
        localStorage.removeItem("theme")
    }
})



//FullScreen Switch
let fullScreenBtn = document.querySelector(".fullscreen");

fullScreenBtn.addEventListener("click", () => {
    if (!!document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.body.requestFullscreen();
    }
});



// TASKBAR

//Get Current Time
function updateCurrentTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12

    // Formatting to add leading zeros if needed
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let currentTimeString = hours + ":" + minutes + " " + ampm;
    document.querySelector(".time").textContent = currentTimeString;
}

// Update the time every second
setInterval(updateCurrentTime, 1000);

// Call the function immediately to display the time without a delay
updateCurrentTime();



//Get Current Date
function updateCurrentDate() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1; // Months are zero-based
    let day = now.getDate();

    // Formatting to add leading zeros if needed
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    let currentDate = day + "/" + month + "/" + year;
    document.querySelector(".date").textContent = currentDate;
}

// Call the function immediately to display the date
updateCurrentDate();




//To Keep Window on Top View
let onTopBtns = document.querySelectorAll(".on-top");


onTopBtns.forEach(onTopBtn => {
    onTopBtn.addEventListener("click", () => {
        let itemToTop = onTopBtn.closest(".parent");
        if (itemToTop) {
            itemToTop.classList.toggle("onTop");
        }
    });
});


//To Minimise Window to TaskBar
let hideBtns = document.querySelectorAll(".hide");


hideBtns.forEach(hideBtn => {
    hideBtn.addEventListener("click", () => {
        let itemToHide = hideBtn.closest(".parent");
        if (itemToHide) {
            itemToHide.classList.toggle("hide");
        }
    });
});


//To Resize WIndow
let resizeBtns = document.querySelectorAll(".resize");


resizeBtns.forEach(resizeBtn => {
    resizeBtn.addEventListener("click", () => {
        let itemToResize = resizeBtn.closest(".parent");
        itemToResize && itemToResize.classList.toggle("fullscreen");

    });
});


//To Close Window
let closeBtns = document.querySelectorAll(".close");

closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
        let itemToClose = closeBtn.closest(".parent");
        if (itemToClose) {
            itemToClose.classList.add("default");
            itemToClose.classList.remove("hide", "selected");
        }
    })
})



// CALCULATOR

// Calculator Menu Toggle

let menuToggle = document.querySelector('.menuBtn');
let menuToggle2 = document.querySelector('.menuBtn2');

let menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
})

menuToggle2.addEventListener("click", () => {
    menu.classList.toggle("active");
})


// Calculator Copy to Clipboard
let copyBtn = document.querySelector(".fa-copy");

let copyText = document.querySelector(".display");

copyText.select();
copyText.setSelectionRange(0, 99999);



copyBtn.addEventListener("click", () => {
    if (copyText.value === '0') {
        alert("Nothing to copy")
    } else {
        navigator.clipboard.writeText(copyText.value);
        alert("Copied: " + copyText.value)
    }
});


// Calculator History
let historyBtns = document.querySelectorAll(".historyBtn");
let historyTab = document.querySelector(".history");

historyBtns.forEach(historyBtn => {
    historyBtn.addEventListener("click", () => {
        historyTab.classList.toggle("active");
    });
});


// Calculator History Clear
let clearBtn = document.querySelector(".clearBtn");
let historyLists = document.querySelectorAll(".history-item")

historyLists.forEach(historyList => {
    clearBtn.addEventListener("click", () => {
        historyList.value = '';
    });
})





