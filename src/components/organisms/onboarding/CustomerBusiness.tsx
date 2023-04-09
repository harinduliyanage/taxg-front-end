import React, { FC, useEffect } from "react";
import {
	Alert,
	Badge,
	Button,
	Card,
	Container,
	Form,
	InputGroup,
} from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
import { SubmitHandler, useForm } from "react-hook-form";
import { seekerOnboarding } from "../../../actions/onBoardingActions";
import { Auth } from "aws-amplify";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Onboard } from "../../../interfaces/reducers/Onboard";
import { useNavigate } from "react-router-dom";
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

type Country = {
	id: string;
	code: string;
	country_name: string;
};

type CountryName = {
	value: number;
	label: string;
};

const CustomerBusiness: FC<Props> = (props) => {
	const { setWizardStep } = props;

	const [businesstype, setBusinesstype] = React.useState("");
	const [employmentTypeSelf, setEmploymentTypeSelf] = React.useState("");
	const [employmentTypeW2, setEmploymentTypeW2] = React.useState("");
	const [businessOwner, setBusinessOwner] = React.useState("");
	const [companyName, setCompanyName] = React.useState("");
	const [companyType, setCompanyType] = React.useState("");
	const [revenueType, setRevenueType] = React.useState("");
	const [foreignOwn, setForeignOwn] = React.useState("");
	const [businessCodes, setBusinessCode] = React.useState([]);
	const [selectedBusinessCode, setSelectedBusinessCode] = React.useState("");
	const [currentService, setCurrentService] = React.useState("");
	const [offeredServices, setOfferedServices] = React.useState<string[]>([]);
	const [multipleIncomeSource, setMultipleIncomeSource] = React.useState("");
	const [receivedK1, setReceivedK1] = React.useState("");
	const [haveForeignIncome, setHaveForeignIncome] = React.useState("");
	const [selectedCountries, setSelectedCountries] = React.useState<
		CountryName[]
	>([]);
	const [selectedCountryIds, setSelectedCountryIds] = React.useState<number[]>(
		[]
	);
	const [countries, setCountries] = React.useState([]);
	const [seekerNotes, setSeekerNotes] = React.useState("");
	// const [companySeekerNotes] = React.useState("");
	const [seekerEmploymentError, setSeekerEmploymentError] = React.useState("");
	const [multipleIncomeSourceError, setMultipleIncomeSourceError] =
		React.useState("");
	const [receivedK1Error, setReceivedK1Error] = React.useState("");
	const [haveForeignIncomeError, setHaveForeignIncomeError] =
		React.useState("");

	const [companyNameError, setCompanyNameError] = React.useState("");
	const [companyTypeError, setCompanyTypeError] = React.useState("");
	const [selectedBusinessCodeError, setSelectedBusinessCodeError] =
		React.useState("");
	const [offeredServiceError, setOfferedServiceError] = React.useState("");
	const [revenueTypeError, setRevenueTypeError] = React.useState("");
	const [foreignOwnError, setForeignOwnError] = React.useState("");
	const [apierror, setApiError] = React.useState("");
	const [seekerNotesError, setSeekerNotesErroror] = React.useState("");

	interface IFormInputs {
		"seeker-business-type-company": boolean;
		"seeker-business-type-individual": boolean;
		"seeker-company-owner-yes": boolean;
		"seeker-company-owner-no": boolean;
	}

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
					console.log(res);
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
				type: "COUNTRY",
			};

			await axios
				.post(GET_MASTER_DATA_API, body, {
					headers: config,
				})
				.then((res: any) => {
					setCountries(res.data.results);
				})
				.catch((error: any) => {
					console.log(error);
				});
		}
		if (countries.length === 0) {
			fetchData();
		}
	}, [countries.length]);

	const { handleSubmit } = useForm<IFormInputs>();

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

	const handleEmploymentTypeW2Select = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: string
	) => {
		setSeekerEmploymentError("");
		if (e.target.checked) {
			setEmploymentTypeW2(type);
		} else {
			setEmploymentTypeW2("");
		}
	};

	const handleEmploymentTypeSelfSelect = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: string
	) => {
		setSeekerEmploymentError("");
		if (e.target.checked) {
			setEmploymentTypeSelf(type);
		} else {
			setEmploymentTypeSelf("");
		}
	};

	const handleMultipleIncomeSourceSelect = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: string
	) => {
		setMultipleIncomeSourceError("");
		if (e.target.checked) {
			setMultipleIncomeSource(type);
		} else {
			setMultipleIncomeSource("");
		}
	};

	const handleReceivedK1Select = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: string
	) => {
		setReceivedK1Error("");
		if (e.target.checked) {
			setReceivedK1(type);
		} else {
			setReceivedK1("");
		}
	};

	const handleHaveForeignIncome = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: string
	) => {
		setHaveForeignIncomeError("");
		if (e.target.checked) {
			setHaveForeignIncome(type);
		} else {
			setHaveForeignIncome("");
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

	const handleCompanyTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value) {
			setCompanyTypeError("");
			setCompanyType(e.target.value);
		}
	};

	const handleRevenueTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value) {
			setRevenueTypeError("");
			setRevenueType(e.target.value);
		}
	};

	const handleForeignSelect = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: string
	) => {
		if (e.target.checked) {
			setForeignOwnError("");
			setForeignOwn(type);
		} else {
			setForeignOwn("");
		}
	};

	const handleBusinessCodeSelect = (val: any) => {
		setSelectedBusinessCodeError("");
		setSelectedBusinessCode(val.value);
	};

	const handleOfferedServices = () => {
		if (currentService.length) {
			setOfferedServiceError("");
			setOfferedServices([...offeredServices, currentService]);
			setCurrentService("");
		}
	};

	const handleIncomeCountrySelect = (val?: CountryName | null) => {
		if (val && val.label.length) {
			console.log(val);
			setSelectedCountries([...selectedCountries, val]);
			setSelectedCountryIds([...selectedCountryIds, val.value]);
		}
	};

	const removeService = (service: string) => {
		const filteredServices = offeredServices.filter((item) => item !== service);
		setOfferedServices(filteredServices);
	};

	const removeCountry = (country_id: number) => {
		const filteredCountry = selectedCountries.filter(
			(item) => item.value !== country_id
		);
		setSelectedCountries(filteredCountry);
	};

	const renderOfferedServices = (service: string, id: number) => {
		return (
			<Badge key={id} bg="gray-500">
				{service}
				<i className="fal fa-times" onClick={() => removeService(service)} />
			</Badge>
		);
	};

	const renderInvestmentCountries = (country: CountryName) => {
		return (
			<Badge key={country.value} bg="gray-500">
				{country.label}
				<i
					className="fal fa-times"
					onClick={() => removeCountry(country.value)}
				/>
			</Badge>
		);
	};

	const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
		const { attributes } = await Auth.currentAuthenticatedUser();

		if (data["seeker-company-owner-no"] === true) {
			// do not allow to submit
			return;
		}

		if (businesstype === "company") {
			// call seeker company
			let validForm = true;

			if (companyName === "") {
				validForm = false;
				setCompanyNameError("Please enter the name of your company.");
			}

			if (companyType === "") {
				validForm = false;
				setCompanyTypeError("Please select your company type.");
			}

			if (selectedBusinessCode === "") {
				validForm = false;
				setSelectedBusinessCodeError(
					"Please search your business and select relevant record from the search result."
				);
			}

			if (offeredServices.length === 0) {
				validForm = false;
				setOfferedServiceError(
					"Please provide the type of products or services do you offer."
				);
			}

			if (revenueType === "") {
				validForm = false;
				setRevenueTypeError("Please provide your revenue source.");
			}

			if (foreignOwn === "") {
				validForm = false;
				setForeignOwnError(
					"Please specify whether you have any foreign ownership which is more then 20%."
				);
			}

			if (seekerNotes === "") {
				validForm = false;
				setSeekerNotesErroror("Please enter your business summary.");
			}

			if (validForm) {
				const companySeekerData = {
					uuid: attributes.sub,
					roleTypeID: 2,
					businessTypeID: businesstype === "company" ? 2 : 1,
					companyName: companyName,
					companyTypeID: parseInt(companyType, 10),
					businessCodeId: parseInt(selectedBusinessCode, 10),
					revenueSource: revenueType,
					foreignOwnership: foreignOwn === "yes" ? 1 : 0,
					businessSummary: seekerNotes,
					productsOrServices: offeredServices,
				};

				dispatch(seekerOnboarding(companySeekerData));
			}
		}

		if (businesstype === "individual") {
			let validForm = true;
			// call seeker individual
			if (employmentTypeW2 === "" && employmentTypeSelf === "") {
				validForm = false;
				setSeekerEmploymentError("Please select your employment income type.");
			}

			if (multipleIncomeSource === "") {
				validForm = false;
				setMultipleIncomeSourceError(
					"Please specify whether you have multiple sources of income."
				);
			}

			if (receivedK1 === "") {
				validForm = false;
				setReceivedK1Error(
					"Please specify whether you received K1s for your investments."
				);
			}

			if (haveForeignIncome === "") {
				validForm = false;
				setHaveForeignIncomeError(
					"Please specify whether you have foreign income/investments."
				);
			}

			if (seekerNotes === "") {
				validForm = false;
				setSeekerNotesErroror("Please enter your business summary.");
			}

			if (validForm) {
				const indSeekerData = {
					uuid: attributes.sub,
					roleTypeID: 2,
					businessCodeId: 140,
					businessTypeID: businesstype === "individual" ? 1 : 2,
					employmentOne: employmentTypeW2 ? 1 : 0,
					employmentTwo: employmentTypeSelf ? 1 : 0,
					multipleIncome: multipleIncomeSource === "yes" ? 1 : 0,
					receivedK1s: receivedK1 === "yes" ? 1 : 0,
					foreignIncome: haveForeignIncome === "yes" ? 1 : 0,
					foreignOwnershipCountries: selectedCountryIds,
					businessSummary: seekerNotes,
				};

				dispatch(seekerOnboarding(indSeekerData));
			}
		}
	};

	const onError = (error: any) => {
		console.log(error);
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
					<h1>I am looking for services</h1>
				</Card.Header>
				<Card.Body>
					<Form
						id="registerForm"
						onSubmit={handleSubmit(onSubmit, onError)}
						className="signup-form"
					>
						<Form.Group
							className="form-group mb-5"
							controlId="formBasicCheckbox"
						>
							<h5>Select your business type</h5>
							<div key="inline-radio" className="mb-4">
								<Form.Check
									inline
									type="radio"
									id="seeker-business-type-company"
									label="Company"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										handleBusinessTypeSelect(e, "company")
									}
									checked={businesstype === "company"}
								/>
								<Form.Check
									inline
									type="radio"
									id="seeker-business-type-individual"
									label="Individual"
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										handleBusinessTypeSelect(e, "individual")
									}
									checked={businesstype === "individual"}
								/>
							</div>
						</Form.Group>

						{businesstype === "company" && (
							<>
								<hr />
								<Form.Group
									className="form-group mb-5"
									controlId="formBasicCheckbox"
								>
									<h5>Are you the owner/partner of this firm?</h5>
									<div key="inline-radio" className="mb-4">
										<Form.Check
											inline
											type="radio"
											id="seeker-company-owner-yes"
											label="Yes"
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												handleBusinessOwnerSelect(e, "yes")
											}
											checked={businessOwner === "yes"}
										/>
										<Form.Check
											inline
											type="radio"
											id="seeker-company-owner-no"
											label="No"
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												handleBusinessOwnerSelect(e, "no")
											}
											checked={businessOwner === "no"}
										/>
									</div>
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
									<Form.Label>What is the name of your company?</Form.Label>
									<Form.Control
										type="text"
										onChange={(e) => {
											setCompanyName(e.target.value);
											setCompanyNameError("");
										}}
										maxLength={250}
									/>
									{companyNameError.length > 0 && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{companyNameError?.toString()}
										</Form.Control.Feedback>
									)}
								</Form.Group>

								<Form.Group className="form-group mb-5">
									<h5>What type of company is it?</h5>
									<Form.Select onChange={handleCompanyTypeSelect}>
										<option>Select</option>
										<option value="1">C Corp</option>
										<option value="2">S Corp</option>
										<option value="3">LLC</option>
										<option value="4">Non-profit</option>
										<option value="5">Sole-proprietorship</option>
										<option value="6">Partnership</option>
										<option value="7">Individual</option>
									</Form.Select>
									{companyTypeError.length > 0 && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{companyTypeError?.toString()}
										</Form.Control.Feedback>
									)}
								</Form.Group>

								<Form.Group className="form-group mb-5" controlId="companyName">
									<Form.Label>Enter your activity business code</Form.Label>
									<Select
										options={businessCodes.map((option: BusinessCodes) => ({
											value: option.id,
											label: option.code + " " + option.description,
										}))}
										onChange={(value: any) => handleBusinessCodeSelect(value)}
									/>
									{selectedBusinessCodeError.length > 0 && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{selectedBusinessCodeError?.toString()}
										</Form.Control.Feedback>
									)}
								</Form.Group>

								<Form.Group className="form-group mb-5">
									<h5> What type of products or services do you offer?</h5>
									<InputGroup>
										<Form.Control
											aria-describedby="basic-addon1"
											onChange={(e) => setCurrentService(e.target.value)}
											value={currentService}
										/>
										<InputGroup.Text onClick={handleOfferedServices}>
											+
										</InputGroup.Text>
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
								<Form.Group className="form-group mb-5">
									<h5>Where does your revenue come from?</h5>
									<Form.Select onChange={handleRevenueTypeSelect}>
										<option>Select</option>
										<option value="local">Local</option>
										<option value="nationwide">Nationwide</option>
										<option value="international">International</option>
									</Form.Select>
									{revenueTypeError.length > 0 && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{offeredServiceError?.toString()}
										</Form.Control.Feedback>
									)}
								</Form.Group>
								<Form.Group
									className="form-group mb-5"
									controlId="formBasicCheckbox"
								>
									<h5>
										Do you have any foreign ownership which is more then 20%?
									</h5>
									<Form.Check
										inline
										type="radio"
										id="foreign-owner-yes"
										label="Yes"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleForeignSelect(e, "yes")
										}
										checked={foreignOwn === "yes"}
									/>
									<Form.Check
										inline
										type="radio"
										id="foreign-owner-no"
										label="No"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleForeignSelect(e, "no")
										}
										checked={foreignOwn === "no"}
									/>

									{foreignOwnError.length > 0 && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{foreignOwnError?.toString()}
										</Form.Control.Feedback>
									)}
								</Form.Group>

								<Form.Group
									className="form-group mb-5"
									controlId="exampleForm.ControlTextarea1"
								>
									<h5>
										Please provide us a summary of your business and anything
										specific you need help with
									</h5>
									<Form.Control
										as="textarea"
										name="businessSummary"
										rows={5}
										maxLength={5000}
										onChange={(e) => setSeekerNotes(e.target.value)}
									/>
									{seekerNotesError.length > 0 && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{seekerNotesError?.toString()}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							</>
						)}

						{businesstype === "individual" && (
							<>
								<Form.Group
									className="form-group mb-5"
									controlId="formBasicCheckbox"
								>
									<h5>Select your employment type</h5>
									<Form.Check
										inline
										type="checkbox"
										id="seeker-employment-type-individual1"
										label="Receive a W-2"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleEmploymentTypeW2Select(e, "w2")
										}
										checked={employmentTypeW2 === "w2"}
									/>
									<Form.Check
										inline
										type="checkbox"
										id="seeker-employment-type-individual2"
										label="Self employeed with 1099"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleEmploymentTypeSelfSelect(e, "self")
										}
										checked={employmentTypeSelf === "self"}
									/>

									{seekerEmploymentError.length > 0 && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{seekerEmploymentError?.toString()}
										</Form.Control.Feedback>
									)}
								</Form.Group>
								<Form.Group
									className="form-group mb-5"
									controlId="formBasicCheckbox"
								>
									<h5>Do you have multiple sources of income?</h5>
									<Form.Check
										inline
										type="radio"
										id="income-yes"
										label="Yes"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleMultipleIncomeSourceSelect(e, "yes")
										}
										checked={multipleIncomeSource === "yes"}
									/>
									<Form.Check
										inline
										type="radio"
										id="income-no"
										label="No"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleMultipleIncomeSourceSelect(e, "no")
										}
										checked={multipleIncomeSource === "no"}
									/>

									{multipleIncomeSourceError.length > 0 && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{multipleIncomeSourceError?.toString()}
										</Form.Control.Feedback>
									)}
								</Form.Group>
								<Form.Group
									className="form-group mb-5"
									controlId="formBasicCheckbox"
								>
									<h5>Do you received K1s for your investments?</h5>
									<Form.Check
										inline
										type="radio"
										id="income-yes"
										label="Yes"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleReceivedK1Select(e, "yes")
										}
										checked={receivedK1 === "yes"}
									/>
									<Form.Check
										inline
										type="radio"
										id="income-no"
										label="No"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleReceivedK1Select(e, "no")
										}
										checked={receivedK1 === "no"}
									/>

									{receivedK1Error.length > 0 && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{receivedK1Error?.toString()}
										</Form.Control.Feedback>
									)}
								</Form.Group>
								<Form.Group
									className="form-group mb-5"
									controlId="formBasicCheckbox"
								>
									<h5>Do you have foreign income/investments?</h5>
									<Form.Check
										inline
										type="radio"
										id="income-yes"
										label="Yes"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleHaveForeignIncome(e, "yes")
										}
										checked={haveForeignIncome === "yes"}
									/>
									<Form.Check
										inline
										type="radio"
										id="income-no"
										label="No"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleHaveForeignIncome(e, "no")
										}
										checked={haveForeignIncome === "no"}
									/>
									{haveForeignIncomeError.length > 0 && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{haveForeignIncomeError?.toString()}
										</Form.Control.Feedback>
									)}
								</Form.Group>

								{haveForeignIncome === "yes" && (
									<Form.Group className="form-group mb-5">
										<Form.Label>Select countries</Form.Label>
										<Select
											options={countries.map((option: Country) => ({
												value: option.id,
												label: option.country_name,
											}))}
											onChange={(value: any) =>
												handleIncomeCountrySelect(value)
											}
										/>

										{selectedCountries.length > 0 ? (
											<div className="badge-group">
												{selectedCountries.map((country) => {
													return renderInvestmentCountries(country);
												})}
											</div>
										) : null}
									</Form.Group>
								)}

								<Form.Group
									className="form-group mb-5"
									controlId="exampleForm.ControlTextarea1"
								>
									<Form.Label>
										Anything unique about your situation that we need to know or
										you specifically need help with?
									</Form.Label>
									<Form.Control
										as="textarea"
										name="businessSummary"
										rows={5}
										maxLength={5000}
										onChange={(e) => setSeekerNotes(e.target.value)}
									/>
									{seekerNotesError.length > 0 && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{seekerNotesError?.toString()}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							</>
						)}
						{businesstype === "company" && businessOwner === "yes" && (
							<>
								<button className="btn btn-dark">Continue</button>
							</>
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

export default CustomerBusiness;
