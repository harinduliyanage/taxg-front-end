/* eslint-disable jsx-a11y/anchor-is-valid */
// import { Button } from "@mui/material";
// import Modal from "@mui/material";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./_global-search.scss";
import searchImage from "../../../assets/images/search-illustration.svg";

const GlobalSearch = () => {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigator = useNavigate();

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    navigator(`/discover/services/keyword/${searchQuery}`);
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShow(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShow]);

  return (
    <>
      <Button
        variant="white"
        className="search-open ms-auto d-md-none"
        data-search={show === true ? "true" : "false"}
        onClick={handleShow}
      >
        <i className="far fa-search me-0"></i>
      </Button>
      <div
        className={
          show === true ? "global-search fixed-search" : "global-search"
        }
      >
        <div className="search-wrapper">
          <div className="input-field">
            <span className="search-icon">
              <i className="far fa-search"></i>
            </span>

            <Form.Control
              placeholder="Search for service providers"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onSubmitHandler(e);
                  handleShow();
                } else if (e.key === "Escape") {
                  handleClose();
                }
              }}
              onFocus={handleShow}
              onBlur={handleClose}
              // onInput={(e) => {
              //   setSearchQuery(e.target.value);
              // }}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          <div
            className="search-note"
            data-search={show === true ? "true" : "false"}
          >
            <Row>
              <Col md="7">
                <h3>More than just a search!</h3>
                <p>
                  While it serves as a traditional search, you can also use
                  natural launguage queries. Meaning, Taxglobal search can be
                  used to ask questions you may have.
                </p>
                <h6>Examples</h6>
                <ul>
                  <li>
                    <a href="#">How do I know my tax bracket and tax rate? </a>
                  </li>
                  <li>
                    <a href="#">What tax form should I use? </a>
                  </li>
                  <li>
                    <a href="#">
                      Should I take the standard deduction or itemize?{" "}
                    </a>
                  </li>
                </ul>
              </Col>
              <Col md="5">
                <div className="search-info-image">
                  <img src={searchImage} alt="search" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalSearch;
