document.addEventListener("DOMContentLoaded", function () {
    // Navbar Scroll Effect
    window.addEventListener("scroll", function () {
        document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 50);
    });

    // Portfolio Image Click Event - Opens Gallery
    document.querySelectorAll(".portfolio-item").forEach(item => {
        item.addEventListener("click", function () {
            const folderPath = this.getAttribute("data-folder");
            openGallery(folderPath);
        });
    });

    function openGallery(folderPath) {
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

        let imageIndex = 1;

        function loadNextImage() {
            let img = document.createElement("img");
            img.src = `${folderPath}/photo${imageIndex}.webp`;
            img.alt = `Image ${imageIndex}`;
            img.classList.add("modal-img");

            img.onload = function () {
                if (img.naturalHeight > img.naturalWidth) {
                    img.classList.add("portrait");
                    portraitRow.appendChild(img);
                } else {
                    landscapeRow.appendChild(img);
                }

                imageIndex++;
                loadNextImage(); // Try loading the next image
            };

            img.onerror = function () {
                if (imageIndex === 1) {
                    console.error("No images found in the folder!");
                } else {
                    // Stop loading when an image fails
                    gallery.appendChild(landscapeRow);
                    gallery.appendChild(portraitRow);
                }
            };
        }

        loadNextImage();
    }

    function closeModal() {
        const modal = document.getElementById("imageModal");
        if (modal) {
            modal.style.display = "none";
            document.body.classList.remove("modal-open"); // Restore scrolling
        }
    }

    // Close Modal on Button Click
    document.querySelector(".close").addEventListener("click", closeModal);

    // Close Modal if Clicked Outside of Images
    document.getElementById("imageModal").addEventListener("click", function (event) {
        if (event.target === this) {
            closeModal();
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const navbarHeight = document.querySelector(".navbar").offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            } else {
                console.warn(`Target section not found for: ${this.getAttribute("href")}`);
            }
        });
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
    });
}
