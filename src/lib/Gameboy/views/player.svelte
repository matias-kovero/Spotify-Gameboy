<script lang="ts">
  import { updateButtons, props, updateScreen } from '../state';
  import { toggleMenu } from '../functions';
  import AlbumImage from '../screens/albumCover.svelte';

  // We could define custom function handlers here and pass them to below state functions.
  updateButtons({
    a: () => $props.player.togglePlay(),
    left: () => $props.player.previousTrack(),
    right: () => $props.player.nextTrack(),
    start: () => toggleMenu('open'),
  });
  updateScreen({ item: AlbumImage });

</script>