import axios from "axios";
const apiUrl = "https://api.twitch.tv/helix";

const Service = {
  async getClips(params, api) {
    const queryParams = new URLSearchParams(params);
    const url = `${apiUrl}/clips?${queryParams.toString()}`;
    const response = await axios.get(url, {
      method: "GET",
      headers: api.headers,
    });
    return response;
  },
  async getTopGames(quantity, api) {
    const url = `${apiUrl}/games/top`;
    console.log('api:', api)
    try {
      const response = await axios.get(url, {
        params: { first: quantity },
        headers: api.headers,
      });

      return response.data.data;
    } catch (err) {
      throw new Error(err);
    }
  },
};

export default Service;
