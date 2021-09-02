<script lang="ts">
  import '../app.css';
  import { WebPlayback } from 'svelte-spotify-web-playback';
  import GameBoy from '$lib/Gameboy/index.svelte';

  let spotify;
  let client_id = '2e167a81bb2048fe8573e1969eba7e72'; // It's scoped, so whatever
</script>

<main>
  <WebPlayback {client_id} bind:this={spotify} name="Spotify Gameboy">
    <GameBoy 
      slot="all" let:player let:state let:error let:internal 
      {player} {state} {internal} {error} wrapper={spotify} 
    />
  </WebPlayback>
</main>

<style>
  main {
    display: grid;
    place-items: center;
  }
  div {
    display: none;
  }
</style>