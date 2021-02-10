$(document).ready(() => {

    $('.en').hide();
    $('.sv').show();

    $('#lang-switch').change(function() {
        let lang = $(this).val();
        $('.en').hide();
        $('.sv').hide();
        if (lang === 'en') {
            $('.en').show();
        } else {
            $('.sv').show();
        }
    });

    $('.main-form').hide();
    $('.destination-input').on('click', () => {
        $('.main-form').toggle();
        $('#name').focus();
    });

    $('#icon').click(function(){
        $('ul').toggleClass('show');
    })
})


