var imgList = Array.from(document.querySelectorAll('.item img'));
var lightBoxContainer = document.querySelector('#light-box-container');
var leftBtn = document.getElementById('left');
var closeBtn = document.getElementById('exit');
var rightBtn = document.getElementById('right');
var lightBoxItem = document.getElementById('light-box-item');

var currentIndex = 0;

for (let i = 0; i < imgList.length; i++) {
    imgList[i].addEventListener('click',function(e){
        var imgClicked = e.target;
        var imgSrc = imgClicked.getAttribute('src');
        currentIndex = imgList.indexOf(e.target);
        lightBoxItem.style.backgroundImage = `url(${imgSrc})`
        lightBoxContainer.style.display = 'flex'
    });
}

function closeContainer() {
    lightBoxContainer.style.display = 'none';
}
function nextSlide(){
    currentIndex ++;
    if(currentIndex == imgList.length-1){
        currentIndex =0;
    }
    var imgSrc = imgList[currentIndex].src;
    lightBoxItem.style.backgroundImage = `url(${imgSrc})`;
}
function prevSlide(){
    currentIndex --;
    if(currentIndex < 0){
        currentIndex = imgList.length - 1;
    }
    var imgSrc = imgList[currentIndex].src;
    lightBoxItem.style.backgroundImage = `url(${imgSrc})`;
}


closeBtn.addEventListener('click',closeContainer);
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevSlide);
document.body.addEventListener('keydown',function(eventInfo){
    if(eventInfo.key == 'Escape'){
        closeContainer();
    }
    else if(eventInfo.keyCode == '37'){
        prevSlide();
    }
    else if(eventInfo.keyCode == '39'){
        nextSlide();
    }
});