$(document).ready(() => {
    $('.main-form').hide();
    $('#destination-input').on('click', () => {
        $('.main-form').toggle();
    });
})