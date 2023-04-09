import { Auth } from "aws-amplify";
import { FC, useEffect, useState } from "react";
import { Button, Col, Row, Modal } from "react-bootstrap";
import { saveWorkExperience } from "../../../../actions/profileActions";

import linkedInIcon from "../../../../assets/images/social-media-linkedin.svg";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { ProfileData } from "../../../../interfaces/models/ProfileData";
import { WorkExperienceData } from "../../../../interfaces/models/WorkExperienceData";
import { ApiResponse } from "../../../../interfaces/reducers/ApiResponse";
import Experience from "./Experience";
import { API_RESPONSE_RESET } from "../../../../actions/types";
import { headerConfig } from "../../../../actions/headers";
import axios from "axios";
import { USER_DATA_API } from "../../../../actions/endPoints";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Props {
  setKey: (arg: string) => void;
  profileData: ProfileData | null;
  fetchData: () => void;
  setCvDataRes: any;
  cvDataRes: any;
  tabKey: string;
  cvDataInForm: boolean;
}

type DateSelectType = {
  label: string;
  value: string;
};

type EmploymentType = {
  label: string;
  value: string;
};

type WorkExp = {
  experienceID?: number | null;
  sortOrderNumber?: number;
  status: number;
  company: string;
  title: string;
  introduction: string;
  startYear: DateSelectType | null;
  startMonth: DateSelectType | null;
  endYear: DateSelectType | null;
  endMonth: DateSelectType | null;
  employmentType: EmploymentType | null;
  currentPosition: boolean;
  displayInContactCard: boolean;
};

const WorkExperience: FC<Props> = (props) => {
  const { setKey, profileData, fetchData, cvDataRes, tabKey, cvDataInForm } =
    props;
  const [workExperiences, setWorkExperiences] = useState<WorkExp[]>([
    {
      experienceID: null,
      status: 1,
      company: "",
      title: "",
      introduction: "",
      sortOrderNumber: 1,
      startYear: null,
      startMonth: null,
      endYear: null,
      endMonth: null,
      employmentType: null,
      currentPosition: false,
      displayInContactCard: false,
    },
  ]);
  const [apierror, setApiError] = useState("");
  const [updated, setUpdated] = useState(0);
  // const [refretchData, setRefretchData] = useState(false);
  const [fetchedDataForCV, setFetchedDataForCV] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentExpId, setCurrentExpId] = useState<any>("");

  const dispatch = useAppDispatch();
  const { success, error, message, switchTab }: ApiResponse = useAppSelector(
    (state) => state.apiResponse
  );

  useEffect(() => {
    if (tabKey === "experience" && !fetchedDataForCV) {
      fetchData();
      setFetchedDataForCV(true);
    }
  }, [tabKey, cvDataInForm, fetchData, fetchedDataForCV]);

  useEffect(() => {
    if (success === true) {
      // if (!refretchData) {
      fetchData();
      dispatch({ type: API_RESPONSE_RESET });
      setKey(switchTab);
    }
    // setRefretchData(true);
    // }
  }, [success, switchTab, setKey, fetchData, dispatch]);

  useEffect(() => {
    if (error === true) setApiError(message);
  }, [error, message]);

  useEffect(() => {
    if (profileData !== null) {
      if (profileData.work_experinces && profileData.work_experinces.length) {
        const savedWorkExperience: WorkExp[] = [];
        profileData.work_experinces.forEach((element: WorkExperienceData) => {
          let startDateArray: any = [];
          if (element.start_date) {
            startDateArray = element.start_date.split("-");
          }
          let endDateArray: any = [];
          if (element.end_date) {
            endDateArray = element.end_date.split("-");
          }

          savedWorkExperience.push({
            experienceID: element.id,
            status: 2,
            company: element.company,
            title: element.title,
            introduction: element.introduction,
            sortOrderNumber: 1,
            startYear: {
              label: startDateArray[0],
              value: startDateArray[0],
            },
            startMonth: {
              label: months[parseInt(startDateArray[1], 10) - 1],
              value: months[parseInt(startDateArray[1], 10) - 1],
            },
            endYear: endDateArray.length
              ? {
                  label: endDateArray[0],
                  value: endDateArray[0],
                }
              : null,
            endMonth: endDateArray.length
              ? {
                  label: months[parseInt(endDateArray[1], 10) - 1],
                  value: months[parseInt(endDateArray[1], 10) - 1],
                }
              : null,
            employmentType: {
              label: element.employment_type,
              value: element.employment_type,
            },
            currentPosition: element.current_position,
            displayInContactCard: element.show_in_contact_card,
          });
        });
        setWorkExperiences(savedWorkExperience);
      }
    }
    console.log("wes 2 :", workExperiences);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  useEffect(() => {
    if (cvDataRes["experience"] && cvDataRes["experience"].length) {
      const savedWorkExperience: WorkExp[] = [];
      cvDataRes["experience"].forEach((element: WorkExperienceData) => {
        savedWorkExperience.push({
          experienceID: element.id,
          status: 2,
          company: element.organization.toLowerCase(),
          title: element.title,
          introduction: element.introduction,
          sortOrderNumber: 1,
          startYear: null,
          startMonth: null,
          endYear: null,
          endMonth: null,
          employmentType: null,
          currentPosition: false,
          displayInContactCard: false,
        });
      });
      setWorkExperiences(savedWorkExperience);
    }
    console.log("wes :", workExperiences);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvDataRes]);

  const addExperience = () => {
    let newOrder = 1;
    const lastElement = workExperiences[workExperiences.length - 1];
    if (lastElement && lastElement.sortOrderNumber) {
      newOrder = lastElement.sortOrderNumber + 1;
    }

    setWorkExperiences([
      ...workExperiences,
      {
        experienceID: null,
        status: 1,
        company: "",
        title: "",
        introduction: "",
        sortOrderNumber: newOrder,
        startYear: null,
        startMonth: null,
        endYear: null,
        endMonth: null,
        employmentType: null,
        currentPosition: false,
        displayInContactCard: false,
      },
    ]);
    console.log(newOrder);
  };

  const removeExperience = (elementId: number) => {
    const newExperiences = [...workExperiences];
    const experience = newExperiences[elementId];
    if (experience.experienceID === null) {
      newExperiences.splice(elementId, 1);
      setWorkExperiences(newExperiences);
      console.log("deleted temp experience.");
    } else if (experience && experience.experienceID) {
      setCurrentExpId(experience.experienceID);
      console.log("exist in the database.");
      console.log(experience.experienceID);
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  //4rivhcrxyg.execute-api.us-east-1.amazonaws.com/dev/WorkExperience'
  const removeExperienceDb = async (id: any) => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const uuid = attributes.sub;

    const body = {
      uuid: uuid,
      workExperience: [
        {
          status: 3,
          experienceID: id,
        },
      ],
    };

    const config: any = await headerConfig();

    axios
      .post(`${USER_DATA_API}/WorkExperience`, body, config)
      .then(() => {
        fetchData();
        console.log("deleted from database. id : ", id);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateWorkExperience = (
    elementId: number,
    elementName:
      | "title"
      | "company"
      | "introduction"
      | "startYear"
      | "startMonth"
      | "endYear"
      | "endMonth"
      | "currentPosition"
      | "displayInContactCard"
      | "employmentType",
    elementVal: string
  ) => {
    if (
      elementName === "startYear" ||
      elementName === "endYear" ||
      elementName === "startMonth" ||
      elementName === "endMonth" ||
      elementName === "employmentType"
    ) {
      const updateExperiences = workExperiences;
      updateExperiences[elementId][elementName] = {
        value: elementVal,
        label: elementVal,
      };
      setWorkExperiences(updateExperiences);
    } else if (elementName === "currentPosition") {
      const updateExperiences = workExperiences;
      if (elementVal === "true") {
        updateExperiences[elementId][elementName] = true;
        updateExperiences[elementId].endYear = null;
        updateExperiences[elementId].endMonth = null;
      } else {
        updateExperiences[elementId][elementName] = false;
        updateExperiences[elementId].displayInContactCard = false;
      }
      setWorkExperiences(updateExperiences);
    } else if (elementName === "displayInContactCard") {
      const updateExperiences = workExperiences;
      updateExperiences.forEach((element) => {
        element.displayInContactCard = false;
      });
      if (elementVal === "true") {
        updateExperiences[elementId][elementName] = true;
      } else {
        updateExperiences[elementId][elementName] = false;
      }
      setWorkExperiences(updateExperiences);
    } else {
      const updateExperiences = workExperiences;
      updateExperiences[elementId][elementName] = elementVal;
      // updateExperiences[elementId][elementName] = elementVal;
      setWorkExperiences(updateExperiences);
    }

    setUpdated(updated + 1);
    console.log(elementId);
  };

  const onExperienceSubmit = async () => {
    let validForm = true;
    let haveCurrentPosition = false;
    let haveShowContact = false;
    let contactCardError = false;
    let showContactCount = 0;
    setApiError("");
    let newArr = workExperiences;

    let removeEmptyElement = false;
    let expCount = 0;
    newArr.forEach((element) => {
      expCount += 1;
      if (
        expCount === newArr.length &&
        element.status === 1 &&
        element.company === "" &&
        element.title === "" &&
        element.startYear === null &&
        element.startMonth === null &&
        element.endYear === null &&
        element.endMonth === null &&
        element.employmentType === null &&
        element.currentPosition === false &&
        element.displayInContactCard === false
      ) {
        removeEmptyElement = true;
      }
    });

    if (workExperiences.length > 1 && removeEmptyElement) {
      newArr = workExperiences.slice(0, -1);
    }
    newArr.forEach((element) => {
      if (element.title === "") validForm = false;
      if (element.company === "") validForm = false;
      if (element.introduction === "") validForm = false;
      if (element.employmentType === null) validForm = false;
      if (element.startYear === null || element.startMonth === null)
        validForm = false;
      if (element.displayInContactCard) {
        haveShowContact = true;
        showContactCount += 1;
      }
      if (element.currentPosition) haveCurrentPosition = true;
      if (!element.endYear || !element.endMonth) {
        if (!element.currentPosition) {
          validForm = false;
        }
      }
    });

    if (haveCurrentPosition && !haveShowContact) {
      contactCardError = true;
      validForm = false;
    }

    if (showContactCount > 1) {
      contactCardError = true;
      validForm = false;
    }

    if (!validForm) {
      if (contactCardError) {
        if (showContactCount > 1) {
          setApiError(
            "Please select only one experience to be displayed in contact card."
          );
        } else {
          setApiError(
            "Please select 'Display this company in my contact card' in an experience that you are currently working on."
          );
        }
      } else {
        setApiError("Please make sure that you have add all data.");
      }
    } else {
      dispatch({ type: API_RESPONSE_RESET });
      const { attributes } = await Auth.currentAuthenticatedUser();
      const formattedExperiences = formatExperiences(newArr);
      const data = {
        uuid: attributes.sub,
        workExperience: formattedExperiences,
      };
      dispatch(saveWorkExperience(data));
    }
  };

  const formatExperiences = (experiences: WorkExp[]) => {
    const updatedExperiences: any = [];
    experiences.forEach((experience: WorkExp) => {
      let startDate = "";
      if (experience.startYear?.value && experience.startMonth?.value) {
        const findMonth = (month: string) =>
          month === experience.startMonth?.value;
        const monthId = months.findIndex(findMonth) + 1;
        startDate = `${experience.startYear.value}-${String(monthId).padStart(
          2,
          "0"
        )}-01`;
      }
      let endDate = null;
      if (experience.endYear?.value && experience.endMonth?.value) {
        const findMonth = (month: string) =>
          month === experience.endMonth?.value;
        const monthId = months.findIndex(findMonth) + 1;
        endDate = `${experience.endYear.value}-${String(monthId).padStart(
          2,
          "0"
        )}-01`;
      }

      updatedExperiences.push({
        experienceID: experience.experienceID ? experience.experienceID : null,
        // sortOrderNumber: experience.sortOrderNumber
        // 	? experience.sortOrderNumber
        // 	: 0,
        status: experience.status,
        company: experience.company,
        title: experience.title,
        introduction: experience.introduction,
        startDate: startDate,
        endDate: endDate,
        employmentType: experience.employmentType
          ? experience.employmentType.value
          : null,
        currentPosition: experience.currentPosition,
        displayInContactCard: experience.displayInContactCard,
      });
    });

    return updatedExperiences;
  };

  const onSkip = () => {
    setKey("interest");
  };

  return (
    <>
      <div className="form-layout">
        <Experience
          workExperiences={workExperiences}
          updateWorkExperience={updateWorkExperience}
          removeExperience={removeExperience}
        />
        <Row>
          <Col>
            <Button variant="outline-light" size="sm" onClick={addExperience}>
              <i className="far fa-plus"></i> Add another
            </Button>
          </Col>
        </Row>
      </div>
      <div className="progress-action">
        <Button variant="dark" size="sm" onClick={onExperienceSubmit}>
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
        <div className="custom-invalid-feedback">
          <i className="fas fa-exclamation-circle" />
          {apierror?.toString()}
        </div>
      )}
      {showModal && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Body>
            <h3>Are you sure?</h3>
            <p>
              You are about to remove a this experience and this action cannot
              be undone. Press cancel to go back.
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                // setCurrentExpId();
                removeExperienceDb(currentExpId);
              }}
            >
              Remove
            </Button>
            <Button
              variant="outline-light"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default WorkExperience;
