import React, {FC} from "react";
import PageTemplate from "./PageTemplate";
import {Container, Row, Col, Card} from "react-bootstrap";
import "./_content-pages.scss";

interface Props {
    children?: JSX.Element | JSX.Element[];
    className?: string;
}

const ContentPageTemplate: FC<Props> = ({children, className}) => {
    return (
        <PageTemplate>
            <section className={className && className}>
                <Container className="pt-3">
                    <Row>
                        <Col md="6" className="offset-3">
                            <Card className="content-pages">
                                <Card.Body>
                                    {children}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </PageTemplate>
    );
};

export default ContentPageTemplate;
