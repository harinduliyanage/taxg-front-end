import { FC, useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import Select from "react-select";
interface Props {
  workExperiences: WorkExp[];
  removeExperience: (elementId: number) => void; // elementId: number
  updateWorkExperience: (
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
  ) => void;
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

const Experience: FC<Props> = (props) => {
  const [userWorkExperiences, setUserWorkExperiences] = useState<WorkExp[]>([]);
  const { workExperiences, updateWorkExperience, removeExperience } = props;
  const year = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => year - index);
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
  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Self-employed",
    "Freelance",
    "Contract",
    "Internship",
    "Apprenticeship",
    "Seasonal",
  ];
  let result: any = [];

  const setValue = (
    id: number,
    name:
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
    value: string
  ) => {
    updateWorkExperience(id, name, value);
  };

  useEffect(() => {
    setUserWorkExperiences(workExperiences);
  }, [workExperiences]);

  userWorkExperiences.forEach((element: WorkExp, id) => {
    result.push(
      <div className="experience-list-item" key={id}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Company</Form.Label>
            <Form.Control
              placeholder=""
              name={`company-${id}`}
              id={`company-${id}`}
              onChange={(e) => setValue(id, "company", e.target.value)}
              value={element.company || ""}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder=""
              name="title"
              id={`title-${id}`}
              onChange={(e) => setValue(id, "title", e.target.value)}
              value={element.title}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Label>Duration</Form.Label>
          <Col>
            <Row className="g-2">
              <Form.Group as={Col}>
                <Select
                  name={`startYear-${id}`}
                  options={years.map((option: any) => ({
                    value: option,
                    label: option,
                  }))}
                  onChange={(e: any) => setValue(id, "startYear", e.value)}
                  value={
                    element.startYear
                      ? {
                          value: element ? element.startYear?.value : "",
                          label: element ? element.startYear?.label : "",
                        }
                      : null
                  }
                  placeholder="Start year"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Select
                  name={`startMonth-${id}`}
                  options={months.map((option: any) => ({
                    value: option,
                    label: option,
                  }))}
                  onChange={(e: any) => setValue(id, "startMonth", e.value)}
                  value={
                    element.startMonth
                      ? {
                          value: element ? element.startMonth?.value : "",
                          label: element ? element.startMonth?.label : "",
                        }
                      : null
                  }
                  placeholder="Month"
                />
              </Form.Group>
            </Row>
          </Col>
          <Col>
            <Row className="g-2">
              <Form.Group as={Col}>
                <Select
                  name={`endYear-${id}`}
                  options={years.map((option: any) => ({
                    value: option,
                    label: option,
                  }))}
                  onChange={(e: any) => setValue(id, "endYear", e.value)}
                  value={
                    element.endYear
                      ? {
                          value: element ? element.endYear?.value : "",
                          label: element ? element.endYear?.label : "",
                        }
                      : null
                  }
                  placeholder="End year"
                  isDisabled={element.currentPosition}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Select
                  name={`endMonth-${id}`}
                  options={months.map((option: any) => ({
                    value: option,
                    label: option,
                  }))}
                  onChange={(e: any) => setValue(id, "endMonth", e.value)}
                  value={
                    element.endMonth
                      ? {
                          value: element ? element.endMonth?.value : "",
                          label: element ? element.endMonth?.label : "",
                        }
                      : null
                  }
                  placeholder="Month"
                  isDisabled={element.currentPosition}
                />
              </Form.Group>
            </Row>
          </Col>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Form.Check
              inline
              type="checkbox"
              id={`currentPosition-${id}`}
              name={`currentPosition-${id}`}
              label="This is my current position"
              onChange={(e: any) =>
                setValue(id, "currentPosition", `${e.target.checked}`)
              }
              checked={element.currentPosition}
            />
          </Form.Group>
          {element.currentPosition ? (
            <Form.Group as={Col}>
              <Form.Check
                inline
                type="checkbox"
                name={`displayInContactCard-${id}`}
                id={`displayInContactCard-${id}`}
                label="Display this company in my contact card"
                onChange={(e: any) =>
                  setValue(id, "displayInContactCard", `${e.target.checked}`)
                }
                checked={element.displayInContactCard}
              />
            </Form.Group>
          ) : null}
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Employment Type</Form.Label>
            <Select
              name="employmentType"
              options={employmentTypes.map((option: any) => ({
                value: option,
                label: option,
              }))}
              onChange={(e: any) => setValue(id, "employmentType", e.value)}
              value={
                element.employmentType
                  ? {
                      value: element ? element.employmentType?.value : "",
                      label: element ? element.employmentType?.label : "",
                    }
                  : null
              }
              placeholder="Select"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Introduction</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              id={`introduction-${id}`}
              onChange={(e) => setValue(id, "introduction", e.target.value)}
              name="introduction"
              value={element.introduction}
            />
            <Form.Text className="text-muted">
              Introduce yourself. This will be visible when someone visits your
              profile.
            </Form.Text>
          </Form.Group>
        </Row>
        <Row>
          <Col className="">
            <Button
              variant="outline-danger ms-auto"
              onClick={() => {
                console.log(id);
                removeExperience(id);
              }}
            >
              Remove experience
            </Button>
          </Col>
        </Row>
      </div>
    );
  });

  return result;
};

export default Experience;
