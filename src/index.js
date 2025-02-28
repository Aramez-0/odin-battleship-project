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

let computerShipsSunk = 0
let userShipsSunk = 0

class Ship {
    constructor(length, dir, bound, user) {
        this.length = length;
        this.hitNum = 0;
        this.dir = dir;
        this.bounds = bound;
        this.user = user;
    }

    hit() {
        this.hitNum++;
        this.isSunk(); 
    }

    isSunk() {
        if (this.hitNum === this.length) {
            console.log(`you sunk a ${this.length} long ship`)
            if (this.user == 'comp') {
                computerShipsSunk ++
                console.log(computerShipsSunk)
                win('comp')
            } else {
                userShipsSunk ++
                console.log(userShipsSunk)
                win('user')
            }
        }
    }
}

let shipMap2 = new Map()
function userGameBoard() {
    function addShip(length, row, col, direction) {
        let bounds = '<5'
        if (row >5 || col >5) {
            bounds = '>5'
        }
        
        let ship = new Ship(length, direction, bounds, 'comp')
        if (direction == 'ver') {
            for (let i = 0; i < length; i++) {
                let pos = row + i
                if (row >= 5) {
                    pos = row - i
                }
                let ele = document.querySelector(`.x${pos}.y${col}`)
                ele.classList.add('ship')
                
                shipMap2.set(ele, ship)
            }
        } else {
            
            for (let i = 0; i < length; i++) {
                let pos = col + i
                if (col >= 5) {
                    pos = col - i
                }
                let ele = document.querySelector(`.x${row}.y${pos}`)
                ele.classList.add('ship')
                
                shipMap2.set(ele, ship)
            }
        }
    }
    
}

let shipMap1 = new Map()
function computerGameBoard() {
    
    function addShip(length, row, col, direction) {
        let bounds = '<5'
        if (row >5 || col >5) {
            bounds = '>5'
        }
        
        let ship = new Ship(length, direction, bounds, 'comp')
        if (direction == 'ver') {
            for (let i = 0; i < length; i++) {
                let pos = row + i
                if (row >= 5) {
                    pos = row - i
                }
                let ele = document.querySelector(`.x${pos}.y${col}`)
                ele.classList.add('ship')
                
                shipMap1.set(ele, ship)
            }
        } else {
            
            for (let i = 0; i < length; i++) {
                let pos = col + i
                if (col >= 5) {
                    pos = col - i
                }
                let ele = document.querySelector(`.x${row}.y${pos}`)
                ele.classList.add('ship')
                
                shipMap1.set(ele, ship)
            }
        }
    }
    function random(type) {
        if (type === 'num') {
            return Math.round(Math.random() * 9)
        } else {
            let arr = ['hor', 'ver']
            let r = Math.round(Math.random())
            return arr[r]
        }
    }
    addShip(5, random('num'), random('num'), random('dir'))
    addShip(4, random('num'), random('num'), random('dir'))
    addShip(3, random('num'), random('num'), random('dir'))
    addShip(3, random('num'), random('num'), random('dir'))
    addShip(2, random('num'), random('num'), random('dir'))
}
computerGameBoard()

function createLogs(msg) {
    let logContainer = document.querySelector('#logs')
    let div = document.createElement('div')
    div.textContent = msg
    logContainer.appendChild(div)
    div.scrollIntoView()
}

function handleShipClick(event) {
    let target = event.target
    let startX = parseInt(event.target.classList[2].slice(1)); // Extract x from class like x3 
    let startY = parseInt(event.target.classList[3].slice(1)); // Extract y from class like y2
    const clickedShip = shipMap1.get(event.target);
    if (target.classList.contains('ship')) {
        console.log(`hit a ship at: ${startX} ${startY}`)
        createLogs(`hit a ship at: ${startX} ${startY}`)
        target.classList.add('hit-ship')
        clickedShip.hit()
    } else {
        console.log(`missed a ship at: ${startX} ${startY}`)
        createLogs(`missed a ship at: ${startX} ${startY}`)
        target.classList.add('hit-miss')
    }

    event.target.removeEventListener('click', handleShipClick);
}

let gameEle = document.querySelectorAll('.game-ele')
for (let i = 0; i < gameEle.length; i++) {
    gameEle[i].addEventListener('click', handleShipClick);
}

function win(user) {
    if (computerShipsSunk === 5) {
        console.log(`${user} won the game`)
        createLogs(`${user} won the game`)
    }
}



// random causes overlap, if overlap can't win game


// i leave it at that for now. make sure to reference the odin page often. 
// They're smarter than you

// this is an ambitious project