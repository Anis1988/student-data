package com.anis.studentdata.student;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/students")
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class StudentController {

   private final StudentService studentService;

    @GetMapping
    public List<Student> students (){
        return studentService.getStudentList();
    }
    @PostMapping
    public void addNewStudent (@RequestBody Student student){
        studentService.addNewStudent(student);
    }
}
