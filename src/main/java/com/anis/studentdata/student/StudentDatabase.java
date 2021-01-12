package com.anis.studentdata.student;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class StudentDatabase {

    private final JdbcTemplate jdbcTemplate;

    int insertStudent(UUID studentId, Student student) {
        String sql = " INSERT INTO students (student_id, first_name, last_name ,email, gender ) VALUES (?, ?, ?, ?, ?::gender)";
        return jdbcTemplate.update(sql, studentId,
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getGender().name().toUpperCase());

    }

    public List<Student> selectAllStudents() {
        String sql = " SELECT  *  FROM students";

        return jdbcTemplate.query(sql, mapStudentFromDB());
    }

    public Student getJustOne(UUID studentId) {
        String sql = " SELECT  student_Id, first_name, last_name, email, gender  FROM students WHERE student_id = ? ";
        return jdbcTemplate.queryForObject(sql,new Object []{studentId},mapStudentFromDB());
    }

    public boolean isEmailTaken(String email) {
        String sql = "SELECT EXISTS ( SELECT 1 FROM students WHERE email = ?) ";
        return jdbcTemplate.queryForObject(sql, new Object[]{email}, (resultSet, i) -> resultSet.getBoolean(1));
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

    public void deleteStd(UUID studentId) {
        String sql = " DELETE FROM students WHERE student_id = ? ";
        jdbcTemplate.update(sql,studentId);
    }


    public void updateEmail(UUID studentId, String email) {
        String sql = "UPDATE students SET email = ? WHERE student_id = ?";
        jdbcTemplate.update(sql,email,studentId);
    }

    public void updateFirstName(UUID studentId, String firstName) {
        String sql = "UPDATE students SET first_name = ? WHERE student_id = ?";
        jdbcTemplate.update(sql,firstName,studentId);
    }

    public void updateLastName(UUID studentId, String lastName) {
        String sql = "UPDATE students SET last_name = ? WHERE student_id = ?";
        jdbcTemplate.update(sql,lastName,studentId);
    }


    public List<StudentCourse> getAlltheStudentAndCourse(UUID studentId) {
        String sql = " SELECT *  FROM students JOIN student_course  using (student_id) JOIN courses  using( course_id) WHERE students.student_id= ?";
        return jdbcTemplate.query(sql,new Object[]{studentId}, getStudentCourseRowMapper());
    }
    private RowMapper<StudentCourse> getStudentCourseRowMapper() {
        return (resultSet, i) -> {
            String studentIdStr = resultSet.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);
            String courseIdStr = resultSet.getString("course_id");
            UUID courseId = UUID.fromString(courseIdStr);
            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");
            String genderStr = resultSet.getString("gender").toUpperCase();
            Gender gender = Gender.valueOf(genderStr);
            LocalDate start_date = resultSet.getDate("start_date").toLocalDate();
            LocalDate end_date = resultSet.getDate("end_date").toLocalDate();
            Integer grade = Optional.ofNullable(resultSet.getString("grade")).map(Integer::parseInt).orElse(null);
            String name = resultSet.getString("name");
            String description = resultSet.getString("description");
            String department = resultSet.getString("department");
            String teacherName = resultSet.getString("teacher_name");
            return new StudentCourse(studentId, courseId, firstName, lastName, email, gender, start_date, end_date, grade,name,description,department,teacherName);
        };
    }
}
