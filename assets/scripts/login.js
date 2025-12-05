 function startAnimation() {
      const logo = document.getElementById("splash_logo");
      const mainContent = document.getElementById("main_content");
      const splash = document.getElementById("splash");

      mainContent.style.opacity = "1";
      setTimeout(() => {
        logo.classList.add("animate");
      }, 100);
      setTimeout(() => {
        splash.style.display = "none";
      }, 1000);
    }