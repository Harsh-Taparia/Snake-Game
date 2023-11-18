let velocity = { x: 0, y: 0 };
let board = document.querySelector('.board');
let foodmusic = new Audio('food.mp3');
let gameovermusic = new Audio('gameover.mp3');
let movemusic = new Audio('move.mp3');
let bgmusic = new Audio('music.mp3');
let scoreCont = document.querySelector('.score')
let score = 0
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 }
let hiscoreval;
let highscorecont = document.querySelector('.highscore')
let play = document.querySelector('.play')
let reset = document.querySelector('.reset')
let bgaudio = document.querySelector('.bgaudio')
let isPlaying = false
let easy = document.querySelector('.easy')
let med = document.querySelector('.med')
let hard = document.querySelector('.hard')




let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
    hiscoreval = 0
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore)
    highscorecont.innerHTML = "High Score: " + hiscore
}


play.addEventListener('click', () => {
    easy.style.display = 'block'
    med.style.display = 'block'
    hard.style.display = 'block'

    play.style.display = 'none'



    easy.addEventListener('click', () => {
        let speed = 5

        easy.style.display = 'none'
        med.style.display = 'none'
        hard.style.display = 'none'


        // game functions
        function main(ctime) {
            window.requestAnimationFrame(main)
            if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
                return;
            }
            lastPaintTime = ctime;
            gameEngine()
        }

        function isCollide(snakeArr) {
            // if you bump into yourself
            for (let i = 1; i < snakeArr.length; i++) {
                if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
                    return true;
                }
            }
            // if you bump into the wall
            if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
                return true;
            }
        }

        function gameEngine() {
            // updating snake array
            if (isCollide(snakeArr)) {
                gameovermusic.play()
                velocity = { x: 0, y: 0 }
                alert("Game Over.  Press 'ENTER' to play again!.  Refresh to change level.")
                score = 0
                scoreCont.innerHTML = "Score: " + score
                snakeArr = [{ x: 13, y: 15 }]
            }

            // if snake eats food, increment score and regenerate food
            if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
                foodmusic.play()
                snakeArr.unshift({ x: snakeArr[0].x + velocity.x, y: snakeArr[0].y + velocity.y })
                let a = 2
                let b = 16
                food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
                score += 1
                scoreCont.innerHTML = "Score: " + score
                speed += 0.05
                if (score >= hiscoreval) {
                    hiscoreval = score
                    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
                    highscorecont.innerHTML = "High Score: " + hiscoreval
                }
            }

            // moving the snake
            for (let i = snakeArr.length - 2; i >= 0; i--) {
                snakeArr[i + 1] = { ...snakeArr[i] }
            }

            snakeArr[0].x += velocity.x
            snakeArr[0].y += velocity.y


            // render the snake and food
            // display the snake
            board.innerHTML = ""
            snakeArr.forEach((e, index) => {
                let snakeEl = document.createElement('div')
                snakeEl.style.gridRowStart = e.y
                snakeEl.style.gridColumnStart = e.x
                if (index === 0) {
                    snakeEl.classList.add('head')
                }
                else {
                    snakeEl.classList.add('snake')
                }
                board.appendChild(snakeEl)
            })

            // display the food
            let foodEl = document.createElement('div')
            foodEl.style.gridRowStart = food.y
            foodEl.style.gridColumnStart = food.x
            foodEl.classList.add('food')
            board.appendChild(foodEl)
        }






        // main logic
        window.requestAnimationFrame(main)

        window.addEventListener('keydown', e => {

            velocity = { x: 0, y: 1 } // start the game
            movemusic.play()

            switch (e.key) {

                case "ArrowUp":
                    console.log("up");
                    velocity.x = 0
                    velocity.y = -1
                    break

                case "ArrowDown":
                    console.log("down");
                    velocity.x = 0
                    velocity.y = 1
                    break

                case "ArrowLeft":
                    console.log("left");
                    velocity.x = -1
                    velocity.y = 0
                    break

                case "ArrowRight":
                    console.log("right");
                    velocity.x = 1
                    velocity.y = 0
                    break

                case "Enter":
                    velocity.x = 0
                    velocity.y = 0

                default:
                    break

            }
        })
    })





    med.addEventListener("click", () => {
        let speed = 6

        easy.style.display = 'none'
        med.style.display = 'none'
        hard.style.display = 'none'


        // game functions
        function main(ctime) {
            window.requestAnimationFrame(main)
            if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
                return;
            }
            lastPaintTime = ctime;
            gameEngine()
        }

        function isCollide(snakeArr) {
            // if you bump into yourself
            for (let i = 1; i < snakeArr.length; i++) {
                if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
                    return true;
                }
            }
            // if you bump into the wall
            if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
                return true;
            }
        }

        function gameEngine() {
            // updating snake array
            if (isCollide(snakeArr)) {
                gameovermusic.play()
                velocity = { x: 0, y: 0 }
                alert("Game Over. Press 'ENTER' to play again!. Refresh to change level.")
                score = 0
                scoreCont.innerHTML = "Score: " + score
                snakeArr = [{ x: 13, y: 15 }]
            }

            // if snake eats food, increment score and regenerate food
            if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
                foodmusic.play()
                snakeArr.unshift({ x: snakeArr[0].x + velocity.x, y: snakeArr[0].y + velocity.y })
                let a = 2
                let b = 16
                food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
                score += 1
                scoreCont.innerHTML = "Score: " + score
                speed += 0.1
                if (score >= hiscoreval) {
                    hiscoreval = score
                    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
                    highscorecont.innerHTML = "High Score: " + hiscoreval
                }
            }

            // moving the snake
            for (let i = snakeArr.length - 2; i >= 0; i--) {
                snakeArr[i + 1] = { ...snakeArr[i] }
            }

            snakeArr[0].x += velocity.x
            snakeArr[0].y += velocity.y


            // render the snake and food
            // display the snake
            board.innerHTML = ""
            snakeArr.forEach((e, index) => {
                let snakeEl = document.createElement('div')
                snakeEl.style.gridRowStart = e.y
                snakeEl.style.gridColumnStart = e.x
                if (index === 0) {
                    snakeEl.classList.add('head')
                }
                else {
                    snakeEl.classList.add('snake')
                }
                board.appendChild(snakeEl)
            })

            // display the food
            let foodEl = document.createElement('div')
            foodEl.style.gridRowStart = food.y
            foodEl.style.gridColumnStart = food.x
            foodEl.classList.add('food')
            board.appendChild(foodEl)
        }






        // main logic
        window.requestAnimationFrame(main)

        window.addEventListener('keydown', e => {

            velocity = { x: 0, y: 1 } // start the game
            movemusic.play()

            switch (e.key) {

                case "ArrowUp":
                    console.log("up");
                    velocity.x = 0
                    velocity.y = -1
                    break

                case "ArrowDown":
                    console.log("down");
                    velocity.x = 0
                    velocity.y = 1
                    break

                case "ArrowLeft":
                    console.log("left");
                    velocity.x = -1
                    velocity.y = 0
                    break

                case "ArrowRight":
                    console.log("right");
                    velocity.x = 1
                    velocity.y = 0
                    break

                case "Enter":
                    velocity.x = 0
                    velocity.y = 0

                default:
                    break

            }
        })
    })




    hard.addEventListener('click', ()=>{
        let speed = 7

        easy.style.display = 'none'
        med.style.display = 'none'
        hard.style.display = 'none'


        // game functions
        function main(ctime) {
            window.requestAnimationFrame(main)
            if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
                return;
            }
            lastPaintTime = ctime;
            gameEngine()
        }

        function isCollide(snakeArr) {
            // if you bump into yourself
            for (let i = 1; i < snakeArr.length; i++) {
                if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
                    return true;
                }
            }
            // if you bump into the wall
            if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
                return true;
            }
        }

        function gameEngine() {
            // updating snake array
            if (isCollide(snakeArr)) {
                gameovermusic.play()
                velocity = { x: 0, y: 0 }
                alert("Game Over. Press 'ENTER' to play again!. Refresh to change level.")
                score = 0
                scoreCont.innerHTML = "Score: " + score
                snakeArr = [{ x: 13, y: 15 }]
            }

            // if snake eats food, increment score and regenerate food
            if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
                foodmusic.play()
                snakeArr.unshift({ x: snakeArr[0].x + velocity.x, y: snakeArr[0].y + velocity.y })
                let a = 2
                let b = 16
                food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
                score += 1
                scoreCont.innerHTML = "Score: " + score
                speed += 0.3
                if (score >= hiscoreval) {
                    hiscoreval = score
                    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
                    highscorecont.innerHTML = "High Score: " + hiscoreval
                }
            }

            // moving the snake
            for (let i = snakeArr.length - 2; i >= 0; i--) {
                snakeArr[i + 1] = { ...snakeArr[i] }
            }

            snakeArr[0].x += velocity.x
            snakeArr[0].y += velocity.y


            // render the snake and food
            // display the snake
            board.innerHTML = ""
            snakeArr.forEach((e, index) => {
                let snakeEl = document.createElement('div')
                snakeEl.style.gridRowStart = e.y
                snakeEl.style.gridColumnStart = e.x
                if (index === 0) {
                    snakeEl.classList.add('head')
                }
                else {
                    snakeEl.classList.add('snake')
                }
                board.appendChild(snakeEl)
            })

            // display the food
            let foodEl = document.createElement('div')
            foodEl.style.gridRowStart = food.y
            foodEl.style.gridColumnStart = food.x
            foodEl.classList.add('food')
            board.appendChild(foodEl)
        }






        // main logic
        window.requestAnimationFrame(main)

        window.addEventListener('keydown', e => {

            velocity = { x: 0, y: 1 } // start the game
            movemusic.play()

            switch (e.key) {

                case "ArrowUp":
                    console.log("up");
                    velocity.x = 0
                    velocity.y = -1
                    break

                case "ArrowDown":
                    console.log("down");
                    velocity.x = 0
                    velocity.y = 1
                    break

                case "ArrowLeft":
                    console.log("left");
                    velocity.x = -1
                    velocity.y = 0
                    break

                case "ArrowRight":
                    console.log("right");
                    velocity.x = 1
                    velocity.y = 0
                    break

                case "Enter":
                    velocity.x = 0
                    velocity.y = 0

                default:
                    break

            }
        })
    })

})





bgaudio.addEventListener('click', () => {
    if (isPlaying === false) {
        bgmusic.play()
        isPlaying = true
        bgaudio.innerHTML = "Pause Background Music"
    }
    else {
        bgmusic.pause()
        isPlaying = false
        bgaudio.innerHTML = "Play Background Music"
    }
})

reset.addEventListener('click', () => {
    score = 0
    hiscore = 0
    scoreCont.innerHTML = "Score: " + score
    highscorecont.innerHTML = "High Score: " + hiscore
    localStorage.setItem('hiscore', hiscore)
    if (score >= hiscore) {
        hiscoreval = score
        localStorage.setItem('hiscore', hiscoreval)
    }
})
