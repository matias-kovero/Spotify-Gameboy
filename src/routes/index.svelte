<script lang="ts">
  import '../app.css';
  import { WebPlayback } from 'svelte-spotify-web-playback';
  //import { client_id } from '../../dev/config';
  import GameBoy from '$lib/Gameboy/index.svelte';

  let spotify;
  let id = process.env.SPOTIFY_ID; //client_id || process.env.SPOTIFY_ID;
</script>

<main>
  <WebPlayback client_id={id} bind:this={spotify} name="Spotify Gameboy">
    <GameBoy 
      slot="all" let:player let:state let:error let:internal 
      {player} {state} {internal} {error} wrapper={spotify} 
    />
    <div slot="error"/>
    <div slot="loading"/>
    <div slot="login"/>
    <div slot="player"/>
    <div slot="waiting"/>
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