import "./App.css";
import React, { useEffect, useState } from "react";
import { Table, Avatar, Spin } from "antd";
import Container from "./Container";
import { getAllStudents } from "./Client";
import Footer from "./Footer";
import { Modal } from "antd";
import AddStudentForm from "./forms/AddStudentForm";
import axios from "axios";

function App() {
  const [modal, setModal] = useState(false);
  const [state, setState] = useState({
    isLoading: false,
    students: [],
  });

  useEffect(() => {
    setState({ isLoading: true });

    getAllStudents().then((res) =>
      res.json().then((students) => {
        setState({
          students,
          isLoading: false,
        });
      })
    );
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
          />
        </Modal>
        <Footer
          numberOfStudents={state.students.length}
          handleOpen={openAddStudentModal}
        />
      </Container>
    );
  } else {
    return (
      <div className="spinner">
        <Container>
          <Spin />;
        </Container>
      </div>
    );
  }
}

export default App;
