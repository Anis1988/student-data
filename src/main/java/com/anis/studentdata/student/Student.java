package com.anis.studentdata.student;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;


@RequiredArgsConstructor
@Getter
public class Student {

    @JsonProperty("studentId")
    private final UUID studentId;

    @JsonProperty("firstName")
    private final String firstName;

    @JsonProperty("lastName")
    private final String lastName;

    @JsonProperty("email")
    private final String email;

    @JsonProperty("gender")
    private final Gender gender;

    @Override
    public String toString() {
        return "Student{" +
                "studentId=" + studentId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", gender=" + gender +
                '}';
    }
}
