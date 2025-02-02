
// Load the palettes from localStorage
function loadPalettes(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Save the palettes to localStorage
function savePalettes(palettes, key) {
    localStorage.setItem(key, JSON.stringify(palettes));
}

// Render the palettes on the screen
function renderPalettes(palettes, listId, storageKey) {
    const palettesList = document.getElementById(listId);
    palettesList.innerHTML = palettes.map((palette, index) => `
        <div style="margin-bottom: 10px;">
            <strong>${palette.name}</strong>
            <div class="color-box">
                <div class="color-swatch" style="background-color: ${palette.colors[0]}"></div>
                <div class="color-swatch" style="background-color: ${palette.colors[1]}"></div>
                <div class="color-swatch" style="background-color: ${palette.colors[2]}"></div>
            </div>
            <button class="remove-btn" data-index="${index}" data-storage="${storageKey}">Remove</button>
        </div>
    `).join('');
}

// Save the palette to the appropriate list (Saved or Favorites)
function savePalette(storageKey, listId) {
    const palette = {
        name: document.getElementById('palette-name').value,
        colors: [
            document.getElementById('color-input-1').value,
            document.getElementById('color-input-2').value,
            document.getElementById('color-input-3').value
        ]
    };

    if (palette.name.trim() === "") {
        alert("Please enter a palette name.");
        return;
    }

    let palettes = loadPalettes(storageKey);

    // Avoid adding duplicate palettes
    if (!palettes.some(existingPalette => existingPalette.name === palette.name)) {
        palettes.push(palette);
        savePalettes(palettes, storageKey);
        renderPalettes(palettes, listId, storageKey);
    }
}

// Event listeners for saving palettes
document.getElementById('save-palette').addEventListener('click', () => savePalette('savedPalettes', 'saved-palettes-list'));
document.getElementById('add-favorite').addEventListener('click', () => savePalette('favoritePalettes', 'favorites-list'));

// Render saved and favorite palettes on page load
document.addEventListener('DOMContentLoaded', () => {
    renderPalettes(loadPalettes('savedPalettes'), 'saved-palettes-list', 'savedPalettes');
    renderPalettes(loadPalettes('favoritePalettes'), 'favorites-list', 'favoritePalettes');
});

// Handle the "Remove" button click to remove a palette
document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('remove-btn')) {
        const index = event.target.getAttribute('data-index');
        const storageKey = event.target.getAttribute('data-storage');
        
        let palettes = loadPalettes(storageKey);
        palettes.splice(index, 1); // Remove the selected palette
        
        savePalettes(palettes, storageKey);
        renderPalettes(palettes, storageKey === 'savedPalettes' ? 'saved-palettes-list' : 'favorites-list', storageKey);
    }
});
