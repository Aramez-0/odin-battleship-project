import './style.css';

function createGrid(name) {
    let grid = document.querySelector(`#${name}`)
    
    const values = {
        0: '.',
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
    let gameEle = grid.querySelectorAll('.game-ele')
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
        }
    }
}
let shipMap = new Map()
function gameBoard() {
    let board = Array(10).fill().map(() => Array(10).fill(null));
    
    function addShip(length, row, col, direction) {
        let ship = new Ship(length)
        if (direction == 'ver') {
            for (let i = 0; i < length; i++) {
                let pos = row + i
                if (row >= 5) {
                    pos = row - i
                }
                let ele = document.querySelector(`.x${pos}.y${col}`)
                ele.classList.add('ship')
                
                board[pos][col] = ship
                shipMap.set(ele, ship)
            }
        } else {
            
            for (let i = 0; i < length; i++) {
                let pos = col + i
                if (col >= 5) {
                    pos = col - i
                }
                let ele = document.querySelector(`.x${row}.y${pos}`)
                ele.classList.add('ship')
                
                board[row][pos] = ship
                shipMap.set(ele, ship)
            }
        }
    }
    addShip(3, 9, 0, 'hor')
    addShip(5, 2, 7, 'ver')
    console.log(board)
}
gameBoard()

let ship = document.querySelectorAll('.ship');

function handleShipClick(event) {
    const clickedShip = shipMap.get(event.target);
    clickedShip.hit();
    console.log(clickedShip);

    if (this.sunk === true) {
        // remove class, remove from DOM
    }

    event.target.removeEventListener('click', handleShipClick);
}

for (let i = 0; i < ship.length; i++) {
    ship[i].addEventListener('click', handleShipClick);
}

// Math.round(Math.random() * (target number - 1)) + 1

// i leave it at that for now. make sure to reference the odin page often. 
// They're smarter than you

// this is an ambitious project