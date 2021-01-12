package com.anis.studentdata.student;

import com.anis.studentdata.EmailValidator;
import com.anis.studentdata.exception.ApiRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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
    public Student getOneStudent(UUID studentId) {
        return studentDatabase.getJustOne(studentId);
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

    public void removeStudent(UUID studentId) {
        studentDatabase.deleteStd(studentId);
    }

    public void editStudent(UUID studentId, Student student) {
        Optional.ofNullable(student.getEmail())
                .ifPresent(email -> {
                    boolean taken = studentDatabase.isEmailTaken(email);
                    if (!taken)
                        studentDatabase.updateEmail( studentId,email);
                    else
                        throw new ApiRequestException("Email already taken "+ student.getEmail());
                } );
        Optional.ofNullable(student.getFirstName())
                .filter(firstName -> !StringUtils.isEmpty(firstName))
                .map(StringUtils::capitalize)
                .ifPresent(firstName -> studentDatabase.updateFirstName(studentId,firstName));

        Optional.ofNullable(student.getLastName())
                .filter(lastName -> !StringUtils.isEmpty(lastName))
                .map(StringUtils::capitalize)
                .ifPresent(lastName -> studentDatabase.updateLastName(studentId,lastName));
    }


    public List<StudentCourse> getAllStudentsAndCourses(UUID studentId) {
        return studentDatabase.getAlltheStudentAndCourse( studentId);
    }
}