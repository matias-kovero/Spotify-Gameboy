import { writable } from "svelte/store";
import type { WebPlaybackPlayer, WebPlaybackState } from 'svelte-spotify-web-playback/types';

interface GameboyButtons {
  a?: () => void,
  b?: () => void,
  up?: () => void,
  right?: () => void,
  down?: () => void,
  left?: () => void,
  select?: () => void,
  start?: () => void
};

const btnPress = (btn: string) => {
  console.log('Pressed', btn);
};

const initialButtons = {
  a: () => btnPress('A'),
  b: () => btnPress('B'),
  up: () => btnPress('Up'),
  right: () => btnPress('Right'),
  down: () => btnPress('Down'),
  left: () => btnPress('Left'),
  select: () => btnPress('Select'),
  start: () => btnPress('Start'),
} as GameboyButtons;

export const buttons = writable(initialButtons);

export const updateButtons = (_btns: GameboyButtons) => {
  // Update given values to state, empty values are replaced from initialState
  // Overwrites values that are edited from last state, but not edites on current state.
  // Option to disable overwrite? Maybe usefull on some menus?
  buttons.update((value) => {
    value = {...initialButtons, ..._btns}; // Overwrite
    // oldState = { ..._state }; // No overwrite
    return value;
  });
}

const initialScreen = {
  item: null,
  string: 'Nintendo®',
} as { item?: any , string?: string };

export const screen = writable(initialScreen);
export const updateScreen = (_screen: { item?: any, string?: string }) => {
  screen.update((value) => {
    value = { ...value, ..._screen };
    return value;
  });
}


interface GameboyProps {
  player?: WebPlaybackPlayer,
  state?: WebPlaybackState,
  wrapper?: any, // Can't be arsed to interface this. Methods are found in docs.
  error?: { type: string, message: string },
  token?: string,
};

// Literally no screen should have access to this store when it is at initial value == {}
export const props = writable({} as GameboyProps);

export const initProps = (_props: GameboyProps) => {
  props.update((value) => {
    value = { ...value, ..._props };
    return value;
  });
}



interface GameboyState {
  show_menu?: boolean,
  active_item?: number,
};

const initialGbState = {
  show_menu: true,
  active_item: 2, // Players id in config.
} as GameboyState;

export const state = writable(initialGbState);

export const updateState = (_state: GameboyState) => {
  state.update((value) => {
    value = { ...value,  ..._state };
    return value;
  });
} 