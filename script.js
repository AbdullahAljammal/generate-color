// Select elements
const paletteNameInput = document.getElementById('palette-name');
const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const color3Input = document.getElementById('color3');
const saveButton = document.getElementById('save-palette');
const generateButton = document.getElementById('generate-random');
const paletteList = document.getElementById('palette-list');

// Get palettes from local storage
function getPalettes() {
  return JSON.parse(localStorage.getItem('palettes')) || [];
}

// Save palettes to local storage
function savePalettes(palettes) {
  localStorage.setItem('palettes', JSON.stringify(palettes));
}

// Save a new palette
function savePalette() {
  const name = paletteNameInput.value;
  const color1 = color1Input.value;
  const color2 = color2Input.value;
  const color3 = color3Input.value;

  if (!name) {
    alert('Please provide a palette name.');
    return;
  }

  const palettes = getPalettes();
  palettes.push({ name, colors: [color1, color2, color3] });
  savePalettes(palettes);
  renderPalettes();
}

// Generate random colors
function generateRandomPalette() {
  color1Input.value = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  color2Input.value = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  color3Input.value = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Delete a palette
function deletePalette(index) {
  const palettes = getPalettes();
  palettes.splice(index, 1);
  savePalettes(palettes);
  renderPalettes();
}

// Render all palettes
function renderPalettes() {
  const palettes = getPalettes();
  paletteList.innerHTML = ''; // Clear the list

  palettes.forEach((palette, index) => {
    const paletteDiv = document.createElement('div');
    paletteDiv.className = 'palette-card';
    paletteDiv.innerHTML = `
      <h3>${palette.name}</h3>
      <div class="color-preview">
        <div class="color-box" style="background-color: ${palette.colors[0]}"></div>
        <div class="color-box" style="background-color: ${palette.colors[1]}"></div>
        <div class="color-box" style="background-color: ${palette.colors[2]}"></div>
      </div>
      <button onclick="deletePalette(${index})">Delete</button>
    `;
    paletteList.appendChild(paletteDiv);
  });
}

// Event listeners
saveButton.addEventListener('click', savePalette);
generateButton.addEventListener('click', generateRandomPalette);
document.addEventListener('DOMContentLoaded', renderPalettes);
