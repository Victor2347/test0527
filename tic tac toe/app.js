const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const startCells = ["", "", "", "", "", "", "", "", ""]
infoDisplay.textContent = "circle go first"
let go = "circle"
function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
       
        // cellElement.innerHTML = index.toString()
        cellElement.id = index
        cellElement.addEventListener("click", addGo)
        gameBoard.appendChild(cellElement)
       
    })
}

function addGo(e) {
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.appendChild(goDisplay)
    go = go === "circle"? "cross" : "circle"
    infoDisplay.textContent = `${go} go first`
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    winningCombos.forEach((array) => {
        const circleWins = array.every((index) => {
            return allSquares[index].firstChild && allSquares[index].firstChild.classList.contains("circle")
        })
        if (circleWins) {
            infoDisplay.textContent = "circle win"
            allSquares.forEach((square) => {
                square.replaceWith(square.cloneNode(true))
            })
            return // Stop further checking after a win is found
        }
    })

    winningCombos.forEach((array) => {
        const crossWins = array.every((index) => {
            return allSquares[index].firstChild && allSquares[index].firstChild.classList.contains("cross")
        })
        if (crossWins) {
            infoDisplay.textContent = "cross win"
            allSquares.forEach((square) => {
                square.replaceWith(square.cloneNode(true))
            })
            return // Stop further checking after a win is found
        }
    })
}

createBoard()