import React from "react";
import AdminHeader from "../../container/AdminContainer/AdminHeader";
import AdminSidebar from "../../container/AdminContainer/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-2 px-0">
          <AdminSidebar />
        </div>
        <div className="col-md-10 px-0">
          <AdminHeader />
          {children}
          {/* <UserFooter /> */}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
