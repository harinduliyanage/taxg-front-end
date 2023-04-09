import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
// import "@aws-amplify/ui-react/styles.css";
import { Button, Form, Alert } from "react-bootstrap";
import React from "react";
import axios from "axios";
// import headerConfig from ../actions/header;
// import { Auth } from "aws-amplify";
import ContentPageTemplate from "../templates/ContentPageTemplate";
import "./_contact.scss";
import { CONTACT_US_KEY } from "../../actions/keys";
import { useSelector } from "react-redux";
import { headerConfig } from "../../actions/headers";
interface IFormInputs {
  subject: string;
  your_message: string;
  emailInput : string;
}

const ContactPage = () => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    reset
  } = useForm<IFormInputs>();

  const [serverError, setServerError] = React.useState("");
  const [category, selectedCategory] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");
  const { user } = useSelector((root: any) => root.auth);

  // const [subject, setSubject] = React.useState("");

  const sendEmail = async (data: any) => {
    let config : any = null
    if(user) {
      config = await headerConfig();
      config.headers["x-api-key"] = CONTACT_US_KEY;
    }
    const bodyParameters = {
      name: user ? `${user.user_first_name} ${user.user_last_name}` : "Guest",
      email: user ? user.user_email : data.emailInput,
      subject: data.subject,
      help: category,
      message: data.your_message,
    };
    axios
      .post(
        "https://6yicma3h2e.execute-api.us-east-1.amazonaws.com/dev",
        bodyParameters,
        user && config
      )
      .then((response) => {
        if (response.status === 200) {
          setSuccessMsg(
            "We have received your message. A member from our support team will get in touch with you shortly."
          );
        }
      })
      .catch((error) => {
      });
  };

  const setValidationError = (
    key: "subject" | "your_message",
    message: string
  ) => {
    setError(key, {
      type: "custom",
      message,
    });
    setServerError("");
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/faq`;
    navigate(path);
  };

  const handleOnChange = (e: any) => {
    selectedCategory(e.target.value);
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    sendEmail(data);
    reset();
  };

  const onError = (error: any) => {
    if (error?.subject?.message.trim().length === 0) {
      setValidationError("subject", "Subject is Mandatory.");
    }
  };

  return (
    <ContentPageTemplate className="contact-page">
      <h1>We're here to help</h1>
      <p className="amplify-label">
        If you’re having trouble using our product, please take a look at our
        FAQ page to see if your question has already been answered before
        contacting us here.
      </p>

      <Button
        variant="outline-light"
        className="align-self-start mb-3"
        onClick={routeChange}
      >
        Go to FAQ <i className="fal fa-long-arrow-right"></i>
      </Button>

      <p>
        If you can't find what you're looking for on the FAQ page, please
        contact our support team for assistance. You can reach us through email
        by filling out the form below.
      </p>

      <form
        className="contact-form"
        id="loginForm"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Form.Group className="form-group mb-3" controlId="howHelp">
          <Form.Label htmlFor="inputPassword5">How can we help you</Form.Label>
          <Form.Select
            aria-label="howHelp"
            onChange={(value: any) => handleOnChange(value)}
          >
            <option>Select option</option>
            <option value="Question about TaxGlobal">
              Question about TaxGlobal
            </option>
            <option value="Subscription/billing issue">
              Subscription/billing issue
            </option>
            <option value="Technical issue">Technical issue</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="form-group mb-3" controlId="Email">
          <label className="form-label">Subject</label>
          <input
            // onChange={handleChange}
            maxLength={200}
            {...register("subject", {
              required: true,
              // maxLength: 10,
              // onChange: handleEmailChange,
              // onBlur: handleEmailFocusOut,
            })}
            className={
              errors.subject?.message
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.subject?.message && (
            <Form.Control.Feedback type="invalid">
              <i className="fas fa-exclamation-circle" />
              {errors.subject?.message?.toString()}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        {!user  && (
          <Form.Group className="form-group mb-3">
            <label className="form-label">Your Email</label>
            <input
              // onChange={handleChange}
              maxLength={200}
              type="email"
              className="form-control"
              {...register("emailInput", {
                required: true,
                // maxLength: 10,
                // onChange: handleEmailChange,
                // onBlur: handleEmailFocusOut,
              })}
            />
          </Form.Group>
        )}
        <Form.Group className="form-group mb-3" controlId="Email">
          <label className="form-label">Your Message</label>
          <textarea
            rows={6}
            // onChange={handleChange}
            maxLength={1000}
            {...register("your_message", {
              // required: true,
              // maxLength: 10,
              // onChange: handleEmailChange,
              // onBlur: handleEmailFocusOut,
            })}
            className={
              errors.your_message?.message
                ? "form-control is-invalid"
                : "form-control"
            }
            placeholder="Please enter you contact details along with your message here and we will get back to you soon."
          />
          {errors.your_message?.message && (
            <Form.Control.Feedback type="invalid">
              <i className="fas fa-exclamation-circle" />
              {errors.your_message?.toString()}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <input
          className="btn btn-dark"
          type="submit"
          value="Send message"
          disabled={!!errors.subject?.message}
        />
        {serverError && (
          <div className="custom-invalid-feedback">
            <i className="fas fa-exclamation-circle"></i>
            {serverError?.toString()}
          </div>
        )}
        {successMsg && (
          <Alert variant="success" className="mt-4">
            <i className="fas fa-check-circle" />
            <div>
              <strong>Thank You</strong>
              <p className="mb-0">{successMsg}</p>
            </div>
          </Alert>
        )}
      </form>
    </ContentPageTemplate>
  );
};

export default ContactPage;
