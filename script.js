function init(){
    // loadSidebar();
    loadNavbar();
    loadSummary();
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

function loadSummary(){
    const summaryContent = document.getElementById('id_content_summary');
    summaryContent.innerHTML = "";
    summaryContent.innerHTML = summaryContentTemplate();
}