<script lang="ts">
  const btnPress = (btn: string) => {
    console.log('Pressed', btn);
  };
</script>

<div class="body">
  <div class="screen">
    <div class="inner">
      <slot name="screen">Nintendo®</slot>
    </div>
  </div>
  <div class="buttons">
    <div class="upper-row">
      <div class="dpad">
        <div class="x">
          <div class="left">
            <slot name="left">
              <div class="slot" on:click={() => btnPress('Left')} />
            </slot>
          </div>
          <div class="right">
            <slot name="right">
              <div class="slot" on:click={() => btnPress('Right')} />
            </slot>
          </div>
        </div>
        <div class="y">
          <div class="up">
            <slot name="up">
              <div class="slot" on:click={() => btnPress('Up')} />
            </slot>
          </div>
          <div class="down">
            <slot name="down">
              <div class="slot" on:click={() => btnPress('Down')} />
            </slot>
          </div>
        </div>
      </div>
      <div class="ab">
        <div class="button a">
          <div class="label">A</div>
          <slot name="a">
            <div class="slot" on:click={() => btnPress('A')} />
          </slot>
        </div>
        <div class="button b">
          <div class="label">B</div>
          <slot name="b">
            <div class="slot" on:click={() => btnPress('B')} />
          </slot>
        </div>
      </div>
    </div>
    <div class="bottom-row">
      <div class="button">
        <div class="label select">SELECT</div>
        <slot name="select">
          <div class="slot" on:click={() => btnPress('Select')} />
        </slot>
      </div>
      <div class="button">
        <div class="label start">START</div>
        <slot name="start">
          <div class="slot" on:click={() => btnPress('Start')} />
        </slot>
      </div>
    </div>
  </div>
  <div class="speaker"></div>
  <div class="shadows">
    <div class="top"></div>
    <div class="hidden"></div>
    <div class="bottom"></div>
  </div>
</div>

<style lang="scss">
  $dpad: 60px;
  $dpad-btn: 20px;

  .body {
    width: 250px;
    height: 400px;
    background: var(--gb-shell);
    border-radius: 8px 8px 50px 8px;
    display: grid;
    place-items: center;
    grid-template-rows: 60% 1fr;
    box-shadow: -5px 6px 13px 0 #0003, inset 2px -2px 6px #00000085, inset -2px 2px 2px 0px #ffffff4f;
    margin-top: 200px;
    position: relative;
  }
  .screen {
    height: 85%;
    width: 90%;
    background: var(--gb-screen-bg);
    border-radius: 8px 8px 30px 8px;
    display: inherit;
    place-items: inherit;
    border: 1px solid #00000030;
    z-index: 1;
    > .inner {
      display: inherit;
      place-items: inherit;
      background: var(--gb-screen);
      height: 165px;
      width: 165px;
      text-align: center;
      font-family: "VT323", monospace;
      font-size: 20px;
      font-weight: 600;
      color: #000;
      letter-spacing: .2px;
      grid-column: 1/2;
      grid-row: 1/2;
      border: 1px solid #00000078;
    }
  }
  .screen:after {
    position: absolute;
    content: '';
    bottom: 0;
    background-color: rgba(177,177,0, 0.25);
    border-radius: 50%; 
    box-shadow: rgba(0, 0, 0, 0.5) 5px 3px 10px;
    clip: rect(20px, auto, 50px, 0);
    top: -2px;
    height: 20px;
    width: 90%;
  }
  .buttons {
    display: inherit;
    gap: .2em;
    width: 82%;
    height: 90%;
    z-index: 1;
    > .upper-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      filter: drop-shadow(0 1px 5px rgba(0,0,0,0.20)) drop-shadow(0 2px 2px rgba(0,0,0,0.14)) drop-shadow(0 3px 1px rgba(0,0,0,0.12));
      > .dpad {
        position: relative;
        width: $dpad;
        height: $dpad;
        display: grid;
        place-items: center;
        filter: drop-shadow(1px 1px 0px rgba(0, 0, 0, 0.3)) drop-shadow(-1px -1px 0px rgba(0, 0, 0, 0.3)) drop-shadow(1px -1px 0px rgba(0, 0, 0, 0.3)) drop-shadow(-1px 1px 0px rgba(0, 0, 0, 0.3));
        > div {
          position: absolute;
          display: grid;
          gap: $dpad-btn;
          border-radius: 5px;
          background: var(--gb-dpad);
          > div {
            display: grid;
            position: relative;
            place-items: center;
          }
        }
        > .x {
          width: 100%;
          height: $dpad-btn;
          grid-auto-flow: column;
          > .right:before {
            --size: 7px;
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            right: -2px;
            top: calc(50% - var(--size));
            border: var(--size) solid transparent;
            border-left: calc(var(--size) + 4px) solid #00000030;
          }
          > .left:before {
            --size: 7px;
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            left: -2px;
            top: calc(50% - var(--size));
            border: var(--size) solid transparent;
            border-right: calc(var(--size) + 4px) solid #00000030;
          }
        }
        > .y {
          width: $dpad-btn;
          height: 100%;
          grid-auto-flow: row;
          > .down:before {
            --size: 7px;
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            bottom: -2px;
            left: calc(50% - var(--size));
            border: var(--size) solid transparent;
            border-top: calc(var(--size) + 4px) solid #00000030;
          }
          > .up:before {
            --size: 7px;
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            top: -2px;
            left: calc(50% - var(--size));
            border: var(--size) solid transparent;
            border-bottom: calc(var(--size) + 4px) solid #00000030;
          }
        }
      }
      > .ab {
        position: relative;
        width: 80px;
        height: 60px;
        > .button {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--gb-btn);
          color: var(--gb-text);
          display: grid;
          place-items: center;
          border: 1px solid #00000030;
          box-shadow: inset 1px -1px 0px #00000024, inset -1px 1px 0px #ffffff24;
          &.b {
            position: absolute;
            bottom: 5px;
            left: 5px;
          }
          &.a {
            position: absolute;
            top: 5px;
            right: 5px;
          }
          .label {
            position: absolute;
            z-index: 0;
          }
        }
      }
    }
    > .bottom-row {
      display: flex;
      place-items: center;
      justify-content: center;
      position: relative;
      gap: 7px;
      height: 30px;
      .button {
        width: 27px;
        height: 8px;
        border-radius: 10px;
        background: var(--gb-lowbtn);
        border: 1px solid #00000030;
        box-shadow: inset 1px -1px 0px #00000024, inset -1px 1px 0px #ffffff24;
        .label {
          font-size: 11px;
          font-weight: 700;
          position: absolute;
          bottom: -3px;
          padding: 0 1px;
          z-index: 0;
          color: var(--gb-text);
          &.start {
            padding: 0 4px;
          }
        }
      }
    }
  }
  .speaker {
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: 50px;
    height: 50px;
    background-image: radial-gradient(rgba(0,0,0,0.4) 18%, transparent 25%),
    radial-gradient(rgba(0, 0, 0, 1) 18%, transparent 25%);
    background-position: 0 0, 4px 4px;
    background-size: 8px 8px;
    border-radius: 52% 0 50% 0;
    background-color: #00000004;
    z-index: 1;
  }
  .shadows {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 8px 8px 50px 8px;
    display: grid;
    grid-template-rows: 19px 51% 1fr;
    > div {
      background: linear-gradient(90deg, rgba(0,0,0,0) 68%, rgba(0,0,0,0) 72.9%, rgba(255, 255, 255, 0.3) 73%, rgba(0,0,0,0) 73.3%, rgba(0,0,0,0.2) 100%);
    }
    .top {
      border-radius: 0 8px 0 0;
    }
    .hidden {
      border-radius: 0;
    }
    .bottom {
      border-radius: 0 0 50px 0;
    }
  }
  .slot {
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  .label {
    position: absolute;
  }
</style>