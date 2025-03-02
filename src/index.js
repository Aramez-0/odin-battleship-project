import './style.css';

function createGrid(name) {
    let grid = document.querySelector(`#${name}`)
    
    const values = {
        0: '.',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
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
        if (name === 'grid1') {
            gameEle[i].classList.add(`x${x}`)
            gameEle[i].classList.add(`y${y}`)
        } else {
            gameEle[i].classList.add(`a${x}`)
            gameEle[i].classList.add(`b${y}`)
        }
    }
}

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
            if (this.user == 'comp') {
                createLogs('User sunk a ship', 'blue')
                computerShipsSunk ++
                win('User')
            } else {
                createLogs('Computer sunk a ship', 'blue')
                userShipsSunk ++
                win('Computer')
            }
        }
    }
}

let shipMap2 = new Map()
function userGameBoard() {
    createLogs('Coordinates are left then top')
    createLogs('set for random placement')
    
    function userShips() {
        let vertical = true
        let dirBtn = document.querySelector('#dir')
        let dir = 'ver'
        dirBtn.addEventListener('click', () => {
            if (vertical === true) {
                vertical = false
                dirBtn.textContent = 'Horizontal'
                dir = 'hor'
            } else {
                vertical = true
                dirBtn.textContent = 'Vertical'
                dir = 'ver'
            }
        })
        let coords = document.querySelector('#co-ords')
        let placeShip = document.querySelector('#place-ship')
        
        let shipPlacementState = {
            shipOrder: [5, 4, 3, 3, 2],
            placedShipsCount: 0,
            maxShips: 5,
        };

        placeShip.addEventListener('click', () => {
            
            if (coords.value === 'set') {
                randomShip('user', shipMap2, 'a', 'b')
                let setup = document.querySelector('#setup');
                let logContainer = document.querySelector('#logs');
                logContainer.innerHTML = '';
                setup.remove();
                computerGameBoard();
                return
            }
            
            let value = coords.value.trim().split(' ')

            if (value.length != 2 || /[a-zA-Z]/g.test(coords.value) || value[0] < 1 || value[0] > 10 || value[1] < 1 || value[1] > 10) {
                createLogs('Please enter valid coordinates')
                return
            }

            let row = parseInt(value[0] - 1)
            let col = parseInt(value[1] - 1)
            
            let length = shipPlacementState.shipOrder[shipPlacementState.placedShipsCount];
    
            let checkShip = addShip(length, row, col, dir, 'user', shipMap2, 'a', 'b');
        
            if (checkShip == true) {
                createLogs('Cannot place ships that collide')
                return;
            }
        
            shipPlacementState.placedShipsCount += 1;
        
            if (shipPlacementState.placedShipsCount === shipPlacementState.maxShips) {
                let setup = document.querySelector('#setup');
                let logContainer = document.querySelector('#logs');
                logContainer.innerHTML = '';
                setup.style.display = 'none'
                computerGameBoard();
            }
        })
    }
    userShips()
}

let shipMap1 = new Map()
function computerGameBoard() {
    randomShip('comp', shipMap1, 'x', 'y')

    let gameEle = document.querySelectorAll('.game-ele')
    for (let i = 0; i < 100; i++) {
        gameEle[i].addEventListener('click', handleShipClick);
    }
}

function addShip(length, row, col, direction, user, map, x, y) {
    let bounds = '<5'
    if (row >5 || col >5) {
        bounds = '>5'
    }
    let shipArr = []
    let ship = new Ship(length, direction, bounds, user)
    if (direction == 'ver') {
        for (let i = 0; i < length; i++) {
            let pos = row + i
            if (row >= 5) {
                pos = row - i
            }
            let ele = document.querySelector(`.${x}${pos}.${y}${col}`)

            if (ele.classList.contains('ship')) return true;

            let arr = [pos, col]
            shipArr.push(arr)

        }
    } else {
        for (let i = 0; i < length; i++) {
            let pos = col + i
            if (col >= 5) {
                pos = col - i
            }
            let ele = document.querySelector(`.${x}${row}.${y}${pos}`)
    
            if (ele.classList.contains('ship')) return true;

            let arr = [row, pos]
            shipArr.push(arr)

        }
    }
    for (let i = 0; i < length; i++) {
        let ele = document.querySelector(`.${x}${shipArr[i][0]}.${y}${shipArr[i][1]}`)
        ele.classList.add('ship')
        map.set(ele, ship)
    }
}

function randomShip(user, map, x, y) {
    function random(type) {
        if (type === 'num') {
            return Math.round(Math.random() * 9)
        } else {
            let arr = ['hor', 'ver']
            let r = Math.round(Math.random())
            return arr[r]
        }
    }
    
    function addRandomShip(length) {
        let checkShip = addShip(length, random('num'), random('num'), random('dir'), user, map, x, y)
        if (checkShip == true) {
            addRandomShip(length)
        }
    }
    
    addRandomShip(5)
    addRandomShip(4)
    addRandomShip(3)
    addRandomShip(3)
    addRandomShip(2)
}

function createLogs(msg, colour) {
    let logContainer = document.querySelector('#logs')
    let div = document.createElement('div')
    div.textContent = msg
    div.style.color = colour
    logContainer.appendChild(div)
    div.scrollIntoView()
}

function handleShipClick(event) {
    let target = event.target
    let startX = parseInt(event.target.classList[2].slice(1));  
    let startY = parseInt(event.target.classList[3].slice(1)); 
    const clickedShip = shipMap1.get(event.target);
    if (target.classList.contains('ship')) {
        createLogs(`User hit a ship at: ${startX + 1} ${startY + 1}`, 'red')
        target.classList.add('hit-ship')
        clickedShip.hit()
    } else {
        createLogs(`User missed a ship at: ${startX + 1} ${startY + 1}`, 'grey')
        target.classList.add('hit-miss')
    }
    compAttack()
    event.target.removeEventListener('click', handleShipClick);
}

function win(user) {
    if (computerShipsSunk === 5) {
        createLogs(`${user} won the game`, 'yellow')
        endGame(user)
    } else if (userShipsSunk === 5){
        createLogs(`${user} won the game`, 'yellow')
        endGame(user)
    }
}

function compAttack() {
    let a = Math.round(Math.random() * 9)
    let b = Math.round(Math.random() * 9)
    let ele = document.querySelector(`.a${a}.b${b}`)
    if (ele.classList.contains('hit-ship') || ele.classList.contains('hit-miss')) {
        compAttack()
    }
    let clickedShip = shipMap2.get(ele)
    console.log(clickedShip)
    if (ele.classList.contains('ship')) {
        createLogs(`Computer hit a ship at: ${a + 1} ${b + 1}`, 'red')
        ele.classList.add('hit-ship')
        clickedShip.hit()
    } else {
        createLogs(`Computer missed a ship at: ${a + 1} ${b + 1}`, 'grey')
        ele.classList.add('hit-miss')
    }
}

let computerShipsSunk = 0
let userShipsSunk = 0
createGrid('grid1')
createGrid('grid2')
userGameBoard()

function endGame(user) {
    let dialog = document.querySelector('#end')
    dialog.showModal()
    let p = document.createElement('p')
    p.textContent = `${user} won the game`
    dialog.appendChild(p)
    let btn = document.createElement('button')
    btn.type = 'button'
    btn.textContent = 'Reload'
    dialog.appendChild(btn)
    btn.addEventListener('click', () => {
        location.reload()
    })
}