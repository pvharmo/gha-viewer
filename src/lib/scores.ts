import type { WorkflowYAML, SyntaxValidationOutput, Vulnerability } from './types';

export interface Score {
	original_workflow: WorkflowYAML;
	generated_workflow: WorkflowYAML;

	judgement: string;
	judge_score: number;
	bleu_score: number;
	meteor_score: number;

	lint_valid: boolean;
	lint_output: SyntaxValidationOutput[];
	vulnerabilities: Vulnerability[];

	graph_name: string;
	workflow_id: number;
	prompt_level: number;
	prompt: string;
}
