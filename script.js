const colors = [
    "#ff7a00",
    "#ff5eb3",
    "#7357ffff",
    "#9327ff",
    "#00bee8",
    "#1fd7c1",
    "#ff745e",
    "#ffb073ff",
    "#fc71ff",
    "#ffc701",
    "#0038ff",
    "#7Ae229",
    "#ffe62b",
    "#ff3d00",
    "#ffa800", 
]

let colorIndex = 0;


function init() {
    loadSidebar();
    loadNavbar();
    loadMobileFooter();
    highlightActiveLink();
    // loadFirebaseData("user", user);
    // loadFirebaseData("contacts", contacts);
}


/**
 *  Loads and renders the sidebar login template into the sidebar container.
 *
 *  @function loadSidebar
 *  @returns {void} - This function does not return a value.
 */
function loadSidebar() {
    const sidebar = document.getElementById('id_sidebar');
    sidebar.innerHTML = "";
    let user = JSON.parse(localStorage.getItem('activeUser'));

    if (user) {
        sidebar.innerHTML = sidebarLoginTemplate();
    } else {
        sidebar.innerHTML = sidebarLogOffTemplate();
    }
}

/**
 *  Loads and renders the navbar template into the navbar container.
 *
 *  @function loadNavbar
 *  @returns {void} - This function does not return a value.
 */
function loadNavbar() {
    const navbar = document.getElementById('id_navbar');
    navbar.innerHTML = "";

    let user = JSON.parse(localStorage.getItem('activeUser'));
    
    if (user) {
        navbar.innerHTML = navbarTemplate(user.initials);
    } else {
        navbar.innerHTML = navbarLogOffTemplate();
    }
}


/**
 *  Loads and renders the mobile footer template for logged-in users.
 *
 *  @function loadMobileFooter
 *  @returns {void} - This function does not return a value.
 */
function loadMobileFooter() {
    const footer = document.getElementById('mobile_footer');
    if (!footer) return;

    footer.innerHTML = "";
    
    let user = JSON.parse(localStorage.getItem('activeUser'));

    if (user) {
        footer.innerHTML = mobileFooterLoginTemplate();
    } else {
        footer.innerHTML = mobileFooterLogoffTemplate();
    }
}


/**
 *  Loads and renders the summary content template into the main content area.
 *
 *  @function loadSummary
 *  @returns {void} - This function does not return a value.
 */
function loadSummary() {
    let user = JSON.parse(localStorage.getItem('activeUser'));
    let greetingText = getGreeting(); 
    let userName = "";

    if (user && user.name !== "Guest") {
        greetingText = greetingText + ","; 
        userName = user.name;
    } else {
        greetingText = greetingText + "!";
        userName = ""; 
    }

    const summaryContent = document.getElementById('id_content_summary');
    summaryContent.innerHTML = summaryContentTemplate(userName, greetingText);
}


/**
 *  Determines the greeting based on the current time of day.
 */
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}


/**
 *  Loads and renders the log-off sidebar template into the sidebar container.
 *
 *  @function loadLogOffSidebar
 *  @returns {void} - This function does not return a value.
 */
function loadLogOffSidebar() {
    const sidebar = document.getElementById('id_sidebar');
    sidebar.innerHTML = "";
    sidebar.innerHTML = sidebarLogOffTemplate();
}


/**
 *  Toggles the visibility of the navbar menu.
 *  Adds or removes the CSS class "d_none" to show or hide the menu.
 *
 *  @function toggleMenu
 *  @returns {void} - This function does not return a value.
 */
function toggleMenu() {
    document.getElementById("menu_navbar").classList.toggle("d_none");
}


/**
 *  Adds a click listener to all <dialog> elements on the page.
 *  Closes the dialog when the user clicks on the dialog backdrop (outside the dialog content) and clears all contact input fields.
 *
 *  @event click
 *  @returns {void} - This function does not return a value.
 */
document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {

        if (event.target === dialog) {
            dialog.close();
            clearContactInputs();
        }
    });
});


/**
 *  Navigates to the previously visited page in the browser history.
 *
 *  @function goBack
 *  @returns {void} - This function does not return a value.
 */
function goBack() {
    window.history.back();
}


/**
 *  Returns the next color from the predefined color list.
 *  Cycles through the colors array sequentially and starts again from the beginning once the end is reached.
 *
 *  @function getRandomColor
 *  @returns {string} - A color value from the colors array.
 */
function getRandomColor(){
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}


/**
 *  Ensures that a date input always has the year 2026, while allowing free selection of month and day.
 * 
 *  @event DOMContentLoaded
 *  @returns {void} - This handler does not return a value.
 */
window.addEventListener('DOMContentLoaded', () => {
    const dueDateInput = document.getElementById('id_due_date_add_task');
    if (!dueDateInput) return;

    dueDateInput.addEventListener('input', () => {
        const value = dueDateInput.value;
        if (!value) return;

        const parts = value.split('-');
        if (parts.length === 3 && parts[0] !== '2026') {
            parts[0] = '2026';
            dueDateInput.value = parts.join('-');
        }
    });
});


// /**
//  *  Highlights the active sidebar or navbar link based on the current URL.
//  *  Compares each link's href with the current window location and adds the "active" class to the matching link.
//  * 
//  *  @function highlightActiveLink
//  *  @returns {void} - This function does not return a value.
//  */
// function highlightActiveLink() {
//     const links = document.querySelectorAll('.link_active');
//     const currentPath = window.location.pathname;

//     links.forEach(link => {
//         const linkPath = link.getAttribute('href').replace('./', '');
//         if (currentPath.includes(linkPath)) {
//             link.classList.add('active');
//         }
//     });
// }


/**
 * Highlights the active sidebar link based on the current page path.
 *
 * @function highlightActiveLink
 */
function highlightActiveLink() {
    const links = document.querySelectorAll('.link_active');
    const currentPath = window.location.pathname;

    links.forEach(link => {
        const linkPath = link.getAttribute('href').replace('./', '');
        const icon = link.querySelector('.icon_sidebar'); 

        if (currentPath.includes(linkPath)) {
            link.classList.add('active');
            
        
            if (icon) { 
                if (linkPath === 'summary.html') {
                    icon.src = './assets/img/navbar_summary_white_mobile.svg';
                } else if (linkPath === 'add_task.html') {
                    icon.src = './assets/img/add_task_white.svg';
                } else if (linkPath === 'board.html') {
                    icon.src = './assets/img/navbar_board_white_mobile.svg';
                } else if (linkPath === 'contacts.html') {
                    icon.src = './assets/img/navbar_contacts_white_mobile.svg';
                }
            }
        }
    });
}

/**
 *  Displays a toast notification for a short duration.
 *  Adds the CSS class "show" to the message box element to make it visible and automatically removes the class after 800 milliseconds.
 *
 *  @function showToast
 *  @returns {void} - This function does not return a value.
 */
function showToast() {
    const toast = document.getElementById("msgBox");

    toast.classList.add("show");
    setTimeout(function() {
        toast.classList.remove("show");
    }, 800);
}


/**
 *  Limits the number of characters in an input or textarea element.
 *
 *  @param {HTMLInputElement|HTMLTextAreaElement} element - The input or textarea element to limit.
 *  @param {number} maxLength - The maximum number of characters allowed.
 */
function limitInputLength(element, maxLength) {
    if (element.value.length > maxLength) {
        element.value = element.value.slice(0, maxLength);
    }
}


/**
 *  Redirects the user to the board page.
 *
 *  @function goToBoardPage
 *  @returns {void} - This function does not return a value.
 */
function goToBoardPage() {
    window.location.href = "board.html";
}


/**
 *  Closes all dropdown menus when clicking outside of them.
 *
 *  @event click
 *  @param {MouseEvent} event - The click event object.
 */
document.addEventListener('click', function (event) {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            const list = dropdown.querySelector('ul');
            if (list) {
                list.style.display = 'none';
            }
        }
    });
});