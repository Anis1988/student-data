package com.anis.studentdata.student;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;


@RequiredArgsConstructor
@Getter
public class Student {

    private final UUID studentId;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final Gender gender;

}
