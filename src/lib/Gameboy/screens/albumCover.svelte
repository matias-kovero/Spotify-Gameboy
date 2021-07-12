<script lang="ts">
  import { fade } from 'svelte/transition';
  import { cubicOut, cubicIn } from 'svelte/easing';
  import type { WebPlaybackAlbum, WebPlaybackImage } from "svelte-spotify-web-playback/types";
  import { props } from '$lib/Gameboy/state';
  
  $: album = $props.state.track_window.current_track.album;

  const setAlbumImage = (album: WebPlaybackAlbum): string => {
    const width = 300; // 64, 300, 640;
    const thumb: WebPlaybackImage = 
      album.images.find((a) => a.width === width) || ({} as WebPlaybackImage);
    return thumb.url;
  };
  $: image_url = album ? setAlbumImage(album) : '';
</script>

{#key image_url}
  <img src={image_url} alt={`Album cover of ${album ? album.name : 'unknown'}`} 
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
    filter: url(#pixelate) url(#duotone_gameboy); /* Added in /views/player.index */
  }
</style>