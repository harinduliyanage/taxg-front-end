import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./_my-entity.scss";
import PageTemplate from "../templates/PageTemplate";
import MyEntityItem from "../../components/organisms/entity/MyEntityItem";
import { ENTITY_KEY } from "../../actions/keys";
import { useSelector } from "react-redux";
import axios from "axios";
import { Auth } from "aws-amplify";
const MyEntity = () => {
  const [affiliatedEntities, setAffiliatedEntities] = useState([]);
  const [ownedEntities, setOwnedEntities] = useState([]);
  const [ownerUUID, setOwnerUUID] = useState();

  const { user } = useSelector((root: any) => root.auth);
  useEffect(() => {
    async function getEntityDetail() {
      const { attributes } = await Auth.currentAuthenticatedUser();
      setOwnerUUID(attributes.sub)
      const configMaster = {
        Accept: "application/json",
        "x-api-key": ENTITY_KEY,
      };

      await axios
        .get(
          `https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/RegisteredEntities/${user.user_uuid}`,
          { headers: configMaster }
        )
        .then((res: any) => {
          console.log("getEntityDetail", res.data);
          setAffiliatedEntities(res.data.results.affiliatedEntities);
          setOwnedEntities(res.data.results.ownedEntities);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    getEntityDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function entityNavigate() {
    if(ownedEntities?.length >= 10) {
      alert("Can not create more than 10 entities")
    } else {
      window.location.href = "/entity/create";
    } 
  }

  return (
    <PageTemplate>
      <section className="my-entity">
        <Container className="pt-4">
          <Card className="full-page">
            <Card.Body>
              <h1>My entities</h1>
              <Row className="row-cols-4 gy-3 gx-3">
                <Col className="create-new">
                  <Card className="my-entity">
                    <Card.Body>
                      {
                        ownedEntities?.length >= 10 ? 
                        <span className="btn btn-link disabled">
                        <div className="create">
                          <i className="fal fa-plus" />
                        </div>
                        <h6>Create new</h6>
                      </span> : <button className="btn btn-link" onClick={entityNavigate}>
                        <div className="create">
                          <i className="fal fa-plus" />
                        </div>
                        <h6>Create new</h6>
                      </button>
                      }
                    </Card.Body>
                  </Card>
                </Col>

                {affiliatedEntities &&
                  affiliatedEntities.map((e: any, key: number) => (
                    <Col key={key}>
                      <MyEntityItem
                        entityName={e.entityName}
                        entityDetails={e.categoryName}
                        entityImage={e.entityLogo}
                        itemId={e.entityId}
                        entityRoleType={e.entityRoleType}
                        attributes = {ownerUUID}
                      />
                    </Col>
                  ))}
                {ownedEntities &&
                  ownedEntities.map((e: any, key: number) => (
                    <Col key={key}>
                      <MyEntityItem
                        entityName={e.entityName}
                        entityDetails={e.categoryName}
                        entityImage={e.entityLogo}
                        itemId={e.entityId}
                        entityRoleType={e.entityRoleType}
                        attributes = {ownerUUID}
                        
                      />
                    </Col>
                  ))}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </PageTemplate>
  );
};

export default MyEntity;
