function apiSearch(lucky) {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '331c166174564d83b4a196246b3ca555'
        }
    })
        .done(function (data) {
            if (lucky) { // "I'm feeling lucky" was clicked
                window.location.href = data.webPages.value[0].url
            }
            else { // "Search" was clicked
                var len = data.webPages.value.length;
                var results = '';
                for (i = 0; i < len; i++) {
                    results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                }

                $('#searchResults').html(results);
                $('#searchResults').dialog({
                    height: $(window).height() // prevent dialog box from stretching page vertically
                });
            }
        })
        .fail(function () {
            alert('error');
        });

    $('#searchResults').css('visibility', 'visible'); // change visibilty from hidden once search results are displayed
}

function displayTime() {
    let now = new Date();  // Get current date and time from user's system
    let hours = now.getHours();  // Get hours from that time
    let minutes = now.getMinutes();  // Get minutes from that time

    // Add leading zero to hours and minutes if they are < 10
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let curTime = hours + ':' + minutes; // Format time as HH:MM

    $('#time').html(curTime);
    $('#time').dialog();
    
    $('#time').css('visibility', 'visible'); //change visibilty from hidden once time is displayed
}

const images = [
    'matterhorn_day.jpg',
    'matterhorn_dusk.jpg'
];
let currentImageIndex = 0;
function changeBackground(){
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`;
}
//Using DOM instead of onclick
//document.getElementById('header').addEventListener('click', function () {
//    currentImageIndex = (currentImageIndex + 1) % images.length;
//    document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`;
//});
