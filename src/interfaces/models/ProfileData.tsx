import { CertificateData } from "./CertificateData";
import { IntroductionData } from "./IntroductionData";
import { WorkExperienceData } from "./WorkExperienceData";
import { ServiceData } from "./ServiceData";

export interface ProfileData {
	Interests: number[];
	coverPhoto_url: string;
	id: number;
	introduction_and_title: IntroductionData;
	profilePhoto_url: string;
	user_email: string;
	user_first_name: string;
	user_last_name: string;
	user_uuid: string;
	work_experinces: WorkExperienceData[];
	services : ServiceData[];
	setProfileData: any[];
	certificates: CertificateData[];
}
