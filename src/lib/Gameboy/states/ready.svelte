<script lang="ts">
  import { updateScreen, state } from '../state';
  import Menu from '../views/index.svelte';

  $: if ($state.show_menu) updateScreen({ item: Menu });
</script>