document.addEventListener('DOMContentLoaded', () => {
    // Initialize like/dislike functionality
    const likeIcons = document.querySelectorAll('.like-icon');
    likeIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        const isLiked = icon.getAttribute('data-liked') === 'true';
        if (isLiked) {
          icon.src = 'Designing/Heart - No Like.png';
          icon.setAttribute('data-liked', 'false');
        } else {
          icon.src = 'Designing/Heart - Liked.png';
          icon.setAttribute('data-liked', 'true');
        }
      });
    });

    // Initialize hide/show functionality
    const hideIcons = document.querySelectorAll('.hide-icon');
    hideIcons.forEach(icon => {
      icon.addEventListener('click', (event) => {
        const figure = event.target.closest('figure'); // Get the closest figure element
        figure.style.opacity = 0; // Smoothly fade out the figure
        setTimeout(() => {
          figure.style.display = 'none'; // Hide the Polaroid after the fade-out transition
          adjustLayout(); // Adjust the layout of remaining Polaroids
        }, 500); // Delay to match the fade-out transition
      });
    });

    // Share functionality to download the Polaroid as PNG
    const shareIcons = document.querySelectorAll('.share-icon');
    shareIcons.forEach(icon => {
      icon.addEventListener('click', (event) => {
        const figure = event.target.closest('figure'); // Get the closest figure element
        html2canvas(figure, { useCORS: true }).then(canvas => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'polaroid.png'; // Name of the downloaded file
          link.click(); // Trigger download
        });
      });
    });

    // Function to adjust layout by recalculating the flex container
    function adjustLayout() {
      const photosContainer = document.querySelector('.Photos');
      photosContainer.style.gap = '0'; // Temporarily remove gap for smooth transition
      setTimeout(() => {
        photosContainer.style.gap = '50px'; // Restore the gap with a smooth transition
      }, 500); // Adjust gap timing to match the sliding animation
    }

    // Dynamically load feedback form
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.style.display = 'flex';
});