<template>
  <div>
    <div v-if="clips.length">
      <div class="list-clips">
        <div v-for="(clip, index) in clips" :key="index" class="card-clip">
          <img :src="clip.thumbnail_url" alt="" width="350" />
          <h2>{{ clip.title }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import path from "path";
import fs from "fs";
import { today, lastDay } from "../utils.js";
const client_id = "5vzq8p90x9d1j2tu4f76is7qe3x9r1";
const client_secret = "uiiwy5ze0ws3bw1x80vl6pcfx3fech";

export default {
  name: "Clip",
  data() {
    return {
      clips: [],
      twitchAPI: {
        headers: null,
      },
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
    async fetchClips(params, api) {
      const queryParams = new URLSearchParams(params);
      const url = `https://api.twitch.tv/helix/clips?${queryParams.toString()}`;
      const response = await axios.get(url, {
        method: "GET",
        headers: api.headers,
      });
      return response;
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
        const data = await this.fetchClips(params, api);
        for (const clip of data.data.data) {
          console.log("clipe:", clip);
          this.clips.push(clip);
          if (this.clips.length === quantity) break;
        }
      }
    },
    async downloadClip(clip, filePath) {
      const index = clip.thumbnail_url.indexOf("-preview");
      const clipUrl = clip.thumbnail_url.slice(0, index) + ".mp4";
      try {
        const response = await axios.get(clipUrl, {
          responseType: "arraybuffer",
        });
        if (response.headers["content-type"] === "binary/octet-stream") {
          const clipsDir = path.join(__dirname, "files", "clips");
          if (!fs.existsSync(clipsDir)) fs.mkdirSync(clipsDir);
          const fullFilePath = path.join(clipsDir, filePath);
          fs.writeFileSync(fullFilePath, response.data);
          console.log(`Clip downloaded successfully: ${fullFilePath}`);
        } else {
          console.error(
            `Failed to download clip from thumbnail: ${clip.thumbnail_url}`
          );
        }
      } catch (error) {
        console.error(`Error downloading clip: ${error.message}`);
      }
    },
    startDownload() {
      this.auth("your_client_id", "your_client_secret")
        .then(() => {
          this.getClips(6, "", "21779", ["ja"], this.twitchAPI).then(() => {
            this.clips.forEach((clip) => {
              this.downloadClip(clip, `${clip.title}.mp4`);
            });
          });
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    },
  },
  async created() {
    await this.auth(client_id, client_secret);
    this.getClips(6, "", "21779", ["en"], this.twitchAPI);
  },
};
</script>

<style scoped>
.list-clips {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
.card-clip {
}
</style>
