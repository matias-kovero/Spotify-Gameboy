<script lang="ts">

</script>

<div class="body">
  <div class="screen">
    <div class="inner">
      <div>
        <slot name="screen">
          Nintendo®
        </slot>
      </div>
    </div>
  </div>
  <div class="buttons">
    <div class="upper-row">
    <div class="dpad">
      <div class="x">
      <div class="left">
        <slot name="left">
          <div class="slot" on:click={() => console.log('Clicked Left')}></div>
        </slot>
      </div>
      <div class="right">
        <slot name="right">
          <div class="slot" on:click={() => console.log('Clicked Right')}></div>
        </slot>
      </div>
      </div>
      <div class="y">
      <div class="up">
        <slot name="up">
          <div class="slot" on:click={() => console.log('Pressed Up')}></div>
        </slot>
      </div>
      <div class="down">
        <slot name="down">
          <div class="slot" on:click={() => console.log('Pressed Down')}></div>
        </slot>
      </div>
      </div>
    </div>
    <div class="ab">
      <div class="button b">
        <div class="label">B</div>
        <slot name="b">
          <div class="slot" on:click={() => console.log('Pressed B')}></div>
        </slot>
      </div>
      <div class="button a">
        <div class="label">A</div>
        <slot name="a">
          <div class="slot" on:click={() => console.log('Pressed A')}></div>
        </slot>
      </div>
    </div>
    </div>
    <div class="lower-row">
      <div class="button">
        <slot name="select">
          <div class="slot" on:click={() => console.log('Pressed Select')}></div>
        </slot>
      </div>
      <div class="button">
        <slot name="start">
          <div class="slot" on:click={() => console.log('Pressed Start')}></div>
        </slot>
      </div>
    </div>
  </div>
  <div class="speaker"></div>
</div>


<style lang="scss">
  .slot {
    width: 100%;
    height: 100%;
    z-index: 1;
  }
	.body {
  margin: 30px;
  position: relative;
  background: #dcd0ff;
  width: 250px;
  height: 400px;
  border-radius: 8px 8px 50px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 6px 4px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 6px 3px 10px -1px rgba(0,0,0,0.20);
  margin: auto;
  margin-top: 200px;
}
.screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
  width: 90%;
  background: #000;
  margin-top: 20px;
  border-radius: 8px 8px 30px 8px;
  .inner {
    display: grid;
    place-items: center;
    text-align: center;
    font-family: monotype;
    margin-top: 20px;
    height: 80%;
    width: 75%;
    background: #B7CDA1;
    font-size: 20px;
    font-family: monospace;
    font-weight: 600;
    letter-spacing: 0.001em;
    overflow: hidden;
    position: relative;
    > div {
      grid-column: 1/2;
      grid-row: 1/2;
      place-items: center;
      display: grid;
      height: 100%;
      width: 100%;
    }
  }
}
.buttons {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 85%;
  .upper-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .dpad {
      position: relative;
      width: 60px;
      height: 60px;
      .x {
        position: absolute;
        top: 20px;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
        height: calc(100% / 3);
        width: 100%;
        background: #000;
        border-radius: 3px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
		.left, .right {
			width: calc(100% / 3);
			height: 100%;
			cursor: pointer;
		}
      }
      .y {
        position: absolute;
        left: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
        height: 100%;
        width: calc(100% / 3);
        background: #000;
        border-radius: 3px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
		.up, .down {
			height: calc(100% / 3);
			width: 100%;
			cursor: pointer;
		}
      }
    }
    .ab {
      position: relative;
      width: 80px;
      .button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #000;
        color: #4a4a4a;
        font-family: monotype;
        display: grid;
        place-items: center;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
        &.a {
          position: absolute;
          bottom: 5px;
          left: 5px;
        }
        &.b {
          position: absolute;
          top: 5px;
          right: 5px;
		      cursor: pointer;
        }
        .label {
          position: absolute;
          z-index: 0;
        }
      }
    }
  }
  .lower-row {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30px;
    gap: 7px;
    .button {
      width: 27px;
      height: 8px;
      border-radius: 10px;
      background: #000;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
    }
  }
}
.speaker {
  position: absolute;
  width: 50px;
  height: 50px;
  bottom: 15px;
  right: 15px;
  border-radius: 50% 0 50% 0;
  background-color: #dcd0ff;
  background-image: radial-gradient(black 15%, transparent 16%),
  radial-gradient(#666 15%, transparent 16%);
  background-size: 10px 10px;
  background-position: 0 0, 15px 35px;
}
.slot {
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>