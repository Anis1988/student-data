package com.anis.studentdata.student;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RequestMapping("/students")
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class StudentController {

   private final StudentService studentService;

    @GetMapping
    public List<Student> students (){
//        throw  new ApiRequestException("Cannot Get All Students  ");
        return studentService.getStudentList();
    }
    @PostMapping
    public void addNewStudent (@RequestBody @Valid Student student){
        studentService.addNewStudent(student);
    }

    @DeleteMapping("{studentId}")
    public void deleteStudent(@PathVariable("studentId") UUID studentId ){
        studentService.removeStudent(studentId);
    }
    @PutMapping("edit/{studentId}")
    public void editStudent(@PathVariable("studentId") UUID studentId, @RequestBody @Valid Student student){
        studentService.editStudent(studentId,student);
    }
    @GetMapping("{studentId}")
    public Student getOne(@PathVariable("studentId") UUID studentId){
        return studentService.getOneStudent(studentId);
    }
    @GetMapping("courses/{studentId}")
    public List<StudentCourse> getCoursesAndStudent(@PathVariable("studentId") UUID studentId){
        return studentService.getAllStudentsAndCourses(studentId);
    }
}
