let count =0;
document.getElementById('menu'),addEventListener("click", ev => {
    count++;
    if(count %2===1){
        $('.chil_menu').addClass('block');
    }else {
        if (count % 2 === 0) {
            $('.chil_menu').removeClass('block');
        }
    }
});
// use case đã chọn - level

    document.getElementById('level1').addEventListener("click", ev => {
        window.location.href='level1.html';
    });
    document.getElementById('level2').addEventListener("click", ev => {
        window.location.href='level2.html';
    })
    document.getElementById('level3').addEventListener("click", ev => {
        window.location.href='level3.html';
    });
    document.getElementById('level4').addEventListener("click", ev => {
        window.location.href='level4.html';
    });
