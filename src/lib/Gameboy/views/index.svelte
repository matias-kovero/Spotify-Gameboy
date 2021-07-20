<script lang="ts">
  import { menu } from '../../config';
	import { toggleMenu } from '../utils';
	import { state, updateScreen, updateButtons, updateState } from '../state';

	/**
	 * Menu item that has current childs.
	 */
	 let local_menu = [] as { id: number, label: string, childs?: number[], component?: string }[];
	/**
	 * Parent item of current menu, navigated if used presses back.
	 */
	let local_parent = 0;
	/**
	 * Index of hovered item in current menu.
	 */
	let idx = 0;
	/** 
	 * Set menu buttons
	 */
	updateButtons({
    up: 	() => navigate('up'),
    down: () => navigate('down'),
    start:() => toggleMenu('close'),
    a: 		() => navigate('a'),
    b: 		() => navigate('b'),
  });

	const navigate = (direction: string) => {
		switch (direction) {
			case 'up':
				if (idx > 0) idx--;
				break;
			case 'down':
				if (idx < local_menu.length - 1) idx++;
				break;
			case 'a': 
				traverseForward();
				break;
			case 'b':
				traverseBack();
				break;
			default: 
				console.warn('[Warn] Out of scope value found:', direction);
				break;
		}
	}

	/**
	 * The item that is selected before menu opened, as if user closes menu - this item will be still active to user.
	 */
	$: activeItem = menu.find((i) => i.id === $state.active_item);

	/**
	 * Initialize menu
	*/
	$: if (!local_menu.length) {
			let parent = menu.find((i) => i.childs?.find((j) => j === $state.active_item));
			local_parent = parent.id; // If we press back, we go to this parent.
			local_menu = menu.filter((i) => parent.childs.includes(i.id));
			idx = local_menu.indexOf(activeItem);
		}
	/**
	 * Update screen with new view
	*/
	$: if (activeItem.component && !$state.show_menu) {
      import(`../views/${activeItem.component}.svelte`).then((module) => {
        updateScreen({ item: module.default });
      });
    }

	const traverseForward = () => {
		let item = local_menu[idx];
		if (item.component) {
			toggleMenu('close');
			if ($state.active_item != item.id) updateState({ active_item: item.id });
		} else if (item.childs) {
			local_menu = menu.filter((i) => item.childs.includes(i.id));						// Get childs of selected item
			local_parent = menu.find((i) => i.childs?.includes(item.id))?.id || 0; 	// Parent of selected item
			idx = 0;
		} else {
			console.error('[Error] No component nor menu items found on menu item. Please check config on item id:', item.id);
		}
	}

	const traverseBack = () => {
		if (local_menu[idx].id <= 0) return; // We are in main menu, can't go back. Optionally close menu?
		let last_item = menu.find((i) => i.childs?.includes(local_menu[idx].id)); // Tmp save current menu object
		let parent = menu.find((i) => i.id === local_parent); 										// New menu object

		if (last_item.id) {
			local_parent = menu.find((i) => i.childs?.find((j) => j === parent.id))?.id || 0; // Save parent of new menu.
			let new_parent = menu.find((i) => i.id === local_parent); // Parent
			local_menu = menu.filter((i) => new_parent.childs.includes(i.id));
			idx = local_menu.indexOf(last_item); // Hover to selection of previous menu option.
		}
	}
</script>

<div class="menu">
	{#each local_menu as item, i}
		<div class:selected={idx === i} class="menu-item">{item?.label}</div>
	{/each}
</div>

<style lang="scss">
  .menu {
		display: flex;
		flex-direction: column;
		justify-content: center;
		place-items: center;
		width: 100%;
		height: 100%;
		font-size: 22px;
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