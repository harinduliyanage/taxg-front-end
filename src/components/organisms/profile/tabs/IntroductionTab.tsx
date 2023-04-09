import { Auth } from "aws-amplify";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";

import { userIntro } from "../../../../actions/profileActions";
import { useAppDispatch, useAppSelector } from "../../../../hooks";

import linkedInIcon from "../../../../assets/images/social-media-linkedin.svg";
import { ProfileIntroRequest } from "../../../../interfaces/actions/ProfileIntroRequest";
import { ApiResponse } from "../../../../interfaces/reducers/ApiResponse";
import CropEasy from "../../crop/CropEasy";
import {
  COMPANY_FUNCTION_KEY,
  CV_UPLOAD_APILAYER_KEY,
  INDUSTRY_LIST_KEY,
} from "../../../../actions/keys";
import { ProfileData } from "../../../../interfaces/models/ProfileData";
import ProgressBar from "react-bootstrap/ProgressBar";
import { WorkExperienceData } from "../../../../interfaces/models/WorkExperienceData";
import { API_RESPONSE_RESET } from "../../../../actions/types";
import "./_intro.scss";
interface Props {
  setKey: (arg: string) => void;
  profileData: ProfileData | null;
  fetchData: () => void;
  setCvDataRes: any;
  cvDataRes: any;
  uploadingCVData: (arg: boolean) => void;
}

type BusinessCodes = {
  id: number;
  description: string;
  code: string;
};

type Function = {
  id: number;
  name: string;
};

type SavedFunction = {
  value: number;
  label: string;
};

type SavedIndustry = {
  value: number;
  label: string;
};

const IntroductionTab: FC<Props> = (props) => {
  const [industryList, setIndustryList] = useState([]);
  const [functionList, setFunctionList] = useState([]);
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [selectedBusinessCode, setSelectedBusinessCode] =
    useState<SavedIndustry | null>(null);
  const [selectedFunction, setSelectedFunction] =
    useState<SavedFunction | null>(null);
  const [apierror, setApiError] = useState("");
  const [showCovModal, setShowCovModal] = useState(false);
  const [showCvModal, setShowCvModal] = useState(false);

  const [showPrgogressModal, setShowPrgogressModal] = useState(false);
  const [file] = useState<File | null>();
  const [cvData, setCVData] = useState<File | null>();
  const [tempFile, setTempFile] = useState<File | null>();
  const [refretchData, setRefretchData] = useState(false);
  const [fileS3Url, setFileS3Url] = useState<null>();
  const [unsupportedFile, setUnsupportedFile] = useState<boolean>();
  const [dataFectchedCV, setDataFectchedCV] = useState(false);
  const dispatch = useAppDispatch();
  const { success, error, message, switchTab }: ApiResponse = useAppSelector(
    (state) => state.apiResponse
  );
  const {
    setKey,
    profileData,
    fetchData,
    setCvDataRes,
    cvDataRes,
    uploadingCVData,
  } = props;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (profileData !== null && functionList.length) {
      if (profileData.introduction_and_title) {
        const introData = profileData.introduction_and_title;
        setTitle(introData.title);
        setIntroduction(introData.introduction);

        const functionFound: any = functionList.find(
          (element: Function) => element.id === introData.function_id
        );
        if (functionFound) {
          setSelectedFunction({
            value: functionFound.id,
            label: functionFound.name,
          });
          // setSavedFunction({
          // 	value: functionFound.id,
          // 	label: functionFound.name,
          // });
        }

        const industryFound: any = industryList.find(
          (element: BusinessCodes) => element.id === introData.industry_id
        );

        if (industryFound) {
          setSelectedBusinessCode({
            value: industryFound.id,
            label: industryFound.description,
          });
        }
      }
    }
  }, [profileData, functionList, industryList]);

  useEffect(() => {
    if (success === true) {
      if (!refretchData) {
        fetchData();
        setKey(switchTab);
      }
      setRefretchData(true);
    }
  }, [success, switchTab, setKey, fetchData, refretchData]);
  useEffect(() => {
    if (cvDataRes["experience"]) {
      setTitle(cvDataRes["experience"][0]?.title);
    }
  }, [cvDataRes]);
  useEffect(() => {
    if (error === true) setApiError(message);
  }, [error, message]);

  useEffect(() => {
    async function fetchData() {
      const config = {
        Accept: "application/json",
        "x-api-key": INDUSTRY_LIST_KEY,
      };

      await axios
        .get("https://dvqd9p1ng3.execute-api.us-east-1.amazonaws.com/dev", {
          headers: config,
        })
        .then((res: any) => {
          setIndustryList(res.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    if (industryList.length === 0) {
      fetchData();
    }
  }, [industryList.length]);

  useEffect(() => {
    async function fetchData() {
      const config = {
        Accept: "application/json",
        "x-api-key": COMPANY_FUNCTION_KEY,
      };

      await axios
        .get(
          "https://v9f0u10f88.execute-api.us-east-1.amazonaws.com/companyfunctions",
          {
            headers: config,
          }
        )
        .then((res: any) => {
          setFunctionList(res.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    if (functionList.length === 0) {
      fetchData();
    }
  }, [functionList.length]);

  useEffect(() => {
    async function fetchCVData() {
      const config = {
        apikey: CV_UPLOAD_APILAYER_KEY,
      };

      setShowCvModal(true);
      await axios
        .get(`https://api.apilayer.com/resume_parser/url?url=${fileS3Url}`, {
          headers: config,
        })
        .then(async (res) => {
          console.log("CV Data Res .", res);
          let work: any[] = [];
          res.data["experience"].forEach((element: WorkExperienceData) => {
            work.push({
              company: element.organization.toLowerCase(),
              title: element.title,
            });
          });
          const obj = {
            introduction_and_title: {
              title: res.data["experience"][0]?.title,
              //company: "company1",
            },
            work_experinces: work,
          };
          console.log("obj", obj);
          uploadingCVData(true);
          setCvDataRes(obj);
          setShowCvModal(false);
          setDataFectchedCV(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (fileS3Url && !dataFectchedCV) {
      fetchCVData();
    }
  }, [fileS3Url, dataFectchedCV, setCvDataRes, uploadingCVData]);

  const handleBusinessCodeSelect = (option: any) => {
    setSelectedBusinessCode({
      value: option.value,
      label: option.label,
    });
  };

  const handleFunctionSelect = (option: any) => {
    setSelectedFunction({
      value: option.value,
      label: option.label,
    });
    console.log(option);
  };

  const onIntroSubmit = async () => {
    dispatch({ type: API_RESPONSE_RESET });
    const { attributes } = await Auth.currentAuthenticatedUser();
    const data: ProfileIntroRequest = {
      uuid: attributes.sub,
      company: "Tax Global",
      industry: selectedBusinessCode !== null ? selectedBusinessCode?.value : 0,
      function: selectedFunction !== null ? selectedFunction.value : 0,
      yourTitle: title,
      introduction: introduction,
    };

    dispatch(userIntro(data));
  };

  const handleShowCov = () => setShowCovModal(true);

  const onSkip = () => {
    props.setKey("experience");
  };

  const handleClose = () => {
    setShowCovModal(false);
  };

  const handleSuccess = (file: File) => {
    setTempFile(tempFile);
  };

  const handleFileInput = (e: any) => {
    setUnsupportedFile(false);
    setCVData(e.target.files[0]);
  };

  const handleSave = () => {
    cvUploading(cvData);
  };

  async function cvUploading(cvData: any) {
    const configUpload = {
      onUploadProgress: (progressEvent: any) => {
        let progressVal = progress;
        progressVal = progressEvent.progress * 100;
        console.log(
          "progress)",
          progressEvent.progress,
          "total_",
          progressEvent.total
        );
        setProgress(progressVal);
      },
    };
    const body = new FormData();
    var allowedExtensions = ["doc", "pdf", "docx"];
    body.append("file", cvData);
    const splitedArray = cvData.name.split(".");
    const arrLength = splitedArray.length - 1;
    if (allowedExtensions.includes(splitedArray[arrLength])) {
      handleClose();
      setShowPrgogressModal(true);
      setUnsupportedFile(false);
      await axios
        .post(
          "https://bkd8wkz70f.execute-api.us-east-1.amazonaws.com/dev/file/upload",
          body,
          configUpload
        )
        .then(async (res) => {
          console.log("File Upload Url", res);
          if (res.status === 200) {
            setFileS3Url(res.data.link);
            setShowPrgogressModal(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setUnsupportedFile(true);
    }

    // `https://api.apilayer.com/resume_parser/url?url=${fileS3Url}`,
  }

  const ProgressBarWrapper = () => (
    <Modal show={showPrgogressModal}>
      <Modal.Body>
        <div style={{ textAlign: "center", padding: 10 }}>
          <p>Uploading ...</p>
          <ProgressBar now={progress} label={`${progress}%`} />
        </div>
      </Modal.Body>
    </Modal>
  );
  const CVProcessing = () => (
    <Modal show={showCvModal}>
      <Modal.Body>
        <p style={{ textAlign: "center", paddingTop: 33 }}>Processing..</p>
      </Modal.Body>
    </Modal>
  );
  return (
    <>
      <Modal
        className="cv-modal"
        show={showCovModal}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Set your CV</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!!file ? (
            <CropEasy
              photoURL={URL.createObjectURL(file)}
              onCropSuccess={handleSuccess}
              cropShape="rect"
            />
          ) : (
            <input
              type="file"
              onChange={handleFileInput}
              name="file"
              className="form-control form-control-lg"
              accept="application/pdf,application/msword,
						application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
          )}
          {unsupportedFile && (
            <Alert variant="danger" style={{ marginTop: "20px" }}>
              <p style={{ margin: 0 }}>
                File format isn't supported or file is corrupted. Please retry
                with a .pdf or .docx file.{" "}
              </p>
            </Alert>
          )}
          <p
            style={{ padding: "2.5rem 0 0 0", lineHeight: "1.4rem", margin: 0 }}
          >
            Are you sure you want to retrieve profile data from CV file. This
            will replace existing profile data if available.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="dark" onClick={handleSave}>
            OK
          </Button>

          <Button variant="outline-light" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ProgressBarWrapper />
      <CVProcessing />
      <div className="form-layout">
        <Row>
          <Col>
            <Form.Label>
              Upload your resume to autofil your work experience.
            </Form.Label>
            <Button className="file-uploader" onClick={handleShowCov}>
              <span className="button">Upload resume</span>
              <small>Accepts .pdf, .docx and .doc</small>
            </Button>
          </Col>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Industry</Form.Label>
            <Select
              options={industryList.map((option: BusinessCodes) => ({
                value: option.id,
                label: option.code + " " + option.description,
              }))}
              onChange={(value: any) => handleBusinessCodeSelect(value)}
              value={selectedBusinessCode}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Function</Form.Label>
            <Select
              options={functionList.map((option: Function) => ({
                value: option.id,
                label: option.name,
              }))}
              onChange={(value: any) => handleFunctionSelect(value)}
              value={selectedFunction}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col md="6">
            <Form.Label>Your title</Form.Label>
            <Form.Control
              placeholder=""
              name="title"
              maxLength={64}
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
            />
            <Form.Text className="text-muted">
              Chose a short title that describes you. This will shown next your
              name.
            </Form.Text>
          </Col>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
            <Form.Label>Introduction</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              onChange={(e) => setIntroduction(e.target.value)}
              name="introduction"
              value={introduction || ""}
            />
            <Form.Text className="text-muted">
              Introduce yourself. This will be visible when someone visits your
              profile.
            </Form.Text>
          </Form.Group>
        </Row>
      </div>
      <div className="progress-action">
        <Button
          variant="dark"
          size="sm"
          onClick={onIntroSubmit}
          disabled={
            !title ||
            !introduction ||
            !selectedBusinessCode ||
            !selectedFunction
          }
        >
          Continue
        </Button>
        <Button variant="outline-light" size="sm" onClick={onSkip}>
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
          <img src={linkedInIcon} alt="linkedin" /> Import from LinkedIn
        </Button>
      </div>

      {apierror.length > 0 && (
        <Form.Control.Feedback type="invalid">
          <i className="fas fa-exclamation-circle" />
          {apierror?.toString()}
        </Form.Control.Feedback>
      )}
    </>
  );
};

export default IntroductionTab;
