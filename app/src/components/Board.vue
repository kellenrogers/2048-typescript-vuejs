<template>
  <div>
    Score: 2048
    <button @click="revertMove" style="margin: 10px">Undo</button>
    <button @click="fillRandomEmptyTile" style="margin: 10px">New Tile</button>
    <div class="board">
      <div class="tile tile-level-256">256</div>
      <div class="tile tile-level-512">512</div>
      <div class="tile tile-level-1024">1024</div>
      <div class="tile tile-level-2048">2048</div>

      <div class="tile tile-level-16">16</div>
      <div class="tile tile-level-32">32</div>
      <div class="tile tile-level-64">64</div>
      <div class="tile tile-level-128">128</div>

      <div class="tile tile-level-4">4</div>
      <div class="tile tile-level-4">4</div>
      <div class="tile tile-level-8">8</div>
      <div class="tile tile-level-8">8</div>

      <div class="tile tile-level-2">2</div>
      <div class="tile tile-level-2">2</div>
      <div class="tile tile-level-4">4</div>
      <div class="tile tile-level-4">4</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Board',
})
</script>
