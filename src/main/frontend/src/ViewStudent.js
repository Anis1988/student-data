import { Modal } from "antd";
import React from "react";

const ViewStudent = ({ studentsCourses, view, closeView }) => {
  return (
    <Modal
      style={{ backgroundColor: "gray" }}
      title={
        <h1 style={{ marginTop: "15px", fontWeight: "800" }}>
          VIEW STUDENTS DETAILS
        </h1>
      }
      visible={view}
      onOk={() => closeView()}
      onCancel={() => closeView()}
      width={1000}
    >
      {studentsCourses.map((item) => {
        return (
          <>
            <h1 key={item.studentId}>{item.studentId}</h1>
            <h3>
              <strong>First Name:</strong> {item.firstName}
            </h3>
            <h3>
              <strong>Last Name:</strong> {item.lastName}
            </h3>
            <h3>
              <strong>Gender:</strong> {item.gender}
            </h3>
            <h3>
              <strong>Course Name:</strong> {item.name}
            </h3>
            <h3>
              <strong>Description:</strong> {item.description}
            </h3>
            <h3>
              <strong>Department:</strong> {item.department}
            </h3>
            <h3>
              <strong>Grades: </strong>{" "}
              {item.grade ? item.grade : "Not Available"}
            </h3>
            <h3>
              <strong>Teacher Name : </strong>{" "}
              {item.teacherName ? item.teacherName : "Not Available"}
            </h3>
            <h3>
              <strong>Start Date :</strong> {item.startDate}
            </h3>
            <h3>
              <strong>End Date:</strong> {item.endDate}
            </h3>
          </>
        );
      })}
    </Modal>
  );
};
export default ViewStudent;
