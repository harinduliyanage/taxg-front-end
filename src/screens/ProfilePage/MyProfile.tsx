import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Modal,
  Tab,
  Tabs,
  Card,
  Form,
} from "react-bootstrap";
import PageTemplate from "../templates/PageTemplate";
import coverImageDefault from "../../assets/images/cover_image_default.png";
import "./_my-profile.scss";
import ProfileAvatar from "../../components/organisms/cards/ProfileAvatar";
import ProfileServices from "../../components/organisms/profile/ProfileServices";
import { Auth } from "aws-amplify";
import axios from "axios";
import { headerConfig } from "../../actions/headers";
import { USER_DATA_API, USER_DATA_S3_API } from "../../actions/endPoints";
import MyProfileCard from "../../components/organisms/myProfile/MyProfileCard";
import ExperienceCard from "../../components/organisms/myProfile/ExperienceCard";
import CertificateCard from "../../components/organisms/myProfile/CertificateCard";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CropEasy from "../../components/organisms/crop/CropEasy";
import { SET_USER_SUCCESS } from "../../redux/constants";

interface IFormInputs {
  firstname: string;
  lastname: string;
  tagline: string;
}

const MyProfile = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [tagLine, setTagLine] = useState<string>("");
  const [validFirstName, setValidFirstName] = React.useState(false);
  const [validLastName, setValidLastName] = React.useState(false);
  const [validTagLine, setValidTagLine] = React.useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profUrl, setProfUrl] = useState("");
  const [covUrl, setCovUrl] = useState(coverImageDefault);
  const [profileFirstName, setProfileFirstName] = useState("");
  const [profileLastName, setProfileLastName] = useState("");
  const [show, setShow] = useState(false);
  const { user } = useSelector((root: any) => root.auth);
  const [file, setFile] = useState<File | null>();
  const [covFile, setCovFile] = useState<File | null>();
  const [showProfModal, setShowProfModal] = useState(false);
  const [showCovModal, setShowCovModal] = useState(false);
  const [hasProfImage, setHasProfImage] = useState(false);
  const [hasCovImage, setHasCovImage] = useState(false);
  const [profImgError, setProfImgError] = useState("");
  const [coverImgError, setCoverImgError] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let temp: File;
  const dispatch = useDispatch();
  // const inputFileRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<IFormInputs>();

  useEffect(() => {
    setFirstName(user.user_first_name);
    setValidFirstName(true);
    setLastName(user.user_last_name);
    setValidLastName(true);
    if (user.tagline) {
      setTagLine(user.tagline);
      setValidTagLine(true);
    }
  }, [user]);

  useEffect(() => {
    if (profileData === null) {
      fetchData();
    }
  }, [profileData]);

  async function fetchData() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const config: any = await headerConfig();

    await axios
      .get(`${USER_DATA_API}/UserProfile/${attributes.sub}`, config)
      .then((res: any) => {
        setProfileData(res.data.results[0][0]);
        setProfUrl(res.data.results[0][0].profilePhoto_url);
        if (res.data.results[0][0].coverPhoto_url !== null) {
          setCovUrl(res.data.results[0][0].coverPhoto_url);
        }
        setProfileFirstName(res.data.results[0][0].user_first_name);
        setProfileLastName(res.data.results[0][0].user_last_name);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getInformation();
  }, []);

  const getInformation = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const config: any = await headerConfig();

    await axios
      .get(`${USER_DATA_API}/UserProfile/${attributes.sub}`, config)
      .then((res: any) => {
        setProfileData(res.data.results[0][0]);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const uploadProfImageS3 = async (_img: any) => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const uuid = attributes.sub;
    const type = "profieimage";

    const body = new FormData();
    body.append("file", _img.file);
    setProfUrl("");
    axios
      .post(`${USER_DATA_S3_API}/profileimage?uuid=${uuid}&type=${type}`, body)
      .then((res) => {
        setProfUrl(res.data.link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadProfImageDB = async (_img: any) => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const uuid = attributes.sub;
    const type = "profileimage";

    const body = new FormData();
    body.append("userProfileImage", profUrl);
    body.append("uuid", uuid);

    const config: any = await headerConfig();

    axios
      .post(
        `${USER_DATA_API}/ProfilePhoto?uuid=${uuid}&type=${type}`,
        body,
        config
      )
      .then((res) => {
        fetchData();
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

    axios
      .post(`${USER_DATA_S3_API}/coverimage?uuid=${uuid}&type=${type}`, body)
      .then((res) => {
        setCovUrl(res.data.link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadCovImageDB = async (_img: any) => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const uuid = attributes.sub;
    const type = "coverimage";

    const body = new FormData();
    body.append("userCoverImage", covUrl);
    body.append("uuid", uuid);

    const config: any = await headerConfig();

    axios
      .post(
        `${USER_DATA_API}/CoverPhoto?uuid=${uuid}&type=${type}`,
        body,
        config
      )
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (profileData === null) {
    return <></>;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleProfModalClose = () => setShowProfModal(false);
  const handleCovModalClose = () => setShowCovModal(false);

  const handleCovSuccess = (file: File) => {
    temp = file;
  };

  const handleCovFileInput = (e: any) => {
    // setCovFile(e.target.files[0]);
    if (e.target.files[0].size < 3145728) {
      setCovFile(e.target.files[0]);
    } else {
      setCoverImgError("Please upload a image less than 3MB");
    }
  };

  const handleCovSave = () => {
    handleCovModalClose();
    uploadCovImageS3(temp);
  };

  const setValidationError = (
    key: "firstname" | "lastname" | "tagline",
    message: string
  ) => {
    setError(key, {
      type: "custom",
      message,
    });
  };

  const handleFirstNameChange = (e: any) => {
    const { value } = e.target;
    setFirstName(value);
    if (value.length > 0 && value.length < 64) {
      clearErrors("firstname");
      setValidFirstName(true);
    } else if (value.length === 0) {
      setValidationError("firstname", "");
      setValidFirstName(false);
    }
  };

  const handleLastNameChange = (e: any) => {
    const { value } = e.target;
    setLastName(value);
    if (value.length > 0 && value.length < 64) {
      clearErrors("lastname");
      setValidLastName(true);
    } else if (value.length === 0) {
      setValidationError("lastname", "");
      setValidLastName(false);
    }
  };

  const handleTagLineChange = (e: any) => {
    const { value } = e.target;
    setTagLine(value);
    if (value.length > 0 && value.length < 200) {
      clearErrors("tagline");
      setValidTagLine(true);
    } else if (value.length === 0) {
      setValidationError("tagline", "");
      setValidTagLine(false);
    }
  };

  const handleFileInput = (e: any) => {
    // setFile(e.target.files[0]);
    if (e.target.files[0].size < 3145728) {
      setFile(e.target.files[0]);
    } else {
      setProfImgError("Please upload a image less than 3MB");
    }
  };

  const handleSuccess = (file: File) => {
    temp = file;
  };

  const handleProfSave = () => {
    handleProfModalClose();
    uploadProfImageS3(temp);
  };

  const submitData = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const config: any = await headerConfig();
    const body = {
      uuid: attributes.sub,
      first_name: firstName,
      last_name: lastName,
      tagline: tagLine,
    };
    await axios
      .post(
        "https://4rivhcrxyg.execute-api.us-east-1.amazonaws.com/dev/PostTagLine",
        body,
        config
      )
      .then((res: any) => {
        dispatch({
          type: SET_USER_SUCCESS,
          payload: {
            // coverPhoto_url: profileData.coverPhoto_url,
            // profilePhoto_url: profUrl,
            user_first_name: firstName,
            tagline: tagLine,
            user_last_name: lastName,
          },
        });
        handleClose();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const saveDataDB = () => {
    new Promise(function (resolve, reject) {
      uploadProfImageDB(file)
        .then(function () {
          return uploadCovImageDB(covFile);
        })
        .then(function () {
          return submitData();
        })
        .then(function () {
          console.log("profile data submitted successfully.");
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  console.log(file);

  return (
    <PageTemplate>
      <Container fluid className="my-profile px-0">
        <div className="profile-cover-image">
          <img src={covUrl} alt="" />
        </div>
        <Container>
          <Row>
            <Col md="8" className="offset-md-2">
              <div className="profile-wrapper">
                <ProfileAvatar
                  imageURL={profUrl || undefined}
                  profileName={`${profileFirstName} ${profileLastName}`}
                  position={user.tagline || ""}
                />
                <div className="profile-actions">
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={handleShow}
                  >
                    <i className="fas fa-pencil" /> Edit
                  </Button>

                  <Modal
                    className="profile-upload"
                    show={showProfModal}
                    onHide={handleClose}
                  >
                    {/* closeButton */}
                    <Modal.Header>
                      <Modal.Title>Set your avatar</Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ height: "500px" }}>
                      {!!file && hasProfImage === false ? (
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
                            onChange={(e: any) => {
                              handleFileInput(e);
                              setHasProfImage(false);
                            }}
                          />
                          {profImgError !== "" && (
                            <div className="text-danger">
                              <i className="fas fa-exclamation-circle"></i>{" "}
                              {profImgError}
                            </div>
                          )}
                        </>
                      )}
                    </Modal.Body>

                    <Modal.Footer>
                      <Button
                        variant="dark"
                        onClick={handleProfSave}
                        disabled={
                          file === null || file === undefined ? true : false
                        }
                      >
                        Save
                      </Button>

                      <Button
                        variant="outline-light"
                        onClick={handleProfModalClose}
                      >
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal
                    show={showCovModal}
                    onHide={handleClose}
                    className="cover-image"
                    size="lg"
                  >
                    {/* closeButton */}
                    <Modal.Header>
                      <Modal.Title>Adjust cover photo</Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ height: "500px" }}>
                      {!!covFile && hasCovImage === false ? (
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
                            onChange={(e: any) => {
                              handleCovFileInput(e);
                              setHasCovImage(false);
                            }}
                            className="form-control form-control-lg"
                          />
                        </>
                      )}
                    </Modal.Body>

                    <Modal.Footer>
                      {coverImgError !== "" && (
                        <div className="text-danger w-100">
                          <i className="fas fa-exclamation-circle"></i>
                          {coverImgError}
                        </div>
                      )}

                      <div className="d-flex gap-2">
                        <Button
                          variant="dark"
                          onClick={handleCovSave}
                          disabled={
                            covFile === null || covFile === undefined
                              ? true
                              : false
                          }
                        >
                          Save
                        </Button>

                        <Button
                          variant="outline-light"
                          onClick={handleCovModalClose}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Modal.Footer>
                  </Modal>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    size="lg"
                    className="edit-profile-info"
                  >
                    <Modal.Body>
                      <form id="editProfile">
                        <div className="form-layout">
                          <Modal.Title>Profile</Modal.Title>
                          <Row className="g-3">
                            <Col md={3}>
                              <Form.Group className="form-group">
                                <Form.Label>Profile photo</Form.Label>
                                {user.profilePhoto_url ? (
                                  <Button
                                    className="file-uploader has-image"
                                    style={{
                                      backgroundImage: `url(${profUrl})`,
                                    }}
                                    onClick={() => {
                                      setShowProfModal(true);
                                      setHasProfImage(true);
                                    }}
                                  >
                                    <span className="button">Change</span>
                                  </Button>
                                ) : (
                                  <Button
                                    className="file-uploader"
                                    onClick={() => {
                                      setShowProfModal(true);
                                    }}
                                  >
                                    <span className="button">
                                      Upload a photo
                                    </span>
                                    <small>Accepts .jpg, and .png</small>
                                  </Button>
                                )}
                              </Form.Group>
                            </Col>
                            <Col md={9}>
                              <Form.Group className="form-group">
                                <Form.Label>Cover photo</Form.Label>
                                {user.coverPhoto_url ? (
                                  <Button
                                    className="file-uploader has-image"
                                    style={{
                                      backgroundImage: `url(${covUrl})`,
                                    }}
                                    onClick={() => {
                                      setShowCovModal(true);
                                      setHasCovImage(true);
                                    }}
                                  >
                                    <span className="button">Change</span>
                                  </Button>
                                ) : (
                                  <Button
                                    className="file-uploader"
                                    onClick={() => {
                                      setShowCovModal(true);
                                    }}
                                  >
                                    <span className="button">
                                      Upload a photo
                                    </span>
                                    <small>Accepts .jpg, and .png</small>
                                  </Button>
                                )}
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="g-3">
                            <Col>
                              <Form.Group className="form-group">
                                <Form.Label>First name</Form.Label>
                                <input
                                  maxLength={64}
                                  type="text"
                                  {...register("firstname", {
                                    required: true,
                                    onChange: handleFirstNameChange,
                                  })}
                                  className={
                                    errors.firstname
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  value={firstName}
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group className="form-group">
                                <Form.Label>Last name</Form.Label>
                                <input
                                  maxLength={64}
                                  type="text"
                                  {...register("lastname", {
                                    required: true,
                                    onChange: handleLastNameChange,
                                  })}
                                  className={
                                    errors.lastname
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  value={lastName}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Group className="form-group">
                            <Form.Label>Tagline/title</Form.Label>
                            <input
                              maxLength={200}
                              type="text"
                              {...register("tagline", {
                                required: true,
                                onChange: handleTagLineChange,
                              })}
                              className={
                                errors.tagline
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              value={tagLine}
                            />
                          </Form.Group>
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="dark"
                        disabled={
                          !validFirstName || !validLastName || !validTagLine
                        }
                        onClick={saveDataDB}
                      >
                        Save Changes
                      </Button>
                      <Button variant="outline-light" onClick={handleClose}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className="tab-view-container">
        <Row>
          <Col md="8" className="offset-md-2">
            <Tabs
              defaultActiveKey="profileInfo"
              id="profile-tabs"
              className="mb-5"
            >
              <Tab eventKey="profileInfo" title="Information">
                <MyProfileCard
                  profileData={profileData}
                  getInformation={getInformation}
                />
                <ExperienceCard
                  profileData={profileData}
                  getInformation={getInformation}
                />
                <CertificateCard
                  profileData={profileData}
                  getInformation={getInformation}
                />
              </Tab>
              <Tab eventKey="profileServices" title="Services">
                <Card className="profile-card">
                  <Card.Body>
                    <ProfileServices />
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};

export default MyProfile;
