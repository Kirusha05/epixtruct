import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Form,
  FormField,
  Input,
  Spinner
} from '../components/UI';
import {
  LoginTitle,
  ButtonWrap,
  LoginLabel,
  LoginMessage
} from '../styles/login.style';

const setCookie = (name: string, value: string, years: number) => {
  const date = new Date();
  date.setTime(date.getTime() + years * 365 * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isSuccess) return;
    setTimeout(() => {
      router.push('/');
    }, 500);
  }, [isSuccess, router]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(null);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password.trim()) return;

    setIsLoading(true);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    });
    const data = await res.json();

    setIsLoading(false);
    if (!data.token) {
      setError(data.message);
    } else {
      setCookie('token', data.token, 10);
      setIsSuccess(true);
      router.push('/');
    }
  };

  return (
    <>
      <Head>
        <title>Login | EpiXtruct</title>
      </Head>
      <Card>
        <LoginTitle>Login</LoginTitle>
        <Form onSubmit={submitHandler}>
          <LoginLabel>Parola</LoginLabel>
          <FormField>
            <Input
              type='password'
              value={password}
              onChange={changeHandler}
              placeholder='Introduceți parola...'
            />
          </FormField>
          {error && <LoginMessage isError>{error}</LoginMessage>}
          {isSuccess && <LoginMessage>Succes! Redirecționare...</LoginMessage>}
          <ButtonWrap>
            <Button>{isLoading ? <Spinner small /> : 'Login'}</Button>
          </ButtonWrap>
        </Form>
      </Card>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check if user is authenticated
  const userToken = context.req.cookies.token;

  // Redirect if the client already has the correct token
  if (userToken === process.env.ADMIN_TOKEN)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };

  return {
    props: {}
  };
};
