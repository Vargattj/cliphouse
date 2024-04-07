<script>
import ListClips from "./components/ListClips.vue";
import SelectGame from "./components/SelectGame.vue";

import axios from "axios";
import { today, lastDay } from "./utils.js";
import Service from "./Services.js";

const client_id = "5vzq8p90x9d1j2tu4f76is7qe3x9r1";
const client_secret = "uiiwy5ze0ws3bw1x80vl6pcfx3fech";

export default {
  name: "App",
  components: {
    ListClips,
    SelectGame,
  },
  data() {
    return {
      twitchAPI: {
        headers: null,
      },
      topGames: [],
      clips: [],
      currentGameId: null
    };
  },
  methods: {
    async auth(client_id, client_secret) {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const data = `client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`;
      try {
        const response = await axios.post(
          "https://id.twitch.tv/oauth2/token",
          data,
          { headers }
        );
        if (response.status !== 200) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const bearer = response.data.access_token;
        this.twitchAPI.headers = {
          Authorization: `Bearer ${bearer}`,
          "Client-Id": client_id,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    async getClips(quantity, broadcaster_id, game_id, languages, api) {
      const params = {
        broadcaster_id,
        game_id,
        first: quantity,
        started_at: lastDay,
        ended_at: today,
        after: "",
      };
      while (this.clips.length < quantity) {
        const data = await Service.getClips(params, api);
        for (const clip of data.data.data) {
          console.log("clipe:", clip);
          this.clips.push(clip);
          if (this.clips.length === quantity) break;
        }
      }
    },
    changeCurrentGame(game){
      this.clips = []
      this.currentGameId = game.id
      console.log('currentGameId:', this.currentGameId)

    }
  },
  watch: {
    currentGameId(newVal, oldVal) {
      console.log("watchhh");
      this.getClips(6, "", newVal, ["en"], this.twitchAPI);
    }
 },
  async mounted() {
    await this.auth(client_id, client_secret);
    if(!this.currentGameId) this.currentGameId = 21779
    this.getClips(6, "", this.currentGameId, ["en"], this.twitchAPI);
    this.topGames = await Service.getTopGames(15, this.twitchAPI);
  },
};
</script>

<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <SelectGame @changeCurrentGame="changeCurrentGame" :topGames="topGames" />
      </div>
    </header>

    <main><ListClips :clips="clips" /></main>
  </div>
</template>

<style scoped>
body {
  background-color: #444;
}
</style>
