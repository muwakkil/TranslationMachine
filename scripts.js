// Mapping each letter to a specific shape
const shapeMap = {
    'A': 'circle', 'B': 'square', 'C': 'triangle', 'D': 'circle', 'E': 'square', 'F': 'triangle',
    'G': 'diamond', 'H': 'ellipse', 'I': 'hexagon', 'J': 'circle', 'K': 'square', 'L': 'triangle',
    'M': 'diamond', 'N': 'ellipse', 'O': 'hexagon', 'P': 'circle', 'Q': 'square', 'R': 'triangle',
    'S': 'diamond', 'T': 'ellipse', 'U': 'hexagon', 'V': 'circle', 'W': 'square', 'X': 'triangle',
    'Y': 'diamond', 'Z': 'ellipse'
};

// Function to draw the motif shape based on the clicked letter
function drawMotif(letter) {
    // Get the size of the shape from the input
    const size = document.getElementById('size').value;
    
    // Get the canvas element where shapes are placed
    const canvas = document.getElementById('motifCanvas');
    
    // Element to show the clicked letter
    const letterOutput = document.getElementById('letterOutput');
    
    // Check if the letter corresponds to a shape in the shapeMap
    if (shapeMap[letter]) {
        // Create a new div element for the shape
        const shape = document.createElement('div');
        
        // Add the appropriate class for the shape
        shape.classList.add('shape', shapeMap[letter]);
        
        // Set the size of the shape
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;

        // Generate a random position within the canvas
        const x = Math.random() * (canvas.offsetWidth - size) + 10;
        const y = Math.random() * (canvas.offsetHeight - size) + 10;

        // Position the shape on the canvas
        shape.style.left = `${x}px`;
        shape.style.top = `${y}px`;

        // Append the shape to the canvas
        canvas.appendChild(shape);

        // Make the shape draggable
        makeDraggable(shape);

        // Update the output text with the clicked letter
        letterOutput.textContent += letter;
    }
}

// Function to make a shape draggable within the canvas
function makeDraggable(shape) {
    // Track if the shape is being dragged
    let isDragging = false;
    
    // Store horizontal offset of the mouse from the shape's left edge
    let offsetX = 0;
    
    // Store vertical offset of the mouse from the shape's top edge
    let offsetY = 0;

    // When mouse button is pressed down on the shape (mousedown)
    shape.addEventListener('mousedown', function(e) {
        isDragging = true; // Set dragging flag to true
        
        // Get the shape's position relative to the viewport
        const rect = shape.getBoundingClientRect();
        
        // Calculate the horizontal offset
        offsetX = e.clientX - rect.left;
        
        // Calculate the vertical offset
        offsetY = e.clientY - rect.top;
        
        // Change cursor to indicate dragging
        shape.style.cursor = 'grabbing';
    });

    // When mouse is moved (mousemove)
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            // Get the canvas element
            const canvas = document.getElementById('motifCanvas');
            
            // Update the shape's x position based on mouse movement
            let x = e.clientX - offsetX;
            
            // Update the shape's y position based on mouse movement
            let y = e.clientY - offsetY;

            // Prevent the shape from moving outside the canvas boundaries
            x = Math.max(0, Math.min(x, canvas.offsetWidth - shape.offsetWidth));
            y = Math.max(0, Math.min(y, canvas.offsetHeight - shape.offsetHeight));

            // Update the position of the shape
            shape.style.left = `${x}px`;
            shape.style.top = `${y}px`;
        }
    });

    // When mouse button is released (mouseup)
    document.addEventListener('mouseup', function() {
        isDragging = false; // Set dragging flag to false
        shape.style.cursor = 'grab'; // Change cursor back to original
    });
}

// Add event listeners to each button with the 'key' class
document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', (e) => {
        drawMotif(e.target.textContent); // Call the drawMotif function when a key is clicked
    });
});

