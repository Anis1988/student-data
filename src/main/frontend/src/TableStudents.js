import React, { Fragment } from "react";
import { Avatar, Popconfirm, Button, Modal, Table } from "antd";
import EditStudentForm from "./forms/EditStudentForm";
import ViewStudent from "./ViewStudent";
import Container from "./Container";
import AddStudentForm from "./forms/AddStudentForm";
import Footer from "./Footer";
import { errorNotification } from "./Notification.js";

const TableStudents = ({
  handleDelete,
  handleEdit,
  handleView,
  students,
  closeAddStudentModal,
  openAddStudentModal,
  closeEditStudentModal,
  openEditStudentModal,
  studentsCourses,
  view,
  closeView,
  modal,
  singleStudent,
  formToSubmit,
  modalEdit,
}) => {
  const columns = [
    {
      title: "Initial",
      key: "Avatar",
      render: (text, student) => (
        <Avatar size="large">
          {`${student.firstName.charAt(0).toUpperCase()}
              ${student.lastName.charAt(0).toUpperCase()}`}
        </Avatar>
      ),
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Fragment>
          <Popconfirm
            placement="topRight"
            title={`Are you sure you want to delete ${record.firstName} ${record.lastName}`}
            onConfirm={handleDelete(record.studentId)}
            onCancel={(e) => e.stopPropagation()}
          >
            <Button type="danger" onClick={(e) => e.stopPropagation()}>
              Delete
            </Button>
          </Popconfirm>
          <Button
            style={{ marginLeft: "5px" }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            style={{ marginLeft: "5px" }}
            type="primary"
            onClick={() => handleView(record.studentId)}
          >
            View
          </Button>
        </Fragment>
      ),
    },
  ];
  return (
    <Container>
      <Table
        dataSource={students}
        columns={columns}
        rowKey={students.studentId}
        pagination={false}
      />
      {/* for View  */}
      <ViewStudent
        studentsCourses={studentsCourses}
        view={view}
        closeView={closeView}
      />
      {/* for adding  */}
      <Modal
        title={
          <h1 style={{ marginTop: "15px", fontWeight: "800" }}>
            ADD NEW STUDENTS
          </h1>
        }
        visible={modal}
        onOk={() => closeAddStudentModal()}
        onCancel={() => closeAddStudentModal()}
        width={1000}
      >
        <AddStudentForm
          onSuccess={() => {
            closeAddStudentModal();
            window.location.reload(true);
          }}
          onFailure={(err) => {
            const message = err.error.message;
            const description = err.error.httpStatus;
            errorNotification(message, description);
          }}
        />
      </Modal>

      {/* for edit  */}
      <Modal
        title={
          <h1 style={{ marginTop: "15px", fontWeight: "800" }}>EDIT STUDENT</h1>
        }
        visible={modalEdit}
        onOk={() => closeEditStudentModal()}
        onCancel={() => closeEditStudentModal()}
        width={1000}
      >
        <EditStudentForm
          singleStudent={singleStudent}
          submitter={formToSubmit}
        />
      </Modal>
      <Footer
        numberOfStudents={students.length}
        handleOpen={openAddStudentModal}
      />
    </Container>
  );
};

export default TableStudents;
