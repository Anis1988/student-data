package com.anis.studentdata.student;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;

@RequiredArgsConstructor
@Getter
public class StudentCourse {

    @JsonProperty("studentId")
    private final UUID studentId;

    @JsonProperty("courseId")
    private final UUID courseId;

    @NotBlank
    @JsonProperty("firstName")
    private final String firstName;

    @NotBlank
    @JsonProperty("lastName")
    private final String lastName;


    @JsonProperty("email")
    private final String email;

    @NotNull
    @JsonProperty("gender")
    private final Gender gender;


    private final LocalDate startDate;
    private final LocalDate endDate;
    @JsonProperty("grade")
    private final Integer grade;

    @JsonProperty("name")
    private final String name;

    @JsonProperty("description")
    private final String description;
    @JsonProperty("department")
    private  final String department;
    @JsonProperty("teacherName")
    private  final String teacherName;
}
