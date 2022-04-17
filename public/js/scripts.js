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

const arr = ["UC4DwZ2VXM2KWtzHjVk9M_xg",
"UCjdRbKZ494DfZ4zeX19rICw",
"UC4MZ7zUHb5eAxU75Dc_nqdQ",
"UC5DNytAJ6_FISueUfzZCVsw",
"UCl5-BV9aRaeDVohpE4sqJiQ",
"UCKMjvg6fB6WS5WrPtbV4F5g",
"UCTdMIOkg4a3LLaGC0BbHR8g",
"UCxA99Yr6P_tZF9_BgtMGAWA",
"UC0hNd2uW8jTR5K3KBzRuG2A",
"UCBgJ7yrU2sdhl4JWUNhnj2w",
"UC8ME0E1icwddCikdomxrIVw",
"UCV-AVH8pbyU9rjt4EUr3fgg",
"UCuQ0v3Q5_UCLQkp8AwHDNAA",
"UCpas7--oxQOMwGt852OPF6Q",
"UCdngmbVKX1Tgre699-XLlUA",
"UCDCFIqDZ1QUqivxVFQDxS0w",
"UC7EXDnU9c8XMXwBEuQjFdFA",
"UC2sSCxCZqL55QTXl3TD0Dbw",
"UCkeSKp49ycaZRlGKkCRRi1g",
"UC-86prgPyis3DB4hy6tlT5A"];

$(document).ready(function () {
  var youtube_key = "AIzaSyBHA1Itn4r8RPJZ2Owkib9jCMBPWpEcYVU";
  var video = "";

  $("#tut-form").submit(function (event) {
    event.preventDefault();

    var search = $("#search").val();

    videoSearch(youtube_key, search, 1);
  });

  function videoSearch(key, search, maxResults) {
    $("#videos").empty();

    for(var i=0; i<arr.length; i++){
      const channel_Id = arr[i];
      const searchTopic = search.toUpperCase().replace(/\s|-/g, "");
      $.get(
        "https://www.googleapis.com/youtube/v3/search?key=" +
          youtube_key +
          "&type=video&videoEmbeddable=true&part=snippet&maxResults=" +
          maxResults +
          "&q=" +
          search +
          "&topicId=" +
          search +
          "&channelId=" +
          channel_Id,
        function (data) {
          data.items.forEach((item) => {
            const videoTitle = item.snippet.title.toUpperCase().replace(/\s|-/g, "");
            const videoDescription = item.snippet.description.toUpperCase().replace(/\s/g, "");
            if((videoTitle.includes(searchTopic)) || (videoDescription.includes(searchTopic))){
              video = `
                    <iframe width="440" height="335" src="https://www.youtube-nocookie.com/embed/${item.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin-right: 5%; margin-top: 5%; margin-left: 5%;"></iframe>
                    `;
              $("#videos").append(video);
            }
          });
        }
      );
    }
  }
});

// %7Cwomenintech%7Cwomancoder%7Cfemalecoder%7Cgirlsintech%Ctechwomen

// https://www.googleapis.com/youtube/v3/search?part=snippet&q=%23%23girlsintech%26%26javascript&key=AIzaSyBHA1Itn4r8RPJZ2Owkib9jCMBPWpEcYVU
