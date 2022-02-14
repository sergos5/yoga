window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    let infoHeader = document.querySelector('.info-header'),
        infoBtn = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    // скрываем все таб-элементы, коме первого

    function hideTabContent(a) {
        for (let i=a; i<tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    // пишем ф-цию, которая будет показывать нужный таб-элемент

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    
    infoHeader.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i=0; i<infoBtn.length; i++) {
                if (target==infoBtn[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer 

    let deadline ='2022-02-15T03:00:00';

    function getTimeRemaining (endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));
        
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock (id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock () {
            let c = getTimeRemaining (endtime);

            function addZero (num) {
                if(num<=9) {
                    return '0'+num;
                } else {
                    return num;
                }
            }

            hours.textContent = addZero(c.hours);
            minutes.textContent = addZero(c.minutes);
            seconds.textContent = addZero(c.seconds);

            if (c.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }
    setClock('timer', deadline);

    // Modal

    let more = document.querySelectorAll('.more, .description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.forEach(item => {
        item.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });
    
    close.addEventListener('click', () =>{
        overlay.style.display = 'none';
        document.body.style.overflow = '';   
        more.forEach(function(item) {
            item.classList.remove('more-splash');
        });
        //statusMessage.innerHTML = ''; //Убирает сообщение "Мы скоро с Вами свяжемся!"
    });

    // sending forms

    let message = {
        loading: "Идет загрузка...",
        success: "Мы скоро с Вами свяжемся!",
        failure: "Упс! Что-то пошло не так!..."
    };

    let forms = document.querySelectorAll('.main-form, #form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    forms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);
    
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
            let formData = new FormData(form);
    
            let obj = {};
            formData.forEach(function(value,key) {
                obj[key] = value;
            });
    
            let json = JSON.stringify(obj);
    
            request.send(json);
    
            request.addEventListener('readystatechange', function () {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status ==200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });
    
            for (let i=0; i<input.length; i++) {
                input[i].value = '';            
            }
            
            // убираем statusMessag через 5 сек
            setTimeout (() => statusMessage.innerHTML = '', 5000);
                
        });
    });

    // Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {
        if(n>slides.length) {
            slideIndex = 1;
        }
        if(n<1) {
            slideIndex=slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].classList.add('dot-active');
    }

    function plusSlides (n) {
        showSlides(slideIndex+=n);
    }

    function currentSlides(n) {
        showSlides(slideIndex=n);
    }

    next.addEventListener('click', () => {
        plusSlides(1);
    });

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i=0; i<dots.length+1; i++) {
            if (event.target.classList.contains('dot') && event.target==dots[i-1]) {
                currentSlides(i);
            }
        }
    });


});