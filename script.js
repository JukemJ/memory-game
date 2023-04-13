document.querySelector('#new-game').addEventListener('click',function(){newGame(4)})
const timerElement = document.querySelector('#timer')
const moveCount = document.querySelector('#counter')
let lastPicked
let lastId
let moves = 0
let seconds = 0


function newGame(boardSize){
    document.querySelector('#game-board').innerText= ''
    clearInterval(upTimer)
    createBoard(boardSize)
    timerElement.innerHTML = '0:00'
    seconds = 0
    moves = 0
    moveCount.innerText = moves
    var timer = setInterval(upTimer, 1000)
    
}



function createBoard(size){ 
    let nums = Array(size*2).fill(null).map((x,i) => i+1)
    nums = nums.concat(nums)
    let count = 0
    const board = document.getElementById('game-board') 
    for(let i = 0; i < size; i++){ 
      let row = document.createElement("div"); 
      row.classList.add('row','justify-content-center')
      for(let j = 1; j <= size; j++){
        count++ 
        const num = nums.splice(Math.floor(Math.random() * nums.length),1)
        let cell = document.createElement("div"); 
        cell.classList.add('col-1','cell','m-1')
        cell.setAttribute("id", count)
        cell.setAttribute('value', num)
        row.appendChild(cell)
      } 
      board.appendChild(row)
    }
    const cells = document.querySelectorAll('.cell')
    cells.forEach(x => x.addEventListener('click', reveal))
  }

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  function reveal(){
    const id = this.getAttribute('id')
    if(id == lastId) return //if you click the same cell then don't do anything
    moveCount.innerText = moves
    this.classList.add('show')
    const num = this.getAttribute('value')
    lastId = id
    this.innerText = num
    if(this.getAttribute('value') == lastPicked){
        const cells = document.querySelectorAll('.cell')
        cells.forEach(x => {
            if(num == x.getAttribute('value')) x.classList.add('matched')
        })
        lastPicked = null
        moves++
        moveCount.innerText = moves
    }
    else if(!lastPicked) lastPicked = num
    else {
        document.querySelectorAll('.cell').forEach(x => {
            x.classList.remove('show')
            x.innerText = ''
        })
        lastPicked = null
        lastId = null
        moves++
        moveCount.innerText = moves

        //this puts back the value of the matched cells...
        //there is a better way to do this but I don't know how
        document.querySelectorAll('.matched').forEach(x => x.innerText = x.getAttribute('value'))
    }
  }


function upTimer() {
    ++seconds;
    let hour = Math.floor(seconds / 3600);
    let minute = Math.floor((seconds - hour * 3600) / 60)
    let updSecond = seconds - (hour * 3600 + minute * 60)
    timerElement.innerHTML = minute + ":" + updSecond.toString().padStart(2,'0')

}