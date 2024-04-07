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
export default {
  name: "ListClips",
  data() {
    return {};
  },
  props: {
    clips: Array,
  },
  methods: {},
  async mounted() {},
};
</script>

<style scoped>
.list-clips {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
}
.card-clip {
}
</style>
