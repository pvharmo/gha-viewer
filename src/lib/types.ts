// struct-utils.ts
export interface WorkflowYAML {
	value: string;
}

export interface SyntaxValidationOutput {
	message: string;
	filepath?: string;
	line?: number;
	column?: number;
	kind: string;
	snippet?: string;
	end_column?: number;
}

export interface SyntaxValidation {
	valid: boolean;
	output: SyntaxValidationOutput[];
}

export interface LocalKey {
	prefix?: string;
	given_path: string;
}

export interface Key {
	local?: LocalKey;
}

export interface RouteComponent {
	key?: string;
}

export interface Route {
	components: RouteComponent[];
}

export enum FeatureKind {
	Normal = 'Normal'
}

export enum SymbolicKind {
	Hidden = 'Hidden',
	Related = 'Related',
	Primary = 'Primary'
}

export interface SymbolicLocation {
	key: Key;
	annotation: string;
	route: Route;
	feature_kind: string;
	kind: SymbolicKind;
}

export interface Point {
	row: number;
	column: number;
}

export interface OffsetSpan {
	start: number;
	end: number;
}

export interface LocationSpan {
	start_point: Point;
	end_point: Point;
	offset_span: OffsetSpan;
}

export interface ConcreteLocation {
	location: LocationSpan;
	feature: string;
	comments: string[];
}

export interface LocationItem {
	symbolic: SymbolicLocation;
	concrete: ConcreteLocation;
}

export enum Confidence {
	Low = 'Low',
	Medium = 'Medium',
	High = 'High'
}

export enum Severity {
	Low = 'Low',
	Medium = 'Medium',
	High = 'High'
}

export enum Persona {
	Regular = 'Regular',
	Admin = 'Admin',
	System = 'System'
}

export interface Determinations {
	confidence: Confidence;
	severity: Severity;
	persona: Persona;
}

export interface Vulnerability {
	ident: string;
	desc: string;
	url: string;
	determinations: Determinations;
	locations: LocationItem[];
	ignored: boolean;
}
