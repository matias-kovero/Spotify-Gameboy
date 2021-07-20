<script lang="ts">
  import { onMount } from 'svelte';
  import { updateButtons } from '../state';
  import { toggleMenu } from '../utils';
  let doc;
  let idx = 0;

  const themes = [
    { value: 'off-white',     label: 'Off White' },
    { value: 'light-purple',  label: 'Light Purple' },
    { value: 'pikachu',       label: 'Pikachu' },
    { value: 'lime',          label: 'Lime' },
    { value: 'blue',          label: 'Blue' },
  ] as { value: string, label: string}[];

  // We could define custom function handlers here and pass them to below state functions.
  updateButtons({
    a:      () => selectTheme(),
    b:      () => toggleMenu('open'),
    left:   () => scrollThemes('prev'),
    right:  () => scrollThemes('next'),
    start:  () => toggleMenu('open'),
  });

  const scrollThemes = (action: 'prev' | 'next') => {
    switch (action) {
      case 'prev':
        idx <= 0 ? idx = themes.length - 1 : idx--;
        break;
      case 'next':
        idx < themes.length - 1 ? idx++ : idx = 0;
        break;
      default:
        console.error('You messed up themes. Could happen to anyone, but here you are.');
        break;
    }
  }
  const selectTheme = () => {
    if (!doc) return;
    let theme = themes[idx].value;
    doc.setAttribute('color-scheme', theme);
    // Save to localStorage for percistent
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', theme);
    }
  }

  onMount(() => {
    doc = document.firstElementChild;
    const ls = window.localStorage;
    if (ls && ls.getItem('theme')) {
      idx = themes.findIndex((i) => i.value === ls.getItem('theme'));
    }
  });
</script>

<div class="container">
  <p>Select theme</p>
  <div class="selector">
    <div>{'<'}</div>
    <div>{themes[idx].label}</div>
    <div>{'>'}</div>
  </div>
  <div class="info">
    <div>[B]BACK</div>
    <div>[A]SELECT</div>
  </div>
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .selector {
    display: grid;
    grid-template-columns: 25px auto 25px;
  }
  .info {
    display: flex;
    font-size: 16px;
    justify-content: space-around;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
  }
</style>