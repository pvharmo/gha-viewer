<script lang="ts">
	import Filter from '$lib/components/Filter.svelte';
	import ScoresList from '$lib/components/ScoresList.svelte';
	import ScoreView from '$lib/components/ScoreView.svelte';
	import { type Score } from '$lib/scores';
	import { FileIcon } from '@lucide/svelte';
	import { FileUpload } from '@skeletonlabs/skeleton-svelte';
	import type { FileAcceptDetails } from '@zag-js/file-upload';
	import { Progress } from '@skeletonlabs/skeleton-svelte';

	let all_scores: Score[] = $state([]);
	let loading = $state(true);
	let selectedScore: Score | null = $state(null);
	let filterValues = $state({
		workflow_id: null,
		graph_name: null,
		prompt_level: null,
		vulnerabilities: null,
		lint_status: null,
		meteor_min: null,
		meteor_max: null,
		judge_score_min: null,
		judge_score_max: null
	});
	let scores: Score[] = $derived(
		all_scores.filter((score) => {
			if (filterValues.workflow_id && score.workflow_id !== filterValues.workflow_id)
				return false;
			if (filterValues.graph_name && score.graph_name !== filterValues.graph_name)
				return false;
			if (filterValues.prompt_level && score.prompt_level !== filterValues.prompt_level)
				return false;
			if (
				filterValues.vulnerabilities &&
				score.vulnerabilities !== filterValues.vulnerabilities
			)
				return false;
			if (filterValues.lint_status && score.lint_valid !== filterValues.lint_status)
				return false;
			if (filterValues.meteor_min && score.meteor_score < filterValues.meteor_min)
				return false;
			if (filterValues.meteor_max && score.meteor_score > filterValues.meteor_max)
				return false;
			if (filterValues.judge_score_min && score.judge_score < filterValues.judge_score_min)
				return false;
			if (filterValues.judge_score_max && score.judge_score > filterValues.judge_score_max)
				return false;
			return true;
		})
	);

	$effect(() => {
		loading = true;
		const _load = async () => {
			const opfsRoot = await navigator.storage.getDirectory();
			const fileHandle = await opfsRoot.getFileHandle('gha_gen_scores', {
				create: false
			});
			const file = await fileHandle.getFile();
			const text = await file.text();
			const lines = text.split('\n');
			all_scores = [];
			for (let line of lines) {
				if (line.trim().length === 0) continue;
				all_scores.push(JSON.parse(line));
			}
		};
		try {
			_load();
		} catch (error) {
			console.error(error);
		}
		loading = false;
	});

	let load = async (event: FileAcceptDetails) => {
		const file = event.files[0];
		const opfsRoot = await navigator.storage.getDirectory();
		const fileHandle = await opfsRoot.getFileHandle('gha_gen_scores', {
			create: true
		});
		const writable = await fileHandle.createWritable();
		await writable.write(file);
		await writable.close();

		const lines = (await file.text()).split('\n');

		for (let line of lines) {
			if (line.trim().length === 0) continue;
			scores.push(JSON.parse(line));
		}
	};
</script>

{#if loading}
	<div class="flex justify-center items-center mt-64 h-full">
		<Progress class="items-center w-fit" value={null}>
			<Progress.Circle>
				<Progress.CircleTrack />
				<Progress.CircleRange />
			</Progress.Circle>
			<Progress.ValueText />
		</Progress>
	</div>
{:else if all_scores.length == 0}
	<FileUpload onFileAccept={load}>
		<FileUpload.Dropzone>
			<FileIcon class="size-10" />
			<span>Select file or drag here.</span>
			<FileUpload.Trigger>Browse Files</FileUpload.Trigger>
			<FileUpload.HiddenInput />
		</FileUpload.Dropzone>
	</FileUpload>
{:else}
	<main class="flex h-dvh">
		<aside class="flex-2 mr-2 min-w-[390px]">
			<div><Filter bind:filterValues /></div>
			<div><ScoresList {scores} onselect={(score) => (selectedScore = score)} /></div>
		</aside>
		<article class="flex-10"><ScoreView score={selectedScore} /></article>
	</main>
{/if}
