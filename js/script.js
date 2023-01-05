
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

let menuBtnMenu = document.querySelector('.catalog__menu-btn');
let menuS = document.querySelectorAll('.catalog__menu-top');

menuBtnMenu.addEventListener("click", function (event) {
    event.preventDefault();
    for (var i = 0; i < menuS.length; i++) {
        menuS[i].classList.toggle("catalog__menu-top--active");
    }

});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})

function hamburgerFunction(x) {
    x.classList.toggle("change");
}

let btnMenu = document.querySelector('.hamburger');
let menuOpen = document.querySelector('.menu__list-one');

btnMenu.addEventListener("click", function () {
    if (menuOpen.style.left === '0px') {
        menuOpen.style.removeProperty("left")
    } else {
        menuOpen.style.left = '0';
    }
});



btns = document.querySelector(".row").querySelectorAll(".column");
btns.forEach(element => {
    element.addEventListener("click", function () {
        btns.forEach(nav => nav.classList.remove("active"))

        this.classList.add("active");
    });
});




const btnFav = document.querySelector('[data-action="favourites"]');
const caunter = document.querySelector('[data-caunter]');
const total = document.querySelector('[data-total]');
const price = document.querySelector('[data-price]');

btnFav.addEventListener('click', function () {

    caunter.innerText = ++caunter.innerText;
    total.innerText = parseInt(total.innerText) + parseInt(price.innerText);


})










