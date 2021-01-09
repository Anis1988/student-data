import "./App.css";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Container from "./Container";
import { getAllStudents } from "./Client";
function App() {
  const [state, setState] = useState({
    students: [],
  });

  useEffect(() => {
    getAllStudents().then((res) =>
      res.json().then((students) => {
        setState({
          students,
        });
      })
    );
  }, []);
  console.log(state.students.length);

  if (state.students && state.students.length) {
    const columns = [
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
          rowKey={state.studentId}
          pagination={false}
        />
      </Container>
    );
  } else {
    return <h1>Nothing here</h1>;
  }
}

export default App;
