document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('puzzle-container');
    const rows = 2;
    const cols = 2;
    let pieces = [];

    function init() {
        const totalPieces = rows * cols;
        for (let i = 0; i < totalPieces; i++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.style.backgroundImage = 'url("image.jpg")';
            pieces.push(piece);
            container.appendChild(piece);
        }
        shuffleAndLayout();
    }

    function shuffleAndLayout() {
        const shuffledIndices = shuffle(Array.from(pieces.keys()));
        shuffledIndices.forEach((pieceIndex, i) => {
            const x = i % cols;
            const y = Math.floor(i / cols);
            const piece = pieces[pieceIndex];
            piece.style.backgroundPosition = `-${x * 400}px -${y * 225}px`;
            piece.onclick = function() {
                swapPieces(i, pieceIndex);
            };
        });
    }

    function swapPieces(index1, index2) {
        const temp = pieces[index1].style.backgroundPosition;
        pieces[index1].style.backgroundPosition = pieces[index2].style.backgroundPosition;
        pieces[index2].style.backgroundPosition = temp;

        pieces = pieces.map((piece, i) => i === index1 ? pieces[index2] : (i === index2 ? pieces[index1] : piece));
        checkCompletion();
    }

    function checkCompletion() {
        const isComplete = pieces.every((piece, i) => {
            const x = i % cols;
            const y = Math.floor(i / cols);
            const correctPosition = `-${x * 400}px -${y * 225}px`; //adjust to compensate
            return piece.style.backgroundPosition === correctPosition;
        });

        if (isComplete) {
            document.getElementById('story').style.display = 'block';
            container.style.display = 'none';
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring swap
        }
        return array;
    }

    init();
});
