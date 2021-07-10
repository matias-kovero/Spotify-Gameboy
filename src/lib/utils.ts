import { onDestroy } from 'svelte';
import { menuItems } from './config';
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

/**
 * Handle menu change. Returns navigated menu item index.
 */
 export const navigateMenu = (direction: string, index: number): number => {

  switch (direction) {
    case 'up': {
      return index > 0 ? --index : 0;
    }
    case 'down': {
      return index < menuItems.length-1 ? ++index : index;
    }
    default:
      console.error('navigation error');
      return index ? index : 0;
  }
}