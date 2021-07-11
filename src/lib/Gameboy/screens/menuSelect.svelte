<script lang="ts">
  import { menuItems } from '../../config';

  export let menu_idx: number;
</script>

<div class="menu">
  {#each menuItems as item, i}
    <div class:selected={menu_idx === i} class="menu-item">{item}</div>
  {/each}
</div>

<style lang="scss">
  .menu {
		display:flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 100%;
		font-size: 22px;
		.menu-item {
			width: 100%;
			height: auto;
			&.selected {
				background: #000;
				padding-bottom: .1em;
				color: #B7CDA1;
				font-size: 26px;
			}
		}
	}
</style>