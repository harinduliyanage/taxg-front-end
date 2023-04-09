import * as React from "react";
import Spinner from "react-bootstrap/Spinner";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(255,255,255,0.5)",
		zIndex: "10000",
		justifyContent: "center",
		alignItems: "center",
      }}
    >
      <Spinner animation="border" />
    </div>
	
  );
}
