<script lang="ts">
  import { fade } from 'svelte/transition';
  import { cubicOut, cubicIn } from 'svelte/easing';
  import type { WebPlaybackAlbum, WebPlaybackImage } from "svelte-spotify-web-playback/types";
  import { props } from '$lib/Gameboy/state';
  
  $: album = $props.state.track_window.current_track.album;

  const setAlbumImage = (album: WebPlaybackAlbum): string => {
    const width = 64; // 64, 300, 640; // 64 will force an really low-res image - gameboy-ish
    const thumb: WebPlaybackImage = 
      album.images.find((a) => a.width === width) || ({} as WebPlaybackImage);
    return thumb.url;
  };
  $: image_url = album ? setAlbumImage(album) : '';
</script>

{#key image_url}
  <img src={image_url} alt={`Album cover of ${album ? album.name : 'unknown'}`}
    class="add"
    in:fade="{{ easing: cubicIn, duration: 500 }}"
    out:fade="{{ easing: cubicOut, duration: 700 }}"
  />
{/key}

<style>
  img {
    grid-column: 1/2;
		grid-row: 1/2;
    max-width: 165px; /* Fixed odd 1px line */
    max-height: 165px;
    height: 165px;
    width: 165px;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: pixelated;
    /* filter: url(#pixelate) url(#duotone_gameboy); */ /* Added in /views/player.index */
    /* filter: url(#discrete); */ /* url(#duotone_gameboy); */
    filter: url(#duotone_gameboy);
  }
  .add {
    pointer-events: none;
  }
</style>