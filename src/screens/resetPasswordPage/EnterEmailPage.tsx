import { useForm, SubmitHandler } from "react-hook-form";
import { Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Button, Card, Container, Form } from "react-bootstrap";
import AmplifyTemplate from "../templates/AmplifyTemplate";
import React, { FC } from "react";
import "./_resetPassword.scss";
interface IFormInputs {
  email: string;
}

type EnterEmailPageProps = {
  onStepChange: (step: number, email?: string) => void;
};

const EnterEmailPage: FC<EnterEmailPageProps> = ({ onStepChange }) => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<IFormInputs>();

  const [serverError, setServerError] = React.useState("");

  const setValidationError = (key: "email", message: string) => {
    setError(key, {
      type: "custom",
      message,
    });
    setServerError("");
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    // const { value } = e.target;
    const validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (data.email === "") {
      setValidationError("email", "");
    } else if (!data.email.match(validRegex)) {
      setValidationError("email", "The email is not a valid email address.");
      return;
    }

    if (data.email.length === 0) {
      setValidationError("email", "");
      return;
    }

    // Please enter a valid email address.

    Auth.forgotPassword(data.email)
      .then((res) => {
        console.log(data.email);
        onStepChange(1, data.email);
      })
      .catch((err) => console.log(err));
  };

  const onError = (error: any) => {
    if (error?.email?.message.trim().length === 0) {
      setValidationError("email", "Please enter a valid email.");
      return;
    }
  };

  const handleEmailFocusOut = (e: any) => {
    const { value } = e.target;
    const validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (value === "") {
      setValidationError("email", "");
    } else if (!value.match(validRegex) && value.length < 254) {
      setValidationError("email", "The email is not a valid email address.");
      return;
    }

    setValidationError("email", "");
    return;
  };

  // const handleEmailChange = (e: any) => {
  //   const { value } = e.target;
  //   const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   if (value.length === 0) {
  //     setValidationError("email", "");
  //   }
  // };

  return (
    <AmplifyTemplate>
      <section className="login-journey py-7">
        <Container>
          <Card className="single-page">
            <Card.Body>
              <div className="title-section">
                <h1>Forgot password?</h1>
                <p>No worries, we will send you reset instructions</p>
              </div>
              <form id="loginForm" onSubmit={handleSubmit(onSubmit, onError)}>
                <Form.Group className="form-group mb-3" controlId="Email">
                  <label className="form-label">Enter your email address</label>
                  <input
                    maxLength={254}
                    {...register("email", {
                      required: true,
                      onBlur: handleEmailFocusOut,
                      // onChange: handleEmailChange,
                    })}
                    className={
                      errors.email?.message
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {errors.email?.message && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {errors.email.message?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <input
                  className="btn btn-dark"
                  type="submit"
                  value="Reset password"
                  disabled={!!errors.email?.message}
                />
                {serverError && (
                  <div className="custom-invalid-feedback">
                    <i className="fas fa-exclamation-circle"></i>
                    {serverError?.toString()}
                  </div>
                )}
              </form>
              <div className="cross-check">
                <h6 className="small-text">Do you remember the password?</h6>

                <Button variant="link" href="/login">
                  Back to log in
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </AmplifyTemplate>
  );
};

export default EnterEmailPage;
