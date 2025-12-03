<script lang="ts">
	import { Marked } from 'marked';
	import hljs from 'highlight.js/lib/core';
	import { markedHighlight } from 'marked-highlight';

	// // Import the languages you need
	import yaml from 'highlight.js/lib/languages/yaml';
	import markdown from 'highlight.js/lib/languages/markdown';

	// Import a highlight.js theme (pick whichever you like)
	// import 'highlight.js/styles/rose-pine-dawn.css';
	import 'highlight.js/styles/atom-one-dark.css';
	import type { WorkflowYAML } from '$lib/types';

	// Register languages
	hljs.registerLanguage('yaml', yaml);
	hljs.registerLanguage('yml', yaml); // alias if you want
	hljs.registerLanguage('markdown', markdown);
	hljs.registerLanguage('md', markdown); // alias

	let { source, language = 'markdown' }: { source: string | WorkflowYAML; language?: string } =
		$props();

	const marked = new Marked(
		markedHighlight({
			// emptyLangClass: 'hljs',
			langPrefix: 'hljs language-',
			highlight(code, lang, info) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	);

	let html = $derived(
		language == 'markdown'
			? marked.parse(source as string)
			: hljs.highlight(source as string, { language }).value.trim()
	);
</script>

<div class="p-2">
	{#if language == 'markdown'}
		{@html html}
	{:else}
		<pre><code class="hljs">{@html html}</code></pre>
	{/if}
</div>
