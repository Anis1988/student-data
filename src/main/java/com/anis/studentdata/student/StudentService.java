package com.anis.studentdata.student;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

        private final StudentDatabase studentDatabase;

    public List<Student> getStudentList() {
        return studentDatabase.selectAllStudents();
    }
}