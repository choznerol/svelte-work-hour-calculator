<section class={isWork ? 'work' : 'non-work'}>
  <div>
    {#if editingTime}
      <input
        type='time'
        value={inputTimeValue}
        on:change={(e) => onTimeSubmit({ id, value: e.target.value })}
        on:blur={toggleEditTime}
        min={minTime && minTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
        max={maxTime && maxTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
      />
    {:else}
      <button on:click={toggleEditTime}>
        {#if inputTimeValue}
          {inputTimeValue} ✏️
        {:else}
          輸入時間
        {/if}
      </button>
    {/if}
  </div>

  <div>
    {#if editingLabel}
      <input
        value={label}
        on:change={(e) => onLabelSubmit({ id, value: e.target.value })}
        on:blur={toggleEditLabel}
      />
    {:else}
      <button on:click={toggleEditLabel}>
        {label} {isWork ? '👨‍💻' : '💤'}
      </button>
    {/if}
  </div>
</section>

<script>
  export let id;
  export let time;
  export let minTime;
  export let maxTime;
  export let label;
  export let onTimeSubmit;
  export let onLabelSubmit;
  export let isWork;

  import { DateTime } from 'luxon';

  let editingTime = false;
  let editingLabel = false;

  $: inputTimeValue = time.toLocaleString(DateTime.TIME_24_WITH_SECONDS)

  function toggleEditTime() {
    editingTime = !editingTime;
  }

  function toggleEditLabel(e) {
    editingLabel = !editingLabel;
  }
</script>

<style>
section.work {
  background: tomato;
}

section.non-work {
  background: skyblue;
}

button {
  background-color: unset;
}
</style>