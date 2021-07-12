<script lang="ts">
  import type { WebPlaybackState, WebPlaybackPlayer, InternalStatus } from 'svelte-spotify-web-playback/types';
  export let internal: InternalStatus, player: WebPlaybackPlayer, state: WebPlaybackState, error: { type: string, message: string};
  export let wrapper; // Getting reference of our wrapper
  import { initProps, state as gameboy_state } from './state';
  import Body from './body.svelte';

  /** State based views */
  import ViewError from './views/error.svelte';
  import ViewLoad from './views/load.svelte';
  import ViewLogin from './views/login.svelte';
  import ViewMenu from './views/menu.svelte';
  import ViewPlayer from './views/player.svelte';
  import ViewWait from './views/wait.svelte';
  
  /** Reactive store updates */
  $: { 
    initProps({ player });
  };
  $: { 
    initProps({ state });
  };
  $: { 
    initProps({ wrapper });
  };
  $: { 
    initProps({ error });
  };

  
  let screen = { } as { component: any };

  $: { 
    if (internal.isAuthorized) {
      if (internal.isLoading) screen = { component: ViewLoad };
      else if (internal.error) screen = { component: ViewError };
      else if ($gameboy_state.show_menu) screen = { component: ViewMenu };
      else if (!internal.isActive) screen = { component: ViewWait };
      else if (internal.isReady && internal.isActive) screen = { component: ViewPlayer };
    } else screen = { component: ViewLogin };
  }
</script>

<svelte:component this={screen.component} />

<Body />

<svelte:head>

  <svg xmlns="http://www.w3.org/2000/svg" width="165px" height="165px">
    <filter id="pixelate" x="0" y="0" >
      <feFlood x="4" y="4" height="2" width="2"/>
      <feComposite height="2" width="1"/>
      <feTile result="a" />
      <feComposite in="SourceGraphic" in2="a" operator="in" />
      <feMorphology operator="dilate" radius="2" />
    </filter>
  </svg>

  <svg xmlns="http://www.w3.org/2000/svg" width="165px" height="165px">
    <filter id="duotone_gameboy">

      <feColorMatrix type="matrix" result="grayscale"
        values="1 0 0 0 0
                1 0 0 0 0
                1 0 0 0 0
                0 0 0 1 0" >
      </feColorMatrix>

      <feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
        <feFuncR type="table" tableValues="0 0.7176470588"></feFuncR>
        <feFuncG type="table" tableValues="0 0.8039215686"></feFuncG>
        <feFuncB type="table" tableValues="0 0.631372549"></feFuncB>
        <feFuncA type="table" tableValues="0 1"></feFuncA>
      </feComponentTransfer>

    </filter>        
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg">
    <filter id="duotone_gameboy_alt">
      <feColorMatrix type="matrix" result="grayscale"
        values="1 0 0 0 0
                1 0 0 0 0
                1 0 0 0 0
                0 0 0 1 0" >
      </feColorMatrix>
      <feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
        <feFuncR type="table" tableValues="0.7176470588 0"></feFuncR>
        <feFuncG type="table" tableValues="0.8039215686 0"></feFuncG>
        <feFuncB type="table" tableValues="0.631372549 0"></feFuncB>
        <feFuncA type="table" tableValues="0 1"></feFuncA>
      </feComponentTransfer> 
    </filter>        
  </svg>

</svelte:head>
<!-- GB Green: 183, 205, 161 = 0.7176470588, 0.8039215686, 0.631372549  -->

<style>
  svg {
    display: none;
  }
</style>