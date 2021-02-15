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

    let names = ["Karin", "Elvira", "Namn"];
    let destinations = ["Floda", "Grekland", "Hit och dit"];
    let comments = ["Floda är bäst", "Jag vill till Grekland nu!", "Därför att"];

    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem('destinations', JSON.stringify(destinations));
    localStorage.setItem('comments', JSON.stringify(comments));

    for (let i = 0; i < names.length; i++) {
        $('#user-comments').append('<span class="comment-name">'+names[i]+'</span>');
        $('#user-comments').append('<span class="comment-destination">'+destinations[i]+'</span>');
        $('#user-comments').append('<span class="comment-why">'+comments[i]+'</span>');
    }

    $('.suggestion-button').on('click', function() {
        let currentNames = JSON.parse(localStorage.getItem('names'));
        let currentDestinations = JSON.parse(localStorage.getItem('destinations'));
        let currentComments = JSON.parse(localStorage.getItem('comments'));

        const newName = $('#name').val();
        const newDestination = $('#suggestion').val();
        const newComment = $('#comment').val();
        
        $('#user-comments').append('<span class="comment-name">'+newName+'</span>');
        $('#user-comments').append('<span class="comment-destination">'+newDestination+'</span>');
        $('#user-comments').append('<span class="comment-why">'+newComment+'</span>');

        currentNames.push(newName);
        currentDestinations.push(newDestination);
        currentComments.push(newComment);

        localStorage.setItem('names', JSON.stringify(currentNames));
        localStorage.setItem('destinations', JSON.stringify(currentDestinations));
        localStorage.setItem('comments', JSON.stringify(currentComments));

        $(this).closest('form').find("input[type=text], textarea").val("");
    })
})


