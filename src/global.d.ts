/// <reference types="@sveltejs/kit" />
/// <reference types="svelte-spotify-web-playback/types" />
import * as _ from 'svelte-spotify-web-playback/types';

// No idea how this works...

declare global {
  const _: typeof _;
  const gameControl: any;
}
