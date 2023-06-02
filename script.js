const apiKey = 'AIzaSyDLsb6liTLGGh4DlfIULZ0gyU-XogPZeZs';

// Fetch videos using YouTube Data API
function fetchVideos(searchQuery) {
  const request = gapi.client.youtube.search.list({
    part: 'snippet',
    q: searchQuery,
    maxResults: 10
  });

  request.execute(response => {
    const videos = response.items;
    displayVideos(videos);
  });
}

// Display videos on the page
function displayVideos(videos) {
  const videosContainer = document.getElementById('videos');

  videos.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.classList.add('video');

    const thumbnailUrl = video.snippet.thumbnails.medium.url;
    const title = video.snippet.title;
    const videoId = video.id.videoId;

    videoElement.innerHTML = `
      <a href="watch.html?id=${videoId}" target="_blank">
        <img src="${thumbnailUrl}" alt="${title}">
        <h2>${title}</h2>
      </a>
    `;

    videosContainer.appendChild(videoElement);
  });
}

// Handle search form submission
function handleSearch(event) {
  event.preventDefault();
  const searchQuery = document.getElementById('searchQuery').value;
  fetchVideos(searchQuery);
}

// Load the YouTube API
function handleClientLoad() {
  gapi.load('client', () => {
    gapi.client.init({
      apiKey: apiKey,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then(() => {
      const searchForm = document.getElementById('searchForm');
      searchForm.addEventListener('submit', handleSearch);
    });
  });
}
// Display videos on the page
function displayVideos(videos) {
  const videosContainer = document.getElementById('videos');

  videos.forEach(video => {
      const videoCard = document.createElement('div');
      videoCard.classList.add('video-card');

      const thumbnail = document.createElement('img');
      thumbnail.src = video.snippet.thumbnails.medium.url;
      thumbnail.alt = 'Video Thumbnail';
      videoCard.appendChild(thumbnail);

      const title = document.createElement('div');
      title.classList.add('video-title');
      title.textContent = video.snippet.title;
      videoCard.appendChild(title);

      const channel = document.createElement('div');
      channel.classList.add('video-channel');
      channel.textContent = video.snippet.channelTitle;
      videoCard.appendChild(channel);

      videosContainer.appendChild(videoCard);
  });
}

// Initialize the app
function init() {
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/client.js';
  script.onload = handleClientLoad;

  document.head.appendChild(script);
}

init();
