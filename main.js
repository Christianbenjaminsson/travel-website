$(document).ready(() => {

    $('.error').hide();

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
        localStorage.removeItem('destinationPosts');
        localStorage.setItem('posts', JSON.stringify(posts));
        localStorage.setItem('destinationposts', JSON.stringify(destinationPosts));
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

    $('#rules').on('click', () => {
        window.open('./rules.html', 'popup', 'height=500,width=400,toolbar=no' )
    });

    $('#destination__rules').click(function() {
        window.open('../rules.html', 'popup', 'height=500,width=400,toolbar=no');
    });

    $('#destination__rules-en').click(function() {
        window.open('../rules.html', 'popup', 'height=500,width=400,toolbar=no');
    });

    $('#location__stockholm').click(function(){
        window.location = './destinations/stockholm.html';
    });

    $('#location__newyork').click(function(){
        window.location = './destinations/new-york.html';
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

        $('.error').hide();

        if (validateMainForm()) {
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
            $(this).closest('form').find("input[type=checkbox]").prop('checked', false);
            $('.main-form').hide();
        } 
    });

    // Localstorage for destinationpages
    const destinationPosts = [
        {
            destinationName: "Per",
            destinationSubject: "Store",
            destinationComment: "You need to visit Nordiska Kompaniet"
        },
        {
            destinationName: "Matt",
            destinationSubject: "Restaurant",
            destinationComment: "Visit Un Poco, they have the best food ever"
        },
        {
            destinationName: "Susan",
            destinationSubject: "Things to do",
            destinationComment: "Plan a visit to Gröna Lund. It is a really greate amusement park"
        },
    ];
    
    if (!localStorage.getItem('destinationPosts')) {
        localStorage.setItem('destinationPosts', JSON.stringify(destinationPosts));
    }
    
    const destinationPostsToShow = JSON.parse(localStorage.getItem('destinationPosts'));
    
    for (let i = 0; i < destinationPostsToShow.length; i++) {
        $('#destination__user-comments').append('<span class="destinations__comment-name">'+destinationPostsToShow[i].destinationName+'</span>');
        $('#destination__user-comments').append('<span class="destinations__comment-subject">'+destinationPostsToShow[i].destinationSubject+'</span>');
        $('#destination__user-comments').append('<span class="destinations__comment-why">'+destinationPostsToShow[i].destinationComment+'</span>');
    }
    
    $('.destination__suggestion-button').on('click', function() {
        let destinationCurrentPosts = JSON.parse(localStorage.getItem('destinationPosts'));
    
        const newDestinationName = $('#destination__input-name').val();
        const newDestinationSubject = $('#destination__input-subjects').val();
        const newDestinationComment = $('#destination__comment').val();
        
        $('#destination__user-comments').append('<span class="destinations__comment-name">'+newDestinationName+'</span>');
        $('#destination__user-comments').append('<span class="destinations__comment-subject">'+newDestinationSubject+'</span>');
        $('#destination__user-comments').append('<span class="destinations__comment-why">'+newDestinationComment+'</span>');
    
        const destinationNewPost = {
            destinationName: newDestinationName,
            destinationSubject: newDestinationSubject,
            destinationComment: newDestinationComment
        };
    
        destinationCurrentPosts.push(destinationNewPost);
        localStorage.setItem('destinationPosts', JSON.stringify(destinationCurrentPosts));
    
        $(this).closest('form').find("input[type=text], textarea").val("");
        $(this).closest('form').find("#destination__input-subjects").val("");
    })
})

const setLanguage = language => {

    if (language === 'en') {
        $('.sv').hide();
        $('.en').show();
        $('#lang-switch').val('en');
        $('#clear-button').val('Clear posts');
        $('#comment').attr('placeholder', 'Why should we visit your destination?');
        $('#destination__comment').attr('placeholder', 'Enter your tip');
        $('#destination__input-subjects').removeAttr('list');
        $('#destination__input-subjects').attr('list', 'destination__subjects-en');
        localStorage.setItem('lang', 'en');
    } else {
        $('.en').hide();
        $('.sv').show();
        $('#lang-switch').val('sv');
        $('#clear-button').val('Rensa inlägg');
        $('#comment').attr('placeholder', 'Varför är ditt resmål så bra?');
        $('#destination__comment').attr('placeholder', 'Här lämnar du ditt tips');
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

const validateMainForm = () => {

    const newName = $('#name').val();
    const newEmail = $('#email').val();
    const newDestination = $('#suggestion').val();
    const newComment = $('#comment').val();

    let valid = true;

    if (!isValidName(newName)) {
        $('#name-error').show();
        valid = false;
    }
    if (!isValidEmail(newEmail)) {
        $('#email-error').show();
        valid = false;
    }
    if (!isValidDestination(newDestination)) {
        $('#suggestion-error').show();
        valid = false;
    }
    if (!isValidComment(newComment)) {
        $('#comment-error').show();
        valid = false;
    }
    if (!$('#accept').is(':checked')) {
        $('#accept-error').show();
        valid = false;
    }

    if (!valid) {
        const currentLanguage = localStorage.getItem('lang');
        if (currentLanguage === 'en') {
            $('.sv').hide();
        } else {
            $('.en').hide();
        }
    }
    return valid;
}

const isValidName = name => name.length >= 1;

const isValidEmail = email => email.length >= 1;

const isValidDestination = destination => destination.length >= 1;

const isValidComment = comment => comment.length >= 1;

//Validate destionation form
const validateDestinationForm = () => {

    const destinationNewName = $('#destination__input-name').val();
    const destinationNewEmail = $('#destination__input-email').val();
    const destinationNewSubject = $('#destination__input-subjects').val();
    const destinationNewComment = $('#destination__comment').val();

    let destinationValid = true;

    if (!isValidName(destinationNewName)) {
        $('#destination__name-error').show();
        destinationValid = false;
    }
    if (!isValidEmail(destinationNewEmail)) {
        $('#destination__email-error').show();
        destinationValid = false;
    }
    if (!isValidDestination(destinationNewSubject)) {
        $('#destination__subjects-error').show();
        destinationValid = false;
    }
    if (!isValidComment(destinationNewComment)) {
        $('#destination__comment-error').show();
        destinationValid = false;
    }
    if (!$('#destination__accept').is(':checked')) {
        $('#destination__accept-error').show();
        destinationValid = false;
    }

    if (!destinationValid) {
        const currentLanguage = localStorage.getItem('lang');
        if (currentLanguage === 'en') {
            $('.sv').hide();
        } else {
            $('.en').hide();
        }
    }
    return destinationValid;
}

const destinationIsValidName = destinationName => destinationName.length >= 1;

const destinationIsValidEmail = destinationEmail => destinationEmail.length >= 1;

const destinationIsValidDestination = destinationSubjects => destinationSubjects.length >= 1;

const destinationIsValidComment = destinationComment => destinationComment.length >= 1;