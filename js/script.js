let imageURLs = [
    'https://mirpozitiva.ru/uploads/posts/2016-08/medium/1472042485_04.jpg',
    'https://mirpozitiva.ru/uploads/posts/2016-08/1472043884_02.jpg',
    'https://mirpozitiva.ru/uploads/posts/2016-08/medium/1472042585_06.jpg',
    'https://mirpozitiva.ru/uploads/posts/2016-08/medium/1472042805_21.jpg',
];

let rootElem = $('.galleryBack');

let galleryRootElem = $('<div>');
let slideContainerElem = $('<div>');
let buttonLeftElem = $('<div>');
let buttonRightElem = $('<div>');

galleryRootElem.addClass('galleryRoot');
slideContainerElem.addClass('slideContainer');
buttonLeftElem.addClass('buttonLeft');
buttonRightElem.addClass('buttonRight');

rootElem.append(galleryRootElem);
galleryRootElem.append(slideContainerElem, buttonLeftElem, buttonRightElem);

let slideElemHeight = galleryRootElem.height();
let slideElemWidth = galleryRootElem.width();

function createSlides(url) {
    let slideElem = $('<div>');
    slideElem.css({
        'width': slideElemWidth,
        'height': slideElemHeight,
        'background-image': `url(${url})`,
        'background-position': 'center',
        'background-size': 'cover',
    });
    slideContainerElem.append(slideElem);
}

imageURLs.forEach((element)=>{createSlides(element)});
// можно вызвать и способом ниже
// imageURLs.forEach(createSlides);

let isShaking = false;

function shaking(obj){
    console.log('shaking/n');
    console.log(obj);
    if (isShaking){return}
    isShaking = !isShaking;
    $(obj).animate({
        'top': '38%',
    },
        50).animate({
            'top': '42%',
        },
        50).animate({
            'top': '40%',
    }, 50,
        ()=>{isShaking = !isShaking}
        );
}

let isSliding = false;

function goLeft(obj) {
    console.log(obj);
    if (isSliding){return}
    let currentLeft = parseInt(slideContainerElem.css('left'));
    if (currentLeft === 0){
        shaking(obj);
        return;
    }
    isSliding = !isSliding;
    slideContainerElem.animate(
        {
            'left': `${currentLeft + slideElemWidth}px`
        },
        500,
        ()=>{isSliding = !isSliding}
    );
}

function goRight(obj) {
    console.log(obj);
    if (isSliding){return}
    let currentLeft = parseInt(slideContainerElem.css('left'));
    let positionIndex = -currentLeft/slideElemWidth;
    if ((positionIndex + 1) === imageURLs.length){
        shaking(obj);
        return;
    }
    isSliding = !isSliding;
    slideContainerElem.animate(
        {
            'left': `${currentLeft - slideElemWidth}px`
        },
        500,
        ()=>{isSliding = !isSliding}
    )
}

buttonLeftElem.click(function(){goLeft(this)});

buttonRightElem.click(function(){goRight(this)});