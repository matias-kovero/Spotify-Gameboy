<script lang="ts">
  import type { WebPlaybackState, WebPlaybackPlayer, InternalStatus } from 'svelte-spotify-web-playback/types';
  export let internal: InternalStatus, player: WebPlaybackPlayer, state: WebPlaybackState, error: { type: string, message: string};
  export let wrapper; // Getting reference of our wrapper

  /** State based views */
  import ViewError from './views/error.svelte';
  import ViewLoad from './views/load.svelte';
  import ViewLogin from './views/login.svelte';
  import ViewMenu from './views/menu.svelte';
  import ViewPlayer from './views/player.svelte';
  import ViewWait from './views/wait.svelte';

  let menu_open = false;

  const toggleMenu = () => {
    menu_open = !menu_open;
  }

  let defaultProps = { toggleMenu: toggleMenu };
  
  let screen = { } as { name?: string, component: any, props?: {} };
  $: { 
    if (internal.isAuthorized) {
      if (internal.isLoading) screen = { component: ViewLoad };
      else if (internal.error) screen = { component: ViewError, props: { error } };
      else if (menu_open) screen = { component: ViewMenu };
      else if (!internal.isActive) screen = { component: ViewWait, props: { wrapper } };
      else if (internal.isReady && internal.isActive) screen = { component: ViewPlayer, props: { state, player } };
    } else screen = { component: ViewLogin, props: { wrapper } };
  }
</script>

<svelte:component this={screen.component} { ...screen.props } {defaultProps} />