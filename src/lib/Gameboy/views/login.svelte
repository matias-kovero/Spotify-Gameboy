<script lang="ts">
  import GameBoy from '../body.svelte';
  export let wrapper;
</script>

<GameBoy>
  <div slot="screen">Press A to Login</div>
  <div slot="a" class="btn" on:click={() => wrapper.login()}/>
</GameBoy>

<style>
  .btn {
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>