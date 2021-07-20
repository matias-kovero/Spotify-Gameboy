<script lang="ts">
  import { updateButtons, updateScreen, props } from '../state';

  updateButtons({ a: () => $props.wrapper.login() });
  updateScreen({ string: 'Press A to Login'});
</script>