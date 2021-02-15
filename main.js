$(document).ready(() => {

    $('.en').hide();
    $('.sv').show();

    $('#lang-switch').change(function() {
        let lang = $(this).val();
        $('.en').hide();
        $('.sv').hide();
        if (lang === 'en') {
            $('.en').show();
            $('#destination__input-subjects').removeAttr('list');
            $('#destination__input-subjects').attr('list', 'destination__subjects-en');
        } else {
            $('.sv').show();
            $('#destination__input-subjects').removeAttr('list');
            $('#destination__input-subjects').attr('list', 'destination__subjects-sv');
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


