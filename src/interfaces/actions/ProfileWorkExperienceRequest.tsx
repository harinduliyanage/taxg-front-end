import { UserExperience } from "../models/UserExperience";

export interface ProfileWorkExperienceRequest {
	uuid: string;
	workExperience: UserExperience[];
}
