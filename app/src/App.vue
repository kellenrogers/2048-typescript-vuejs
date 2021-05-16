<template>
  <Board></Board>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Board from './components/Board.vue'

export default defineComponent({
  name: 'App',
  components: {
    Board,
  },
})
</script>

<style>
body {
  background-color: #faf8ef;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.board {
  width: calc(100vmin - 200px);
  height: calc(100vmin - 200px);
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-self: center;
  align-self: center;
  border: #baada1 solid calc(100vmin * 0.01);
  border-radius: 0.5em;
  background-color: #baada1;
  margin: auto;
}

.tile {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.1em;
  margin: calc(100vmin * 0.01);
  font-size: calc(100vmin * 0.07);
  font-weight: bold;
  color: white;
}

.tile-level-2 {
  background-color: #efe5da;
  color: #7d7166;
}
.tile-level-4 {
  background-color: #ece0c6;
  color: #7d7166;
}
.tile-level-8 {
  background-color: #f1b179;
}
.tile-level-16 {
  background-color: #ec8d54;
}
.tile-level-32 {
  background-color: #f87d5f;
}
.tile-level-64 {
  background-color: #ece0c6;
}
.tile-level-128,
.tile-level-256,
.tile-level-512 {
  background-color: #f1d04c;
  font-size: calc(100vmin * 0.06);
}
.tile-level-1024,
.tile-level-2048 {
  background-color: #f1d04c;
  font-size: calc(100vmin * 0.048);
}
</style>
