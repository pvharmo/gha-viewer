<script lang="ts">
	interface FilterValues {
		workflow_id: string | null;
		graph_name: string | null;
		prompt_level: number | null;
		judge_score_min: number | null;
		judge_score_max: number | null;
		meteor_min: number | null;
		meteor_max: number | null;
		lint_status: string | null;
		vulnerabilities: string | null;
	}

	let { filterValues = $bindable() }: { filterValues: FilterValues } = $props();
</script>

<form class="px-5 py-4 space-y-4">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-semibold text-surface-900">Filter scores</h2>
		<button
			type="button"
			class="text-[11px] font-medium text-primary-600 hover:text-primary-700 hover:underline"
			onclick={() => {
				filterValues.graph_name = null;
				filterValues.prompt_level = null;
				filterValues.judge_score_min = null;
				filterValues.judge_score_max = null;
				filterValues.meteor_min = null;
				filterValues.meteor_max = null;
				filterValues.lint_status = null;
				filterValues.vulnerabilities = null;
			}}
		>
			Reset all
		</button>
	</div>

	<!-- <div class="space-y-1.5">
		<label class="block text-xs font-medium text-surface-700"> Prompt text </label>
		<input
			type="text"
			class="input w-full input-md bg-surface-0 border-surface-300/80 text-sm"
			placeholder="Search in prompt…"
		/>
	</div> -->

	<!-- IDs / graph -->
	<div class="grid grid-cols-2 gap-3">
		<div class="space-y-1.5">
			<label for="workflow-id" class="block text-xs font-medium text-surface-700">
				Workflow ID
			</label>
			<input
				id="workflow-id"
				type="text"
				class="input w-full input-md bg-surface-0 border-surface-300/80 text-sm"
				placeholder="e.g. 42"
				bind:value={filterValues.workflow_id}
			/>
		</div>

		<div class="space-y-1.5">
			<label for="graph-name" class="block text-xs font-medium text-surface-700">
				Graph name
			</label>
			<input
				id="graph-name"
				type="text"
				class="input w-full input-md bg-surface-0 border-surface-300/80 text-sm"
				placeholder="e.g. payments"
				bind:value={filterValues.graph_name}
			/>
		</div>
	</div>

	<!-- Prompt level -->
	<div class="space-y-1.5">
		<label for="prompt-level" class="block text-xs font-medium text-surface-700">
			Prompt level
		</label>
		<select
			id="prompt-level"
			class="select w-full select-md bg-surface-0 border-surface-300/80 text-sm"
			bind:value={filterValues.prompt_level}
		>
			<option value={null}>Any level</option>
			<option value={1}>Level 1</option>
			<option value={2}>Level 2</option>
			<option value={3}>Level 3</option>
		</select>
	</div>

	<!-- Score ranges -->
	<div class="space-y-2">
		<p class="text-xs font-semibold text-surface-700">Score ranges</p>

		<!-- Judge score -->
		<div class="space-y-1">
			<div class="flex items-center justify-between">
				<span class="text-[11px] text-surface-500 uppercase tracking-wide">
					Judge score
				</span>
			</div>
			<div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
				<input
					type="number"
					class="input input-sm bg-surface-0 border-surface-300/80 text-xs"
					placeholder="Min"
					bind:value={filterValues.judge_score_min}
				/>
				<span class="text-[11px] text-surface-400 text-center"> to </span>
				<input
					type="number"
					class="input input-sm bg-surface-0 border-surface-300/80 text-xs"
					placeholder="Max"
					bind:value={filterValues.judge_score_max}
				/>
			</div>
		</div>
		<!-- METEOR -->
		<div class="space-y-1">
			<div class="flex items-center justify-between">
				<span class="text-[11px] text-surface-500 uppercase tracking-wide"> METEOR </span>
			</div>
			<div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
				<input
					type="number"
					class="input input-sm bg-surface-0 border-surface-300/80 text-xs"
					placeholder="Min"
					bind:value={filterValues.meteor_min}
				/>
				<span class="text-[11px] text-surface-400 text-center"> to </span>
				<input
					type="number"
					class="input input-sm bg-surface-0 border-surface-300/80 text-xs"
					placeholder="Max"
					bind:value={filterValues.meteor_max}
				/>
			</div>
		</div>
	</div>

	<!-- Lint & vulnerabilities -->
	<div class="space-y-3">
		<div class="space-y-1.5">
			<label for="lintStatus" class="block text-xs font-medium text-surface-700">
				Lint status
			</label>
			<select
				id="lintStatus"
				class="select w-full select-md bg-surface-0 border-surface-300/80 text-sm"
				bind:value={filterValues.lint_status}
			>
				<option value={null}>Any</option>
				<option value="valid">Only valid</option>
				<option value="invalid">Only with issues</option>
			</select>
		</div>
		<div class="space-y-1.5">
			<label for="vulnerabilities" class="block text-xs font-medium text-surface-700">
				Vulnerabilities
			</label>
			<select
				id="vulnerabilities"
				class="select w-full select-md bg-surface-0 border-surface-300/80 text-sm"
				bind:value={filterValues.vulnerabilities}
			>
				<option value={null}>Any</option>
				<option value="valid">Only with vulnerabilities</option>
				<option value="invalid">Only without vulnerabilities</option>
			</select>
		</div>
	</div>

	<!-- Footer buttons (visual only) -->
	<!-- <div class="pt-2 flex items-center justify-end gap-2">
		<button type="button" class="btn btn-ghost btn-sm text-xs text-surface-600">
			Cancel
		</button>
		<button type="button" class="btn btn-primary btn-sm text-xs"> Apply filters </button>
	</div> -->
</form>
