const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

let menuBtnMenu = document.querySelector('.catalog__menu-btn');
let menuS = document.querySelectorAll('.catalog__menu-top');

//открытие и закрытие каталога
menuBtnMenu.addEventListener("click", function (event) {
    event.preventDefault();
    for (var i = 0; i < menuS.length; i++) {
        menuS[i].classList.toggle("catalog__menu-top--active");
    }
});

//Переключение 'tab'
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

//Кнопка меню
function hamburgerFunction(x) {
    x.classList.toggle("change");
}

let btnMenu = document.querySelector('.hamburger');
let menuOpen = document.querySelector('.menu__list-one');
//Мобильное меню
btnMenu.addEventListener("click", function () {
    if (menuOpen.style.left === '0px') {
        menuOpen.style.removeProperty("left")
    } else {
        menuOpen.style.left = '0';
    }
});
//Переключение кнопки активности "carousel"
btns = document.querySelector(".row").querySelectorAll(".column");
btns.forEach(element => {
    element.addEventListener("click", function () {
        btns.forEach(nav => nav.classList.remove("active"))

        this.classList.add("active");
    });
});

//Находим кнопки корзины
const btnBaskets = document.querySelector('[data-action="baskets"]');
const btnFavourites = document.querySelector('[data-action="favourites"]');
//Находим кнопки избранное
const caunterLike = document.querySelector('[data-action="like"]');
const caunter = document.querySelector('[data-caunter]');
//Находим кнопки корзины
const total = document.querySelector('[data-total]');
const price = document.querySelector('[data-price]');
//Находим кнопки сравнение
const caunterCompare = document.querySelector('[data-action="compare"]');
const btnCompare = document.querySelector('[data-action="btncompare"]');


//Добавляем и убираем сравнение
btnCompare.addEventListener('click', function () {
    if (caunterCompare.innerText <= 0) {
        caunterCompare.innerText = 1;
        btnCompare.innerText = 'Удалить'
    } else {
        caunterCompare.innerText = 0;
        btnCompare.innerText = 'Сравнить';
    };
});

//Добавляем и убираем избранное
btnFavourites.addEventListener('click', function () {
    if (caunterLike.innerText <= 0) {
        caunterLike.innerText = 1;
        btnFavourites.innerText = 'Убрать';
    } else {
        caunterLike.innerText = 0;
        btnFavourites.innerText = 'В ИЗБРАННОЕ';
    }
})
//Добавляем в корзину и производим пересчет суммы
btnBaskets.addEventListener('click', function () {
    caunter.innerText = ++caunter.innerText;
    total.innerText = parseInt(total.innerText) + parseInt(price.innerText);
});


//Raiting
const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
    initRatings();
}
//Основная функция
function initRatings() {
    let ratingActive, ratingValue;
    //бегаем по всеи рейтингам на странице
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
    }
    //Инициализируем конкретный рейтинг  
    function initRating(rating) {
        initRatingVars(rating);

        setRatingActiveWidth();

        if (rating.classList.contains('rating_set')) {
            setRating(rating);
        }
    }


    //Инициализация переменых
    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }

    //Измением ширину активных звезд
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    //Возможность указывать оценку
    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rating__item');
        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", function (e) {
                //Обновление переменных
                initRatingVars(rating);
                //Обновление активных звезд
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", function (e) {
                //Обновление активных звезд
                setRatingActiveWidth();
            });
            ratingItem.addEventListener("click", function (e) {
                //Обновление переменных
                initRatingVars(rating);

                if (rating.dataset.ajax) {
                    //Отправить на сервер
                    setRatingValue(ratingItem.value, rating);
                } else {
                    //Отобразить указанную оценку
                    ratingValue.innerHTML = index + 1;
                    setRatingActiveWidth();
                }
            });

        }
    }

    async function setRatingValue(value, rating) {
        if (!rating.classList.contains('rating_sending')) {
            rating.classList.add('rating_sending');

            //Отправка данных (value) на сервер
            let response = await fetch('rating.json', {
                method: 'GET',

                //Отправка на сервер

                //body: JSON.stringify({
                //userRating: value
                //}),
                //headers: {
                //'content-type': 'application/json'
                //}
            });
            if (response.ok) {
                const result = await response.json();

                //Получаем новый рейтинг
                const newRating = result.newRating;

                //Вывод нового среднего результата
                ratingValue.innerHTML = newRating;

                //Обновление активных звезд
                setRatingActiveWidth();

                rating.classList.remove('rating_sending');
            } else {
                alert("Ошибка");

                rating.classList.remove('rating_sending');
            }
        }
    }
}
