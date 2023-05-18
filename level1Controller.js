let level = 1;
let snake;
let row = 20; // so dong
let col = 25; // so cot
let way = 0;
let food;
let score = 0;
let target =300;

let isClick = 0;
let countMusic = 0;
document.getElementById('radio').addEventListener("click", ev => {
    countMusic++;
    if (countMusic % 2 === 1) {
        audio.play();
    } else {
        if (countMusic % 2 === 0) {
            audio.pause();
        }
    }
});
let audio = new Audio('audio/hay-fever-piano-jazz-peanuts-1960s-flute-instrumental-141574.mp3');
document.getElementById('play').addEventListener("click", ev => {

    setInterval(drawSnake, 20);
    setInterval(Food, 10);
    setInterval(run, 300);

});

// 1. Người chơi nhấn nút "Start"
$(document).ready(function () {
    $('#level').text(level);
    let x = parseInt(Math.random() * 20); // tạo moi ngau nhien theo dong
    let y = parseInt(Math.random() * 25);// tạo moi ngau nhien theo cột
    snake = [[x, y], [x + 1, y]];
    randomFood();
    
    for (let i = 0; i < row; i++) {
        r = $('<div>').addClass('row'); // them the div co ten row
        for (let j = 0; j < col; j++) {
            cell = $('<div>').addClass('cell  col border cell' + '-' + i + '-' + j).addClass('grass');
            r.append(cell);
            
        }
        $('.game').append(r);
    }
});

// 2.2. Hệ thống vẽ thức ăn
function drawFood(x, y) {
    $('.cell' + '-' + x + '-' + y).addClass('black ');
    $('.cell' + '-' + x + '-' + y).addClass('apple');
}


// 2.1. Hệ thống vẽ rắn
function drawSnake() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            $('.cell' + '-' + i + '-' + j).removeClass('bg-green');
        }
    }
    for (let i = 0; i < snake.length; i++) {
        draw(snake[i][0], snake[i][1]);
    }
}
function Food() {
    drawFood(food[0], food[1]);
}

function randomFood() {
    let x = parseInt(Math.random() * 20); // dong
    let y = parseInt(Math.random() * 25);// cot
    food = [x, y];


}

// 4.Hệ thống kiểm tra va chạm với thức ăn
function eatFood() {
    if (snake[0][0] === food[0] && snake[0][1] === food[1]) {
        let newSnake = [snake[0][0], snake[0][1]]; 

        // 4.1. Tăng chiều dài rắn
        let middile = Math.floor(snake.length / 2);
        snake.splice(middile, 0, newSnake);
        score += 10; 
        $('#socre').text('' + score); 

        // 4.2. Xóa thức ăn cũ, tạo thức ăn mới 
        $('.cell' + '-' + food[0] + '-' + food[1]).removeClass('black  ');
        $('.cell' + '-' + food[0] + '-' + food[1]).removeClass('apple ');
        randomFood();
    }

}

// 5.Hệ thống kiểm tra chạm với chính nó
function isCheck() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0][0] === snake[i][0] && snake[0][1] === snake[i][1]) {
            snake = []; 

            // 5.1 Nếu chạm vào chính thì thông báo thua
            $('.modal').addClass('open');
            $('.game_over').addClass('titleb_lock');
            document.getElementById('exit').addEventListener("click", ev => {
                $('.modal').removeClass('open');
                $('.game_over').removeClass('titleb_lock');
                snake = [];
                let x = parseInt(Math.random() * 20); 
                let y = parseInt(Math.random() * 25);
                snake = [[x, y], [x + 1, y]];
                score = 0; 
                $('#socre').text('' + score);
            });
        }
    }
}
