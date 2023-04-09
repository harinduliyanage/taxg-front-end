import {
  Card,
  Container,
  Row,
  Col,
  // Button,
  // Button,
  // FloatingLabel,
  // Form,
} from "react-bootstrap";
import PageTemplate from "../templates/PageTemplate";
// import resourceImage from "../../assets/images/resources_1.png";
// import authorImage from "../../assets/images/avatar-default.svg";

import "./_resources-inner.scss";
import { useEffect, useState } from "react";
import { ResourceData } from "../../interfaces/models/ResourcesData";
import { headerConfig } from "../../actions/headers";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

function ResourceInnerPage() {
  const [resource, setResources] = useState<ResourceData | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    async function fetchData() {
      const config: any = await headerConfig();
      await axios
        .get(
          `https://ovijqoyhv9.execute-api.us-east-1.amazonaws.com/dev/OneResourceDataGetBySlug/${slug}`,
          config
        )
        .then((res: any) => {
          console.log(res.data);
          setResources(res.data.results[0]);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }

    if (resource === null) {
      fetchData();
    }
  }, [resource, slug]);

  if (resource === null) return <></>;

  return (
    <PageTemplate>
      <Container className="resources-inner">
        <Row>
          <Col lg="8" className="offset-2">
            <a className="btn btn-link back-btn" href="/resources">
              <i className="fal fa-long-arrow-left"></i> Go Back
            </a>

            <Card className="full-page">
              <Card.Img variant="top" src={resource.image_url} />
              <div className="card-heading">
                <h1>{resource.title}</h1>
              </div>
              <Card.Body>{ReactHtmlParser(resource.description)}</Card.Body>
              {/* <Card.Footer>
								<div className="comment-meta">
									<div className="ms-0 me-auto">
										<Button variant="link" className="me-4">
											<i className="fal fa-thumbs-up"></i>
											<span className="count">10</span>
										</Button>
										<Button variant="link">
											<i className="far fa-comment"></i>
											<span className="count">0</span>
										</Button>
									</div>
									<div className="ms-auto me-0">
										<Button variant="link">
											<i className="fas fa-share-alt"></i>
											<span className="count">Share</span>
										</Button>
									</div>
								</div>
								<div className="comment-list">
									<div className="write-comment">
										<span className="avatar">
											<img src={authorImage} alt="" />
										</span>
										<span className="comment-textarea">
											<FloatingLabel
												controlId="floatingTextarea2"
												label="Add a comment"
											>
												<Form.Control
													as="textarea"
													placeholder="Leave a comment here"
													style={{ height: "60px" }}
												/>
											</FloatingLabel>
										</span>
									</div>
								</div>
							</Card.Footer> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
}

export default ResourceInnerPage;
