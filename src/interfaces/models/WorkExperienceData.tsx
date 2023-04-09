export interface WorkExperienceData {
	company: string;
	id: number;
	introduction: string;
	title: string;
	organization: string;
	start_date: string;
	end_date: string | null;
	current_position: boolean;
	show_in_contact_card: boolean;
	employment_type: string;
}
