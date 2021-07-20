<script lang="ts">
  import { updateButtons, props } from '../state';
  import { toggleMenu, onInterval, msToMinSec } from '../utils';
  import AlbumImage from '../screens/albumCover.svelte';

  let volume = {
    hide: true,
    timer: null,
    timeout: 1500,
    value: null // Float between 0 - 1
  };

  let info = {
    hide: true,
    timer: null,
    timeout: 3000,
  };

  $: if (!volume.value) { // If volume 0, will fire
    $props.player.getVolume().then((vol) => {
      volume.value = vol * 100;
    });
  }

  $: position = $props.state.position;
  // Get & Update song position.
  onInterval(() => position += $props.state.paused ? 0 : 300, 300);

  // We could define custom function handlers here and pass them to below state functions.
  updateButtons({
    a:      () => $props.player.togglePlay(),
    b:      () => showInfo(),
    left:   () => $props.player.previousTrack(),
    right:  () => $props.player.nextTrack(),
    start:  () => toggleMenu('open'),
    up:     () => updateVolume('up'),
    down:   () => updateVolume('down')
  });

  //updateScreen({ item: AlbumImage });

  const updateVolume = (action: 'up' | 'down') => {
    switch (action) {
      case 'up':
        if (volume.value < 100) { 
          showVolume();
          $props.player.setVolume(++volume.value / 100); 
        }
        break;
      case 'down':
        if (volume.value > 0) { 
          showVolume();
          $props.player.setVolume(--volume.value / 100); 
        }
        break;
      default:
        console.warn('[Warn] What are you doing, volume goes up or down.');
        break; // Is this even needed - the switch ends here.
    }
  }

  const showVolume = () => {
    volume.hide = false;
    if (volume.timer) clearTimeout(volume.timer);
    volume.timer = setTimeout(() => volume.hide = true, volume.timeout);
  }

  const showInfo = () => {
    info.hide = false;
    if (info.timer) clearTimeout(info.timer);
    info.timer = setTimeout(() => info.hide = true, info.timeout);
  }

</script>

<div class="wrapper">
  <div class="hud">
    <div class="top-bar">
      <div class="volume" class:hidden={volume.hide && info.hide}>
        <small>VOLUME ({volume.value})</small>
      </div>
      <div class="time" class:hidden={info.hide}>
        <small>{msToMinSec(position)} / {msToMinSec($props.state.duration)}</small>
      </div>
    </div>
    <div class="bottom-bar" class:hidden={info.hide}>
      <small>{$props.state.track_window.current_track.name}</small>
    </div>
  </div>
  <AlbumImage />
</div>

<style lang="scss">
  .wrapper {
    position: relative;
  }
  .hud {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .hidden {
    display: none !important;
  }
  .top-bar {
    position: absolute;
    padding: 0 .2em;
    left: 0;
    right: 0;
    top: 2px;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    .time { text-align: right; }
    .volume { text-align: left;}
  }
  .bottom-bar {
    position: absolute;
    bottom: 5px;
    font-size: 16px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
  }
</style>
