<script lang="ts">
	const props: {
		workflow_id: string | number;
		judge_score: number;
		lint_valid: boolean;
		graph_name: string;
		prompt_level: number;
		onselect: () => void;
	} = $props();
</script>

<li class="group list-none">
	<button onclick={() => props.onselect()}>
		<div
			class="bg-surface-100 border border-surface-300/60 px-5 py-4
           flex items-center justify-between gap-4
           transition-[box-shadow,transform,background-color]
           group-hover:bg-surface-200 group-hover:-translate-y-0.5 group-hover:shadow-lg"
		>
			<!-- Left: ID & Branch -->
			<div class="flex flex-col gap-1 min-w-0">
				<p class="text-[11px] font-medium tracking-wide text-surface-500 uppercase">ID</p>
				<p class="text-base font-semibold text-surface-900 truncate">
					{props.workflow_id}
				</p>
				<p class="text-xs text-surface-500 truncate">
					Graph:
					<span class="font-medium text-surface-700">
						{props.graph_name}
					</span>
				</p>
			</div>

			<!-- Right: Score / Level / Validity -->
			<div class="flex items-center gap-6">
				<!-- Score -->
				<div class="text-right">
					<p class="text-[11px] font-medium tracking-wide text-surface-500 uppercase">
						Score
					</p>
					<p class="text-2xl font-semibold text-primary-500 leading-none">
						{props.judge_score}
					</p>
				</div>

				<div class="h-10 w-px bg-surface-300/70"></div>

				<!-- Level -->
				<div class="text-right">
					<p class="text-[11px] font-medium tracking-wide text-surface-500 uppercase">
						Level
					</p>
					<p class="text-lg font-semibold text-surface-900 leading-none">
						{props.prompt_level}
					</p>
				</div>

				<div class="h-10 w-px bg-surface-300/70"></div>

				<!-- Validity -->
				<div class="flex flex-col items-end gap-1">
					<span
						class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide border
                 transition-colors"
						class:bg-success-500={props.lint_valid}
						class:border-success-500={props.lint_valid}
						class:text-success-700={props.lint_valid}
						class:bg-error-500={!props.lint_valid}
						class:border-error-500={!props.lint_valid}
						class:text-error-700={!props.lint_valid}
					>
						{props.lint_valid ? 'Valid' : 'Invalid'}
					</span>
				</div>
			</div>
		</div>
	</button>
</li>
