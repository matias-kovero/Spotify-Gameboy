<script lang="ts">
  import { onMount } from 'svelte';
  import { buttons, screen } from './state';
  //import gameControl from 'gamecontroller.js';
  let Controller;
  /**
   * Gamecontroller is only working on client, wrapping it's import inside onMount
  */
  onMount(async() => {
    const module = await import('gamecontroller.js');
    Controller = module.default;
    
    gameControl.on('connect', function(gamepad) {
      setGamepad(gamepad);
    });
  });

  const setGamepad = (gamepad: any) => {
    if (!gamepad) return;
    // .on = still pressed, .before = pressed, .after = released
    gamepad.before('button0',  () => $buttons.b()      );
    gamepad.before('button1',  () => $buttons.a()      );
    gamepad.before('button8',  () => $buttons.start()  );
    gamepad.before('button9',  () => $buttons.select() );
    gamepad.before('button12', () => $buttons.up()     );
    gamepad.before('button13', () => $buttons.down()   );
    gamepad.before('button14', () => $buttons.left()   );
    gamepad.before('button15', () => $buttons.right()  );
  }
</script>

<div class="gameboy">
  <div class="body">
    <div class="screen">
      <div class="inner">
        {#if $screen.item}
          <div class="wrapper">
            <svelte:component this={$screen.item} />
          </div>
        {:else }
          {@html $screen.string}
        {/if}
      </div>
    </div>
    <div class="buttons">
      <div class="upper-row">
        <div class="dpad">
          <div class="x">
            <div class="left" on:click={$buttons.left}></div>
            <div class="right" on:click={$buttons.right}></div>
          </div>
          <div class="y">
            <div class="up" on:click={$buttons.up}></div>
            <div class="down" on:click={$buttons.down}></div>
          </div>
          <div class="y-shadow"></div>
          <div class="x-shadow"></div>
          <div class="shadow-middle"></div>
        </div>
        <div class="ab">
          <div class="button a" on:click={$buttons.a}>A</div>
          <div class="button b" on:click={$buttons.b}>B</div>
        </div>
      </div>
      <div class="bottom-row">
        <div class="button" on:click={$buttons.select}>
          <div class="label select">SELECT</div>
        </div>
        <div class="button" on:click={$buttons.start}>
          <div class="label start">START</div>
        </div>
      </div>
    </div>
    <div class="speaker"></div>
    <div class="shadows">
      <div class="top"></div>
      <div class="hidden"></div>
      <div class="bottom"></div>
    </div>
    <div class="on-off"><small>OFF &#9900; &#9900; ON</small></div>
  </div>
</div>

<style lang="scss">
  $dpad: 60px;
  $dpad-btn: 20px;
  .gameboy {
    height: 440px;
  }
  .body {
    width: 250px;
    height: 400px;
    margin-top: 200px;
    background: var(--gb-shell);
    border-radius: 8px 8px 50px 8px;
    display: grid;
    place-items: center;
    grid-template-rows: 60% 1fr;
    box-shadow: -5px 6px 13px 0 #0003, inset 2px -2px 6px #00000085, inset -2px 2px 2px 0px #ffffff4f;
    position: relative;
  }
  .screen {
    height: 85%;
    width: 88%;
    background: var(--gb-screen-bg);
    border-radius: 8px 8px 30px 8px;
    display: inherit;
    place-items: inherit;
    border: 1.5px solid #00000030;
    z-index: 1;
    > .inner {
      display: inherit;
      place-items: inherit;
      background: var(--gb-screen);
      height: 163px; /* 165 - borders */
      width: 164px;
      text-align: center;
      font-family: "VT323", monospace;
      font-size: 20px;
      font-weight: 600;
      color: #000;
      letter-spacing: .2px;
      grid-column: 1/2;
      grid-row: 1/2;
      border: 1px solid #00000078;
      > .wrapper {
        display: grid;
        overflow: hidden;
        grid-column: 1/2;
        grid-row: 1/2;
        width: 165px;
        height: 165px;
      }
    }
    &::before {
      position: absolute;
      content: "";
      bottom: 0;
      background-color: rgba(177, 177, 0, 0.25);
      border-radius: 50%;
      box-shadow: rgb(0 0 0 / 19%) 0px -2px 7px;
      clip: rect(-20px, auto, 0px, 0);
      top: 56%;
      height: 20px;
      width: 68%;
    }
    &::after {
      position: absolute;
      content: '';
      bottom: 0;
      background-color: rgba(177,177,0, 0.25);
      border-radius: 50%; 
      box-shadow: rgba(0, 0, 0, 0.5) 5px 3px 10px;
      clip: rect(20px, auto, 50px, 0);
      top: -2px;
      height: 20px;
      width: 88%;
    }
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
        z-index: 2;
        /* filter: drop-shadow(1px 1px 0px rgba(0, 0, 0, 0.3)) drop-shadow(-1px -1px 0px rgba(0, 0, 0, 0.3)) drop-shadow(1px -1px 0px rgba(0, 0, 0, 0.3)) drop-shadow(-1px 1px 0px rgba(0, 0, 0, 0.3)); */
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
          cursor: pointer;
          > .right {
            box-shadow: inset -2px 2px 2px #ffffff17;
            &::before {
              --size: 7px;
              content: '';
              width: 0;
              height: 0;
              position: absolute;
              right: -2px;
              top: calc(50% - var(--size));
              border: var(--size) solid transparent;
              border-left: calc(var(--size) + 4px) solid #00000030;
              filter: drop-shadow(-1.5px 1.5px 0px #ffffff3b);
            }
          }
          > .left {
            box-shadow: inset 0px 1px 0px #ffffff17;
            &::before {
              --size: 7px;
              content: '';
              width: 0;
              height: 0;
              position: absolute;
              left: -2px;
              top: calc(50% - var(--size));
              border: var(--size) solid transparent;
              border-right: calc(var(--size) + 4px) solid #00000030;
              filter: drop-shadow(-1.5px 1.5px 0px #ffffff3b);
            }
          }
        }
        > .y {
          width: $dpad-btn;
          height: 100%;
          grid-auto-flow: row;
          cursor: pointer;
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
          > .up {
            box-shadow: inset -1px 2px 3px #ffffff3b;
            &::before {
              --size: 7px;
              content: '';
              width: 0;
              height: 0;
              position: absolute;
              top: -2px;
              left: calc(50% - var(--size));
              border: var(--size) solid transparent;
              border-bottom: calc(var(--size) + 4px) solid #00000030;
              filter: drop-shadow(-1.5px 1.5px 0px #ffffff3b);
            }
          }
        }
        > .y-shadow {
          width: $dpad-btn + 4px !important;
          height: 107% !important;
          z-index: -1;
          background-color: #000000a6;
        }
        > .x-shadow {
          height: $dpad-btn + 4px !important;
          width: 107% !important;
          z-index: -1;
          background-color: #000000a6;
        }
        > .shadow-middle {
          width: 15px;
          height: 15px;
          background: #00000017;
          border-radius: 50%;
          box-shadow: inset 1px -1px 2px #ffffff1f, inset -2px 2px 2px #0000002b;
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
          cursor: pointer;
          &.b {
            position: absolute;
            bottom: 5px;
            left: 5px;
            background: var(--gb-btn-b);
          }
          &.a {
            position: absolute;
            top: 5px;
            right: 5px;
            background: var(--gb-btn-a);
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
        cursor: pointer;
        border: 1px solid #00000030;
        box-shadow: inset 0px -3px 3px #00000038, inset 0px 1px 4px #ffffff91, -1px 1px 1px #0000002b;
        .label {
          font-size: 11px;
          font-weight: 700;
          position: absolute;
          cursor: default;
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
      background: linear-gradient(90deg, rgba(0,0,0,0) 68%, rgba(0,0,0,0) 72.9%, rgba(0, 0, 0, 0.02) 73%, rgba(0,0,0,0) 73.3%, rgba(0,0,0,0.2) 100%);
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
  .on-off {
    position:absolute;
    top: -2px;
    left: 8%;
    color: var(--gb-shell);
    text-shadow: 1px 0px 0px #ffffff47, -1px -1px 3px #00000014, -0.5px 0.5px 0px #00000052;
  }
  .label {
    position: absolute;
  }
</style>