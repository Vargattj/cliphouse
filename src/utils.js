function getRFCDates() {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);

    const rfcToday = today.toISOString();
    const rfcLastDay = lastDay.toISOString();

    return {
        today: rfcToday,
        lastDay: rfcLastDay,
    };
}

const { today, lastDay } = getRFCDates();

export {
    today,
    lastDay
}

// async downloadClip(clip, filePath) {
//     const index = clip.thumbnail_url.indexOf("-preview");
//     const clipUrl = clip.thumbnail_url.slice(0, index) + ".mp4";
//     try {
//       const response = await axios.get(clipUrl, {
//         responseType: "arraybuffer",
//       });
//       if (response.headers["content-type"] === "binary/octet-stream") {
//         const clipsDir = path.join(__dirname, "files", "clips");
//         if (!fs.existsSync(clipsDir)) fs.mkdirSync(clipsDir);
//         const fullFilePath = path.join(clipsDir, filePath);
//         fs.writeFileSync(fullFilePath, response.data);
//         console.log(`Clip downloaded successfully: ${fullFilePath}`);
//       } else {
//         console.error(
//           `Failed to download clip from thumbnail: ${clip.thumbnail_url}`
//         );
//       }
//     } catch (error) {
//       console.error(`Error downloading clip: ${error.message}`);
//     }
//   },
//   startDownload() {
//     this.auth("your_client_id", "your_client_secret")
//       .then(() => {
//         this.getClips(6, "", "21779", ["ja"], this.twitchAPI).then(() => {
//           this.clips.forEach((clip) => {
//             this.downloadClip(clip, `${clip.title}.mp4`);
//           });
//         });
//       })
//       .catch((error) => {
//         console.error("Erro:", error);
//       });
//   },
// },