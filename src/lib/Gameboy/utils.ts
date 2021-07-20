import { onDestroy } from 'svelte';
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

/**
 * Automatically destroyed interval.
 */
 export function onInterval(callback: () => void, milliseconds: number) {
  const interval = setInterval(callback, milliseconds);
  
  onDestroy(() => {
    clearInterval(interval);
  });
}

/**
 * Converts milliseconds to min:sec string.
 */
export function msToMinSec(ms: number): string {
  let min = Math.floor(ms / 60000);
  let sec = Math.floor((ms % 60000) / 1000);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}