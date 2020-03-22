<script>
  export let version;

  import { onMount } from 'svelte';
  import { DateTime, Duration } from 'luxon';
  import CheckpointsEditor from './components/CheckpointsEditor.svelte';
  import CopiebleSummary from './components/CopiebleSummary.svelte';
  import { Checkpoint } from './libs/Checkpoint.js';
  import { accumulateWorkedDuration } from './libs/accumulateWorkedDuration.js';
  import { getNextDefaultLabel } from './libs/getNextDefaultLabel.js';
  import { hhmmss } from './libs/formatLuxon.js';

  const TOTAL_WORK_DURATION = Duration.fromObject({ hours: 8 })

  let checkpoints = [new Checkpoint({
    time: DateTime.local(),
    label: '開工',
  })]

  let now = DateTime.local();

  $: checkpointTimes = checkpoints.map(cp => cp.time);
  $: workedDuration = accumulateWorkedDuration({ checkpoints: checkpointTimes, now });
  $: eta = TOTAL_WORK_DURATION.minus(workedDuration);

  onMount(() => {
    const interval = setInterval(() => {
      now = DateTime.local()
    }, 1000);

    return () => clearInterval(interval);
  });

  function onCheckpointsChange(newCheckpoints) {
    checkpoints = newCheckpoints;
  }
</script>

<!-- {@debug checkpoints, checkpointTimes, workedDuration} -->

<style>
  #app {
    display: flex;
    flex-wrap: wrap;
    max-width: 800px;
    margin: auto;
    text-align: center;
  }

  header, footer {
    flex-basis: 100%;
  }

  main {
    padding: 1rem;
    flex: 2;
  }

  aside {
    padding: 1rem;
    flex: 1;
  }

  @media (max-width: 640px) {
    #app {
      max-width: none;
    }
  }
</style>

<div id='app'>
  <header>
    <CopiebleSummary checkpoints={checkpoints} />
  </header>

  <main>
    <CheckpointsEditor
      checkpoints={checkpoints}
      onCheckpointsChange={onCheckpointsChange}
    />
  </main>

  <aside>
    <p>累計工時： {hhmmss(workedDuration)}</p>
  </aside>

  <footer>Work Hour Calculator v{version}</footer>
</div>

