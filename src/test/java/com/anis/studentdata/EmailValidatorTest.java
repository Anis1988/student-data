package com.anis.studentdata;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class EmailValidatorTest {
    private final EmailValidator underTest = new EmailValidator();

    @Test
    void itShouldValidateEmail() {

        assertThat(underTest.test("Hello@gmail.com")).isTrue();

        assertThat(underTest.test("hello@gmail")).isFalse();

        assertThat(underTest.test("hellogmail")).isFalse();


    }
}