// script.js

document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.grid-container');
    const resetButton = document.getElementById('resetButton');

    resetButton.addEventListener('click', function() {
        const size = prompt("Enter the number of grids per side (maximum 100):");

        if (size !== null && !isNaN(size) && size > 0 && size <= 100) {
            createGrid(size);
        } else {
            alert("Please enter a valid number between 1 and 100.");
        }
    });

    function createGrid(size) {
        // Clear the existing grid
        container.innerHTML = '';

        // Set grid template columns and rows using fr units
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        // Create grid cells
        for (let i = 0; i < size * size; i++) {
            const div = document.createElement('div');
            div.style.backgroundColor = 'rgb(144, 238, 144)'; // Light green for initial color
            div.style.transition = 'background-color 0.3s'; // Smooth transition
            div.setAttribute('data-darken-level', 0); // Initialize darken level

            div.addEventListener('mouseenter', function() {
                let darkenLevel = parseInt(div.getAttribute('data-darken-level'));

                if (darkenLevel === 0) {
                    // First hover, assign random color
                    const randomColor = getRandomColor();
                    div.style.backgroundColor = randomColor;
                    div.setAttribute('data-original-color', randomColor);
                }

                if (darkenLevel < 10) {
                    darkenLevel++;
                    div.setAttribute('data-darken-level', darkenLevel);
                    const originalColor = div.getAttribute('data-original-color');
                    const darkenedColor = darkenColor(originalColor, darkenLevel);
                    div.style.backgroundColor = darkenedColor;
                }
            });

            container.appendChild(div);
        }
    }

    function getRandomColor() {
        const r = randomValue();
        const g = randomValue();
        const b = randomValue();
        return `rgb(${r}, ${g}, ${b})`;
    }

    function randomValue() {
        return Math.floor(Math.random() * 256);
    }

    function darkenColor(color, level) {
        const rgb = color.match(/\d+/g).map(Number);
        const factor = 1 - (level / 10);
        const darkenedRgb = rgb.map(value => Math.floor(value * factor));
        return `rgb(${darkenedRgb.join(', ')})`;
    }

    // Initialize default grid
    createGrid(16);
});
