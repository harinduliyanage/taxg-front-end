import { Accordion } from "react-bootstrap";
import { useEffect } from "react";
import "./_services.scss";
import { useState } from "react";
import { headerConfig } from "../../../actions/headers";
import { USER_DATA_API } from "../../../actions/endPoints";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileServicesView = (props: any) => {
	// const [serviceName, setServiceName] = useState("");
	// const [description, setDescription] = useState("");
	const [services, setServices] = useState<any>([]);

	const { slug } = useParams();

	useEffect(() => {
		getServices();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getServices = async () => {
		const config: any = await headerConfig();
		await axios
			.get(`${USER_DATA_API}/UserProfile/${slug}`, config)
			.then((res: any) => {
				setServices(res.data.results[0][0].services);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	return (
		<div className="services-tab">
			<Accordion defaultActiveKey="0" className="">
				{services !== null ? (
					services.map((service: any) => {
						return (
							<>
								<Accordion.Item eventKey={service.id}>
									<Accordion.Header
									// onClick={() => {
									// 	setServiceName(service.service_name);
									// 	setDescription(service.service_description);
									// }}
									>
										{service.service_name}
									</Accordion.Header>
									<Accordion.Body>{service.service_description}</Accordion.Body>
								</Accordion.Item>
							</>
						);
					})
				) : (
					<></>
				)}
			</Accordion>
		</div>
	);
};

export default ProfileServicesView;
