package com.anis.studentdata.student;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

import static com.anis.studentdata.student.Gender.*;

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
}
