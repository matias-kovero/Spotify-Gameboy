<script lang="ts">
  import { updateButtons, props } from '../state';
  import { toggleMenu } from '../utils';
  import Spotify from 'spotify-web-api-js';
  let api = new Spotify();
  api.setAccessToken($props.token);

  $: fetchDone = false;
  $: userLists = [];

  api.getUserPlaylists()
    .then(data => {
      data.items.forEach(p => {
        userLists.push({ id: p.id, name: p.name, uri: p.uri });
      });
      fetchDone = true;
      idx = 0;
    });
  api.getFeaturedPlaylists()
    .then(data => {
      data.playlists.items.forEach(p => {
        userLists.push({ id: p.id, name: p.name, uri: p.uri });
      });
      fetchDone = true;
      idx = 0;
    });
  api.getMe()
    .then(me => {
      console.log(me);
    });
  // Load info from spotify api...
  let list = [];
  /**
	 * Index of hovered item in current menu.
	 */
	let idx = -1;
  /** 
	 * Set menu buttons
	 */
  updateButtons({
    up: 	() => navigate('up'),
    down: () => navigate('down'),
    start: () => toggleMenu('open'),
    a: () => navigate('a'),
    b: () => toggleMenu('open'),
  });

  const navigate = (direction: string) => {
		switch (direction) {
			case 'up':
				if (idx > 0) idx--;
				break;
			case 'down':
				if (idx < userLists.length - 1) idx++;
				break;
			case 'a': 
				selectPlaylist();
				break;
			default: 
				console.warn('[Warn] Out of scope value found:', direction);
				break;
		}
	}

  const selectPlaylist = () => {
    api.play({ context_uri: userLists[idx].uri });
  }

  $: previous = userLists[(idx+userLists.length-1)%userLists.length];
  $: current = userLists[idx];
  $: next = userLists[(idx+1)%userLists.length];

</script>

<div class="menu">
  <div class="title">Select playlist</div>
  {#key fetchDone}
    {#if idx == userLists.length - 1}
      <div class="menu-item">{'▲'}</div>
    {/if}
    {#if idx != 0}
      <div class="menu-item">{previous ? previous?.name : '...'}</div>
    {/if}
    <div class="menu-item selected">{current ? current?.name : '...'}</div>
    {#if idx != userLists.length - 1}
      <div class="menu-item">{next ? next?.name : '...'}</div>
    {/if}
    {#if idx == 0}
      <div class="menu-item">{'▼'}</div>
    {/if}
  {/key}
</div>

<style lang="scss">
  .title {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 14px;
  }
  .menu {
		display: flex;
		flex-direction: column;
		justify-content: center;
		place-items: center;
		width: 100%;
		height: 100%;
		font-size: 22px;
    position: relative;
		.menu-item {
			width: 100%;
			height: auto;
			&.selected {
				background: #000;
				padding-bottom: .1em;
				color: var(--gb-screen);
				font-size: 26px;
			}
		}
	}
</style>