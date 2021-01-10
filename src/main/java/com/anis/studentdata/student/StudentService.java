package com.anis.studentdata.student;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentDatabase studentDatabase;

    public List<Student> getStudentList() {
        return studentDatabase.selectAllStudents();
    }

     void addNewStudent( Student student) {
        addNewStudent(null,student);

    }
     void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());
        studentDatabase.insertStudent(newStudentId,student);

    }

}