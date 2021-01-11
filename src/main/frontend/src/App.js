import "./App.css";
import React, { useEffect, useState } from "react";
import { Table, Avatar, Spin, Empty, Modal } from "antd";
import Container from "./Container";
import { getAllStudents } from "./Client";
import Footer from "./Footer";
import { errorNotification } from "./Notification";
import AddStudentForm from "./forms/AddStudentForm";

function App() {
  const [modal, setModal] = useState(false);
  const [state, setState] = useState({
    isLoading: false,
    students: [],
  });

  useEffect(() => {
    setState({ isLoading: true });
    getAllStudents()
      .then((res) =>
        res.json().then((students) => {
          setState({
            students,
            isLoading: false,
          });
        })
      )
      .catch((error) => {
        const message = error.error.message;
        const httpStatus = error.error.httpStatus;
        errorNotification(message, httpStatus);
        setState({ isLoading: false });
      });
  }, []);

  const openAddStudentModal = () => setModal(true);
  const closeAddStudentModal = () => setModal(false);

  if (state.students && state.students.length) {
    const columns = [
      {
        title: "",
        key: "Avatar",
        render: (text, student) => (
          <Avatar size="large">
            {`${student.firstName.charAt(0).toUpperCase()}
              ${student.lastName.charAt(0).toUpperCase()}`}
          </Avatar>
        ),
      },
      {
        title: "Student Id",
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
    ];
    return (
      <Container>
        <Table
          dataSource={state.students}
          columns={columns}
          rowKey={state.students.studentId}
          pagination={false}
        />
        <Modal
          title="Add New Student"
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
        <Footer
          numberOfStudents={state.students.length}
          handleOpen={openAddStudentModal}
        />
      </Container>
    );
  }
  if (state.isLoading) {
    return (
      <div className="spinner">
        <Container>
          <Spin />
        </Container>
      </div>
    );
  } else {
    return (
      <Container>
        <Empty description={<h1>No Students Found</h1>} />
        <Modal
          title="Add New Student"
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
          />
        </Modal>
        <Footer
          numberOfStudents={state.students?.length}
          handleOpen={openAddStudentModal}
        />
      </Container>
    );
  }
}

export default App;
