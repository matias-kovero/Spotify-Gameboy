<script lang="ts">
  import '../app.css';
  import SpotifyPlayer from 'svelte-spotify-web-playback/index.svelte';
  import { client_id } from '../../dev/config';
  import GameBoy from '$lib/Gameboy/index.svelte';
  import TestBody from '$lib/Gameboy/body.svelte';

  let spotify;
</script>

<main>
  <SpotifyPlayer {client_id} bind:this={spotify} name="Spotify Gameboy">
    <GameBoy 
      slot="all" let:player let:state let:error let:internal 
      {player} {state} {internal} {error} wrapper={spotify} 
    />
    <div slot="error"/>
    <div slot="loading"/>
    <div slot="login"/>
    <div slot="player"/>
    <div slot="waiting"/>
  </SpotifyPlayer>
</main>

<style>
  main {
    display: grid;
    place-items: center;
    grid-template-columns: auto;
  }
  div {
    display: none;
  }
</style>