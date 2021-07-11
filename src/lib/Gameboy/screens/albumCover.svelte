<script lang="ts">
  import type { WebPlaybackAlbum, WebPlaybackImage } from "svelte-spotify-web-playback/types";
  export let album: WebPlaybackAlbum;

  import { fade } from 'svelte/transition';
  import { cubicOut, cubicIn } from 'svelte/easing';

  const setAlbumImage = (album: WebPlaybackAlbum): string => {
    const width = 300; // 64, 300, 640;
    const thumb: WebPlaybackImage = 
      album.images.find((a) => a.width === width) || ({} as WebPlaybackImage);
    return thumb.url;
  };

  $: image_url = setAlbumImage(album);
</script>

<div class="wrapper">
  {#key image_url}
    <img src={image_url} alt={`Album cover of ${album.name}`} 
      in:fade="{{ easing: cubicIn, duration: 500 }}"
      out:fade="{{ easing: cubicOut, duration: 700 }}"
    />
  {/key}
</div>

<style>
  /* Image width somehow messes up with dynamic widths, hardoced 165px */
  .wrapper {
    display: grid;
    overflow: hidden;
    grid-column: 1/2;
		grid-row: 1/2;
    width: 165px;
    height: 165px;
  }
  img {
    grid-column: 1/2;
		grid-row: 1/2;
    max-width: 165px; /* Fixed odd 1px line */
    max-height: 165px;
    filter: url(#pixelate) url(#duotone_gameboy); /* Added in /views/player.index */
    opacity: 1;
  }
</style>