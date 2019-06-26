$(document).ready(function() {

    $('.portfolio_item').on('click', function() {
        openPortfolioLink.call(this)
    });

    preload();

    $(window).on('scroll', function() {
        let wt = $(this).scrollTop();
        showItemOnScroll($('.portfolio > h2'), wt - 200);
        showPortfolioItems(wt - 150);
    });


    function preload() {
        let
            preloader    = $('.preloader'),
            hideContent  = $('.hide_content'), // селектор прелоадера
            imagesCount  = $('img').length, // количество изображений
            percent      = 100 / imagesCount, // количество % на одну картинку
            progress     = 0, // точка отсчета
            imgSum       = 5, // количество картинок
            loadedImg    = 0; // счетчик загрузки картинок

        if (imagesCount >= imgSum && imagesCount > 0) {
            for (let i = 0; i < imagesCount; i++) { // создаем клоны изображений
                let img_copy        = new Image();
                img_copy.src        = document.images[i].src;
                img_copy.onload     = img_load;
                img_copy.onerror    = img_load;
            }

            function img_load () {
                progress += percent;
                loadedImg++;
                if (progress >= 100 || loadedImg === imagesCount) {
                    hideContent.addClass('hidden');
                    preloader.addClass('hidden');
                    animateHello();
                    showItem($('.me_img'));
                    setTimeout(function() {
                        hideContent.css('display', 'none');
                    }, 1000);
                }
                preloader.stop().animate({
                    width: progress + '%'
                }, 10);
            }
        }
    }

    function animateHello() {
        showItemsByTurn($('.header_hello li'), 200);
        setTimeout(function() {
            animateHeaderDescription();
            showItem($('.scroll'));
        }, 1000)
    }
    
    function animateHeaderDescription() {
        showItemsByTurn($('.header_content_descr p'), 700)
    }

    function openPortfolioLink() {
        let link = $(this).attr('data-href');
        window.open(link);
    }

    function showItemsByTurn(items, interval) {
        (function pushLetter(i) {
            if(i === items.length) return;
            setTimeout(function() {
                showItem($(items[i]));
                pushLetter(i + 1);
            }, interval)
        })(0);
    }

    function showItem(item, delay = 0) {
        setTimeout(function() {
            item.addClass('visible');
        }, delay)
    }

    function showItemOnScroll(item, scrollTop) {
        if(item.offset().top < scrollTop + $(window).height()) {
            showItem(item);
        }
    }

    function showPortfolioItems(scrollTop) {
        let item = $('.portfolio_item');
        if(item.offset().top < scrollTop + $(window).height()) {
            showItemsByTurn(item, 300);
        }
    }
});