export const menuItems = ['playlists', 'now playing', 'settings'];

interface MenuObject {
  label: string,
  sub_menus?: MenuObject[],
  component?: string, // String relative path(?) to component.
};

/**
 * Components are referenced to /Gameboy/views/
 */
export const menu_old = {
  label: 'Main menu',
  sub_menus: [
    { label: 'playlists', sub_menus: [] },
    { label: 'now playing', component: 'player' },
    { label: 'settings', sub_menus: [
      { label: 'Themes', component: 'themes', sub_menus: [
        { label: 'Sub 1' },
        { label: 'Sub 2' },
        { label: 'Sub 3' },
        { label: 'Sub 4' },
      ]}
    ] }
  ]
} as MenuObject;


/**
 * Unable to think an way to save index on nested layout - to easily traverse parent <-> child
 * This solution works, but it isn't the cleanest + additional typings needed...
 * Components are referenced to Gameboy/views/
 * 
 * TODO: 
 *  - Create an nested object to handle everything, no duplicated writing needed.
 *  - Will need major edits to Gameboy/views/index.svelte logic aswell. (It's an mess)
 */
export const menu = [
  { id:   0, label: 'Main menu',    childs: [1, 2, 3] },
  { id:   1, label: 'playlists',    component: 'playlists' },
  { id:   2, label: 'now playing',  component: 'player' },
  { id:   3, label: 'settings',     childs: [30, 31, 32] },
  { id:  30, label: 'themes',       component: 'themes' },
  { id: 301, label: 'Sub 1',    component: '' },
  { id: 302, label: 'Sub 2',    component: '' },
  { id: 303, label: 'Sub 3',    component: '' },
  { id: 304, label: 'Sub 4',    component: '' },
  { id:  31, label: 'volume',    component: '' },
  { id:  32, label: 'logout',    component: '' },
] as { id: number, label: string, childs?: number[], component?: string }[];