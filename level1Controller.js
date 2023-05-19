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

// Hoang Thanh Ngoan
// dat bien kiem tra
let result = true;

// 7. dieu khien ran di chuyen len , xuong, trai , phai
document.addEventListener("keydown", ev => { // 7.1 gọi tới các button và gán hướng di chuyển cho button đó
    switch (ev.keyCode) {
        // nut trái có keycode là 37
        case 37 :
            if (direction !== "RIGHT")
                direction = "LEFT";
            break;
        // nut len có keycode là 38
        case 38 :
            if (direction !== "DOWN") {
                direction = "UP";
            }
            break;
        // nut phai co keycode laf 39
        case 39 :
            if (direction !== "LEFT") {
                direction = "RIGHT";
            }
            break;
        // nut xuong cos key code la 40
        case 40 :
            if (direction !== "UP") {
                direction = "DOWN";
            }
            break;
    }
});
//   8.di chuyển rắn trái, phải lên xuống bằng các nút điều khiển trên keyboard
function moveSnake() {
    switch (direction) {
        case "UP": // lên
            cell = snake.pop();
            cell[0] = snake[0][0] - 1;
            cell[1] = snake[0][1];
            // khong cho phép chạm vào các biên đối với level

            if (cell[0] < 0) {
                $('.modal').addClass('open'); // them class open vao lớp modal
                $('.game_over').addClass('titleb_lock');//thêm titleb_lock ra khỏi class game_over
                document.getElementById('exit').addEventListener("click", ev => {
                    $('.modal').removeClass('open');  //xoa class open vao lớp modal
                    $('.game_over').removeClass('titleb_lock'); //xoá titleb_lock ra khỏi class game_over
                    snake = []; //tra ve mang moi
                    let x = parseInt(Math.random() * 20); //tạo moi ngau nhien theo row
                    let y = parseInt(Math.random() * 25); //tao moi ngau nhien theo col
                    snake = [[x, y], [x + 1, y]]; //ve lại ran
                    score = 0; // sau thua diem tra ve lai khong
                    $('#socre').text(score); // ghi điem bang jquery
                });
            }
            snake.unshift(cell);
            isCheck();
            eatFood();
            if (score === 50 && result === true  ) {
                snake = [];// tra ve mang rong
                $('.modal').addClass('open');// them class open vao score
                $('.win').addClass('titleb_lock');// them class titleb_lock vào class có tên win
                document.getElementById('exit').addEventListener("click", ev => {
                    if (score === 50 || score === 0 || score < 50) {
                        $('.modal').removeClass('open');//xoa class open vao score
                        $('.win').removeClass('titleb_lock');//xoá class titleb_lock vào class có tên win
                        window.location.href='level2.html'; //chuyển qua màn hình level2
                    }
                });
                //
            }
            break;
        case "DOWN": // xuong
            cell = snake.pop();
            cell[0] = snake[0][0] + 1;
            cell[1] = snake[0][1];
            // dieu kien quay tro lại
            if (cell[0] >= row) {
                $('.game_over').addClass('titleb_lock');  //them class titleb_lock vào class có tên là game_over
                $('.modal').addClass('open'); //them class open vào class có tên là modal
                document.getElementById('exit').addEventListener("click", ev => {
                    $('.modal').removeClass('open'); //xoá class open ra class có tên là modal
                    $('.game_over').removeClass('titleb_lock');//xoá class titleb_lock ra class có tên là game_over
                    snake = []; // tra ve mang moi
                    let x = parseInt(Math.random() * 20); // tạo moi ngau nhien theo row
                    let y = parseInt(Math.random() * 25); // tao moi ngau nhien theo col
                    snake = [[x, y], [x + 1, y]]; // ve lại ran
                    score = 0; //sau thua diem tra ve lai khong
                    $('#socre').text(score); // ghi điem bang jquery
                });
            }
            snake.unshift(cell);
            isCheck();
            eatFood();
            if (score === 50 && result === true ) {
                snake = [];
                $('.modal').addClass('open'); //them class open vào class modal
                $('.win').addClass('titleb_lock');//them titleb_lock open vào class win
                document.getElementById('exit').addEventListener("click", ev => {
                    if (score === 50 || score === 0 || score < 50) {
                        $('.modal').removeClass('open'); //xoá open ra class có tên là  modal
                        $('.win').removeClass('titleb_lock'); //xoá titleb_lock ra class có tên là  win
                        window.location.href='level2.html';//chuyển qua màn hình level2
                    }
                });
            }
            break;
        case "LEFT": // trai
            cell = snake.pop();
            cell[0] = snake[0][0];
            cell[1] = snake[0][1] - 1;
            if (cell[1] < 0) {
                $('.game_over').addClass('titleb_lock');  //them class titleb_lock vào class có tên là game_over
                $('.modal').addClass('open'); //them class open vào class có tên là modal
                document.getElementById('exit').addEventListener("click", ev => {
                    $('.modal').removeClass('open'); //xoá class open ra class có tên là modal
                    $('.game_over').removeClass('titleb_lock');//xoá class titleb_lock ra class có tên là game_over
                    snake = []; // tra ve mang moi
                    let x = parseInt(Math.random() * 20); // tạo moi ngau nhien theo row
                    let y = parseInt(Math.random() * 25); // tao moi ngau nhien theo col
                    snake = [[x, y], [x + 1, y]]; // ve lại ran
                    score = 0; //sau thua diem tra ve lai khong
                    $('#socre').text(score); // ghi điem bang jquery
                });
            }
            snake.unshift(cell);
            isCheck();
            eatFood();

            if (score === 50 && result === true  ) {
                snake = [];
                $('.modal').addClass('open');
                $('.win').addClass('titleb_lock');
                document.getElementById('exit').addEventListener("click", ev => {
                    if (score === 50 || score === 0 || score < 50) {
                        $('.modal').removeClass('open');
                        $('.win').removeClass('titleb_lock');
                        window.location.href='level2.html';
                    }
                });
            }

            break;
        case "RIGHT": // phai
            cell = snake.pop();
            cell[0] = snake[0][0];
            cell[1] = snake[0][1] + 1;

            if (cell[1] >= col) {

                $('.modal').addClass('open');
                $('.game_over').addClass('titleb_lock');
                document.getElementById('exit').getElementById('exit').addEventListener("click", ev => {
                    $('.modal').removeClass('open');
                    $('.game_over').removeClass('titleb_lock');
                    snake = []; // tra ve mang moi
                    let x = parseInt(Math.random() * 20); // tạo moi ngau nhien theo row
                    let y = parseInt(Math.random() * 25); // tao moi ngau nhien theo col
                    snake = [[x, y], [x + 1, y]]; // ve lại ran
                    score = 0; // sau thua diem tra ve lai khong
                    $('#socre').text(score); // ghi điem bang jquery
                });
            }


            snake.unshift(cell);
            isCheck();
            eatFood();

// level 2
            if (score === 50 && result === true  ) {
                snake = [];
                $('.modal').addClass('open'); //them class open vào class modal
                $('.win').addClass('titleb_lock');//them titleb_lock open vào class win
                document.getElementById('exit').addEventListener("click", ev => {
                    if (score === 50 || score === 0 || score < 50) {
                        $('.modal').removeClass('open'); //xoá open ra class có tên là  modal
                        $('.win').removeClass('titleb_lock'); //xoá titleb_lock ra class có tên là  win
                        window.location.href='level2.html';//chuyển qua màn hình level2
                    }
                });
            }

            // dieu kien ran va cham chuong ngai vat

            break;

    }
}