
const shapeMap = {
    'A': 'circle', 'B': 'rect', 'C': 'polygon',
    'D': 'circle', 'E': 'rect', 'F': 'polygon'
};

function drawMotif() {
    const text = document.getElementById('textInput').value.toUpperCase();
    const size = document.getElementById('size').value;
    const stroke = document.getElementById('stroke').value;
    const svg = document.getElementById('motifCanvas');
    svg.innerHTML = '';
    
    text.split('').forEach((char, index) => {
        if (shapeMap[char]) {
            const shape = document.createElementNS("http://www.w3.org/2000/svg", shapeMap[char]);
            shape.setAttribute("stroke", "black");
            shape.setAttribute("fill", "none");
            shape.setAttribute("stroke-width", stroke);
            
            if (shapeMap[char] === 'circle') {
                shape.setAttribute("cx", 50 + index * 60);
                shape.setAttribute("cy", 200);
                shape.setAttribute("r", size / 2);
            } else if (shapeMap[char] === 'rect') {
                shape.setAttribute("x", 30 + index * 60);
                shape.setAttribute("y", 180);
                shape.setAttribute("width", size);
                shape.setAttribute("height", size);
            } else if (shapeMap[char] === 'polygon') {
                shape.setAttribute("points", `
                    ${50 + index * 60},${200 - size / 2} 
                    ${50 + index * 60 - size / 2},${200 + size / 2} 
                    ${50 + index * 60 + size / 2},${200 + size / 2}`);
            }
            svg.appendChild(shape);
        }
    });
}

document.getElementById('textInput').addEventListener('input', drawMotif);
document.getElementById('size').addEventListener('input', drawMotif);
document.getElementById('stroke').addEventListener('input', drawMotif);
