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
    });

    $('#destination__rules').click(function() {
        window.open('/rules.html', 'popup', 'height=500,width=400,toolbar=no');
    });

    $('#destination__rules-en').click(function() {
        window.open('/rules.html', 'popup', 'height=500,width=400,toolbar=no');
    });

    const posts = [
        {
            name: "Helene",
            destination: "Florida",
            comment: "Mitt favoritresmål! Är här ett par månader varje vinter och det är det bästa som finns!"
        },
        {
            name: "Elvira",
            destination: "Grekland",
            comment: "Jag vill till Grekland nu!"
        },
        {
            name: "Användare",
            destination: "Hit och dit",
            comment: "Därför att"
        },
    ];

    if (!localStorage.getItem('posts')) {
        localStorage.setItem('posts', JSON.stringify(posts));
    }
    
    const postsToShow = JSON.parse(localStorage.getItem('posts'));


    for (let i = 0; i < postsToShow.length; i++) {
        $('#user-comments').append('<span class="comment-name">'+postsToShow[i].name+'</span>');
        $('#user-comments').append('<span class="comment-destination">'+postsToShow[i].destination+'</span>');
        $('#user-comments').append('<span class="comment-why">'+postsToShow[i].comment+'</span>');
    }

    $('.suggestion-button').on('click', function() {
        let currentPosts = JSON.parse(localStorage.getItem('posts'));

        const newName = $('#name').val();
        const newDestination = $('#suggestion').val();
        const newComment = $('#comment').val();
        
        $('#user-comments').append('<span class="comment-name">'+newName+'</span>');
        $('#user-comments').append('<span class="comment-destination">'+newDestination+'</span>');
        $('#user-comments').append('<span class="comment-why">'+newComment+'</span>');

        const newPost = {
            name: newName,
            destination: newDestination,
            comment: newComment
        };

        currentPosts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(currentPosts));

        $(this).closest('form').find("input[type=text], textarea").val("");
        $('.main-form').hide();
    })
})


