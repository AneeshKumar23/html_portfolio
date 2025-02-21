document.addEventListener("DOMContentLoaded", () => {
    // Smooth Scroll for Anchor Links
    const links = document.querySelectorAll("nav a[href^='#']");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector("header")?.offsetHeight || 60; // Adjust based on header height
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Modal functionality for image gallery
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("caption");
    var closeBtn = document.getElementById("close");

    // Get all project images
    var projectImages = document.querySelectorAll(".project-image");

    // Loop through all project images and add a click event to show modal
    projectImages.forEach(function(img) {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        };
    });

    // Close modal when user clicks on close button
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    // Close modal when user clicks anywhere outside the image
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});

