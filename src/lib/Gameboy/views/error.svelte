<script lang="ts">
  import GameBoy from '../body.svelte';
  export let error: { type: string, message: string};
</script>

<GameBoy>
  <div slot="screen">
    <div><b>Error</b></div>
    <div><small>{error.message}</small></div>
  </div>
</GameBoy>