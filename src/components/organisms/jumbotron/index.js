import React, { useState } from "react";
import { ButtonLight } from "../buttons";
import "./_jumbortron.scss";
function Jumbotron() {
  const [hide, setHide] = useState(true)
  const hideIgnoreButton = () => {
    setHide(false)
  }
  return (
    hide && <div class="jumbotron jumbotron-fluid mb-5">
      <h1 class="display-4">Looking for a specific service provider?</h1>
      <p class="lead">
        We are building the biggest platform to connect tax service providers
        with potential clients. If the service provider you are looking is not
        in the list, invite them to Taxglobal. If they sign-up through your
        invite, you will get 3 months of premium subscription for free!
      </p>
      <div className="button__panel">
        <ButtonLight />
        <button type="button" class="btn btn-link ms-3" onClick = {hideIgnoreButton}>
			Ignore
		</button>
      </div>
    </div>
  );
}

export default Jumbotron;
