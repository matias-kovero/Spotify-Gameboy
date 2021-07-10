<script lang="ts">
  import { navigateMenu } from '../../utils';
  import GameBoy from '../body.svelte';
  import Menu from '../screens/menuSelect.svelte';
  export let defaultProps;

  let menu_idx = 0;

  const navigate = (direction: string) => {
    // Update menu index
    menu_idx = navigateMenu(direction, menu_idx);
  }
</script>

<GameBoy>
  <Menu slot="screen" {menu_idx} />
  <div slot="up" class="btn" on:click={() => navigate('up')} />
  <div slot="down" class="btn" on:click={() => navigate('down')} />
  <div slot="start" class="btn" on:click={() => defaultProps.toggleMenu()} />
</GameBoy>

<style>
  .btn {
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>