<script lang="ts">
  import '../app.css';
  import SpotifyPlayer from 'svelte-spotify-web-playback/index.svelte';
  import { client_id } from '../../dev/config';
  import GameBoy from '$lib/Gameboy/index.svelte';

  let spotify;
</script>

<SpotifyPlayer {client_id} bind:this={spotify}>
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
