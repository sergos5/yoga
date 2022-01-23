window.addEventListener('DOMContentLoaded', function() {

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

    let deadline ='2022-01-24T00:00:00';

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

    let more = document.querySelector('.more'),
        moreTab = document.querySelectorAll('.description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    
    });


});