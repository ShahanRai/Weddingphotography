document.addEventListener("DOMContentLoaded", function () {
    // Navbar Scroll Effect
    window.addEventListener("scroll", function () {
        document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 50);
    });

    // Dynamically Load Client Images
    function loadClientImages(clientId, folderPath, count) {
        const container = document.getElementById(clientId);
        for (let i = 1; i <= count; i++) {
            let img = document.createElement("img");
            img.src = folderPath + "/photo" + i + ".jpg";
            container.appendChild(img);
        }
    }

    loadClientImages("shahan-anvitha", "clients/Shahan_Anvitha", 5);
});
