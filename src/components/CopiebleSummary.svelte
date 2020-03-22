<section>
  {summaryText || '(尚無紀錄)'}

  <button on:click={copySummaryText} disabled={!summaryText}>
    📋{copied ? '已複製！' : '點擊複製'}
  </button>
</section>

<script>
  export let checkpoints;

  import { summarizeCheckpoints } from '../libs/summarizeCheckpoints.js';
  import { copyToClipboard } from '../libs/copyToClipboard.js';

  let copied = false;

  $: summaryText = summarizeCheckpoints(checkpoints);
  $: {
    if (summaryText) copied = false;
  }

  function copySummaryText() {
    copyToClipboard(summaryText);
    copied = true;
  }
</script>

<style>
  /* your styles go here */
</style>
