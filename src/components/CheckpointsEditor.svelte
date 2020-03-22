<script>
  export let checkpoints;
  export let onCheckpointsChange;

  import get from 'lodash/get';
  import { DateTime } from 'luxon';
  import { Checkpoint } from '../libs/Checkpoint.js';
  import { getNextDefaultLabel } from '../libs/getNextDefaultLabel.js';
  import CheckpointInput from '../components/CheckpointInput.svelte';
  import AddCheckpoint from '../components/AddCheckpoint.svelte';

  $: labels = checkpoints.map(cp => cp.label);
  $: nextDefaultLabel = getNextDefaultLabel({ labels });

  function addCheckpoint() {
    const newCheckpoint = new Checkpoint({
        time: DateTime.local(),
        label: nextDefaultLabel,
     })

    onCheckpointsChange([ ...checkpoints, newCheckpoint ]);
  }

  function onTimeSubmit({ id, value }) {
    _onCheckpointUpdate({ id, time: value });
  }

  function onLabelSubmit({ id, value }) {
    _onCheckpointUpdate({ id, label: value });
  }

  function _onCheckpointUpdate({ id, time, label }) {
    onCheckpointsChange(checkpoints.map((cp, index) => {
      if (index != id) return cp;

      return new Checkpoint({
        time: time || cp.time,
        label: label || cp.label,
      })
    }));
  }
</script>

<style>
  /* your styles go here */
</style>

<section>
  <ul>
    {#each checkpoints as checkpoint, index}
      <CheckpointInput
        id={index}
        time={checkpoint.time}
        label={checkpoint.label}
        minTime={get(checkpoints[index - 1], 'time')}
        maxTime={get(checkpoints[index + 1], 'time')}
        onTimeSubmit={onTimeSubmit}
        onLabelSubmit={onLabelSubmit}
        isWork={index % 2 == 0}
      />
    {/each}
  </ul>

  <AddCheckpoint
    onClick={addCheckpoint}
    defaultLabel={nextDefaultLabel}
  />
</section>
