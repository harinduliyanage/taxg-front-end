export interface ProfileIntroRequest {
	uuid: string;
	company?: string | null;
	industry: number;
	function: number;
	yourTitle: string;
	introduction: string;
}
