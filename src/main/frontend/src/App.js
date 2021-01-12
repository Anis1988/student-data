import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import { Table, Avatar, Spin, Empty, Modal, Button, Popconfirm } from "antd";
import Container from "./Container";
import {
  editStudent,
  getAllStudents,
  deleteStudent,
  studentCourseDetails,
} from "./Client";
import Footer from "./Footer";
import { errorNotification } from "./Notification";
import AddStudentForm from "./forms/AddStudentForm";
import EditStudentForm from "./forms/EditStudentForm";

function App() {
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [view, setView] = useState(false);
  const [singleStudent, setSingleStudent] = useState({});
  const [studentsCourses, setStudentsCourses] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    students: [],
  });

  const handleEdit = (singleStudent) => {
    setSingleStudent(singleStudent);
    openEditStudentModal();
  };

  const formToSubmit = (student) => {
    editStudent(student.studentId, student)
      .then(() => {
        closeEditStudentModal();
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleView = (id) => {
    studentCourseDetails(id).then((res) => {
      res.json().then((studentsdetails) => {
        setStudentsCourses(studentsdetails);
      });
    });
    openView();
  };

  const handleDelete = (id) => (e) => {
    deleteStudent(id).then((res) =>
      res.json().then((students) => {
        setState({
          students,
        });
      })
    );

    const newStudents = [...state.students];
    const otherStudents = newStudents.filter((other) => other.studentId !== id);
    setState({ students: otherStudents });
  };

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

  const openEditStudentModal = () => setModalEdit(true);
  const closeEditStudentModal = () => setModalEdit(false);

  const openView = () => setView(true);
  const closeView = () => setView(false);

  if (state.students && state.students.length) {
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
          dataSource={state.students}
          columns={columns}
          rowKey={state.students.studentId}
          pagination={false}
        />
        {/* for View  */}
        <Modal
          title={
            <h1 style={{ textDecoration: "underline" }}>
              View Student Details
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

        {/* for adding  */}
        <Modal
          title="Add New Student"
          visible={modal}
          onOk={() => closeView()}
          onCancel={() => closeView()}
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
          title="Edit Student"
          visible={modalEdit}
          onOk={() => closeEditStudentModal()}
          onCancel={() => closeEditStudentModal()}
          width={1000}
        >
          <EditStudentForm initialV={singleStudent} submitter={formToSubmit} />
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
