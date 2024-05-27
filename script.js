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

        // Calculate the cell size based on the number of squares per side
        const cellSize = 960 / size - 2; // Subtracting 2px for gap

        // Set grid template columns and rows using fr units
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        // Create grid cells
        for (let i = 0; i < size * size; i++) {
            const div = document.createElement('div');
            div.addEventListener('mouseenter', function() {
                div.classList.add('hovered');
                setTimeout(() => {
                    div.classList.remove('hovered');
                }, 500);
            });
            div.style.width = `${cellSize}px`; // Set width of cell
            div.style.height = `${cellSize}px`; // Set height of cell
            container.appendChild(div);
        }
    }
});
