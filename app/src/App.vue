<template>
  <div>
    <GameHeader :score="board.score"></GameHeader>
    <button @click="toggleVolume">
      <img :src="`/img/volume_${volumeOn ? 'on' : 'off'}.svg`" />
    </button>
    <BoardDisplay :tiles="board.tiles" :justAddedTileID="board.justAddedTileID"></BoardDisplay>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import BoardDisplay from './components/BoardDisplay.vue'
import GameHeader from './components/GameHeader.vue'
import { Board } from './domain/board'
import { Move, Moves } from './domain/moves'

const audioSwipe = new Audio(require('../public/swipe.mp3'))
audioSwipe.load()

export default defineComponent({
  name: 'App',
  components: {
    BoardDisplay,
    GameHeader,
  },
  created: function () {
    window.addEventListener('keydown', this.handleKeyPress)
  },

  setup() {
    const board = reactive(new Board())

    return {
      board,
    }
  },

  data: function () {
    return {
      volumeOn: true,
    }
  },

  methods: {
    handleKeyPress: function (event: KeyboardEvent) {
      const listeningForKeys: Record<string, Move> = {
        ArrowUp: Moves.UP,
        ArrowDown: Moves.DOWN,
        ArrowLeft: Moves.LEFT,
        ArrowRight: Moves.RIGHT,
      }

      const move = listeningForKeys[event.key]

      if (!move) return

      this.board.applyMove(move)

      if (this.volumeOn && this.board.justAddedTileID) {
        audioSwipe.currentTime = 0
        audioSwipe.play()
      }
    },
    toggleVolume: function () {
      this.volumeOn = !this.volumeOn
    },
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

.board-wrapper {
  width: calc(100vmin - 200px);
  height: calc(100vmin - 200px);
  margin: auto;
}

.board {
  border: #baada1 solid calc(100vmin * 0.01);
  border-radius: 0.6em;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
  justify-self: center;
  align-self: center;
  background-color: #baada1;
  position: relative;
}

.board-space {
  margin: calc(100vmin * 0.01);
  background-color: #cdc1b4;
  border-radius: 0.4em;
}

.tile {
  top: 0px;
  left: 0px;
  position: absolute;
  margin: 0px;
  margin: calc(100vmin * 0.01);
  width: calc(25% - (100vmin * 0.01 * 2));
  height: calc(25% - (100vmin * 0.01 * 2));
  transition: all 0.1s linear;
  border-radius: 0.4em;
  background: none;
}

.tile {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.1em;
  font-size: calc(100vmin * 0.07);
  font-weight: bold;
  color: white;
}

.tile.combined {
  animation: combine 0.3s ease-in-out alternate;
  -webkit-animation: combine 0.3s ease-in-out alternate;
}
.tile.justAdded {
  animation: justAddedContent 0.3s ease-in-out alternate;
  -webkit-animation: justAddedContent 0.3s ease-in-out alternate;
}

@keyframes justAddedContent {
  0% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}

@keyframes combine {
  0% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
  34% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
  75% {
    transform: scale(1.1);
    -webkit-transform: scale(1.15);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}

.tile-level-0 {
  display: none;
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
  background-color: #f75f3b;
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

.grid-row-0 {
  top: 0%;
}
.grid-row-1 {
  top: 25%;
}
.grid-row-2 {
  top: 50%;
}
.grid-row-3 {
  top: 75%;
}
.grid-column-0 {
  left: 0%;
}
.grid-column-1 {
  left: 25%;
}
.grid-column-2 {
  left: 50%;
}
.grid-column-3 {
  left: 75%;
}
</style>
