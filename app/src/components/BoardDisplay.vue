<template>
  <div class="board-wrapper">
    <div class="board">
      <div
        v-for="index in 16"
        :key="index"
        :class="`board-space grid-row-${Math.floor((index - 1) / 4) + 1} grid-column-${
          (index - 1) % 4
        }`"
        :data-index="index"
      ></div>

      <div
        v-for="tile in tiles"
        :key="tile.id"
        :class="getClassesForTile(tile)"
        :data-combined="tile.combined"
      >
        {{ tile.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Tile } from '@/domain/tile'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'BoardDisplay',
  props: {
    tiles: {
      type: Object as PropType<Tile[]>,
      required: true,
    },
    justAddedTileID: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      animate: false,
    }
  },
  methods: {
    getClassesForTile: function (tile: Tile) {
      return `tile tile-level-${tile.value || 0} ${tile.combined ? 'combined' : ''} ${
        this.justAddedTileID && tile.id === this.justAddedTileID ? 'justAdded' : ''
      } grid-row-${tile.position.x} grid-column-${tile.position.y}`
    },
  },
})
</script>
