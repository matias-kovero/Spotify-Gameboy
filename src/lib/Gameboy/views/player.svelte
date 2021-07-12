<script lang="ts">
  import GameBoy from '../body.svelte';
  import AlbumImage from '../screens/albumCover.svelte';
  import type { WebPlaybackPlayer, WebPlaybackState } from 'svelte-spotify-web-playback/types';
  export let player: WebPlaybackPlayer, state: WebPlaybackState, defaultProps;
</script>

<GameBoy>
  <AlbumImage slot="screen" album={state.track_window.current_track.album} />
  <div slot="a" class="btn" on:click={() => player.togglePlay()} />
  <div slot="left" class="btn" on:click={() => player.previousTrack()} />
  <div slot="right" class="btn" on:click={() => player.nextTrack()} />
  <div slot="start" class="btn" on:click={() => defaultProps.toggleMenu()} />
</GameBoy>

<style>
  .btn {
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>

<svelte:head>

  <svg xmlns="http://www.w3.org/2000/svg" width="165px" height="165px">
    <filter id="pixelate" x="0" y="0" >
      <feFlood x="4" y="4" height="2" width="2"/>
      <feComposite height="2" width="1"/>
      <feTile result="a" />
      <feComposite in="SourceGraphic" in2="a" operator="in" />
      <feMorphology operator="erode" radius="1" />
    </filter>
  </svg>

  <svg xmlns="http://www.w3.org/2000/svg" width="165px" height="165px">
    <filter id="duotone_gameboy">

      <feColorMatrix type="matrix" result="grayscale"
        values="1 0 0 0 0
                1 0 0 0 0
                1 0 0 0 0
                0 0 0 1 0" >
      </feColorMatrix>

      <feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
        <feFuncR type="table" tableValues="0 0.7176470588"></feFuncR>
        <feFuncG type="table" tableValues="0 0.8039215686"></feFuncG>
        <feFuncB type="table" tableValues="0 0.631372549"></feFuncB>
        <feFuncA type="table" tableValues="0 1"></feFuncA>
      </feComponentTransfer>

    </filter>        
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg">
    <filter id="duotone_gameboy_alt">
      <feColorMatrix type="matrix" result="grayscale"
        values="1 0 0 0 0
                1 0 0 0 0
                1 0 0 0 0
                0 0 0 1 0" >
      </feColorMatrix>
      <feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
        <feFuncR type="table" tableValues="0.7176470588 0"></feFuncR>
        <feFuncG type="table" tableValues="0.8039215686 0"></feFuncG>
        <feFuncB type="table" tableValues="0.631372549 0"></feFuncB>
        <feFuncA type="table" tableValues="0 1"></feFuncA>
      </feComponentTransfer> 
    </filter>        
  </svg>

</svelte:head>
<!-- GB Green: 183, 205, 161 = 0.7176470588, 0.8039215686, 0.631372549  -->