function init(){
    loadSidebar();
    loadNavbar();
    loadSummary();
}


/**
 *  Loads the sidebar template. 
 * 
 */
function loadSidebar(){
    const sidebar = document.getElementById('id_sidebar');
    sidebar.innerHTML = "";
    sidebar.innerHTML = sidebarLoginTemplate();
}


/**
 *  Loads the navbar template. 
 * 
 */
function loadNavbar(){
    const navbar = document.getElementById('id_navbar');
    navbar.innerHTML = "";
    navbar.innerHTML = navbarTemplate();
}


/**
 *  Loads the summary template. 
 * 
 */
function loadSummary(){
    const summaryContent = document.getElementById('id_content_summary');
    summaryContent.innerHTML = "";
    summaryContent.innerHTML = summaryContentTemplate();
}


/**
 *  Loads the log off sidebar template. 
 * 
 */
function loadLogOffSidebar() {
    const sidebar = document.getElementById('id_sidebar');
    sidebar.innerHTML = "";
    sidebar.innerHTML = sidebarLogOffTemplate();
}


/**
 *  Toggles the menu in navbar. 
 * 
 */
function toggleMenu() {
    document.getElementById("menu_navbar").classList.toggle("d_none");
}


/**
 *  Adds a click listener to all <dialog> elements on the page.
 *  When a user clicks on the dialog background, the dialog will be closed.
 *  clearContactInputs() clears all input fields.
 * 
 */
document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {

        if (event.target === dialog) {
        dialog.close();
        clearContactInputs();
        }
    });
});



