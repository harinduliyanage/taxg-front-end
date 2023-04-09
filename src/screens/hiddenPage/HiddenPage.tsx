import React, { useEffect, useState } from "react";
import PageTemplate from "../templates/PageTemplate";
import { Button, Modal, Table } from "react-bootstrap";
import { headerConfig } from "../../actions/headers";
import axios from "axios";
import { DELETE_USER_API, GET_MASTER_DATA_API } from "../../actions/endPoints";
import { DELETE_USER_KEY, MASTER_DATA_KEY } from "../../actions/keys";

type UserProf = {
  id: number;
  user_uuid: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
};

const HiddenPage = () => {
  const [users, setUsers] = useState<UserProf[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<null | UserProf>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (users.length === 0) {
      fetchData();
    }
  }, [users]);

  async function fetchData() {
    const config: any = await headerConfig();
    config.headers["x-api-key"] = MASTER_DATA_KEY;
    const body = {
      type: "USER_PROFILE",
    };
    await axios
      .post(GET_MASTER_DATA_API, body, config)
      .then((res: any) => {
        console.log(res);
        setUsers(res.data.results);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  const deleteConfirmation = (user: UserProf) => {
    setDeletingUser(user);
    setIsOpen(true);
  };

  const cancelConfirmation = () => {
    setDeletingUser(null);
    setIsOpen(false);
  };

  const deleteUser = async () => {
    const config: any = await headerConfig();
    config.headers["x-api-key"] = DELETE_USER_KEY;
    if (deletingUser) {
      await axios
        .delete(DELETE_USER_API + deletingUser.user_uuid, config)
        .then(() => {
          fetchData();
          setDeletingUser(null);
          setIsOpen(false);
        })
        .catch(() => {
          setDeletingUser(null);
          setIsOpen(false);
          setError("Error while deleting the user");
        });
    }
  };

  return (
    <PageTemplate>
      <Modal
        show={isOpen}
        //onHide={isOpen}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Body>
          <div className="form-layout">
            <h3>ARE YOU SURE?</h3>
            <p>
              <b>Deleting user </b> <br />
              <br />
              UUID : {deletingUser?.user_uuid} <br />
              EMAIL : {deletingUser?.user_email}
              <br /> <br />
              You are about to delete a user permanently. This action cannot be
              undone. Press cancel to go back
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark error" onClick={() => deleteUser()}>
            Remove
          </Button>
          <Button variant="outline-light" onClick={() => cancelConfirmation()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {error ? <p>{error}</p> : null}

      <section className="main-banner">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>UUID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: UserProf) => {
              return (
                <tr key={user.id}>
                  <td>{user.user_uuid}</td>
                  <td>{user.user_first_name}</td>
                  <td>{user.user_last_name}</td>
                  <td>{user.user_email}</td>
                  <td>
                    <Button
                      variant="dark"
                      size="sm"
                      type="button"
                      onClick={() => deleteConfirmation(user)}
                    >
                      <i className="far fa-trash-alt me-0"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </section>
    </PageTemplate>
  );
};

export default HiddenPage;
