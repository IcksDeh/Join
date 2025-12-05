function init(){
    loadSidebar();
    loadNavbar();
}

function loadSidebar(){
    const sidebar = document.getElementById('id_sidebar');
    sidebar.innerHTML = "";
    sidebar.innerHTML = sidebarLoginTemplate();
}

function loadNavbar(){
    const navbar = document.getElementById('id_navbar');
    navbar.innerHTML = "";
    navbar.innerHTML = navbarTemplate();
}