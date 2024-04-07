<template>
  <div>
    <h2>Selecione o jogo</h2>
    <select v-model="selectedItem" @change="handleChange">
      <option d v-for="item in topGames" :key="item.id" :value="item">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectGame",
  props: {
    topGames: Array,
  },
  data() {
    return {
      selectedItem: null,
    };
  },
  methods: {
    handleChange() {
      this.$emit('changeCurrentGame', this.selectedItem)
    },
  },
};
</script>

<style scoped>
select{
    margin-bottom: 15px;
}
</style>