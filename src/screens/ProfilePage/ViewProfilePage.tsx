import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  ProgressBar,
  Card,
  Row,
  Col,
  Dropdown,
  Tabs,
  Tab,
  Spinner,
  Alert,
} from "react-bootstrap";
import ProfileAvatar from "../../components/organisms/cards/ProfileAvatar";
import CropEasy from "../../components/organisms/crop/CropEasy";
import ProfileEdit from "../../components/organisms/profile/ProfileEdit";
// import ProfileProgress from "../../components/organisms/profile/ProfileProgress";
import PageTemplate from "../templates/PageTemplate";
import linkedInIcon from "../../assets/images/social-media-linkedin.svg";
import chatIcon from "../../assets/images/chat-major.svg";
import coverImageDefault from "../../assets/images/cover_image_default.png";
import axios from "axios";
import IntroductionTab from "../../components/organisms/profile/tabs/IntroductionTab";
import WorkExperience from "../../components/organisms/profile/tabs/WorkExperience";
import { Auth } from "aws-amplify";
import Interests from "../../components/organisms/profile/tabs/Interests";
import { headerConfig } from "../../actions/headers";
import { ProfileData } from "../../interfaces/models/ProfileData";
import { USER_DATA_API, USER_DATA_S3_API } from "../../actions/endPoints";
import { useDispatch } from "react-redux";
import { SET_USER_SUCCESS } from "../../redux/constants";

const ViewProfilePage = (props: any) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [profileFirstName, setProfileFirstName] = useState("");
  const [profileLastName, setProfileLastName] = useState("");

  const [key, setKey] = useState("profile");
  const [showProfModal, setShowProfModal] = useState(false);
  const [showCovModal, setShowCovModal] = useState(false);

  const [profUrl, setProfUrl] = useState("");
  const [profUrlChanged, setProfUrlChanged] = useState(false);
  const [profUrlError, setProfUrlError] = useState("");
  const [profImgError, setProfImgError] = useState("");
  const [covUrl, setCovUrl] = useState(coverImageDefault);
  const [covImageChanged, setCovImageChanged] = useState(false);
  const [covUrlError, setCovUrlError] = useState("");
  const [coverImgError, setCoverImgError] = useState("");

  const dispatch = useDispatch();

  const [file, setFile] = useState<File | null>();
  const [covFile, setCovFile] = useState<File | null>();
  const [cvDataRes, setCvDataRes] = useState<any>({});
  const [cvDataInForm, setCvDataInForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  let temp: File;

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

  const uploadProfImageS3 = async (_img: any) => {
    setUploading(true);
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
        setProfUrlChanged(true);
        setTimeout(() => {
          setUploading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const uploadProfImageDB = async (_img: any) => {
    if (profUrlChanged) {
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
          if (profileData) {
            dispatch({
              type: SET_USER_SUCCESS,
              payload: {
                coverPhoto_url: profileData.coverPhoto_url,
                id: profileData.id,
                profilePhoto_url: profUrl,
                user_email: profileData.user_email,
                user_first_name: profileData.user_first_name,
                user_id: profileData.id,
                user_last_name: profileData.user_last_name,
                user_uuid: profileData.user_uuid,
              },
            });
          }

          setKey("cover");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setProfUrlError("Please upload a new profile image");
    }
  };

  const uploadCovImageS3 = async (_img: any) => {
    setUploading(true);
    const { attributes } = await Auth.currentAuthenticatedUser();
    const uuid = attributes.sub;
    const type = "coverimage";

    const body = new FormData();
    body.append("file", _img.file);

    axios
      .post(`${USER_DATA_S3_API}/coverimage?uuid=${uuid}&type=${type}`, body)
      .then((res) => {
        setCovUrl(res.data.link);
        setCovImageChanged(true);
        setTimeout(() => {
          setUploading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const uploadCovImageDB = async (_img: any) => {
    if (covImageChanged) {
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
          setKey("intro");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCovUrlError("Please upload a new cover image");
    }
  };

  const uploadingCVData = (val: boolean) => {
    setCvDataInForm(val);
  };

  const handleClose = () => {
    setShowProfModal(false);
    setShowCovModal(false);
    setFile(null);
    setCovFile(null);
  };

  const handleProfSave = () => {
    handleClose();
    uploadProfImageS3(temp);
  };

  const handleCovSave = () => {
    handleClose();
    uploadCovImageS3(temp);
  };

  const handleShowProf = () => setShowProfModal(true);
  const handleShowCov = () => setShowCovModal(true);

  const handleFileInput = (e: any) => {
    if (e.target.files[0].size < 3145728) {
      setFile(e.target.files[0]);
    } else {
      setProfImgError("Please upload a image less than 3MB");
    }
  };

  const handleCovFileInput = (e: any) => {
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

  const onSkip = (step: string) => {
    setKey(step);
  };

  if (profileData === null) {
    return <></>;
  }

  let progreess = 0;
  if (profileData.profilePhoto_url !== null) {
    progreess += 20;
  }
  if (profileData.coverPhoto_url !== null) {
    progreess += 20;
  }
  if (profileData.introduction_and_title.company !== null) {
    progreess += 20;
  }
  if (profileData.work_experinces !== null) {
    progreess += 20;
  }
  if (profileData.Interests !== null) {
    progreess += 20;
  }

  return (
    <PageTemplate>
      <div className="profile-edit py-7">
        {/* <ProfileProgress>
          <ProfileAvatar
            imageURL={profUrl || undefined}
            profileName={`Welcome ${profileFirstName}`}
          />
          <div className="step-progress">Step 1/2</div>
          <p>Complete your profile to get most of Taxglobal</p>
          <div className="progress-view">
            <span className="text-mute">Progress ({`${progreess}%`})</span>
            <ProgressBar variant="dark" now={progreess} />
          </div>

          <div className="checkbox-list">
            <Form.Check
              inline
              label="Profile photo"
              name="group1"
              type="checkbox"
              id="profilePhoto"
              checked={profileData.profilePhoto_url === null ? false : true}
              readOnly
            />
            <Form.Check
              inline
              label="Cover photo"
              name="group1"
              type="checkbox"
              id="CoverPhoto"
              checked={profileData.coverPhoto_url === null ? false : true}
              readOnly
            />
            <Form.Check
              inline
              label="Introduction & title"
              name="group1"
              type="checkbox"
              id="IntroductionTitle"
              checked={
                profileData.introduction_and_title.company === null
                  ? false
                  : true
              }
              readOnly
            />
            <Form.Check
              inline
              label="Work experience"
              name="group1"
              type="checkbox"
              id="WordExperience"
              checked={profileData.work_experinces === null ? false : true}
              readOnly
            />
            <Form.Check
              inline
              label="Interests"
              name="group1"
              type="checkbox"
              id="Interests"
              checked={profileData.Interests === null ? false : true}
              readOnly
            />
          </div>
          <div className="progress-action">
            <Button variant="dark">Continue</Button>
            <Button variant="link">Hide for now</Button>
          </div>
        </ProfileProgress> */}

        {/* Profile Edit Tabs */}
        <ProfileEdit>
          <Card.Body>
            <h6>Complete your profile</h6>
            <div className="progress-view">
              <span className="text-mute">Progress ({`${progreess}%`})</span>
              <ProgressBar variant="dark" now={progreess} />
            </div>
          </Card.Body>
          <Card.Img variant="top" src={covUrl} />
          <Row>
            <Col md="8" className="offset-md-2">
              <div className="profile-wrapper">
                <ProfileAvatar
                  profileName={`${profileFirstName} ${profileLastName}`}
                  imageURL={profUrl || undefined}
                />

                <div className="profile-actions">
                  <Button variant="outline-light" size="sm" disabled>
                    <i className="far fa-plus"></i> Connect
                  </Button>
                  <Button variant="outline-light" size="sm" disabled>
                    <img src={chatIcon} alt="" /> Send message
                  </Button>

                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-light"
                      id="dropdown-basic"
                      disabled
                    >
                      <i className="fas fa-caret-down"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        menu item 1
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        menu item 2
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        menu item 3
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </Col>
          </Row>

          <Card.Body>
            <Tabs
              activeKey={key}
              onSelect={(k) => setKey(k || "profile")}
              id="controlled-tab-example"
              className="mb-5"
            >
              <Tab eventKey="profile" title="Profile photo">
                <div>
                  {uploading ? (
                    <div className="file-uploader">
                      <Spinner animation="border" />
                    </div>
                  ) : (
                    <Button className="file-uploader" onClick={handleShowProf}>
                      <span className="button">Upload a photo</span>
                      <small>Accepts .jpg, and .png</small>
                    </Button>
                  )}

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

                      <Button variant="outline-light" onClick={handleClose}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {profUrlError !== "" && (
                    <Alert variant="danger" className="mt-3">
                      <i className="fas fa-exclamation-circle"></i>
                      {profUrlError}
                    </Alert>
                  )}
                  <div className="progress-action">
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={uploadProfImageDB}
                    >
                      Continue
                    </Button>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={() => onSkip("cover")}
                    >
                      Skip
                    </Button>
                    <Button variant="outline-light" size="sm" onClick={() => (window.location.href = "/feed")}>
                      Cancel
                    </Button>
                    <Button
                      variant="outline-light"
                      size="sm"
                      className="ms-auto me-0 import-linkedin"
                      disabled
                    >
                      <img src={linkedInIcon} alt="linkedin" /> Import from
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="cover" title="Cover photo">
                <div>
                  {uploading ? (
                    <div className="file-uploader">
                      <Spinner animation="border" />
                    </div>
                  ) : (
                    <Button className="file-uploader" onClick={handleShowCov}>
                      <span className="button">Upload a photo</span>
                      <small>Accepts .jpg, and .png</small>
                    </Button>
                  )}

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

                        <Button variant="outline-light" onClick={handleClose}>
                          Cancel
                        </Button>
                      </div>
                    </Modal.Footer>
                  </Modal>

                  {covUrlError !== "" && (
                    <Alert variant="danger" className="mt-3">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {covUrlError}
                    </Alert>
                  )}

                  <div className="progress-action">
                    <Button variant="dark" size="sm" onClick={uploadCovImageDB}>
                      Continue
                    </Button>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={() => onSkip("intro")}
                    >
                      Skip
                    </Button>
                    <Button variant="outline-light" size="sm" onClick={() => (window.location.href = "/feed")}>
                      Cancel
                    </Button>
                    <Button
                      variant="outline-light"
                      size="sm"
                      className="ms-auto me-0 import-linkedin"
                      disabled
                    >
                      <img src={linkedInIcon} alt="linkedin" /> Import from
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="intro" title="Introduction & title">
                <IntroductionTab
                  setKey={setKey}
                  profileData={profileData}
                  fetchData={fetchData}
                  setCvDataRes={setProfileData}
                  cvDataRes={cvDataRes}
                  uploadingCVData={uploadingCVData}
                />
              </Tab>
              <Tab eventKey="experience" title="Work experience">
                <WorkExperience
                  setKey={setKey}
                  profileData={profileData}
                  fetchData={fetchData}
                  setCvDataRes={setCvDataRes}
                  cvDataRes={cvDataRes}
                  tabKey={key}
                  cvDataInForm={cvDataInForm}
                />
              </Tab>
              <Tab eventKey="interest" title="Interests">
                <Interests profileData={profileData} />
              </Tab>
            </Tabs>
          </Card.Body>
        </ProfileEdit>
      </div>
    </PageTemplate>
  );
};

export default ViewProfilePage;
