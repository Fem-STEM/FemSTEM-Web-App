// Scroll to top arrow
$(window).scroll(function () {
  if ($(this).scrollTop() >= 50) {
    $("#return-to-top").fadeIn(200);
  } else {
    $("#return-to-top").fadeOut(200);
  }
});
$("#return-to-top").click(function () {
  $("body,html").animate(
    {
      scrollTop: 0,
    },
    500
  );
});

// Youtube tutorials
var player;
function onYouTubeIframeAPIReady(vidId) {
  // call this function when the page has finished downloading the JavaScript for the player API, which enables you to then use the API on your page.
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: vidId,
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = !done;
  }
}

function stopVideo() {
  player.stopVideo();
}

$(document).ready(function () {
  var youtube_key = "AIzaSyBHA1Itn4r8RPJZ2Owkib9jCMBPWpEcYVU";
  var video = "";

  $("#tut-form").submit(function (event) {
    event.preventDefault();

    var search = $("#search").val();

    videoSearch(youtube_key, search, 10);
  });

  function videoSearch(key, search, maxResults) {
    $("#videos").empty();

    $.get(
      "https://www.googleapis.com/youtube/v3/search?key=" +
        youtube_key +
        "&type=video&videoEmbeddable=true&part=snippet&maxResults=" +
        maxResults +
        "&q=%23%23girlsintech%26%26" +
        search,
      function (data) {
        data.items.forEach((item) => {
          video = `
                <iframe width="440" height="335" src="https://www.youtube-nocookie.com/embed/${item.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin-right: 5%; margin-top: 5%; margin-left: 5%;"></iframe>
                `;

          $("#videos").append(video);
        });
      }
    );
  }
});

// %7Cwomenintech%7Cwomancoder%7Cfemalecoder%7Cgirlsintech%Ctechwomen

// https://www.googleapis.com/youtube/v3/search?part=snippet&q=%23%23girlsintech%26%26javascript&key=AIzaSyBHA1Itn4r8RPJZ2Owkib9jCMBPWpEcYVU
