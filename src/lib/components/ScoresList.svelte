<script lang="ts">
	import type { Score } from '$lib/scores';
	import ScoreListItem from '$lib/components/ScoreListItem.svelte';
	let props: { scores: Score[]; onselect: (score: Score) => void } = $props();
</script>

<ul>
	{#each props.scores as score (score.workflow_id + score.prompt_level)}
		<ScoreListItem {...score} onselect={() => props.onselect(score)} />
	{/each}
</ul>
