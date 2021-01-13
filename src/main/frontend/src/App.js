import "./App.css";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import Container from "./Container";
import {
  editStudent,
  getAllStudents,
  deleteStudent,
  studentCourseDetails,
} from "./Client";
import { errorNotification } from "./Notification";
import TableStudents from "./TableStudents";
import NoStudent from "./NoStudent";

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
  const handleView = (id) => {
    studentCourseDetails(id).then((res) => {
      res.json().then((studentsdetails) => {
        setStudentsCourses(studentsdetails);
      });
    });
    openView();
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
    return (
      <TableStudents
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        students={state.students}
        closeAddStudentModal={closeAddStudentModal}
        openAddStudentModal={openAddStudentModal}
        closeEditStudentModal={closeEditStudentModal}
        openEditStudentModal={openEditStudentModal}
        studentsCourses={studentsCourses}
        view={view}
        modal={modal}
        modalEdit={modalEdit}
        closeView={closeView}
        singleStudent={singleStudent}
        formToSubmit={formToSubmit}
      />
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
      <NoStudent
        closeAddStudentModal={closeAddStudentModal}
        modal={modal}
        students={state.students}
        openAddStudentModal={openAddStudentModal}
      />
    );
  }
}

export default App;
