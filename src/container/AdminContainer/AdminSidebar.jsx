import React from "react";
import { Link } from "react-router-dom";
import { PanelSidebar } from "../../constants/PanelSidebar";
import { Sidebar, SubMenu, MenuItem, Menu } from "react-pro-sidebar";
import "./adminSidebar.scss"; // Import your custom styles

const AdminSidebar = () => {
  return (
    <Sidebar className="sidebar-display">
      {/* <div className="side_bar"> */}
      <div style={{display: "flex", alignItems: "center", gap: "10px" , justifyContent: "center", padding:"10px"}}>
      <img style={{height: "40px", width: "30px"}} src="/logo.png" alt="" />
      <strong>Sunndio Health</strong>
      </div>
      
      <Menu>
        {PanelSidebar.map((item) => (
          <SubMenu label={item.name} key={item.id}>
            <MenuItem
              className={window.location.pathname.includes(item.subItem.addItem.route) ? 'active' : ''}
              component={<Link to={item.subItem.addItem.route} />}
            >
              {item.subItem.addItem.name}
            </MenuItem>

            <MenuItem
              // className={window.location.pathname.includes(item.subItem.allItem.route) ? 'active' : ''}
              active={window.location.pathname.includes(item.subItem.allItem.route)}
              component={<Link to={item.subItem.allItem.route} />}>
              {item.subItem.allItem.name}
            </MenuItem>


          </SubMenu>
        ))}

      </Menu>
      {/* </div> */}
    </Sidebar>

  );
};

export default AdminSidebar;
