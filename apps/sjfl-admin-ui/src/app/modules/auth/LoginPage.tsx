import { useMemo, useState } from 'react';
import { useLogin } from './hooks/useLogin';
import { useAuth } from './hooks/useAuth';
import { z } from 'zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  randomValue,
} from '@sjfl/ui';
import { AlertCircle, Link } from 'lucide-react';

const bannerImages = ['banner.jpg', 'banner2.jpg'];

const loginSchema = z.object({
  usernameOrEmail: z.string(),
  password: z.string(),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const imageIndex = useMemo(() => randomValue(0, bannerImages.length - 1), []);
  const bannerImage = bannerImages[imageIndex];

  const [errorMessage, setErrorMessage] = useState('');

  const { mutateAsync: verifyCredentials, isPending: isLoggingIn } = useLogin();
  const { logIn } = useAuth();

  const { register, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler: SubmitHandler<LoginForm> = async (form) => {
    setErrorMessage('');
    try {
      const resp = await verifyCredentials(form);
      if (resp.status === 200) {
        logIn(resp.data);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        if (err.response?.status === 401) {
          console.log('invalid credentials');
          setErrorMessage('Incorrect username or password');
        }
      }
    }
  };

  const errorHandler: SubmitErrorHandler<LoginForm> = (errors) => {
    console.log(errors);
  };

  const renderError = () => {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Login Error</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    );
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <main className="flex flex-col md:flex-row grow">
        <section className="bg-gray-100  dark:bg-gray-800 flex-1">
          <img
            src={bannerImage}
            className="h-full object-cover"
            alt="SJFL banner"
          />
        </section>
        <section className="flex flex-1 items-center justify-center  bg-white dark:bg-gray-950">
          <form
            className="mx-auto w-full max-w-md space-y-6"
            onSubmit={handleSubmit(submitHandler, errorHandler)}
          >
            <img src="logo.png" className="w-20 mx-auto" alt="SJFL Logo" />
            {errorMessage && renderError()}
            <Card>
              <CardHeader className="space-y-2 flex flex-col text-center">
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="email@stjudechild.org"
                    {...register('usernameOrEmail')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      className="text-sm underline underline-offset-4"
                      to="#"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    required
                    type="password"
                    {...register('password')}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" loading={isLoggingIn}>
                  Login
                </Button>
              </CardFooter>
            </Card>
          </form>
        </section>
      </main>
    </div>
  );
};
