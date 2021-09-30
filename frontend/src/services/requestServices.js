import axios from "axios";

class requestServices {
  apiUrl = "http://localhost:3000/api/";
  headers(dataQuery) {
    const { search, results } = dataQuery;
    console.log(search, results);
    return { headers: { search, results } };
  }
  async getSearchVideos(dataQuery) {
    console.log(this.headers(dataQuery));
    return (await axios.get(`${this.apiUrl}search`, this.headers(dataQuery)))
      .data;
  }
}

export default new requestServices();
