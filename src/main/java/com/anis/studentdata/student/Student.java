package com.anis.studentdata.student;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;


@RequiredArgsConstructor
@Getter
public class Student {

    @JsonProperty("studentId")
    private final UUID studentId;

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

}
