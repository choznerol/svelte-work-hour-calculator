{#if editing}
  <input
    type="time"
    on:change={handleInputChange}
    value={value}
  />
{:else}
  <button on:click={handleButtonClicked}>
    {#if value}
      {value.toLocaleString(DateTime.TIME_24_WITH_SECONDS)} ✏️
    {:else}
      輸入時間點
    {/if}
  </button>
{/if}

<script>
  export let onTimeSubmit;
  export let initialValue;

  import { DateTime } from 'luxon';

  let value;
  let editing = false;

  function handleButtonClicked() {
    editing = true;
    value = (initialValue || DateTime.local()).toLocaleString(DateTime.TIME_24_SIMPLE);
  }

  function handleInputChange(e) {
    const time = e.target.value;
    value = time;
    onTimeSubmit(time);
  }
</script>
