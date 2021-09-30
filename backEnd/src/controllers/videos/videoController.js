const axios = require("axios");
const apiKey = process.env.API_KEY;
class videoController {
  async getSearchVideos(req, res) {
    try {
      let { search, results } = req.headers;
      results = results ? results : 10;
      const videos = (
        await axios.get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${results}&q="${search}"&key=${apiKey}`
        )
      ).data;
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new videoController();
