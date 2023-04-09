import { Link } from "@aws-amplify/ui-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Button, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import AmplifyTemplate from "../templates/AmplifyTemplate";
import googleIcon from "../../assets/images/google.svg";
import linkedInIcon from "../../assets/images/social-media-linkedin.svg";
import "./_Styles.scss";
import React, { useEffect } from "react";
import { getuserStatus } from "../../actions/userStatusActions";
import { useSelector } from "react-redux";
import SEO from "../../components/organisms/seo/SEO";
// Amplify.configure(awsExports);

interface IFormInputs {
  email: string;
  password: string;
}

function LoginPage() {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<IFormInputs>();
  const { user } = useSelector((root: any) => root.auth);

  const [serverError, setServerError] = React.useState("");
  const [passwordShown, setPasswordShown] = React.useState(false);
  useEffect(() => {
    if (user) window.location.href = "/";
  }, [user]);

  const setValidationError = (key: "email" | "password", message: string) => {
    setError(key, {
      type: "custom",
      message,
    });
    setServerError("");
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (data.email.length === 0) {
      setValidationError("email", "Please enter a valid email address.");
      // setError("email", {
      //   type: "custom",
      //   message: "Please enter a valid email address.",
      // });
      // setServerError("");
      return;
    }

    // if (!data.email.match(validRegex)) {
    //   setError("email", { type: "custom", message: "Invalid email address" });
    //   return;
    // }

    if (data.password.length === 0) {
      setValidationError("password", "Please enter password.");
      // setError("password", {
      //   type: "custom",
      //   message: "Please enter password.",
      // });
      // setServerError("");
      return;
    }

    // setError("email", {
    //   type: "custom",
    //   message: "",
    // });

    // setError("password", {
    //   type: "custom",
    //   message: "",
    // });

    await Auth.signIn({
      username: data.email,
      password: data.password,
    })
      .then(async () => {
        const user = await Auth.currentAuthenticatedUser();
        try {
          const userStatus = await getuserStatus(user.attributes.sub);

          if (userStatus.data.results.length) {
            const userInfo = userStatus.data.results[0];
            if (userInfo.status_id === 3) {
              window.location.href = "/onboarding";
            } else if (userInfo.status_id === 0 || userInfo.status_id === 1) {
              window.location.href = "/register/moreinfo";
            } else if (userInfo.status_id === 2 || userInfo.status_id === 4) {
              if (userInfo.role_type_id === 1) {
                window.location.href = "/feed";
              } else {
                window.location.href = "/feed";
              }
            }
          } else {
            setServerError("Something went wrong");
          }
        } catch (e) {
          console.log(e);
        }
      })
      .catch((e) => {
        setServerError("You have entered an invalid email or password.");
      });
  };

  const onError = (error: any) => {
    if (error?.email?.message.trim().length === 0) {
      setValidationError("email", "Please enter a valid email address.");
      // setError("email", {
      //   type: "custom",
      //   message: "Please enter a valid email address.",
      // });
      // setServerError("");
    }

    if (error?.password?.message.length === 0) {
      setValidationError("password", "Please enter password.");
      // setError("password", {
      //   type: "custom",
      //   message: "Please enter password.",
      // });
      // setServerError("");
    }
  };

  const handleEmailFocusOut = (e: any) => {
    const { value } = e.target;
    // eslint-disable-next-line no-useless-escape
    const validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (value === "") {
      setValidationError("email", "");
    } else if (!value.match(validRegex)) {
      setValidationError("email", "Invalid email address.");
      // setError("email", { type: "custom", message: "Invalid email address." });
      // setServerError("");
      return;
    }

    setValidationError("email", "");
    // setError("email", { type: "custom", message: "" });
    // setServerError("");
  };

  const handleEmailChange = (e: any) => {
    const { value } = e.target;

    // if (value.trim().length === 0) {
    //   setError("email", {
    //     type: "custom",
    //     message: "Please enter a valid email address.",
    //   });
    //   return;
    // }

    // if (!value.match(validRegex)) {
    //   setError("email", { type: "custom", message: "Invalid email address." });
    //   return;
    // }

    if (value.length > 254) {
      setValidationError("email", "Too long email.");

      // setError("email", { type: "custom", message: "Too long email" });
      // setServerError("");
      return;
    }

    setValidationError("email", "");
    // setError("email", { type: "custom", message: "" });
    // setServerError("");
  };

  const handlePasswordChange = (e: any) => {
    const { value } = e.target;

    // if (value.trim().length === 0) {
    //   setError("password", {
    //     type: "custom",
    //     message: "Please enter password",
    //   });
    //   return;
    // }

    if (value.length > 50) {
      setValidationError("password", "Too long password.");
      // setError("password", { type: "custom", message: "Too long password" });
      // setServerError("");
      return;
    }

    setValidationError("password", "");
    // setError("password", { type: "custom", message: "" });
    // setServerError("");
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <AmplifyTemplate>
      <SEO title="TaxGlobal" description="TaxGlobal Login Register Page" />
      <section className="login-page py-6">
        <Container>
          <div className="d-grid signup">
            <div className="signup-container">
              <div className="form-container">
                <h1>Welcome back</h1>
                <div className="social-signup">
                  <Button
                    variant="outline-light"
                    onClick={() =>
                      Auth.federatedSignIn({
                        customProvider: "LinkedIn",
                      })
                    }
                  >
                    <img src={linkedInIcon} alt="linkedin" /> Sign-in with
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline-light"
                    onClick={() =>
                      Auth.federatedSignIn({
                        provider: CognitoHostedUIIdentityProvider.Google,
                      })
                    }
                  >
                    <img src={googleIcon} alt="Google" /> Sign-in with Google
                  </Button>
                </div>

                <p className="mb-0">Or login using your email address</p>
                <form
                  id="loginForm"
                  onSubmit={handleSubmit(onSubmit, onError)}
                  className="login-form"
                >
                  <Form.Group className="form-group" controlId="Email">
                    <label className="form-label">Email</label>
                    <input
                      // onChange={handleChange}
                      maxLength={254}
                      {...register("email", {
                        required: true,
                        // maxLength: 10,
                        onChange: handleEmailChange,
                        onBlur: handleEmailFocusOut,
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
                  <Form.Group className="form-group mb-3" controlId="Password">
                    <label className="form-label">Password</label>
                    <InputGroup
                      className={errors.password?.types ? "is-invalid" : ""}
                    >
                      <input
                        maxLength={50}
                        type={passwordShown ? "text" : "password"}
                        {...register("password", {
                          required: true,
                          // maxLength: 50,
                          onChange: handlePasswordChange,
                        })}
                        className={
                          errors.password?.message
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      <InputGroup.Text>
                        <i
                          className={
                            !passwordShown ? "fal fa-eye-slash" : "fal fa-eye"
                          }
                          onClick={togglePassword}
                        ></i>
                      </InputGroup.Text>
                    </InputGroup>

                    {errors.password?.message && (
                      <Form.Control.Feedback type="invalid">
                        <i className="fas fa-exclamation-circle" />
                        {errors.password.message?.toString()}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Row className="mb-3">
                    <Col>
                      <Link href="/send-link">Forgot password?</Link>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <div className="form-check align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="remember"
                        />
                        <label htmlFor="remember" className="form-check-label">
                          Remember me
                        </label>
                      </div>
                    </Col>
                  </Row>

                  <div className="page-action">
                    <input
                      className="btn btn-dark"
                      type="submit"
                      value="Log in"
                      disabled={!!errors.email?.message}
                    />
                    {serverError && (
                      <div className="custom-invalid-feedback">
                        <i className="fas fa-exclamation-circle"></i>
                        {serverError?.toString()}
                      </div>
                    )}
                  </div>
                </form>
                <div className="cross-check">
                  <h6 className="small-text">Don’t have an account yet?</h6>

                  <Button variant="link" href="/register">
                    Join now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </AmplifyTemplate>
  );
}

export default LoginPage;
