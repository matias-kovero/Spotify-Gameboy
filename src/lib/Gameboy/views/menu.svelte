<script lang="ts">
  import { navigateMenu } from '../../utils';
  import { updateButtons, updateScreen, state, updateState } from '../state';
  import { toggleMenu } from '../functions';
  import Menu from '../screens/menuSelect.svelte';

  updateButtons({
    up: () => navigate('up'),
    down: () => navigate('down'),
    start: () => toggleMenu('close'),
  });
  updateScreen({ item: Menu });

  // Could we ditch this to functions or keep here?
  const navigate = (direction: string) => {
    // Wack we are updating store to store in nested function, should manage this centrally.
    updateState({ 
      menu_index: navigateMenu(direction, $state.menu_index),
    });
  }

</script>