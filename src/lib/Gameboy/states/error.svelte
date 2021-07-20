<script lang="ts">
  import { props, updateScreen } from '../state';
  let component;

  updateScreen({ item: component });
</script>

<div bind:this={component}>
  <div><b>Error</b></div>
  <div><small>{$props.error.message}</small></div>
</div>