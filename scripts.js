// Mapping each letter to an SVG shape
const shapeMap = {
    'A': 'circle.svg', 'B': 'square.svg', 'C': 'triangle.svg', 'D': 'diamond.svg',
    'E': 'polygon.svg', 'F': 'rhombus.svg', 'G': 'outline_1.svg', 'H': 'outline_2.svg',
    'I': 'circle.svg', 'J': 'square.svg', 'K': 'triangle.svg', 'L': 'diamond.svg',
    'M': 'polygon.svg', 'N': 'rhombus.svg', 'O': 'outline_1.svg', 'P': 'outline_2.svg',
    'Q': 'circle.svg', 'R': 'square.svg', 'S': 'triangle.svg', 'T': 'diamond.svg',
    'U': 'polygon.svg', 'V': 'rhombus.svg', 'W': 'outline_1.svg', 'X': 'outline_2.svg',
    'Y': 'circle.svg', 'Z': 'square.svg'
};

// Function to draw the motif shape
function drawMotif(letter) {
    const size = document.getElementById('size').value;
    const canvas = document.getElementById('motifCanvas');
    const letterOutput = document.getElementById('letterOutput');

    if (shapeMap[letter]) {
        const shapeName = shapeMap[letter];
        const shape = document.createElement('img');

        // Set correct path for the SVG shape 
        shape.src = shapeName;
        shape.classList.add('shape');
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.position = "absolute";

        // Generate random position within the canvas
        const x = Math.random() * (canvas.clientWidth - size);
        const y = Math.random() * (canvas.clientHeight - size);

        shape.style.left = `${x}px`;
        shape.style.top = `${y}px`;

        // Ensure image loads before adding it to the canvas
        shape.onload = () => {
            canvas.appendChild(shape);
            makeDraggable(shape);
            letterOutput.textContent += letter;
        };

        // Handle image loading error
        shape.onerror = () => console.error(`Error loading: ${shapeName}`);
    }
}

// Function to make the shape draggable
function makeDraggable(shape) {
    let isDragging = false;
    let offsetX, offsetY;

    shape.addEventListener('mousedown', function (e) {
        isDragging = true;
        const rect = shape.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        shape.style.cursor = 'grabbing';

        document.addEventListener('mousemove', moveShape);
        document.addEventListener('mouseup', stopDragging);
    });

    function moveShape(e) {
        if (!isDragging) return;

        const canvas = document.getElementById('motifCanvas');
        const canvasRect = canvas.getBoundingClientRect();

        let x = e.clientX - canvasRect.left - offsetX;
        let y = e.clientY - canvasRect.top - offsetY;

        // Keep shapes within the canvas
        x = Math.max(0, Math.min(x, canvasRect.width - shape.clientWidth));
        y = Math.max(0, Math.min(y, canvasRect.height - shape.clientHeight));

        shape.style.left = `${x}px`;
        shape.style.top = `${y}px`;
    }

    function stopDragging() {
        isDragging = false;
        shape.style.cursor = 'grab';
        document.removeEventListener('mousemove', moveShape);
        document.removeEventListener('mouseup', stopDragging);
    }
}

// Function to save motif as an image
function saveMotif() {
    html2canvas(document.getElementById('motifCanvas'), { backgroundColor: null }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'motif.png';
        link.click();
    }).catch(err => console.error("Error saving image:", err));
}

// Generate keyboard buttons dynamically
const keyboardContainer = document.querySelector('.keyboard');
const rows = [document.createElement('div'), document.createElement('div'), document.createElement('div')];

rows.forEach(row => row.classList.add('keyboard-row'));

const keys = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
keys.forEach((letter, index) => {
    const button = document.createElement('button');
    button.textContent = letter;
    button.classList.add('key');
    button.addEventListener('click', () => drawMotif(letter));

    // Distribute keys into rows
    if (index < 10) rows[0].appendChild(button);
    else if (index < 19) rows[1].appendChild(button);
    else rows[2].appendChild(button);
});

// Append rows to keyboard container
rows.forEach(row => keyboardContainer.appendChild(row));

// Add event listener for saving motifs
document.getElementById('saveButton').addEventListener('click', saveMotif);




