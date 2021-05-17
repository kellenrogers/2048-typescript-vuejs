<template>
  <div>
    Score: {{ score }}

    <button @click="revertMove" style="margin: 10px">Undo</button>
    <button @click="fillRandomEmptyTile" style="margin: 10px">New Tile</button>
  </div>
</template>

<script type="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GameHeader',
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
})
</script>
