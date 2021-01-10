package com.anis.studentdata.student;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class StudentDatabase {

    private final JdbcTemplate jdbcTemplate;

     int insertStudent(UUID studentId, Student student) {
        String sql = " INSERT INTO students (student_id, first_name, last_name ,email, gender ) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, studentId,
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getGender().name().toUpperCase());

    }



    public List<Student> selectAllStudents(){
        String sql = " SELECT  student_Id, first_name, last_name, email, gender  FROM students";

        return jdbcTemplate.query(sql, mapStudentFromDB());
    }


    private RowMapper<Student> mapStudentFromDB() {
        return (resultSet, i) -> {
            String studentIdStr = resultSet.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);
            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");
            String genderStr = resultSet.getString("gender").toUpperCase();
            Gender gender = Gender.valueOf(genderStr);
            return new Student(studentId, firstName, lastName, email, gender);
        };
    }
}
