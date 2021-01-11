package com.anis.studentdata.student;

import com.anis.studentdata.EmailValidator;
import com.anis.studentdata.exception.ApiRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentDatabase studentDatabase;
    private final EmailValidator emailValidator;

    public List<Student> getStudentList() {
        return studentDatabase.selectAllStudents();
    }

    void addNewStudent(Student student) {
        addNewStudent(null, student);

    }

    void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());

        if (!emailValidator.test(student.getEmail()))
            throw new ApiRequestException(student.getEmail() + " is not Valid, Try Again");

        if (studentDatabase.isEmailTaken(student.getEmail()))
            throw new ApiRequestException(student.getEmail() + " is taken, Try Again");

        studentDatabase.insertStudent(newStudentId, student);

    }

}