import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Container,
  Form,
  Card,
  Row,
  Col,
  Button,
  Modal,
  InputGroup,
  Badge,
} from "react-bootstrap";
import PageTemplate from "../templates/PageTemplate";

import entityCover from "../../assets/images/default_entity_cover.svg";
import "./_create-entity.scss";
import CropEasy from "../../components/organisms/crop/CropEasy";
import axios from "axios";
import { Auth } from "aws-amplify";
import { ENTITY_S3_API } from "../../actions/endPoints";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ENTITY_KEY, MASTER_DATA_KEY } from "../../actions/keys";
import { SAVE_INDUSTRIES } from "../../actions/types";
import { useNavigate } from "react-router-dom";
type FormData = {
  entityName: String;
  ownerUUId: String;
  irsLicense: String;
  urlSlug: String;
  webURL: String;
  focusIndustries: any[];
  category: number;
  tagLine: String;
  acceptTerms: Boolean;
  entityLogo: String;
  entityCoverPhoto: String;
  // optional
  country: null;
  establishDate: null;
  zipCode: null;
};
type BusinessCodes = {
  id: number;
  description: string;
  code: string;
};
type CatCodes = {
  id: number;
  name: string;
};
const CreateEntityServiceSeeker = () => {
  const [ShowEntityLogoModal, setShowEntityLogoModal] = useState(false);
  const [ShowEntityCoverModal, setShowEntityCoverModal] = useState(false);
  const [file, setFile] = useState<File | null>();
  const [covFile, setCovFile] = useState<File | null>();
  const [logoUrl, setLogoUrl] = useState("");
  const [covUrl, setCovUrl] = useState("");
  const [companyName, setCompanyName] = useState(null);
  const [category, setCategory] = useState(null);
  const [tagLine, setTagLine] = useState(null);
  // const [isChecked, setIsChecked] = useState(null);
  const { user } = useSelector((root: any) => root.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [industryList, setIndustryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedBusinessCodes, setSelectedBusinessCode] = React.useState<
    string[]
  >([]);
  const [selectedBusinessCodeIds, setSelectedBusinessCodeIds] = React.useState<
    number[]
  >([]);
  // const [selectedCatCode, setSelectedCatCode] = useState<SavedIndustry | null>(
  //   null
  // );
  const [categoryCode, setCategoryCode] = useState();
  const handleClose = () => {
    setShowEntityLogoModal(false);
    setShowEntityCoverModal(false);
  };
  let temp: File;
  const handleShowEntityLogo = () => setShowEntityLogoModal(true);
  const handleShowEntityCover = () => setShowEntityCoverModal(true);
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data: any) => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const uuid = attributes.sub;
    setCompanyName(data.entityName);
    setCategory(data.category);
    setTagLine(data.tagLine);
    const config = {
      Accept: "application/json",
      "x-api-key": ENTITY_KEY,
    };
    const sample = {
      entityTypeId: user.role_type_id,
      common: {
        ownerUUId: uuid,
        entityName: data.entityName,
        urlSlug: data.urlSlug,
        webURL: data.webURL,
        focusIndustries: selectedBusinessCodeIds,
        categoryID: categoryCode,
        entityLogo: logoUrl,
        entityCoverPhoto: covUrl,
        tagLine: data.tagLine,
        acceptTerms: data.acceptTerms ? 1 : 0,
      },
      serviceProvider: {
        irsLicense: data.irsLicense,
      },
    };
    console.log("sample", sample);
    await axios
      .post(
        "https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/CreateEntity",
        sample,
        {
          headers: config,
        }
      )
      .then((res) => {
        alert(res.data.message);
        if (res.status === 200) {
          navigate("/entity/preview", {
            state: { entityId: res.data.results.entityId },
          });
        }
      })
      .catch((e) => console.log("Error", e));
  });

  const handleFileInput = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleCovFileInput = (e: any) => {
    setCovFile(e.target.files[0]);
  };

  const handleSuccess = (file: File) => {
    console.log("saotehu");
    temp = file;
  };

  const handleCovSuccess = (file: File) => {
    console.log("saotehu");
    temp = file;
  };

  const btnLogoSave = () => {
    handleClose();
    console.log("save");
    uploadLogo(temp);
  };

  const handleCovSave = () => {
    handleClose();
    console.log("save");
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
        console.log("link", res.data.link);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    if (user.role_type_id === 1) {
      alert("This is not support for this account");
      window.location.href = "/entity";
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    const config = {
      Accept: "application/json",
      "x-api-key": MASTER_DATA_KEY,
    };

    await axios
      .post(
        "https://c0kpyvjdm1.execute-api.us-east-1.amazonaws.com/dev/retrieveTableData",
        {
          type: "FOCUS_INDUSTRIES",
        },
        { headers: config }
      )
      .then((res: any) => {
        // console.log("setIndustryList",res.data);
        dispatch({
          type: SAVE_INDUSTRIES,
          payload: res.data.results,
        });
        setIndustryList(res.data.results);
      })
      .catch((error: any) => {
        console.log(error);
      });
    await axios
      .post(
        "https://c0kpyvjdm1.execute-api.us-east-1.amazonaws.com/dev/retrieveTableData",
        {
          type: "ENTITY_ROLE",
        },
        { headers: config }
      )
      .then((res: any) => {
        console.log("ENTITY_ROLE", res.data);
        //setEntityTypeId(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
    await axios
      .post(
        "https://c0kpyvjdm1.execute-api.us-east-1.amazonaws.com/dev/retrieveTableData",
        {
          type: "ENTITY_CATEGORY",
        },
        { headers: config }
      )
      .then((res: any) => {
        console.log("setCategoryList", res.data.results);
        setCategoryList(res.data.results);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  const handleBusinessCodeSelect = (option: any) => {
    setSelectedBusinessCodeIds([...selectedBusinessCodeIds, option.value]);
    setSelectedBusinessCode([...selectedBusinessCodes, option.label]);
  };
  const handleCatCodeSelect = (option: any) => {
    console.log("option", option["value"]);
    let catCode = option["value"];
    setCategoryCode(catCode);
    setCategory(option["label"]);
    console.log("categoryCode", categoryCode);
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
    const filteredBusinesses = selectedBusinessCodes.filter(
      (item) => item !== service
    );
    const filteredBusinessCodeIds = selectedBusinessCodeIds.filter(
      (item) => item !== id
    );
    setSelectedBusinessCode(filteredBusinesses);
    setSelectedBusinessCodeIds(filteredBusinessCodeIds);
  };
  return (
    <PageTemplate>
      <section className="create-entity">
        <Container className="pt-4">
          <Card className="full-page">
            <Card.Body>
              <h1>Create new entity</h1>
              <Row>
                <Col md={"7"}>
                  <form className="create-entity-form" onSubmit={onSubmit}>
                    <Form.Group
                      className="form-group"
                      controlId="entityValues.entityName"
                    >
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        {...register("entityName", {
                          required: true,
                          onChange: (e) => {
                            setCompanyName(e.target.value);
                          },
                        })}
                        className={errors.entityName && "is-invalid"}
                      ></Form.Control>
                      {/* {errors.entityName && "First name is required"} */}
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>IRS license number</Form.Label>
                      <Form.Control
                        {...register("irsLicense", {
                          required: true,
                        })}
                        className={errors.irsLicense && "is-invalid"}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>URL slug</Form.Label>
                      <InputGroup>
                        <InputGroup.Text id="URLslug">
                          taxglobal.ai/entity/
                        </InputGroup.Text>
                        <Form.Control
                          id=""
                          aria-describedby="URLslug"
                          {...register("urlSlug", { required: true })}
                          className={errors.urlSlug && "is-invalid"}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Website</Form.Label>
                      <Form.Control
                        {...register("webURL", { required: true })}
                        className={errors.webURL && "is-invalid"}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Focus industries</Form.Label>
                      {/* <IndustrySelectProps
                        onChange={(e: any) => addIndustries(e)}
                      /> */}
                      <Select
                        options={
                          industryList &&
                          industryList.map((option: BusinessCodes) => ({
                            value: option.id,
                            label: option.description,
                          }))
                        }
                        onChange={(value: any) =>
                          handleBusinessCodeSelect(value)
                        }
                      ></Select>
                      {selectedBusinessCodes.length > 0 ? (
                        <div className="badge-group">
                          {selectedBusinessCodes
                            .filter(function (item, pos) {
                              return (
                                selectedBusinessCodes.indexOf(item) === pos
                              );
                            })
                            .map((service: string, id: number) => {
                              return renderOfferedServices(service, id);
                            })}
                        </div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Category</Form.Label>
                      <Select
                        options={
                          categoryList &&
                          categoryList.map((option: CatCodes) => ({
                            value: option.id,
                            label: option.name,
                          }))
                        }
                        onChange={(value: any) => handleCatCodeSelect(value)}
                      ></Select>
                    </Form.Group>
                    <Row className="">
                      <Col md={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Logo</Form.Label>
                          <Button
                            // className={
                            //   logoUrl === ""
                            //     ? "file-uploader is-invalid"
                            //     : "file-uploader"
                            // }
                            className="file-uploader"
                            onClick={handleShowEntityLogo}
                          >
                            <span className="button">Upload a photo</span>
                            <small>Accepts .jpg, and .png</small>
                          </Button>

                          <Modal
                            show={ShowEntityLogoModal}
                            onHide={handleClose}
                          >
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
                                  <input
                                    className="form-control form-control-lg"
                                    type="file"
                                    accept="image/jpg, image/jpeg, image/png"
                                    {...register("entityLogo", {
                                      required: true,
                                    })}
                                    onChange={handleFileInput}
                                  />
                                )}
                              </Form.Group>
                            </Modal.Body>

                            <Modal.Footer>
                              <Button variant="dark" onClick={btnLogoSave}>
                                Save
                              </Button>

                              <Button
                                variant="outline-light"
                                onClick={handleClose}
                              >
                                Cancel
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Cover photo</Form.Label>
                          <Button
                            onClick={handleShowEntityCover}
                            // className={
                            //   covUrl === ""
                            //     ? "file-uploader is-invalid"
                            //     : "file-uploader"
                            // }
                            className="file-uploader"
                          >
                            <span className="button">Upload a photo</span>
                            <small>Accepts .jpg, and .png</small>
                          </Button>

                          <Modal
                            show={ShowEntityCoverModal}
                            onHide={handleClose}
                          >
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
                                  <input
                                    type="file"
                                    accept="image/jpg, image/jpeg, image/png"
                                    onChange={handleCovFileInput}
                                    className="form-control form-control-lg"
                                  />
                                )}
                              </Form.Group>
                            </Modal.Body>

                            <Modal.Footer>
                              <Button variant="dark" onClick={handleCovSave}>
                                Save
                              </Button>

                              <Button
                                variant="outline-light"
                                onClick={handleClose}
                              >
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
                        {...register("tagLine", {
                          required: true,
                          onChange: (e) => {
                            setTagLine(e.target.value);
                          },
                        })}
                        className={errors.tagLine && "is-invalid"}
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          // className={
                          //   isChecked
                          //     ? "form-check-input"
                          //     : "form-check-input is-invalid"
                          // }
                          className="form-check-input"
                          id="EntityAcknowledgement"
                          {...register("acceptTerms", {
                            required: true,
                            // onChange: (e) => {
                            //   setIsChecked(e.target.checked);
                            // },
                          })}
                        />
                        <label
                          htmlFor="EntityAcknowledgement"
                          className="form-check-label"
                        >
                          I verify that I am an authorized representative of
                          this company and have the right to act on its behalf
                          in the creation and management of this page. The
                          company and I agree to the{" "}
                          <a href="/privacy" target="_blank">
                            terms of Taxglobal
                          </a>
                          .
                        </label>
                      </div>
                    </Form.Group>

                    <div className="form-action">
                      <Button variant="dark" type="submit">
                        Create
                      </Button>
                      <Button variant="outline-light">Cancel</Button>
                    </div>
                  </form>
                </Col>
                <Col md={"5"}>
                  <Form.Label>Preview</Form.Label>
                  <Card className="entity-preview">
                    <div className="cover-image">
                      <img
                        className="cover-img"
                        src={covUrl ? covUrl : entityCover}
                        alt=""
                      />
                      <span className="entity-logo">
                        <img src={logoUrl} alt="" />
                      </span>
                    </div>
                    <Card.Body>
                      <h5>{companyName ? companyName : "Company Name"}</h5>
                      <h6>{category ? category : "Category"}</h6>
                      <p>
                        {tagLine
                          ? tagLine
                          : "Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh."}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </PageTemplate>
  );
};

export default CreateEntityServiceSeeker;
