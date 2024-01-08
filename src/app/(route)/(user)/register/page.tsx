"use client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { auth } from "@/firebase";
import Link from "next/link";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../_style/registerStyle";

export default function CreateAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    // 로딩중이거나 이름이 없거나 이메일이 없거나 등등 일때 그냥 내보냄
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setIsLoading(true);
      // create an account
      // createUserWithEmailAndPassword : 파이어베이스 모듈
      // auth, email, password 요구
      const credentials = await createUserWithEmailAndPassword(
        auth, // auth instance
        email, // The user's email address.
        password, // The user's chosen password.
      );
      // 유저 정보를 가져올 수 있음
      console.log(credentials.user);

      // set the name of the user
      // updateProfile : 프로필 업데이트 파이어베이스 모듈.
      // 두 번째 인자엔 displayName과 photoURL을 가지고 있다.
      await updateProfile(credentials.user, { displayName: name });
      // redirect to the home page
    } catch (e) {
      // setError
      // 파이어베이스의 에러인 경우만
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>🐹 Join 🐹</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <br />
        <Link href="/login">Log in &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
