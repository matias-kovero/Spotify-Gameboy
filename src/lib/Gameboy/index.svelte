<script lang="ts">
  import type { WebPlaybackState, WebPlaybackPlayer, InternalStatus } from 'svelte-spotify-web-playback/types';
  export let internal: InternalStatus, player: WebPlaybackPlayer, state: WebPlaybackState, error: { type: string, message: string};
  export let wrapper; // Getting reference of our wrapper
  import { initProps } from './state';
  import Body from './body.svelte';

  /** State based views */
  import ViewError from './states/error.svelte';
  import ViewLoad from './states/load.svelte';
  import ViewLogin from './states/login.svelte';
  import ViewReady from './states/ready.svelte';
  import ViewWait from './states/wait.svelte';
  
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
      else if (!internal.isActive) screen = { component: ViewWait };
      else if (internal.isReady && internal.isActive) screen = { component: ViewReady };
    } else screen = { component: ViewLogin };
  }
</script>

<svelte:component this={screen.component} />

<Body />

<svelte:head>

  <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
    <filter id="pixelate" x="0" y="0" >
      <feFlood x="4" y="4" height="2" width="2"/>
      <feComposite height="10" width="10"/>
      <feTile result="a" />
      <feComposite in="SourceGraphic" in2="a" operator="in" />
      <feMorphology operator="erode" radius="3" />
    </filter>
  </svg>

  <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
    <filter id="discrete" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" result="grayscale"
        values="1 0 0 0 0
                1 0 0 0 0
                1 0 0 0 0
                0 0 0 1 0" >
      </feColorMatrix>
      <!-- <feFlood x="4" y="4" height="2" width="2"/>
      <feComposite height="10" width="10"/>
      <feTile result="a" />
      <feComponentTransfer in="grayscale">
        <feFuncR type="discrete" 
          tableValues="-0.25 0.75 1.0 0.5 0.33"> 
        </feFuncR>
        <feFuncG type="discrete" 
          tableValues="-0.25 0.75 1.0 0.5 0.33">
        </feFuncG>
        <feFuncB type="discrete" 
          tableValues="-0.25 0.75 1.0 0.5 0.33  ">
        </feFuncB>
        <feFuncA type="discrete" tableValues="0.25 1 0.5 0.75"></feFuncA>
      </feComponentTransfer> -->
      <!-- <feColorMatrix in="grayscale" values="0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 0 1"/> -->
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues=".68 .44 .44 .47 .47 .5 .5 .52 .52 .55 .55 .59 .59 .61 .61 .64 .64 .67 .67 .69 .69 .73 .73 .77 .77 .79 .79 .82 .82 .84 .84 .85 .85 .87 .87 .89 .89 .91 .91 .94 .94 .94 .94 .94 .94 .94 .94 .94 .94 .94 .94 .94 .94 .93 .93 .91 .91 .9 .9 .88 .88 .87 .87 .85 .85 .84 .84 .82 .82 .8 .8 .79 .79 .77 .77 .76 .76 .77 .77 .79 .79 .8 .8 .82 .82 .84 .84 .86 .86 .87 .87 .89 .89 .91 .91 .92 .92 .94 .94 .96 .96 .97 .97 .97 .97 .97 .97 .97 .97 .98 .98 .98 .98 .98 .98 .98 .98 .99 .99 .99 .99 .99 .99 .99 .99 .99 .99 .99"/>
        <feFuncG type="discrete" tableValues=".84 .6 .6 .62 .62 .65 .65 .67 .67 .7 .7 .73 .73 .75 .75 .78 .78 .81 .81 .83 .83 .86 .86 .89 .89 .91 .91 .93 .93 .93 .93 .93 .93 .93 .93 .93 .93 .93 .93 .94 .94 .91 .91 .89 .89 .87 .87 .85 .85 .82 .82 .8 .8 .77 .77 .75 .75 .73 .73 .71 .71 .69 .69 .66 .66 .65 .65 .62 .62 .6 .6 .58 .58 .57 .57 .55 .55 .57 .57 .6 .6 .62 .62 .65 .65 .68 .68 .71 .71 .73 .73 .76 .76 .8 .8 .82 .82 .85 .85 .88 .88 .9 .9 .91 .91 .91 .91 .92 .92 .93 .93 .94 .94 .95 .95 .95 .95 .97 .97 .98 .98 .98 .98 .98 .98 .99 .99 .99"/>
        <feFuncB type="discrete" tableValues=".94 .35 .35 .36 .36 .39 .39 .4 .4 .43 .43 .45 .45 .47 .47 .49 .49 .52 .52 .53 .53 .56 .56 .59 .59 .6 .6 .62 .62 .6 .6 .6 .6 .58 .58 .58 .58 .58 .58 .57 .57 .56 .56 .55 .55 .55 .55 .54 .54 .53 .53 .53 .53 .52 .52 .52 .52 .52 .52 .52 .52 .51 .51 .51 .51 .51 .51 .5 .5 .49 .49 .5 .5 .49 .49 .49 .49 .5 .5 .52 .52 .54 .54 .56 .56 .58 .58 .61 .61 .63 .63 .66 .66 .68 .68 .71 .71 .73 .73 .77 .77 .8 .8 .8 .8 .82 .82 .84 .84 .86 .86 .88 .88 .89 .89 .91 .91 .93 .93 .95 .95 .96 .96 .98 .98 .99 .99 .99"/>
      </feComponentTransfer>
      <!-- Convert RGBA to grayscale -->
      <feColorMatrix type="matrix" result="grayscale"
        values="1 0 0 0 0
                1 0 0 0 0
                1 0 0 0 0
                0 0 0 1 0" >
      </feColorMatrix>

      <feMerge>
        <feMergeNode/>
        <feMergeNode in="fine"/>
        <feMergeNode in="medium"/>
        <feMergeNode in="coarse"/>
      </feMerge>

      <!-- Use grayscaled palette to duotone to black/Gameboy bg color -->
      <!-- Colors are calculated per channel: n / 255 -->
      <feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
        <feFuncR type="table" tableValues="0 0.7176470588"></feFuncR>
        <feFuncG type="table" tableValues="0 0.8039215686"></feFuncG>
        <feFuncB type="table" tableValues="0 0.631372549"></feFuncB>
        <feFuncA type="table" tableValues="0 1"></feFuncA>
      </feComponentTransfer>
    </filter>

    <filter id="duotone_gameboy">
      <!-- <feColorMatrix in="grayscale" values="0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 0 1"/> -->
      <!-- We could calculate to an smaller palette, but as many album covers are full black, they would not render -->
      <!-- Isn't that much of a gameboy effect, but it is an compromise -->
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues=".68 .44 .44 .47 .47 .5 .5 .52 .52 .55 .55 .59 .59 .61 .61 .64 .64 .67 .67 .69 .69 .73 .73 .77 .77 .79 .79 .82 .82 .84 .84 .85 .85 .87 .87 .89 .89 .91 .91 .94 .94 .94 .94 .94 .94 .94 .94 .94 .94 .94 .94 .94 .94 .93 .93 .91 .91 .9 .9 .88 .88 .87 .87 .85 .85 .84 .84 .82 .82 .8 .8 .79 .79 .77 .77 .76 .76 .77 .77 .79 .79 .8 .8 .82 .82 .84 .84 .86 .86 .87 .87 .89 .89 .91 .91 .92 .92 .94 .94 .96 .96 .97 .97 .97 .97 .97 .97 .97 .97 .98 .98 .98 .98 .98 .98 .98 .98 .99 .99 .99 .99 .99 .99 .99 .99 .99 .99 .99"/>
        <feFuncG type="discrete" tableValues=".84 .6 .6 .62 .62 .65 .65 .67 .67 .7 .7 .73 .73 .75 .75 .78 .78 .81 .81 .83 .83 .86 .86 .89 .89 .91 .91 .93 .93 .93 .93 .93 .93 .93 .93 .93 .93 .93 .93 .94 .94 .91 .91 .89 .89 .87 .87 .85 .85 .82 .82 .8 .8 .77 .77 .75 .75 .73 .73 .71 .71 .69 .69 .66 .66 .65 .65 .62 .62 .6 .6 .58 .58 .57 .57 .55 .55 .57 .57 .6 .6 .62 .62 .65 .65 .68 .68 .71 .71 .73 .73 .76 .76 .8 .8 .82 .82 .85 .85 .88 .88 .9 .9 .91 .91 .91 .91 .92 .92 .93 .93 .94 .94 .95 .95 .95 .95 .97 .97 .98 .98 .98 .98 .98 .98 .99 .99 .99"/>
        <feFuncB type="discrete" tableValues=".94 .35 .35 .36 .36 .39 .39 .4 .4 .43 .43 .45 .45 .47 .47 .49 .49 .52 .52 .53 .53 .56 .56 .59 .59 .6 .6 .62 .62 .6 .6 .6 .6 .58 .58 .58 .58 .58 .58 .57 .57 .56 .56 .55 .55 .55 .55 .54 .54 .53 .53 .53 .53 .52 .52 .52 .52 .52 .52 .52 .52 .51 .51 .51 .51 .51 .51 .5 .5 .49 .49 .5 .5 .49 .49 .49 .49 .5 .5 .52 .52 .54 .54 .56 .56 .58 .58 .61 .61 .63 .63 .66 .66 .68 .68 .71 .71 .73 .73 .77 .77 .8 .8 .8 .8 .82 .82 .84 .84 .86 .86 .88 .88 .89 .89 .91 .91 .93 .93 .95 .95 .96 .96 .98 .98 .99 .99 .99"/>
      </feComponentTransfer>

      <!-- Grayscale palette for duotone to black/Gameboy bg color -->
      <feColorMatrix type="matrix" result="grayscale"
        values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0" >
      </feColorMatrix>

      <!-- Colors are calculated per channel: n / 255 -->
      <feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
        <feFuncR type="table" tableValues="0 0.7176470588"></feFuncR>
        <feFuncG type="table" tableValues="0 0.8039215686"></feFuncG>
        <feFuncB type="table" tableValues="0 0.631372549"></feFuncB>
        <feFuncA type="table" tableValues="0 1"></feFuncA>
      </feComponentTransfer>

    </filter>  
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
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
<!-- -0.5 0 -0.375 0.125 0.25 -0.25 0.375 -0.125 -0.3125 0.1875 -0.4375 0.0625 0.4375 -0.0625 0.3125 -0.1875-->
<!-- 1/4 0.25 0.75 1.0 0.5 0.65-->
<!-- 1/9 0 7 3 6 5 2 4 1 8-->
<!-- 1/16 0 8 2 10 12 4 14 6 3 11 1 9 15 7 13 5-->
<!-- 1/64 0 32 8 40 2 34 10 42 48 16 56 24 50 18 58 26 12 44 4 36 14 46 6 38 60 28 52 20 62 30 54 22 3 35 11 43 1 33 9 41 51 19 59 27 49 17 57 25 15 47 7 39 13 45 5 37 63 31 55 23 61 29 53 21 -->
<!-- Pre calculate our treshold map Mpre(i,j) = (Mint(i,j)+1) / n^2 -->
<!-- https://en.wikipedia.org/wiki/Ordered_dithering -->
<!-- https://alistapart.com/article/finessing-fecolormatrix/ -->
<!-- https://stackoverflow.com/questions/46906819/edge-detection-in-svg-filter -->
<!-- https://books.google.fi/books?id=Y-UJEAAAQBAJ&pg=PA187&lpg=PA187#v=onepage&q&f=false -->
<!-- Corse example: https://gist.github.com/monfera/c774b8b7196b7e04a5487102b63a330b -->

<style>
  svg {
    display: none;
  }
</style>