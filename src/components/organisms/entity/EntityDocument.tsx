import React from "react";
import "./_entity-documents.scss";
import axios from "axios";
import { ENTITY_KEY } from "../../../actions/keys";
import { EntityData } from "../../../interfaces/models/entity/EntityData";
import pdfIcon from "../../../assets/images/pdf.svg";
import { Badge } from "react-bootstrap";
interface Props {
  data?: EntityData;
  setRerender?: any;
  entityId?: number;
}
const EntityDocumentList: React.FC<Props> = (props) => {
  const { data, setRerender, entityId } = props;
  const removeDocument = (id: any, docType: string, docPath: string) => {
    const config = {
      Accept: "application/json",
      "x-api-key": ENTITY_KEY,
    };
    const data = {
      entityID: entityId,
      Documents: [
        {
          status: 3,
          documentID: id,
          documentType: docType,
          documentLocation: docPath,
        },
      ],
    };
    axios
      .post(
        "https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityDocuments",
        data,
        {
          headers: config,
        }
      )
      .then((res: any) => {
        console.log("getEntityData", res.data);
        setRerender(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <div className="document-list">
      {data?.documents
        ? data?.documents.map((e, key) => (
            <div key={key}>
              <h4 className="doc-heading">Document name</h4>
              <div className="panel-items">
                <div className="card-info">
                  <span className="credit-card">
                    <span className="card-icon">
                      <img src={pdfIcon} alt="" />
                      <br />
                      <small>{e.documentType}</small>
                    </span>
                    <span className="card-details">
                      <span className="card-number">
                        {e.documentLocation}

                        <Badge pill bg="lightest" text="dark">
                          {e.status} {e.documentID}
                        </Badge>
                      </span>
                      <span className="card-expire">3.3 mb</span>
                    </span>
                  </span>

                  <span className="panel-action">
                    <a
                      className="btn btn-outline-light"
                      href={e.documentLocation}
                      download
                    >
                      Download
                    </a>
                    <input
                      className="btn btn-outline-danger"
                      type="button"
                      value="delete"
                      onClick={() =>
                        removeDocument(
                          e.documentID,
                          e.documentType,
                          e.documentLocation
                        )
                      }
                    />
                  </span>
                </div>
              </div>
            </div>
          ))
        : "No documents"}
    </div>
  );
};

export default EntityDocumentList;
