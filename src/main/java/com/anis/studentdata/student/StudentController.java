package com.anis.studentdata.student;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
}
