document.addEventListener("DOMContentLoaded", function () {
    // Navbar Scroll Effect
    window.addEventListener("scroll", function () {
        document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 50);
    });

    // Portfolio Image Click Event - Opens Gallery
    document.querySelectorAll(".portfolio-item").forEach(item => {
        item.addEventListener("click", function () {
            const folderPath = this.getAttribute("data-folder");
            const imageCount = parseInt(this.getAttribute("data-count"), 10);
            openGallery(folderPath, imageCount);
        });
    });

    function openGallery(folderPath, count) {
        const modal = document.getElementById("imageModal");
        const gallery = document.getElementById("modal-gallery");

        if (!modal || !gallery) {
            console.error("Modal or gallery element not found!");
            return;
        }

        gallery.innerHTML = ""; // Clear previous images
        modal.style.display = "flex";
        document.body.classList.add("modal-open"); // Prevent scrolling

        const landscapeRow = document.createElement("div");
        landscapeRow.classList.add("modal-row");

        const portraitRow = document.createElement("div");
        portraitRow.classList.add("modal-row");

        for (let i = 1; i <= count; i++) {
            let img = document.createElement("img");
            img.src = `${folderPath}/photo${i}.webp`;
            img.alt = `Image ${i}`;
            img.classList.add("modal-img");

            img.onload = function () {
                if (img.naturalHeight > img.naturalWidth) {
                    img.classList.add("portrait");
                    portraitRow.appendChild(img); // Add to portrait row
                } else {
                    landscapeRow.appendChild(img); // Add to landscape row
                }
            };
        }

        gallery.appendChild(landscapeRow);
        gallery.appendChild(portraitRow);
    }

    function closeModal() {
        const modal = document.getElementById("imageModal");
        if (modal) {
            modal.style.display = "none";
            document.body.classList.remove("modal-open"); // Restore scrolling
        }
    }

    // Close Modal on Button Click
    document.querySelector(".close").addEventListener("click", function () {
        closeModal();
    });

    // Close Modal if Clicked Outside of Images
    document.getElementById("imageModal").addEventListener("click", function (event) {
        if (event.target === this) {
            closeModal();
        }
    });
});
