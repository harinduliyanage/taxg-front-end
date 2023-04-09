import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { ENTITY_KEY } from "../../../actions/keys";
import { EntityData } from "../../../interfaces/models/entity/EntityData";
import { Auth } from "aws-amplify";
import CropEasy from "../../../components/organisms/crop/CropEasy";
import { ENTITY_S3_API } from "../../../actions/endPoints";
import { useForm, SubmitHandler } from "react-hook-form";
import "../../../screens/registerpage/_MoreStep.scss";
interface Props {
  entityData?: EntityData;
  industryList?: any;
  //selectedIndustry?: any[];
  categoryList?: any[];
  render?: boolean;
  countryList?: any[];
  entityId?: number;
  setRerender?: any;
}

type BusinessCodes = {
  id: number;
  description: string;
  code: string;
};
type FormData = {
  entityName: any;
  ownerUUId: any;
  irsLicense: any;
  urlSlug: any;
  webURL: any;
  focusIndustries: any[];
  category: number;
  tagLine: any;
  acceptTerms: Boolean;
  entityLogo: String;
  entityCoverPhoto: String;
  companyDescription: any;
  phoneNumber: any;
  numberOfClients: any;
  teamSize: any;
  // optional
  country: null;
  establishDate: any;
  zipcode: any;
  city: any;
  state: any;
};

// type SelectedCountry = {
//   id : number;
//   name : string
// }
const EditDetails: React.FC<Props> = (props) => {
  const {
    entityData,
    industryList,
    //
    render,
    categoryList,
    countryList,
    entityId,
    setRerender,
  } = props;
  const [file, setFile] = useState<File | null>();
  const [covFile, setCovFile] = useState<File | null>();
  const [logoUrl, setLogoUrl] = useState("");
  const [covUrl, setCovUrl] = useState("");
  const [ShowEntityLogoModal, setShowEntityLogoModal] = useState(false);
  const [ShowEntityCoverModal, setShowEntityCoverModal] = useState(false);
  const [logoImageUpdate, setLogoImageUpdate] = useState(false);
  const [coverImageUpdate, setCoverImageUpdate] = useState(false);
  const [postCodeError, setPostCodeError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEnableZipCode, setEnableZipCode] = useState(false);
  const [isDisableZipCode, setDisableZipCode] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [validZipCode, setValidZipCode] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [show, setShow] = useState(true);
  const [selectedBusinessCodes, setSelectedBusinessCode] = React.useState<
    string[]
  >([]);
  const [selectedBusinessCodeIds, setSelectedBusinessCodeIds] = React.useState<
    number[]
  >([]);
  const handleClose = () => {
    setShowEntityLogoModal(false);
    setShowEntityCoverModal(false);
    setFile(null);
    setCovFile(null);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm<FormData>();
  let temp: File;
  const handleShowEntityLogo = () => setShowEntityLogoModal(true);
  const handleShowEntityCover = () => setShowEntityCoverModal(true);
  const [profImgError, setProfImgError] = useState("");
  const [coverImgError, setCoverImgError] = useState("");
  const [selectedIndustry] = React.useState<any[]>([]);
  const [countryErrors, setCountryErrors] = useState<any>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [category, setCategory] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categoryCode, setCategoryCode] = useState();

  const [selectedCountry, setSelectedCuntry] = useState({
    id: "",
    country_name: "",
  });
  const [selectedCat, setSelectedCat] = useState({
    id: "",
    name: "",
  });
  useEffect(() => {
    selectedIndustry.length = 0;
    getSelectedCategory();
    getSelectedCountry();
    setEnableZipCode(false);
    setDisableZipCode(true);
    setValuesForEntity();
    selectedIndustries();
    selectedIndustries2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render, entityData?.commonEntityDetails.focusIndustries.length]);

  useEffect(() => {
    selectedIndustry.length = 0;
    selectedIndustries();
    selectedIndustries2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityData?.commonEntityDetails.focusIndustries.length]);

  const setValuesForEntity = () => {
    setValue("entityName", entityData?.commonEntityDetails?.entityName);
    setValue("irsLicense", entityData?.serviceProviderEntityDetails.irsLicense);
    setValue("urlSlug", entityData?.commonEntityDetails.urlSlug);
    setValue("webURL", entityData?.commonEntityDetails.webURL);
    setValue("tagLine", entityData?.commonEntityDetails.tagLine);
    setValue(
      "establishDate",
      entityData?.serviceProviderEntityDetails.establishDate
    );
    setValue(
      "companyDescription",
      entityData?.commonEntityDetails.companyDescription
    );
    setValue("zipcode", entityData?.commonEntityDetails.zipCode);
    setValue("city", entityData?.commonEntityDetails.city);
    setValue("state", entityData?.commonEntityDetails.state);
    setValue("phoneNumber", entityData?.commonEntityDetails.phoneNumber);
    setValue(
      "numberOfClients",
      entityData?.serviceProviderEntityDetails.numberOfClients
    );
    setValue("teamSize", entityData?.serviceProviderEntityDetails.teamSize);
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

  const removeService = (service: string, id: number) => {
    selectedIndustry.length = 0;
    let uniqueID = selectedBusinessCodeIds.filter((c, index) => {
      return selectedBusinessCodeIds.indexOf(c) === index;
    });
    let uniqueName = selectedBusinessCodes.filter((c, index) => {
      return selectedBusinessCodes.indexOf(c) === index;
    });
    uniqueID.splice(id, 1);
    uniqueName.splice(id, 1);
    setSelectedBusinessCodeIds(uniqueID);
    setSelectedBusinessCode(uniqueName);
  };
  const handleBusinessCodeSelect = (option: any) => {
    const foundId = selectedBusinessCodeIds.includes(option.value);
    const foundName = selectedBusinessCodes.includes(option.label);
    if (!foundId && !foundName) {
      setSelectedBusinessCodeIds([...selectedBusinessCodeIds, option.value]);
      setSelectedBusinessCode([...selectedBusinessCodes, option.label]);
    }
  };
  const selectedIndustries = () => {
    industryList.forEach((val: any, key: any) => {
      let isIncluded = entityData?.commonEntityDetails.focusIndustries.includes(
        val.id
      );
      if (isIncluded) {
        selectedIndustry.push({ id: val.id, name: val.description });
      }
    });
  };
  const selectedIndustries2 = () => {
    selectedBusinessCodeIds.length = 0;
    selectedBusinessCodes.length = 0;
    let filteredArr: any[] = [];
    filteredArr = selectedIndustry?.reduce((acc, current) => {
      const x = acc.find((item: any) => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    filteredArr?.forEach((e: any, key: any) => {
      selectedBusinessCodeIds.push(e.id);
      selectedBusinessCodes.push(e.name);
    });
  };

  /**Image Upload Functions */
  const handleFileInput = (e: any) => {
    // setFile(e.target.files[0]);
    if (e.target.files[0].size < 3145728) {
      setFile(e.target.files[0]);
    } else {
      setProfImgError("Please upload a image less than 3MB");
    }
  };

  const handleCovFileInput = (e: any) => {
    // setCovFile(e.target.files[0]);
    if (e.target.files[0].size < 3145728) {
      setCovFile(e.target.files[0]);
    } else {
      setCoverImgError("Please upload a image less than 3MB");
    }
  };

  const handleSuccess = (file: File) => {
    temp = file;
  };

  const handleCovSuccess = (file: File) => {
    temp = file;
  };

  const btnLogoSave = () => {
    handleClose();
    uploadLogo(temp);
  };

  const handleCovSave = () => {
    handleClose();
    uploadCovImageS3(temp);
  };

  const uploadLogo = async (_img: any) => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const uuid = attributes.sub;
    const type = "profieimage";
    const body = new FormData();
    body.append("file", _img.file);
    setLogoUrl("");
    await axios
      .post(`${ENTITY_S3_API}/EntityLogo?uuid=${uuid}&type=${type}`, body)
      .then((res) => {
        setLogoUrl(res.data.link);
        setLogoImageUpdate(true);
        console.log("link", res.data.link);
        setFile(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadCovImageS3 = async (_img: any) => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const uuid = attributes.sub;
    const type = "coverimage";

    const body = new FormData();
    body.append("file", _img.file);

    await axios
      .post(`${ENTITY_S3_API}/EntityCover?uuid=${uuid}&type=${type}`, body)
      .then((res) => {
        setCovUrl(res.data.link);
        setCoverImageUpdate(true);
        setCovFile(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    const config = {
      Accept: "application/json",
      "x-api-key": ENTITY_KEY,
    };
    const addressArray = address.split(",");
    let city = data.city;
    let state = data.state;
    let zip = data.zip;
    let selectedBusinessCodeIds_uniq = selectedBusinessCodeIds.filter(
      (c, index) => {
        return selectedBusinessCodeIds.indexOf(c) === index;
      }
    );
    if (addressArray.length > 1) {
      city = addressArray[0].trim();
      state = addressArray[1].trim();
      zip = addressArray[2].trim();
    }
    //let selectedBusinessCodeIdsUniq = new Set(selectedBusinessCodeIds)
    const sample = {
      entityId: entityId,
      common: {
        entityName: data.entityName,
        urlSlug: data.urlSlug,
        webURL: data.webURL,
        focusIndustries: selectedBusinessCodeIds_uniq,
        categoryID: selectedCat.id,
        entityLogo: logoImageUpdate
          ? logoUrl
          : entityData?.commonEntityDetails.entityLogo,
        entityCoverPhoto: coverImageUpdate
          ? covUrl
          : entityData?.commonEntityDetails.entityCoverPhoto,
        tagLine: data.tagLine,
        acceptTerms: 1,
        companyDescription: data.companyDescription,
        countryID: selectedCountry.id,
        zipCode: isEnableZipCode ? zip : data.zipcode,
        city: city,
        state: state,
        phoneNumber: data.phoneNumber,
      },
      serviceProvider: {
        irsLicense: data.irsLicense,
        establishDate: data.establishDate,
        numberOfClients: data.numberOfClients,
        teamSize: data.teamSize,
      },
    };
    if (!countryErrors) {
      await axios
        .put(
          "https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityDetails",
          sample,
          {
            headers: config,
          }
        )
        .then((res) => {
          alert(res.data.message);
          if (res.data.statusCode === 200) {
            setSelectedBusinessCodeIds([]);
            setSelectedBusinessCode([]);
            selectedIndustry.length = 0;
            setRerender(false);
          }
          //setRerender(false);
        })
        .catch((e) => console.log("Error", e));
    }
  };

  const getSelectedCategory = () => {
    setSelectedCat(
      categoryList?.find(
        (e: any) => e.id === entityData?.commonEntityDetails.categoryID
      )
    );
  };

  const getSelectedCountry = () => {
    setSelectedCuntry(
      countryList?.find(
        (e: any) => e.id === entityData?.commonEntityDetails.country
      )
    );
  };

  const handleCatCodeSelect = (option: any) => {
    let catCode = option["value"];
    setCategoryCode(catCode);
    setCategory(option["label"]);
    setSelectedCat({
      id: option["value"],
      name: option["label"],
    });
  };

  const handleCountrySelect = (option: any) => {
    if (option["value"]) {
      setDisableZipCode(false);
    } else {
      setDisableZipCode(true);
    }
    if (option["value"] === 232) {
      setEnableZipCode(true);
    } else {
      setEnableZipCode(false);
      reset({
        city: "",
        state: "",
        zipcode: "",
      });
    }
    setCountryErrors(false);
    setSelectedCuntry({
      id: option["value"],
      country_name: option["label"],
    });
  };

  const handleZipCodeChange = async (e: any) => {
    const { value } = e.target;
    setAddress("");
    if (
      value.length === 5 &&
      selectedCountry.country_name === "United States"
    ) {
      clearErrors("zipcode");
      setValidZipCode(true);
      await axios
        .get(
          "https://app.zipcodebase.com/api/v1/search?apikey=df6e73b0-8aca-11ed-ab54-6f335d91f733&codes=" +
            value +
            "&country=US"
        )
        .then((res: any) => {
          console.log("___", res.data.results.length);

          if (res.data.results.length !== 0) {
            const addressData = res.data.results[value][0];
            const location =
              addressData.city + ", " + addressData.state + ", " + value;
            setAddress(location);
            console.log("___Cool");
            setPostCodeError(false);
          } else {
            setPostCodeError(true);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      setAddress("");
    }
  };
  const onError = (error: any) => {
    if (selectedCountry?.id === undefined) {
      setCountryErrors(true);
    } else {
      setCountryErrors(false);
    }
    console.log(error);
  };
  return (
    <form
      className="create-entity-form"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <Row>
        <Col md={"6"} className="form-col">
          <Form.Group className="form-group">
            <Form.Label>Name</Form.Label>
            <Form.Control
              //defaultValue={entityData?.commonEntityDetails.entityName}
              {...register("entityName", {
                required: true,
              })}
              onChange={(e) => e.target.value}
              className={errors.entityName && "is-invalid"}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>IRS license number</Form.Label>
            <Form.Control
              defaultValue={entityData?.serviceProviderEntityDetails.irsLicense}
              {...register("irsLicense", {
                required: true,
              })}
              onChange={(e) => e.target.value}
              className={errors.irsLicense && "is-invalid"}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>URL slug</Form.Label>
            <InputGroup className="entity-url">
              <Form.Control
                id=""
                aria-describedby="URLslug"
                defaultValue={entityData?.commonEntityDetails.urlSlug}
                {...register("urlSlug", {
                  required: true,
                })}
                onChange={(e) => e.target.value}
                className={errors.urlSlug && "is-invalid"}
              />
              <i className="fas fa-question-circle"></i>
            </InputGroup>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Website</Form.Label>
            <Form.Control
              defaultValue={entityData?.commonEntityDetails.webURL}
              {...register("webURL", {
                required: true,
              })}
              className={errors.webURL && "is-invalid"}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Category</Form.Label>
            <Select
              value={{
                value: selectedCat?.id,
                label: selectedCat?.name,
              }}
              options={
                categoryList &&
                categoryList.map((option) => ({
                  value: option.id,
                  label: option.name,
                }))
              }
              onChange={(value: any) => handleCatCodeSelect(value)}
            />
          </Form.Group>
          <Row className="g-2">
            <Col md={4}>
              <Form.Group className="form-group">
                <Form.Label>Logo</Form.Label>
                <Button
                  className="file-uploader"
                  onClick={handleShowEntityLogo}
                  style={{
                    backgroundImage: logoImageUpdate
                      ? `url(${logoUrl})`
                      : `url(${entityData?.commonEntityDetails.entityLogo})`,
                  }}
                  //style={{ backgroundImage:`url("https://picsum.photos/200/300")`}}
                >
                  <span className="button">Change</span>
                </Button>

                <Modal show={ShowEntityLogoModal} onHide={handleClose}>
                  {/* closeButton */}
                  <Modal.Header>
                    <Modal.Title>Logo</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Select your logo</Form.Label>
                      {!!file ? (
                        <CropEasy
                          file={file}
                          photoURL={URL.createObjectURL(file)}
                          onCropSuccess={handleSuccess}
                          cropShape="round"
                        />
                      ) : (
                        <>
                          <input
                            className="form-control form-control-lg"
                            type="file"
                            accept="image/jpg, image/jpeg, image/png"
                            // {...register("entityLogo", {
                            //   required: true,
                            // })}
                            onChange={handleFileInput}
                          />
                          {profImgError !== "" && (
                            <div className="text-danger">
                              <i className="fas fa-exclamation-circle"></i>{" "}
                              {profImgError}
                            </div>
                          )}
                        </>
                      )}
                    </Form.Group>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button
                      variant="dark"
                      onClick={btnLogoSave}
                      disabled={
                        file === null || file === undefined ? true : false
                      }
                    >
                      Save
                    </Button>

                    <Button variant="outline-light" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group className="form-group">
                <Form.Label>Cover photo</Form.Label>
                <Button
                  className="file-uploader"
                  onClick={handleShowEntityCover}
                  style={{
                    backgroundImage: coverImageUpdate
                      ? `url(${covUrl})`
                      : `url(${entityData?.commonEntityDetails.entityCoverPhoto})`,
                  }}
                >
                  <span className="button">Change</span>
                </Button>

                <Modal show={ShowEntityCoverModal} onHide={handleClose}>
                  {/* closeButton */}
                  <Modal.Header>
                    <Modal.Title>Cover photo</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Select your cover photo</Form.Label>
                      {!!covFile ? (
                        <CropEasy
                          file={covFile}
                          photoURL={URL.createObjectURL(covFile)}
                          onCropSuccess={handleCovSuccess}
                          cropShape="rect"
                        />
                      ) : (
                        <>
                          <input
                            type="file"
                            accept="image/jpg, image/jpeg, image/png"
                            onChange={handleCovFileInput}
                            className="form-control form-control-lg"
                          />
                          {coverImgError !== "" && (
                            <div className="text-danger">
                              <i className="fas fa-exclamation-circle"></i>
                              {coverImgError}
                            </div>
                          )}
                        </>
                      )}
                    </Form.Group>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button
                      variant="dark"
                      onClick={handleCovSave}
                      disabled={
                        covFile === null || covFile === undefined ? true : false
                      }
                    >
                      Save
                    </Button>

                    <Button variant="outline-light" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="form-group">
            <Form.Label>Tagline</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              defaultValue={entityData?.commonEntityDetails.tagLine}
              {...register("tagLine", {
                required: true,
              })}
              className={errors.tagLine && "is-invalid"}
            />
          </Form.Group>
        </Col>
        <Col md={"6"} className="form-col">
          <Form.Group className="form-group">
            <Form.Label>Date of establishment</Form.Label>
            <Form.Control
              type="date"
              defaultValue={
                entityData?.serviceProviderEntityDetails.establishDate
              }
              {...register("establishDate", {
                required: true,
              })}
              className={errors.establishDate && "is-invalid"}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Focus industries</Form.Label>
            <Select
              options={
                industryList &&
                industryList.map((option: BusinessCodes) => ({
                  value: option.id,
                  label: `${option.code} ${option.description}`,
                }))
              }
              onChange={(value: any) => handleBusinessCodeSelect(value)}
            ></Select>
            {selectedBusinessCodes.length > 0 ? (
              <div className="badge-group">
                {selectedBusinessCodes
                  .filter(function (item, pos) {
                    return selectedBusinessCodes.indexOf(item) === pos;
                  })
                  .map((service: string, id: number) => {
                    return renderOfferedServices(service, id);
                  })}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Company description</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              defaultValue={entityData?.commonEntityDetails.companyDescription}
              {...register("companyDescription", {
                required: true,
              })}
              className={errors.companyDescription && "is-invalid"}
            />
          </Form.Group>
          <Row className="g-2">
            <Col md={6}>
              <Form.Group className="form-group">
                <Form.Label>Country</Form.Label>
                <Select
                  value={{
                    value: selectedCountry?.id,
                    label: selectedCountry?.country_name,
                  }}
                  onChange={(value: any) => handleCountrySelect(value)}
                  options={
                    countryList &&
                    countryList.map((e: any) => ({
                      value: e.id,
                      label: e.country_name,
                    }))
                  }
                  className={countryErrors && "is-invalid"}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group">
                <Form.Label>ZIP / Postal Code</Form.Label>
                <input
                  disabled={isDisableZipCode}
                  maxLength={64}
                  defaultValue={entityData?.commonEntityDetails.zipCode}
                  type="text"
                  {...register("zipcode", {
                    required: true,
                    onChange: handleZipCodeChange,
                  })}
                  className={
                    errors.zipcode || postCodeError
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {postCodeError && (
                  <p style={{ color: "red", padding: "10px 0", margin: 0 }}>
                    Invalid Post Code
                  </p>
                )}
              </Form.Group>
            </Col>
            {address && isEnableZipCode ? (
              <Col md="12">
                <Alert variant="info-light" show={show} className="mb-0 mt-0">
                  <i className="fas fa-info-circle"></i> {address}
                  <Button
                    onClick={() => setShow(false)}
                    variant="outline-success"
                    className="close-icon"
                  >
                    <i className="fal fa-times"></i>
                  </Button>
                </Alert>
              </Col>
            ) : null}
          </Row>
          {!isEnableZipCode && (
            <>
              <Row className="g-2">
                <Col md={6}>
                  <Form.Group className="form-group">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      defaultValue={entityData?.commonEntityDetails.city}
                      {...register("city", {
                        required: true,
                      })}
                      onChange={(e) => e.target.value}
                      className={errors.city && "is-invalid"}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="form-group">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      defaultValue={entityData?.commonEntityDetails.state}
                      {...register("state", {
                        required: true,
                      })}
                      onChange={(e) => e.target.value}
                      className={errors.state && "is-invalid"}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          <Form.Group className="form-group">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              defaultValue={entityData?.commonEntityDetails.phoneNumber}
              {...register("phoneNumber", {
                required: true,
              })}
              className={errors.phoneNumber && "is-invalid"}
            />
          </Form.Group>
          <Row className="g-2">
            <Col md={6}>
              <Form.Group className="form-group">
                <Form.Label>Number of clients</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    entityData?.serviceProviderEntityDetails.numberOfClients
                  }
                  {...register("numberOfClients", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className={errors.numberOfClients && "is-invalid"}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group">
                <Form.Label>Team size</Form.Label>
                {/* <Select
                  options={CategoryOptions}
                  defaultValue={CategoryOptions[0]}
                /> */}
                <Form.Control
                  type="number"
                  defaultValue={
                    entityData?.serviceProviderEntityDetails.teamSize
                  }
                  {...register("teamSize", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className={errors.teamSize && "is-invalid"}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col md={"12"}>
          <div className="form-action">
            <Button variant="dark" type="submit">
              Save changes
            </Button>
            {/* <input type="button" value="ss"  onClick={() => onSubmit()}/> */}
            <Button variant="outline-light" onClick={() => setIsOpen(true)}>
              Cancel
            </Button>
          </div>
        </Col>
      </Row>
      <Modal
        show={isOpen}
        //onHide={isOpen}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Body>
          <div className="form-layout">
            <h3>Are you sure?</h3>
            <p>Changes will be discarded</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark error" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button variant="outline-light" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default EditDetails;
