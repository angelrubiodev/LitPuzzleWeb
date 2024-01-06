document.addEventListener('DOMContentLoaded', function() {
    function generateDictionary() {
        const lettersWithoutAccents = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
        const availableNumbers = Array.from({ length: lettersWithoutAccents.length }, (_, i) => i + 1);
        const dictionary = {};

        for (const letter of lettersWithoutAccents) {
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            const randomNumber = availableNumbers.splice(randomIndex, 1)[0];
            dictionary[letter] = randomNumber;
        }

        return dictionary;
    }

    function normalizeText(text) {
        // Normaliza caracteres acentuados manualmente
        return text
            .replace(/[áäàâ]/gi, 'A')
            .replace(/[éëèê]/gi, 'E')
            .replace(/[íïìî]/gi, 'I')
            .replace(/[óöòô]/gi, 'O')
            .replace(/[úüùû]/gi, 'U')
            .toUpperCase();
    }

    function generatePuzzle() {
        const inputText = normalizeText(document.getElementById('inputText').value);
        const puzzleSection = document.getElementById('puzzleSection');
        const keySection = document.getElementById('keySection');

        // Limpiar el contenido anterior
        puzzleSection.innerHTML = '';
        keySection.innerHTML = '';

        const dictionary = generateDictionary();
        const guessedLetters = {};

        // Crear la rejilla en keySection
        const keyGrid = document.createElement('div');
        keyGrid.className = 'keyGrid';

        for (let i = 0; i < 26; i++) {
            const letter = String.fromCharCode(65 + i); // A-Z en orden alfabético
            const keyBox = document.createElement('div');
            keyBox.className = 'keyBox';
            keyBox.dataset.letter = letter;
            keyBox.innerText = letter;
            keyGrid.appendChild(keyBox);
        }

        keySection.appendChild(keyGrid);

        for (const character of inputText) {
            let content;

            if (character === ' ') {
                // Representar espacios como cuadros rellenos de negro (U+2588)
                content = '█';

                // Crear cuadro del puzzle para espacios
                const puzzleBox = document.createElement('div');
                puzzleBox.className = 'puzzleBox';
                puzzleBox.innerText = content;
                puzzleSection.appendChild(puzzleBox);
            } else if (dictionary[character] !== undefined) {
                // Crear cuadro del puzzle con la clave
                content = dictionary[character];

                // En el puzzle, mostrar solo la clave en la esquina superior derecha
                const puzzleBox = document.createElement('div');
                puzzleBox.className = 'puzzleBox';

                // Crear un contenedor para la clave en la esquina superior derecha
                const keyContainer = document.createElement('div');
                keyContainer.className = 'keyContainer';
                keyContainer.innerText = content;

                // Agregar el cuadro del puzzle y el contenedor de la clave al puzzleSection
                puzzleBox.appendChild(keyContainer);
                puzzleSection.appendChild(puzzleBox);

                // Crear cuadro de la clave solo si es la primera aparición de la letra
                if (!guessedLetters[character]) {
                    guessedLetters[character] = true;

                    // Buscar el keyBox correspondiente y poner el valor dentro
                    const keyBox = keyGrid.querySelector(`.keyBox[data-letter="${character}"]`);
                    keyBox.innerText = content;
                }
            } else {
                // Conservar signos sin clave
                content = character;

                // Crear cuadro del puzzle para otros caracteres
                const puzzleBox = document.createElement('div');
                puzzleBox.className = 'puzzleBox';
                puzzleBox.innerText = content;
                puzzleSection.appendChild(puzzleBox);
            }
        }
    }

    // Enlazar la función generatePuzzle al evento click del botón
    const generateButton = document.getElementById('generateButton');
    generateButton.addEventListener('click', generatePuzzle);
});
