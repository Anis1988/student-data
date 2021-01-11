import { Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import Container from "./Container";
import "./Footer.css";

const Footer = ({ numberOfStudents, handleOpen }) => {
  return (
    <div className="footer">
      <Container>
        {numberOfStudents !== undefined ? (
          <Avatar
            style={{ backgroundColor: "orange", marginRight: "10px" }}
            size="large"
          >
            {numberOfStudents}
          </Avatar>
        ) : null}
        <Button onClick={() => handleOpen()} type="primary">
          {" "}
          Add New Student +{" "}
        </Button>
      </Container>
    </div>
  );
};
export default Footer;
