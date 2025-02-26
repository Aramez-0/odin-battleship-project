import './style.css';

function createGrid(name) {
    let grid = document.querySelector(`#${name}`)
    
    const values = {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D',
        5: 'E',
        6: 'F',
        7: 'G',
        8: 'H',
        9: 'I',
        10: 'J',
        11: '1',
        22: '2',
        33: '3',
        44: '4',
        55: '5',
        66: '6',
        77: '7',
        88: '8',
        99: '9',
        110: '10'
    };

    for (let i = 0; i < 121; i++) {
        let div = document.createElement('div')
        div.classList.add('grid-ele')

        if (values[i]) {
            div.textContent = values[i];
        } else {
            div.classList.add('game-ele');

        }

        grid.appendChild(div)
    }

    let x = 0
    let gameEle = document.querySelectorAll('.game-ele')
    for (let i = 0; i < 100; i++) {
        let y = 0

        y = i % 10

        if (y === (0) && i !== 0) {
            x++
        }

        gameEle[i].classList.add(`x${x}`)
        gameEle[i].classList.add(`y${y}`)
    }
}

createGrid('grid1')
createGrid('grid2')

class Ship {
    constructor(length) {
        this.length = length;
        this.hitNum = 0;
        this.sunk = false;
    }

    hit() {
        this.hitNum++;
        this.isSunk(); 
    }

    isSunk() {
        if (this.hitNum === this.length) {
            this.sunk = true;
            console.log('The ship is sunk!');
        }
    }
}

function gameBoard() {
    let board = Array(10).fill().map(() => Array(10).fill(null));
    
    board[2][3] = new Ship(3);
    let ele = document.querySelector(`.x${2}.y${3}`)
    ele.classList.add('ship')
    console.log(board)
    return board
}
gameBoard()


// i leave it at that for now. make sure to reference the odin page often. 
// They're smarter than you

// this is an ambitious project