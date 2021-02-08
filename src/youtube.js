require("dotenv/config");
const Youtube = require("youtube-node");

const youtubeApiKey = process.env.YOUTUBE_API_KEY;

const youtubeSearch = new Youtube();

youtubeSearch.setKey(youtubeApiKey);

const youtubeBaseURL = "https://www.youtube.com/watch?v=";

function searchVideo(message, queryText) {
  return new Promise((resolve, reject) => {
    youtubeSearch.search(queryText, 2, (error, data) => {
      if (error) return reject();

      const videosIds = data
        .map((item) => item.id.videoId)
        .filter((item) => item);

      const youtubeLinks = videosIds.map((videoId) => youtubeBaseURL + videoId);

      return resolve(`${message} ${youtubeLinks.join(", ")}`);
    });
  });
}

module.exports = {
  searchVideo,
};
