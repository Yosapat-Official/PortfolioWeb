const $window = $(window);
const $body = $('body');
const $document = $(document);

let vh = window.innerHeight;
// const kv2fv = () => {
// 	const $kv = $("#kv");
// 	if ($kv.length) {
// 		$("#fv").css({ height: $kv.innerHeight() });
// 	}
// };

document.documentElement.style.setProperty('--vh', `${vh}px`);
// kv2fv();

let resizeTimer;
window.addEventListener('resize', () => {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		vh = window.innerHeight;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		// kv2fv();
	}, 200);
}, { passive: true });

// =======================================================
// Opens slide
// =======================================================

//show exit icon on slide click
$(".js-slide").on('click', function(){
    $(".gnav__exit").addClass('is-active');
    $("html,body").css({overflow:'hidden'});
});

//close slide
$('[data-item-close]').on('click', function(){
    $('.gnav__exit').removeClass('is-active');
    $('.item__content').removeClass('is-active');
    $('[data-item-base]').removeClass('is-active');
    $('[data-item-window]').removeClass('is-active');
    $("html,body").css({overflow:'visible'});
});

jQuery(document).ready(function($){
    // Open item
    $('.webdev__item').on('click', function(){
        var target = $(this).data('webdev');
        // Remove any existing active states first
        $('.item__content').removeClass('is-active');
        // Add active to matching content
        $('.item__content[webdev-item="' + target + '"]').addClass('is-active');
        // Add background/open state
        $('[data-item-window]').addClass('is-active');
        $('[data-item-base]').addClass('is-active');

    });

    $('.seo__item').on('click', function(){
        var target = $(this).data('seo');
        // Remove any existing active states first
        $('.item__content').removeClass('is-active');
        // Add active to matching content
        $('.item__content[seo-item="' + target + '"]').addClass('is-active');
        // Add background/open state
        $('[data-item-window]').addClass('is-active');
        $('[data-item-base]').addClass('is-active');

    });

    $('.graphic__item').on('click', function(){
        var target = $(this).data('graphic');
        // Remove any existing active states first
        $('.item__content').removeClass('is-active');
        // Add active to matching content
        $('.item__content[graphic-item="' + target + '"]').addClass('is-active');
        // Add background/open state
        $('[data-item-window]').addClass('is-active');
        $('[data-item-base]').addClass('is-active');
    });
});