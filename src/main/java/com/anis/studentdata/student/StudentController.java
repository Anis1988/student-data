package com.anis.studentdata.student;


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
public class StudentController {

    List<Student> studentList = List.of(
      new Student(UUID.randomUUID(),"Anis  ","Medini","Anis@gmail.com", MALE),
      new Student(UUID.randomUUID(),"Roza","Medini","Roza@gmail.com", FEMALE)
    );

    @GetMapping
    public List<Student> students (){
        return studentList;
    }
}
