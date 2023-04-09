import axios from "axios";
import React, { FC, useEffect } from "react";
import { Alert, Badge, Button, Card, Container, Form } from "react-bootstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { providerOnboarding } from "../../../actions/onBoardingActions";
import { useNavigate } from "react-router-dom";
import { Onboard } from "../../../interfaces/reducers/Onboard";
import { MASTER_DATA_KEY } from "../../../actions/keys";
import { GET_MASTER_DATA_API } from "../../../actions/endPoints";

interface Props {
  setWizardStep: (arg: string) => void;
}

type BusinessCodes = {
  id: number;
  description: string;
  code: string;
};

type Profile = {
  id: number;
  value: string;
  text: string;
};

type State = {
  id: number;
  code: string;
  name: string;
};

interface IFormInputs {
  "seeker-business-type-company": boolean;
  "seeker-business-type-individual": boolean;
  "seeker-company-owner-yes": boolean;
  "focus-industry-individual": string;
}

const userProfiles = [
  {
    id: 1,
    value: "1",
    text: "C Corp",
  },
  {
    id: 2,
    value: "2",
    text: "S Corp",
  },
  {
    id: 3,
    value: "3",
    text: "LLC",
  },
  {
    id: 4,
    value: "4",
    text: "Non-profit",
  },
  {
    id: 5,
    value: "5",
    text: "Sole-proprietorship",
  },
  {
    id: 6,
    value: "6",
    text: "Partnership",
  },
  {
    id: 7,
    value: "7",
    text: "Individual",
  },
];

const ProviderBusiness: FC<Props> = (props) => {
  const { setWizardStep } = props;

  const [businesstype, setBusinesstype] = React.useState("");
  const [businessOwner, setBusinessOwner] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [companyType, setCompanyType] = React.useState("");

  const [establishmentDate, setEstablishmentDate] = React.useState<any>(null);
  const [activeCPAs, setActiveCPAs] = React.useState("");
  const [combinedExperience, setCombinedExperience] = React.useState("");
  const [businessCodes, setBusinessCode] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [selectedBusinessCodes, setSelectedBusinessCode] = React.useState<
    string[]
  >([]);
  const [selectedBusinessCodeIds, setSelectedBusinessCodeIds] = React.useState<
    number[]
  >([]);
  const [internationTransactions, setInternationTransactions] =
    React.useState("");
  const [IRSLicenseNumber, setIRSLicenseNumber] = React.useState("");
  const [PTINNumber, setPTINNumber] = React.useState("");
  const [eFileOnClientBehalf, setEFileOnClientBehalf] = React.useState("");
  const [auditDefence, setAuditDefence] = React.useState("");
  const [auditDefenceLost, setAuditDefenceLost] = React.useState("");
  const [customerProfileType, setCustomerProfileType] = React.useState("");
  const [customerProfileTypeError, setCustomerProfileTypeError] =
    React.useState("");
  const [providerSummary, setProviderSummary] = React.useState("");
  const [providerSummaryError, setProviderSummaryError] = React.useState("");
  const [combinedExperienceError, setCombinedExperienceError] =
    React.useState("");
  const [selectedBusinessCodesError, setSelectedBusinessCodesError] =
    React.useState("");
  const [internationTransactionsError, setInternationTransactionsError] =
    React.useState("");
  const [IRSLicenseNumberError, setIRSLicenseNumberError] = React.useState("");
  const [PTINNumberError, setPTINNumberError] = React.useState("");
  const [eFileOnClientBehalfError, setEFileOnClientBehalfError] =
    React.useState("");
  const [auditDefenceError, setAuditDefenceError] = React.useState("");
  const [auditDefenceLostError, setAuditDefenceLostError] = React.useState("");
  const [companyNameError, setCompanyNameError] = React.useState("");
  const [companyTypeError, setCompanyTypeError] = React.useState("");

  const [establishmentDateError, setEstablishmentDateError] =
    React.useState("");
  const [primaryState, setPrimaryState] = React.useState(0);
  const [primaryStateError, setPrimaryStateError] = React.useState("");
  const [secondaryStates, setSecondaryStates] = React.useState<string[]>([]);
  const [secondaryStateIds, setSecondaryStateIds] = React.useState<number[]>(
    []
  );
  const [secondaryStateError, setSecondaryStateError] = React.useState("");
  const [activeCPAsError, setActiveCPAsError] = React.useState("");
  const [apierror, setApiError] = React.useState("");

  const companyTypes = ["Tax advisers", "Accountants", "CPAs", "Tax attorneys"];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { success, error, message, redirectUrl }: Onboard = useAppSelector(
    (state) => state.onboarding
  );

  useEffect(() => {
    if (success === true) navigate(redirectUrl);
  }, [success, redirectUrl, navigate]);

  useEffect(() => {
    if (error === true) setApiError(message);
  }, [error, message]);

  useEffect(() => {
    console.log("companyType",companyType);
  }, [companyType]);

  useEffect(() => {
    
    async function fetchData() {
      const config = {
        Accept: "application/json",
        "x-api-key": MASTER_DATA_KEY,
      };

      const body = {
        type: "FOCUS_INDUSTRIES",
      };

      await axios
        .post(GET_MASTER_DATA_API, body, {
          headers: config,
        })
        .then((res: any) => {
          setBusinessCode(res.data.results);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    if (businessCodes.length === 0) {
      fetchData();
    }
  }, [businessCodes.length]);

  useEffect(() => {
    async function fetchData() {
      const config = {
        Accept: "application/json",
        "x-api-key": MASTER_DATA_KEY,
      };

      const body = {
        type: "STATES",
      };

      await axios
        .post(GET_MASTER_DATA_API, body, {
          headers: config,
        })
        .then((res: any) => {
          setStates(res.data.results);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    if (states.length === 0) {
      fetchData();
    }
  }, [states.length]);

  const { handleSubmit, register } = useForm<IFormInputs>();

  const handleActiveCpachange = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      e.target.value !== "" && setActiveCPAsError("");
      setActiveCPAs(e.target.value);
    } else {
      e.preventDefault();
    }
  };

  const handleCombinedExperience = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      e.target.value !== "" && setCombinedExperienceError("");
      setCombinedExperience(e.target.value);
    } else {
      e.preventDefault();
    }
  };

  const handleIRSLicenseChange = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      e.target.value !== "" && setIRSLicenseNumberError("");
      setIRSLicenseNumber(e.target.value);
    } else {
      e.preventDefault();
    }
  };

  const handlePTINNumberChange = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      e.target.value !== "" && setPTINNumberError("");
      setPTINNumber(e.target.value);
    } else {
      e.preventDefault();
    }
  };

  const handleBusinessTypeSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.target.checked) {
      setBusinesstype(type);
    } else {
      setBusinesstype("");
    }
  };

  const handleBusinessOwnerSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.target.checked) {
      setBusinessOwner(type);
    } else {
      setBusinessOwner("");
    }
  };

  const handleEstablishmentDate = (date: Date) => {
    if (date !== null) {
      setEstablishmentDateError("");
    }
    setEstablishmentDate(date);
  };

  const handleBusinessCodeSelect = (val: any) => {
    setSelectedBusinessCodesError("");
    const found = selectedBusinessCodeIds.includes(val.id);
    if (!found) {
      setSelectedBusinessCodeIds([...selectedBusinessCodeIds, val.id]);
      setSelectedBusinessCode([...selectedBusinessCodes, val.label]);
    }
  };

  const handleCustomerProfileSelect = (val: any) => {
    setCustomerProfileType(val.value);
    setCustomerProfileTypeError("");
  };

  const handlePrimaryStateSelect = (val: any) => {
    setPrimaryStateError("");
    setPrimaryState(val.value);
  };

  const handleSecondaryStateSelect = (val: any) => {
    setSecondaryStateError("");
    const found = secondaryStateIds.includes(val.id);
    if (!found) {
      setSecondaryStateIds([...secondaryStateIds, val.id]);
      setSecondaryStates([...secondaryStates, val.label]);
    }
  };

  const handleInternationalTransactions = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.target.checked) {
      setInternationTransactionsError("");
      setInternationTransactions(type);
    } else {
      setInternationTransactions("");
    }
  };

  const handleEFileOnClientBehalf = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.target.checked) {
      setEFileOnClientBehalfError("");
      setEFileOnClientBehalf(type);
    } else {
      setEFileOnClientBehalf("");
    }
  };

  const handleAuditDefence = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.target.checked) {
      setAuditDefenceError("");
      setAuditDefence(type);
    } else {
      setAuditDefence("");
    }
  };

  const handleAuditDefenceLost = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.target.checked) {
      setAuditDefenceLostError("");
      setAuditDefenceLost(type);
    } else {
      setAuditDefenceLost("");
    }
  };

  const removeService = (service: string, id: number) => {
    const filteredBusinesses = selectedBusinessCodes.filter(
      (item) => item !== service
    );
    const filteredBusinessCodeIds = selectedBusinessCodeIds.filter(
      (item) => item !== id
    );
    setSelectedBusinessCode(filteredBusinesses);
    setSelectedBusinessCodeIds(filteredBusinessCodeIds);
  };

  const removeState = (service: string, id: number) => {
    const filteredStates = secondaryStates.filter((item) => item !== service);
    const filteredStateIds = secondaryStateIds.filter((item) => item !== id);
    setSecondaryStates(filteredStates);
    setSecondaryStateIds(filteredStateIds);
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const { attributes } = await Auth.currentAuthenticatedUser();

    if (businesstype === "company" && businessOwner === "no") {
      // stop submit
      return;
    }

    if (businesstype === "company") {
      let validForm = true;

      if (companyName === "") {
        validForm = false;
        setCompanyNameError("Please enter the name of your company.");
      }

      if (establishmentDate === null) {
        validForm = false;
        setEstablishmentDateError(
          "Please enter the date of establishment of your company."
        );
      }

      if (activeCPAs === "") {
        validForm = false;
        setActiveCPAsError(
          "Please enter the number of active CPAs of your company."
        );
      }

      if (combinedExperience === "") {
        validForm = false;
        setCombinedExperienceError(
          "Please enter the number years of combine experience in the tax sector of your company."
        );
      }

      if (selectedBusinessCodes.length === 0) {
        validForm = false;
        setSelectedBusinessCodesError(
          "Please search your business and select relevant record from the search result."
        );
      }

      if (primaryState === 0) {
        validForm = false;
        setPrimaryStateError(
          "Please select the primary state you manage in the US."
        );
      }

      if (secondaryStates.length === 0) {
        validForm = false;
        setSecondaryStateError(
          "Please select at least one secondary state you manage in the US."
        );
      }

      if (customerProfileType === "") {
        validForm = false;
        setCustomerProfileTypeError(
          "Please select your ideal type of customer profile."
        );
      }

      if (internationTransactions === "") {
        validForm = false;
        setInternationTransactionsError(
          "Please select ideal type of customer profile you would like to manage."
        );
      }

      if (IRSLicenseNumber === "") {
        validForm = false;
        setIRSLicenseNumberError(
          "Please enter the IRS license number of your company."
        );
      }

      if (PTINNumber === "") {
        validForm = false;
        setPTINNumberError("Please enter the PTIN number of your company.");
      }

      if (eFileOnClientBehalf === "") {
        validForm = false;
        setEFileOnClientBehalfError(
          "Please state whether you e-file on your clients behalf."
        );
      }

      if (auditDefence === "") {
        validForm = false;
        setAuditDefenceError(
          "Please state whether you done audit defense for clients."
        );
      }

      if (auditDefenceLost === "") {
        validForm = false;
        setAuditDefenceLostError(
          "Please state whether you lost any clients audit defense."
        );
      }

      if (providerSummary === "") {
        validForm = false;
        setProviderSummaryError("Please enter your business summary.");
      }

      if (validForm) {
        const companyProviderData = {
          uuid: attributes.sub,
          roleTypeID: 1,
          businessTypeID: businesstype === "company" ? 2 : 1,
          companyType: companyType,
          companyName: companyName,
          isOwner: 1,
          establishDate: establishmentDate,
          numberOfCPAs: parseInt(activeCPAs, 10),
          yearsExperience: parseInt(combinedExperience, 10),
          focusIndustries: selectedBusinessCodeIds,
          primaryStateID: primaryState,
          secondaryStateIDs: secondaryStateIds,
          internationalTransactions: internationTransactions === "yes" ? 1 : 0,
          irsLicenseNumber: parseInt(IRSLicenseNumber, 10),
          ptiNNumber: parseInt(PTINNumber, 10),
          eFile: eFileOnClientBehalf === "yes" ? 1 : 0,
          auditDefense: auditDefence === "yes" ? 1 : 0,
          lostAudit: auditDefenceLost === "yes" ? 1 : 0,
          idealProfileType: parseInt(customerProfileType, 10),
          businessSummary: providerSummary,
        };

        dispatch(providerOnboarding(companyProviderData));
      }
    }

    if (businesstype === "individual") {
      let validForm = true;

      if (combinedExperience === "") {
        validForm = false;
        setCombinedExperienceError(
          "Please enter the number years of combine experience in the tax sector of your company."
        );
      }

      if (selectedBusinessCodes.length === 0) {
        validForm = false;
        setSelectedBusinessCodesError(
          "Please search your business and select relevant record from the search result."
        );
      }

      if (primaryState === 0) {
        validForm = false;
        setPrimaryStateError(
          "Please select the primary state you manage in the US."
        );
      }

      if (internationTransactions === "") {
        validForm = false;
        setInternationTransactionsError(
          "Please state whether you do international transactions tax planning and returns."
        );
      }

      if (IRSLicenseNumber === "") {
        validForm = false;
        setIRSLicenseNumberError(
          "Please enter the IRS license number of your company."
        );
      }

      if (PTINNumber === "") {
        validForm = false;
        setPTINNumberError("Please enter the PTIN number of your company.");
      }

      if (eFileOnClientBehalf === "") {
        validForm = false;
        setEFileOnClientBehalfError(
          "Please state whether you e-file on your clients behalf."
        );
      }

      if (auditDefence === "") {
        validForm = false;
        setAuditDefenceError(
          "Please state whether you done audit defense for clients."
        );
      }

      if (auditDefenceLost === "") {
        validForm = false;
        setAuditDefenceLostError(
          "Please state whether you lost any clients audit defense."
        );
      }

      if (customerProfileType === "") {
        validForm = false;
        setCustomerProfileTypeError(
          "Please select your ideal type of customer profile."
        );
      }

      if (providerSummary === "") {
        validForm = false;
        setProviderSummaryError("Please enter your business summary.");
      }

      if (validForm) {
        const individualProviderData = {
          uuid: attributes.sub,
          roleTypeID: 1,
          businessTypeID: businesstype === "individual" ? 1 : 2,
          yearsExperience: parseInt(combinedExperience, 10),
          focusIndustries: selectedBusinessCodeIds,
          primaryStateID: primaryState,
          secondaryStateIDs: secondaryStateIds,
          internationalTransactions: internationTransactions === "yes" ? 1 : 0,
          irsLicenseNumber: parseInt(IRSLicenseNumber, 10),
          ptiNNumber: parseInt(PTINNumber, 10),
          eFile: eFileOnClientBehalf === "yes" ? 1 : 0,
          auditDefense: auditDefence === "yes" ? 1 : 0,
          lostAudit: auditDefenceLost === "yes" ? 1 : 0,
          idealProfileType: customerProfileType,
          businessSummary: providerSummary,
        };

        dispatch(providerOnboarding(individualProviderData));
      }
    }
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const renderOfferedServices = (service: string, id: number) => {
    return (
      <Badge key={id} bg="gray-500">
        {service}
        <i
          className="fal fa-times"
          onClick={() => removeService(service, id)}
        />
      </Badge>
    );
  };

  const renderSecondaryStates = (service: string, id: number) => {
    return (
      <Badge key={id} bg="gray-500">
        {service}
        <i className="fal fa-times" onClick={() => removeState(service, id)} />
      </Badge>
    );
  };

  return (
    <Container>
      <Card className="single-page">
        <Card.Header>
          <div className="back-nav">
            <Button variant="link" onClick={() => setWizardStep("")}>
              <i className="fal fa-long-arrow-left"></i> Go back
            </Button>
          </div>
          <h1>I am providing services</h1>
        </Card.Header>
        <Card.Body>
          <Form id="registerForm" onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group
              className="form-group mb-5"
              controlId="formBasicCheckbox"
            >
              <h5>Select your business type</h5>
              <Form.Check
                inline
                type="radio"
                id="provider-business-type-company"
                label="Company"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleBusinessTypeSelect(e, "company")
                }
                checked={businesstype === "company"}
              />
              <Form.Check
                inline
                type="radio"
                id="provider-business-type-individual"
                label="Individual"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleBusinessTypeSelect(e, "individual")
                }
                checked={businesstype === "individual"}
              />
            </Form.Group>

            {businesstype === "company" && (
              <>
                <hr />
                <Form.Group
                  className="form-group mb-5"
                  controlId="formBasicCheckbox"
                >
                  <h5>Are you the owner/partner of this firm?</h5>
                  <Form.Check
                    inline
                    type="radio"
                    id="customer-company-owner-yes"
                    label="Yes"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleBusinessOwnerSelect(e, "yes")
                    }
                    checked={businessOwner === "yes"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="customer-company-owner-no"
                    label="No"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleBusinessOwnerSelect(e, "no")
                    }
                    checked={businessOwner === "no"}
                  />
                </Form.Group>
              </>
            )}

            {businesstype === "company" && businessOwner === "no" && (
              <Alert variant="light">
                <i className="fas fa-info-circle" />
                <p>
                  You cannot proceed as a company if you are not an owner or a
                  partner. You can still sign up as an Individual.
                </p>
              </Alert>
            )}

            {businesstype === "company" && businessOwner === "yes" && (
              <>
                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>Name of your company</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      e.target.value !== "" && setCompanyNameError("");
                    }}
                    maxLength={255}
                  />
                  {companyNameError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {companyNameError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>Company Type</Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      setCompanyType(e.target.value);
                      e.target.value !== "" && setCompanyTypeError("");
                    }}
                  >
                    <option value="Select a company type" disabled>
                      Select a company type
                    </option>
                    {companyTypes.map((companyType: any) => (
                      <option key={companyType} value={companyType}>
                        {companyType}
                      </option>
                    ))}
                  </Form.Select>
                  {companyTypeError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {companyTypeError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>
                    What is ideal type of customer profile?
                  </Form.Label>
                  <Select
                    options={userProfiles.map((option: Profile) => ({
                      value: option.value,
                      label: option.text,
                    }))}
                    onChange={(value) => handleCustomerProfileSelect(value)}
                  />
                  {customerProfileTypeError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {customerProfileTypeError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group> */}

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>Date of establishment</Form.Label>
                  <DatePicker
                    id="datepicker"
                    selected={establishmentDate}
                    onChange={(date: Date) => handleEstablishmentDate(date)}
                    className="form-control"
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                  />
                  {establishmentDateError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {establishmentDateError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>Number of active CPAs</Form.Label>
                  <Form.Control
                    type="text"
                    name="activeCPAs"
                    onChange={(e) => handleActiveCpachange(e)}
                    maxLength={5}
                    value={activeCPAs}
                  />
                  {activeCPAsError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {activeCPAsError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>
                    Number of years of combine experience in the tax sector
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="combinedExperience"
                    onChange={(e) => handleCombinedExperience(e)}
                    maxLength={5}
                    value={combinedExperience}
                  />
                  {combinedExperienceError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {combinedExperienceError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>Focus industries</Form.Label>
                  <Select
                    options={businessCodes.map((option: BusinessCodes) => ({
                      id: option.id,
                      value: option.code,
                      label: option.code + " " + option.description,
                    }))}
                    onChange={(value: any) => handleBusinessCodeSelect(value)}
                  />

                  {selectedBusinessCodes.length > 0 ? (
                    <div className="badge-group">
                      {selectedBusinessCodes.map(
                        (service: string, id: number) => {
                          return renderOfferedServices(service, id);
                        }
                      )}
                    </div>
                  ) : null}

                  {selectedBusinessCodesError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {selectedBusinessCodesError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>Primary state you manage in the US</Form.Label>
                  <Select
                    options={states.map((option: State) => ({
                      value: option.id,
                      label: option.name,
                    }))}
                    onChange={(value) => handlePrimaryStateSelect(value)}
                  />

                  {primaryStateError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {primaryStateError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>Secondary states you manage in the US</Form.Label>
                  <Select
                    options={states.map((option: State) => ({
                      id: option.id,
                      value: option.id,
                      label: option.name,
                    }))}
                    onChange={(value: any) => handleSecondaryStateSelect(value)}
                  />

                  {secondaryStates.length > 0 ? (
                    <div className="badge-group">
                      {secondaryStates.map((service: string, id: number) => {
                        return renderSecondaryStates(service, id);
                      })}
                    </div>
                  ) : null}

                  {secondaryStateError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {secondaryStateError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group
                  className="form-group mb-5"
                  controlId="formBasicCheckbox"
                >
                  <h5>
                    Do you do international transactions tax planning and
                    returns?
                  </h5>
                  <Form.Check
                    inline
                    type="radio"
                    id="internation-transaction-yes"
                    label="Yes"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInternationalTransactions(e, "yes")
                    }
                    checked={internationTransactions === "yes"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="internation-transaction-no"
                    label="No"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInternationalTransactions(e, "no")
                    }
                    checked={internationTransactions === "no"}
                  />

                  {internationTransactionsError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {internationTransactionsError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>IRS license number</Form.Label>
                  <Form.Control
                    type="text"
                    name="IRSLicenseNumber"
                    onChange={(e) => handleIRSLicenseChange(e)}
                    maxLength={20}
                    value={IRSLicenseNumber}
                  />
                  {IRSLicenseNumberError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {IRSLicenseNumberError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>PTIN number</Form.Label>
                  <Form.Control
                    type="text"
                    name="PTINNumber"
                    onChange={(e) => handlePTINNumberChange(e)}
                    maxLength={20}
                    value={PTINNumber}
                  />
                  {PTINNumberError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {PTINNumberError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group
                  className="form-group mb-5"
                  controlId="formBasicCheckbox"
                >
                  <h5>Can you e-file on your clients behalf?</h5>
                  <Form.Check
                    inline
                    type="radio"
                    id="e-file-clients-behalf-yes"
                    label="Yes"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleEFileOnClientBehalf(e, "yes")
                    }
                    checked={eFileOnClientBehalf === "yes"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="e-file-clients-behalf-no"
                    label="No"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleEFileOnClientBehalf(e, "no")
                    }
                    checked={eFileOnClientBehalf === "no"}
                  />
                  {eFileOnClientBehalfError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {eFileOnClientBehalfError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group
                  className="form-group mb-5"
                  controlId="formBasicCheckbox"
                >
                  <h5>Have you done audit defence for clients?</h5>
                  <Form.Check
                    inline
                    type="radio"
                    id="audit-defence-yes"
                    label="Yes"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleAuditDefence(e, "yes")
                    }
                    checked={auditDefence === "yes"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="audit-defence-no"
                    label="No"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleAuditDefence(e, "no")
                    }
                    checked={auditDefence === "no"}
                  />
                  {auditDefenceError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {auditDefenceError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group
                  className="form-group mb-5"
                  controlId="formBasicCheckbox"
                >
                  <h5>Any audit defences lost?</h5>
                  <Form.Check
                    inline
                    type="radio"
                    id="audit-defence-lost-yes"
                    label="Yes"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleAuditDefenceLost(e, "yes")
                    }
                    checked={auditDefenceLost === "yes"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="audit-defence-lost-no"
                    label="No"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleAuditDefenceLost(e, "no")
                    }
                    checked={auditDefenceLost === "no"}
                  />
                  {auditDefenceLostError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {auditDefenceLostError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>
                    What is ideal type of customer profile?
                  </Form.Label>
                  <Select
                    options={userProfiles.map((option: Profile) => ({
                      value: option.value,
                      label: option.text,
                    }))}
                    onChange={(value) => handleCustomerProfileSelect(value)}
                  />
                  {customerProfileTypeError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {customerProfileTypeError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group
                  className="form-group mb-5"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    Please provide anything else you would like to add that is
                    unique to your firm
                  </Form.Label>
                  <Form.Control
                    name="businessSummary"
                    as="textarea"
                    rows={5}
                    maxLength={5000}
                    onChange={(e) => setProviderSummary(e.target.value)}
                  />
                  {providerSummaryError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {providerSummaryError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </>
            )}

            {businesstype === "individual" && (
              <>
                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>
                    Number of years of combine experience in the tax sector
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="combinedExperience"
                    onChange={(e) => handleCombinedExperience(e)}
                    maxLength={5}
                    value={combinedExperience}
                  />
                  {combinedExperienceError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {combinedExperienceError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>Focus industries</Form.Label>
                  <Select
                    {...register("focus-industry-individual")}
                    options={businessCodes.map((option: BusinessCodes) => ({
                      id: option.id,
                      value: option.code,
                      label: option.code + " " + option.description,
                    }))}
                    onChange={(value: any) => handleBusinessCodeSelect(value)}
                  />

                  {selectedBusinessCodes.length > 0 ? (
                    <div className="badge-group">
                      {selectedBusinessCodes.map(
                        (service: string, id: number) => {
                          return renderOfferedServices(service, id);
                        }
                      )}
                    </div>
                  ) : null}

                  {selectedBusinessCodesError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {selectedBusinessCodesError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>Primary state you manage in the US</Form.Label>
                  <Select
                    options={states.map((option: State) => ({
                      value: option.id,
                      label: option.name,
                    }))}
                    onChange={(value) => handlePrimaryStateSelect(value)}
                  />
                  {primaryStateError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {primaryStateError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>Secondary states you manage in US</Form.Label>
                  <Select
                    options={states.map((option: State) => ({
                      id: option.id,
                      value: option.id,
                      label: option.name,
                    }))}
                    onChange={(value: any) => handleSecondaryStateSelect(value)}
                  />

                  {secondaryStates.length > 0 ? (
                    <div className="badge-group">
                      {secondaryStates.map((service: string, id: number) => {
                        return renderSecondaryStates(service, id);
                      })}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group
                  className="form-group mb-5"
                  controlId="formBasicCheckbox"
                >
                  <h5>
                    Do you do international transactions tax planning and
                    returns?
                  </h5>
                  <Form.Check
                    inline
                    type="radio"
                    id="internation-transaction-yes"
                    label="Yes"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInternationalTransactions(e, "yes")
                    }
                    checked={internationTransactions === "yes"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="internation-transaction-no"
                    label="No"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInternationalTransactions(e, "no")
                    }
                    checked={internationTransactions === "no"}
                  />

                  {internationTransactionsError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {internationTransactionsError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>IRS license number</Form.Label>
                  <Form.Control
                    type="text"
                    name="IRSLicenseNumber"
                    onChange={(e) => handleIRSLicenseChange(e)}
                    maxLength={20}
                    value={IRSLicenseNumber}
                  />
                  {IRSLicenseNumberError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {IRSLicenseNumberError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>PTIN number</Form.Label>
                  <Form.Control
                    type="text"
                    name="PTINNumber"
                    onChange={(e) => handlePTINNumberChange(e)}
                    maxLength={20}
                    value={PTINNumber}
                  />
                  {PTINNumberError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {PTINNumberError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group
                  className="form-group mb-5"
                  controlId="formBasicCheckbox"
                >
                  <h5>Can you e-file on your clients behalf?</h5>
                  <Form.Check
                    inline
                    type="radio"
                    id="e-file-clients-behalf-yes"
                    label="Yes"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleEFileOnClientBehalf(e, "yes")
                    }
                    checked={eFileOnClientBehalf === "yes"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="e-file-clients-behalf-no"
                    label="No"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleEFileOnClientBehalf(e, "no")
                    }
                    checked={eFileOnClientBehalf === "no"}
                  />
                  {eFileOnClientBehalfError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {eFileOnClientBehalfError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group
                  className="form-group mb-5"
                  controlId="formBasicCheckbox"
                >
                  <h5>Have you done audit defence for clients?</h5>
                  <Form.Check
                    inline
                    type="radio"
                    id="audit-defence-yes"
                    label="Yes"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleAuditDefence(e, "yes")
                    }
                    checked={auditDefence === "yes"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="audit-defence-no"
                    label="No"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleAuditDefence(e, "no")
                    }
                    checked={auditDefence === "no"}
                  />
                  {auditDefenceError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {auditDefenceError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group
                  className="form-group mb-5"
                  controlId="formBasicCheckbox"
                >
                  <h5>Any audit defences lost?</h5>
                  <Form.Check
                    inline
                    type="radio"
                    id="audit-defence-lost-yes"
                    label="Yes"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleAuditDefenceLost(e, "yes")
                    }
                    checked={auditDefenceLost === "yes"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="audit-defence-lost-no"
                    label="No"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleAuditDefenceLost(e, "no")
                    }
                    checked={auditDefenceLost === "no"}
                  />
                  {auditDefenceLostError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {auditDefenceLostError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="form-group mb-5" controlId="companyName">
                  <Form.Label>
                    What is ideal type of customer profile?
                  </Form.Label>
                  <Select
                    options={userProfiles.map((option: Profile) => ({
                      value: option.value,
                      label: option.text,
                    }))}
                    onChange={(value) => handleCustomerProfileSelect(value)}
                  />
                  {customerProfileTypeError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {customerProfileTypeError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group
                  className="form-group mb-5"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    Please provide anything else you would like to add that is
                    unique to your firm
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="businessSummary"
                    rows={5}
                    maxLength={5000}
                    onChange={(e) => setProviderSummary(e.target.value)}
                  />
                  {providerSummaryError.length > 0 && (
                    <Form.Control.Feedback type="invalid">
                      <i className="fas fa-exclamation-circle" />
                      {providerSummaryError?.toString()}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </>
            )}

            {businesstype === "company" && businessOwner === "yes" && (
              <button className="btn btn-dark"> Continue </button>
            )}

            {businesstype === "individual" && (
              <button className="btn btn-dark"> Continue </button>
            )}

            {apierror.length > 0 && (
              <Form.Control.Feedback type="invalid">
                <i className="fas fa-exclamation-circle" />
                {apierror?.toString()}
              </Form.Control.Feedback>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProviderBusiness;
