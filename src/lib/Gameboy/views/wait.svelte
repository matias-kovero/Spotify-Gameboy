<script lang="ts">
  import { updateButtons, props, updateScreen } from '../state';

  updateButtons({ 
    a: () => $props.wrapper.selectDevice(),
  });
  updateScreen({ string: 'Press A to Start'});

</script>