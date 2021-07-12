import { get } from 'svelte/store';
import { state, updateState } from './state';

/**
 * Toggle menu, or set it based on action.
 */
export const toggleMenu = (action?: 'open' | 'close') => {
  if (!action) {
    let _show = get(state).show_menu;
    updateState({ show_menu: !_show });
  } else {
    updateState({ show_menu: action === 'open' });
  }
}