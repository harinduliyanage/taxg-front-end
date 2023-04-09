import { Card, Container, Row, Col } from "react-bootstrap";
import PageTemplate from "../templates/PageTemplate";
import "./_resources.scss";
import ResourceItem from "../../components/organisms/resources/ResourceItem";
import { useEffect, useState } from "react";
import { ResourceData } from "../../interfaces/models/ResourcesData";
import { headerConfig } from "../../actions/headers";
import axios from "axios";

const ResourcesPage = () => {
	const [resources, setResources] = useState<ResourceData[]>([]);

	useEffect(() => {
		async function fetchData() {
			const config: any = await headerConfig();
			await axios
				.get(
					"https://ovijqoyhv9.execute-api.us-east-1.amazonaws.com/dev/ResourceDataGet",
					config
				)
				.then((res: any) => {
					setResources(res.data.results);
				})
				.catch((error: any) => {
					console.log(error);
				});
		}

		if (resources.length === 0) {
			fetchData();
		}
	}, [resources]);

	const renderResources = () => {
		const results: any = [];
		resources.forEach((element: any) => {
			results.push(
				<Col key={element.id}>
					<ResourceItem
						articleTitle={element.title}
						articleSummery={element.short_description}
						articleUrl={`/resource/${element.post_slug}`}
						articleImage={element.image_url}
					/>
				</Col>
			);
		});
		return results;
	};

	console.log(resources);
	if (resources.length === 0) {
		return <div></div>;
	}

	return (
		<PageTemplate>
			<Container className="resources-page">
				<Card className="full-page">
					<Card.Body>
						<Row className="row-cols-4 g-3 gy-3 resources-list">
							{renderResources()}
						</Row>
					</Card.Body>
					{/* <Card.Footer>
						<div className="pagination-wrapper">
							<span className="page-content">Page 1 of 18</span>
							<Pagination>
								<Pagination.Prev />
								<Pagination.Item>{1}</Pagination.Item>
								<Pagination.Item active>{2}</Pagination.Item>
								<Pagination.Ellipsis />
								<Pagination.Item>{10}</Pagination.Item>
								<Pagination.Item>{11}</Pagination.Item>
								<Pagination.Next />
							</Pagination>
						</div>
					</Card.Footer> */}
				</Card>
			</Container>
		</PageTemplate>
	);
};

export default ResourcesPage;
