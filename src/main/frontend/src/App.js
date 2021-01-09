import "./App.css";
import { getAllStudents } from "./Client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import fetch from "unfetch";
function App() {
  const [state, setState] = useState({
    students: [],
  });

  useEffect(() => {
    fetch("/students").then((res) =>
      res.json().then((students) => {
        setState({
          students,
        });
      })
    );
  }, []);
  console.log(state.students.length);

  if (state.students && state.students.length) {
    return (
      <div>
        {state.students.map((student) => {
          return (
            <div>
              <h2 key={student.studentId}>{student.studentId} </h2>
              <p>{student.firstName}</p>
              <p>{student.email}</p>
              <p>{student.gender}</p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <h1>Nothing here</h1>;
  }
}

export default App;
