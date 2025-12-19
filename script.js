const colors = [
    "#ff7a00",
    "#ff5eb3",
    "#6e52ff",
    "#9327ff",
    "#00bee8",
    "#1fd7c1",
    "#ff745e",
    "#ffa35e",
    "#fc71ff",
    "#ffc701",
    "#0038ff",
    "#c3ff2b",
    "#ffe62b",
    "#ff4646",
    "#ffbb2b", 
]

let colorIndex = 0;


function init() {
    loadSidebar();
    loadNavbar();
    loadMobileFooter();
     highlightActiveLink();
    // // loadFirebaseData("user", user);
    // loadFirebaseData("contacts", contacts);
}


/**
 *  Loads the sidebar template. 
 */
function loadSidebar() {
    const sidebar = document.getElementById('id_sidebar');
    sidebar.innerHTML = "";
    sidebar.innerHTML = sidebarLoginTemplate();
}


/**
 *  Loads the navbar template. 
 */
function loadNavbar() {
    const navbar = document.getElementById('id_navbar');
    navbar.innerHTML = "";
    navbar.innerHTML = navbarTemplate();
}

/**
 *  Loads mobile Footer. 
 */

function loadMobileFooter() {
    const footer = document.getElementById('mobile_footer');
    footer.innerHTML = "";
    footer.innerHTML = mobileFooterLoginTemplate();
}


/**
 *  Loads the summary template. 
 */
function loadSummary() {
    const summaryContent = document.getElementById('id_content_summary');
    summaryContent.innerHTML = "";
    summaryContent.innerHTML = summaryContentTemplate();
}


/**
 *  Loads the log off sidebar template. 
 */
function loadLogOffSidebar() {
    const sidebar = document.getElementById('id_sidebar');
    sidebar.innerHTML = "";
    sidebar.innerHTML = sidebarLogOffTemplate();
}


/**
 *  Toggles the menu in navbar. 
 */
function toggleMenu() {
    document.getElementById("menu_navbar").classList.toggle("d_none");
}


/**
 *  Adds a click listener to all <dialog> elements on the page.
 *  When a user clicks on the dialog background, the dialog will be closed.
 *  clearContactInputs() clears all input fields.
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
 *  Leads to the last clicked page in browser history.
 */
function goBack() {
    window.history.back();
}

function getRandomColor(){
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return color;
}


/**
 * Date Picker
 * Sets min and max values for the due date input after DOMContentLoaded.
 */
window.addEventListener('DOMContentLoaded', () => {
  const dueDateInput = document.getElementById('due_date');
  if (!dueDateInput) return;

  const today = new Date();
  const isoToday = today.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 5);

  dueDateInput.min = isoToday;
  dueDateInput.max = maxDate.toISOString().split('T')[0];
});

/**
 * Highlights the active sidebar or navbar link based on the current URL.
 * Compares each link's href with the current window location
 * and adds the "active" class to the matching link.
 */
function highlightActiveLink() {
    const links = document.querySelectorAll('.link_active');
    const currentPath = window.location.pathname;

    links.forEach(link => {
        const linkPath = link.getAttribute('href').replace('./', '');
        if (currentPath.includes(linkPath)) {
            link.classList.add('active');
        }
    });
}

function showToast() {
    const toast = document.getElementById("msgBox");

    toast.classList.add("show");
    setTimeout(function() {
        toast.classList.remove("show");
    }, 800);
}