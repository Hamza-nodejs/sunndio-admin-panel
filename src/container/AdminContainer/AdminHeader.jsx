import React from "react";
import "./header.scss";

const AdminHeader = () => {

  return (
    <>
      <header id="panel_header">
        <div className="dropdown show" style={{position: "absolute", right: 20}}>
          <button className="btn btn-primary">Logout</button>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
