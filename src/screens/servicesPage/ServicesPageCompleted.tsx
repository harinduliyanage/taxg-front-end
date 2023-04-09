import ContentPageTemplate from "../templates/ContentPageTemplate";
import { Alert } from "react-bootstrap";
import React from "react";
import "./_service.scss";

const ServicesPageCompleted = () => {
  return (
    <ContentPageTemplate className="services-page">
      <h1>Hire a professional.</h1>
      <p className="amplify-label">
        You can hire a professional certified CPA through TaxGlobal. Just fill
        out and submit the form below and a member of our team will be in touch.
      </p>

      <Alert variant="success">
        <i className="fas fa-check-circle" />
        <div>
          <strong>Thank You</strong>
          <p>
            We have received your request and will get back to you shortly.
            Please note that this may take several working days.
          </p>
        </div>
      </Alert>
    </ContentPageTemplate>
  );
};

export default ServicesPageCompleted;
