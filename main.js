$(document).ready(() => {

    if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', 'sv');
    }

    setLanguage(localStorage.getItem('lang'));

    $('#lang-switch').change(function() {
        const lang = $(this).val();
        setLanguage(lang);
    });

    $('#admin').hide();
    $('#admin-link').on('click', () => {
        $('#admin').slideToggle(300);
    });

    $('.load-file').on('click', () => {
        input = document.getElementById('file-input');

        if(!input) {
            alert('Filen kan inte hittas.');
        } else if (!input.files[0]){
            alert('Du måste välja en fil att ladda upp');
        } else {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = event => {
                let lines = event.target.result;
                const newDestinations = JSON.parse(lines);

                newDestinations.destinations.forEach(destination => {

                    const newImage = destination.image;
                    const newLink = destination.link;
                    const newNameSv = destination.name_sv;
                    const newNameEn = destination.name_en;
                    const newDescriptionSv = destination.description_sv;
                    const newDescriptionEn = destination.description_en;

                    const newDiv = document.createElement("div");
                    newDiv.className = "destination";
                    newDiv.innerHTML = '<img src='+newImage+'><h4><span class="sv"><a href='+newLink+'>'+newNameSv+'</a></span><span class="en"><a href='+newLink+'>'+newNameEn+'</a></span></h4><p class="description"><span class="sv">'+newDescriptionSv+'</span><span class="en">'+newDescriptionEn+'</span></p>';
                    document.getElementById('container').append(newDiv);
                    setLanguage(localStorage.getItem('lang'));
                });
            };
            reader.readAsText(file);
            $('#admin').slideUp(300);
        }
    });

    $('#clear-button').on('click', () => {
        localStorage.removeItem('posts');
        localStorage.setItem('posts', JSON.stringify(posts));
        showPosts(posts);
        $('#admin').slideUp(300);
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
        window.open('../rules.html', 'popup', 'height=500,width=400,toolbar=no');
    });

    $('#destination__rules-en').click(function() {
        window.open('../rules.html', 'popup', 'height=500,width=400,toolbar=no');
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

const setLanguage = language => {

    if (language === 'en') {
        $('.sv').hide();
        $('.en').show();
        $('#lang-switch').val('en');
        $('#clear-button').val('Clear posts');
        $('#comment').attr('placeholder', 'Why should we visit your destination?');
        $('#destination__input-subjects').removeAttr('list');
        $('#destination__input-subjects').attr('list', 'destination__subjects-en');
        localStorage.setItem('lang', 'en');
    } else {
        $('.en').hide();
        $('.sv').show();
        $('#lang-switch').val('sv');
        $('#clear-button').val('Rensa inlägg');
        $('#comment').attr('placeholder', 'Varför är ditt resmål så bra?');
        $('#destination__input-subjects').removeAttr('list');
        $('#destination__input-subjects').attr('list', 'destination__subjects-sv');
        localStorage.setItem('lang', 'sv');
    }
};

const showPosts = posts => {
    $('#user-comments').empty();
    posts.forEach(post => {
        $('#user-comments').append('<span class="comment-name">'+post.name+'</span>');
        $('#user-comments').append('<span class="comment-destination">'+post.destination+'</span>');
        $('#user-comments').append('<span class="comment-why">'+post.comment+'</span>');
    });
};


