import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Badge, InputGroup, Button } from "react-bootstrap";
import React from "react";
import ContentPageTemplate from "../templates/ContentPageTemplate";
import "./_service.scss";

interface IFormInputs {
  subject: string;
  services_required: string;
  your_requirement: string;
  your_phone_num: string;
}

const ServicesPage = () => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<IFormInputs>();

  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;
  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 250,
  //     },
  //   },
  // };

  // const options = ["Option 1", "Option 2", "Option 3"];

  // function getStyles(name: string, personName: string[], theme: Theme) {
  //   return {
  //     fontWeight:
  //       personName.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //   };
  // }

  // const theme = useTheme();
  // const [optionName, setOptionName] = React.useState<string[]>([]);

  // const handleOptionChange = (event: SelectChangeEvent<typeof optionName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setOptionName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  const renderOfferedServices = (service: string, id: number) => {
    return (
      <Badge key={id} bg="gray-500">
        {service}
        <i className="fal fa-times" onClick={() => removeService(service)} />
      </Badge>
    );
  };

  const removeService = (service: string) => {
    const filteredServices = offeredServices.filter((item) => item !== service);
    setOfferedServices(filteredServices);
  };

  const handleOfferedServices = () => {
    if (currentService.length) {
      setOfferedServiceError("");
      setOfferedServices([...offeredServices, currentService]);
      setCurrentService("");
    }
  };

  const [currentService, setCurrentService] = React.useState("");
  const [offeredServices, setOfferedServices] = React.useState<string[]>([]);

  const [offeredServiceError, setOfferedServiceError] = React.useState("");

  const [serverError, setServerError] = React.useState("");

  const setValidationError = (
    key:
      | "subject"
      | "services_required"
      | "your_requirement"
      | "your_phone_num",
    message: string
  ) => {
    setError(key, {
      type: "custom",
      message,
    });
    setServerError("");
  };

  // const [subject, setSubject] = React.useState("");
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (data.subject.length === 0) {
      setValidationError("subject", "please enter subject.");
    }

    if (data.your_requirement.length === 0) {
      setValidationError("your_requirement", "please enter your requirement.");
    }

    // submit success
    window.location.href = "/services/completed";
  };

  const onError = (error: any) => {
    //error
    if (error?.subject?.message.trim().length === 0) {
      setValidationError("subject", "Please enter subject.");
    }

    // if (error?.services_required?.message.trim().length === 0) {
    //   setValidationError("services_required", "Please enter a valid email address.");
    // }

    if (error?.your_requirement?.message.trim().length === 0) {
      setValidationError(
        "your_requirement",
        "Please enter a your requirement."
      );
    }

    if (error?.your_phone_num?.message.trim().length === 0) {
      setValidationError("your_phone_num", "Please enter phone number.");
    }

    // if (error?.your_requirement?.message.trim().length === 0) {
    //   setValidationError(
    //     "your_requirement",
    //     "Please enter a valid email address."
    //   );
    // }

    // if (error?.your_phone_num?.message.trim().length === 0) {
    //   setValidationError(
    //     "your_phone_num",
    //     "Please enter a valid email address."
    //   );
    // }
  };

  return (
    <ContentPageTemplate className="services-page">
      <h1>Hire a professional</h1>
      <p className="amplify-label">
        You can hire a professional certified CPA through TaxGlobal. Just fill
        out and submit the form below and a member of our team will be in touch.
      </p>
      <form
        id="servicesform"
        onSubmit={handleSubmit(onSubmit, onError)}
        className="form-layout"
      >
        <Form.Group className="form-group" controlId="Email">
          <Form.Label>Subject</Form.Label>
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
        <Form.Group className="form-group">
          <Form.Label>Services Required</Form.Label>
          <InputGroup>
            <Form.Control
              aria-describedby="basic-addon1"
              onChange={(e) => setCurrentService(e.target.value)}
              value={currentService}
            />
            <InputGroup.Text onClick={handleOfferedServices}>+</InputGroup.Text>
          </InputGroup>
          {offeredServices.length > 0 ? (
            <div className="badge-group">
              {offeredServices.map((service: string, id: number) => {
                return renderOfferedServices(service, id);
              })}
            </div>
          ) : null}
          {offeredServiceError.length > 0 && (
            <Form.Control.Feedback type="invalid">
              <i className="fas fa-exclamation-circle" />
              {offeredServiceError?.toString()}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="form-group" controlId="Email">
          <Form.Label>What do you need help with?</Form.Label>
          <input
            // onChange={handleChange}
            maxLength={1000}
            {...register("your_requirement", {
              required: true,
              // maxLength: 10,
              // onChange: handleEmailChange,
              // onBlur: handleEmailFocusOut,
            })}
            className={
              errors.your_requirement?.message
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.your_requirement?.message && (
            <Form.Control.Feedback type="invalid">
              <i className="fas fa-exclamation-circle" />
              {errors.your_requirement?.message.toString()}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="form-group" controlId="Email">
          <Form.Label>Your phone number</Form.Label>
          <input
            // onChange={handleChange}
            maxLength={1000}
            {...register("your_phone_num", {
              required: true,
              // maxLength: 10,
              // onChange: handleEmailChange,
              // onBlur: handleEmailFocusOut,
            })}
            className={
              errors.your_phone_num?.message
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.your_phone_num?.message && (
            <Form.Control.Feedback type="invalid">
              <i className="fas fa-exclamation-circle" />
              {errors.your_phone_num.message?.toString()}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <div className="form-action">
          <Button
            variant="dark"
            type="submit"
            disabled={!!errors.subject?.message}
          >
            Submit
          </Button>
          {serverError && (
            <div className="custom-invalid-feedback">
              <i className="fas fa-exclamation-circle"></i>
              {serverError?.toString()}
            </div>
          )}
        </div>
      </form>
    </ContentPageTemplate>
  );
};

export default ServicesPage;
