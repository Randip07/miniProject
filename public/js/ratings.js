document.querySelectorAll('.rating').forEach((ratingDiv) => {
    const allStars = ratingDiv.querySelectorAll('.star'); 
    const ratingValue = ratingDiv.querySelector('input[type="number"]');

    allStars.forEach((item, idx) => {
        item.addEventListener('click', function () {
            ratingValue.value = idx + 1;

            allStars.forEach((star, i) => {
                star.classList.replace('bxs-star', 'bx-star'); 
                star.classList.remove('active');
                if (i <= idx) {
                    star.classList.replace('bx-star', 'bxs-star');
                    star.classList.add('active');
                } 
            });
        });
    });
});
