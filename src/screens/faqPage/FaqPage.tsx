import ContentPageTemplate from "../templates/ContentPageTemplate";
import Accordion from "react-bootstrap/Accordion";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./_faq.scss";
const FaqPage = () => {
  return (
    <ContentPageTemplate className="faq-page">
      <h1>FAQ</h1>
      <p>
        Here are the answers to all your questions about TaxGlobal. Please
        contact us if you can’t find the answer you’re looking for.{" "}
      </p>
      <form>
        <InputGroup className="mb-3">
          <InputGroup.Text id="searchText">
            <i className="fal fa-search" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search questions and answers"
            className="search-field"
            aria-label="search"
            aria-describedby="searchText"
          />
        </InputGroup>
      </form>

      <h4 className="mt-3">Questions about TaxGlobal</h4>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is TaxGlobal?</Accordion.Header>
          <Accordion.Body>
            TaxGlobal is a centralized, AI-powered platform that helps
            individuals connect with tax service providers and find answers to
            tax-related questions. It also provides support and information for
            service providers, making it easier for them to find and serve
            clients.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How does it work?</Accordion.Header>
          <Accordion.Body>
            Simply complete our quick onboarding process to sign up for
            TaxGlobal, either as an individual or a business, and as a service
            provider or someone in need of a service provider. From there, you
            can easily search for individuals, businesses, service providers,
            information, and more.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>How much does TaxGlobal cost?</Accordion.Header>
          <Accordion.Body>
            TaxGlobal is 100% free for individuals and businesses looking for
            service providers. Businesses that provide services, can choose from
            a number of subscription plans.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Is TaxGlobal secure?</Accordion.Header>
          <Accordion.Body>
            Yes. We provide bank-level security for all your personal files and
            information, and our platform is hosted on highly secure AWS (Amazon
            Web Services) servers. All personal information you provide through
            our site is kept confidential, and all payments are processed
            securely. We use strict measures to protect our users’ privacy.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Who is TaxGlobal for?</Accordion.Header>
          <Accordion.Body>
            TaxGlobal is for individuals and businesses who want to connect with
            a tax professional, and for professionals who want to connect with
            clients and find information about new tax laws in their area. Our
            platform is available worldwide.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <h4>Accounts and Subscriptions</h4>
      <Accordion>
        <Accordion.Item eventKey="as1">
          <Accordion.Header>
            Which subscription plan is right for me?
          </Accordion.Header>
          <Accordion.Body>
            We offer several subscription plans for businesses of different
            sizes. Choose the one that most closely aligns with the size and
            goals of your organization, or contact us if you need help deciding.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="as2">
          <Accordion.Header>
            What if I need to cancel my subscription?
          </Accordion.Header>
          <Accordion.Body>
            You can cancel your subscription at any time. When you do, your
            account will revert back to the Free Basic plan. Please note that
            you may still be charged for the current billing cycle.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="as2">
          <Accordion.Header>How do I delete my account?</Accordion.Header>
          <Accordion.Body>
            Contact us if you would like to delete your account.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <h4>Technical Support</h4>
      <Accordion>
        <Accordion.Item eventKey="ts1">
          <Accordion.Header>
            Why isn’t a certain feature of the website working?
          </Accordion.Header>
          <Accordion.Body>
            While we do our best to minimize website interruptions, occasionally
            something can go wrong. If you’ve tried common fixes like checking
            your internet connection, refreshing the page, and using a different
            browser, and are still having issues, contact us for help.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <h4 className="mb-2">Taxes</h4>
      <p>
        For questions about taxes in general, head over to the Discover page and
        type your question in the search box.{" "}
      </p>
    </ContentPageTemplate>
  );
};

export default FaqPage;
