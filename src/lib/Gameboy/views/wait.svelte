<script lang="ts">
  import GameBoy from '../body.svelte';
  export let wrapper;
</script>

<GameBoy>
  <div slot="screen">Press A to Start</div>
  <div slot="a" class="btn" on:click={() => wrapper.selectDevice()} />
</GameBoy>

<style>
  .btn {
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>