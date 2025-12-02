<script lang="ts">
	import type { Score } from '$lib/scores';

	const { score }: { score: Score | null } = $props();

	// Helper for vulnerability pill color (if severity exists on your Vulnerability type)
	const severityBadgeClasses = (severity?: string) => {
		const s = (severity ?? '').toLowerCase();
		if (s === 'critical' || s === 'high') {
			return 'bg-error-500/10 text-error-700 border-error-500/70';
		}
		if (s === 'medium') {
			return 'bg-warning-500/10 text-warning-700 border-warning-500/60';
		}
		if (s === 'low') {
			return 'bg-info-500/10 text-info-700 border-info-500/60';
		}
		return 'bg-surface-200 text-surface-700 border-surface-400/60';
	};
</script>

{#if score}
	<section class="space-y-6 m-2">
		<!-- Header / Summary -->
		<header
			class="card bg-surface-100 border border-surface-300/70 rounded-2xl px-6 py-4
           flex flex-wrap items-center justify-between gap-4"
		>
			<div class="space-y-1">
				<h1 class="text-lg font-semibold text-surface-900 flex items-center gap-2">
					Workflow #{score.workflow_id}
					<span
						class="inline-flex items-center rounded-full border border-surface-300/80
                 bg-surface-50 px-3 py-0.5 text-xs font-medium text-surface-600"
					>
						{score.graph_name}
					</span>
				</h1>

				<!-- <p class="text-sm text-surface-600 max-w-3xl line-clamp-2">
					{score.prompt}
				</p> -->

				<p class="text-xs text-surface-500">
					Prompt level:
					<span class="font-semibold text-surface-800">
						{score.prompt_level}
					</span>
				</p>
			</div>

			<!-- Key metrics -->
			<div class="flex flex-wrap gap-4 justify-end">
				<div class="text-right">
					<p class="text-[11px] font-medium tracking-wide text-surface-500 uppercase">
						Judge Score
					</p>
					<p class="text-2xl font-semibold text-primary-500 leading-none">
						{score.judge_score}
					</p>
				</div>

				<div class="h-12 w-px bg-surface-300/60 hidden sm:block"></div>

				<div class="text-right">
					<p class="text-[11px] font-medium tracking-wide text-surface-500 uppercase">
						BLEU
					</p>
					<p class="text-lg font-semibold text-surface-900 leading-none">
						{score.bleu_score.toFixed(3)}
					</p>
				</div>

				<div class="text-right">
					<p class="text-[11px] font-medium tracking-wide text-surface-500 uppercase">
						METEOR
					</p>
					<p class="text-lg font-semibold text-surface-900 leading-none">
						{score.meteor_score.toFixed(3)}
					</p>
				</div>

				<div class="h-12 w-px bg-surface-300/60 hidden sm:block"></div>

				<!-- Lint status -->
				<div class="flex flex-col items-end gap-1">
					<span
						class="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide
                 transition-colors"
						class:bg-success-500={score.lint_valid}
						class:border-success-500={score.lint_valid}
						class:text-success-700={score.lint_valid}
						class:bg-error-500={!score.lint_valid}
						class:border-error-500={!score.lint_valid}
						class:text-error-700={!score.lint_valid}
					>
						<span
							class="h-1.5 w-1.5 rounded-full"
							class:bg-success-500={score.lint_valid}
							class:bg-error-500={!score.lint_valid}
						></span>
						{score.lint_valid ? 'Lint: valid' : 'Lint: issues found'}
					</span>
					<p class="text-[11px] text-surface-500">
						{score.lint_output.length} lint message{score.lint_output.length === 1
							? ''
							: 's'}
					</p>
				</div>
			</div>
		</header>

		<!-- Judgement -->
		<section
			class="card bg-surface-50 border border-surface-200/80 rounded-2xl px-6 py-4 space-y-2"
		>
			<h2 class="text-sm font-semibold text-surface-900 flex items-center gap-2">Prompt</h2>
			<p class="text-sm text-surface-700 whitespace-pre-line">
				{score.prompt}
			</p>
		</section>

		<!-- Judgement -->
		<section
			class="card bg-surface-50 border border-surface-200/80 rounded-2xl px-6 py-4 space-y-2"
		>
			<h2 class="text-sm font-semibold text-surface-900 flex items-center gap-2">
				Human / Model Judgement
				<span class="text-[11px] font-medium text-surface-500 uppercase">
					explanation
				</span>
			</h2>
			<p class="text-sm text-surface-700 whitespace-pre-line">
				{score.judgement}
			</p>
		</section>

		<!-- Workflows: original vs generated -->
		<section
			class="card bg-surface-100 border border-surface-300/70 rounded-2xl px-6 py-4 space-y-4"
		>
			<div class="flex items-center justify-between gap-4">
				<h2 class="text-sm font-semibold text-surface-900">Workflows</h2>
				<p class="text-[11px] text-surface-500 uppercase tracking-wide">
					Original vs Generated
				</p>
			</div>

			<div class="grid gap-4 md:grid-cols-2">
				<!-- Original workflow -->
				<div class="flex flex-col gap-2">
					<div class="flex items-center justify-between">
						<h3 class="text-xs font-semibold text-surface-700 uppercase tracking-wide">
							Original workflow
						</h3>
					</div>

					<div
						class="rounded-xl border border-surface-300/70 bg-surface-0/90 overflow-hidden
                 shadow-sm"
					>
						<div
							class="bg-surface-50 px-3 py-1.5 border-b border-surface-200/80 flex items-center justify-between"
						>
							<span
								class="text-[11px] font-medium text-surface-600 uppercase tracking-wide"
							>
								YAML
							</span>
							<span class="text-[11px] text-surface-400"> reference </span>
						</div>
						<div class="max-h-512 overflow-auto text-xs font-mono bg-surface-0">
							<pre class="px-3 py-2 text-surface-800 whitespace-pre">
{score.original_workflow}
            </pre>
						</div>
					</div>
				</div>

				<!-- Generated workflow -->
				<div class="flex flex-col gap-2">
					<div class="flex items-center justify-between">
						<h3 class="text-xs font-semibold text-surface-700 uppercase tracking-wide">
							Generated workflow
						</h3>
					</div>

					<div
						class="rounded-xl border border-surface-300/70 bg-surface-0/90 overflow-hidden
                 shadow-sm"
					>
						<div
							class="bg-surface-50 px-3 py-1.5 border-b border-surface-200/80 flex items-center justify-between"
						>
							<span
								class="text-[11px] font-medium text-surface-600 uppercase tracking-wide"
							>
								YAML
							</span>
							<span class="text-[11px] text-surface-400"> candidate </span>
						</div>
						<div class="max-h-512 overflow-auto text-xs font-mono bg-surface-0">
							<pre class="px-3 py-2 text-surface-800 whitespace-pre">
{score.generated_workflow}
            </pre>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Lint output & vulnerabilities -->
		<section class="grid gap-4 lg:grid-cols-2">
			<!-- Lint results -->
			<div
				class="card bg-surface-50 border border-surface-200/80 rounded-2xl px-6 py-4 space-y-3"
			>
				<div class="flex items-center justify-between gap-2">
					<h2 class="text-sm font-semibold text-surface-900">Lint results</h2>
					<span
						class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium
                 text-surface-600 bg-surface-0/70 border-surface-200/80"
					>
						{score.lint_output.length} item{score.lint_output.length === 1 ? '' : 's'}
					</span>
				</div>

				{#if score.lint_output.length === 0}
					<p class="text-sm text-surface-500">
						No lint messages. Workflow appears syntactically valid.
					</p>
				{:else}
					<ul class="space-y-2">
						{#each score.lint_output as item, i}
							<li
								class="rounded-xl border border-surface-200/90 bg-surface-0 px-3 py-2 text-xs text-surface-800
                     shadow-[0_1px_0_rgba(15,23,42,0.02)]"
							>
								<!-- Generic pretty-print; adapt to your actual SyntaxValidationOutput shape -->
								<div class="flex items-center justify-between mb-1">
									<span
										class="text-[11px] font-semibold text-surface-600 uppercase tracking-wide"
									>
										Message {i + 1}
									</span>
								</div>
								<pre class="whitespace-pre-wrap font-mono">
{JSON.stringify(item, null, 2)}
              </pre>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<!-- Vulnerabilities -->
			<div
				class="card bg-surface-50 border border-surface-200/80 rounded-2xl px-6 py-4 space-y-3"
			>
				<div class="flex items-center justify-between gap-2">
					<h2 class="text-sm font-semibold text-surface-900">Vulnerabilities</h2>
					<span
						class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium
                 bg-surface-0/70 border-surface-200/80"
						class:text-error-700={score.vulnerabilities.length > 0}
						class:text-success-700={score.vulnerabilities.length === 0}
					>
						{#if score.vulnerabilities.length === 0}
							none detected
						{:else}
							{score.vulnerabilities.length} issue{score.vulnerabilities.length === 1
								? ''
								: 's'}
						{/if}
					</span>
				</div>

				{#if score.vulnerabilities.length === 0}
					<p class="text-sm text-surface-500">
						No vulnerabilities reported by the analyzer.
					</p>
				{:else}
					<ul class="space-y-2">
						{#each score.vulnerabilities as v, i}
							<li
								class="rounded-xl border border-surface-200/90 bg-surface-0 px-3 py-2 text-xs text-surface-800
                     shadow-[0_1px_0_rgba(15,23,42,0.02)] space-y-1"
							>
								<div class="flex items-center justify-between">
									<span
										class="text-[11px] font-semibold text-surface-600 uppercase tracking-wide"
									>
										Vulnerability {i + 1}
									</span>

									<!-- If your Vulnerability has a "severity" field, this will look nice;
                     otherwise you can remove this badge. -->
									{#if 'severity' in v}
										<span
											class={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold
                           ${severityBadgeClasses((v as any).severity)}`}
										>
											{(v as any).severity}
										</span>
									{/if}
								</div>

								<!-- Generic pretty-print; adapt to actual Vulnerability shape -->
								<pre class="whitespace-pre-wrap font-mono">
{JSON.stringify(v, null, 2)}
              </pre>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</section>
	</section>
{/if}
