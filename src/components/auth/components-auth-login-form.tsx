'use client';
import DefaultAlertComponent from '@/components/alert/elements-alerts-default';
import IconMail from '@/components/icon/icon-mail';
import { z } from '@/utils/id-zod';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import IconPassword from '../icon/icon-password';
import LoadingDotComponent from '../loading-dot';

const ComponentsAuthLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<{ isError: boolean; msg: string }>({ isError: false, msg: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      username: '',
      password: '',
    },
    resolver: zodResolver(
      z.object({
        username: z.string().email().min(1),
        password: z.string().min(4),
      }),
    ),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    setIsLoading(false);
    if (!result?.ok) return setErrorMsg({ isError: true, msg: String(result?.error) });
    setErrorMsg({ isError: false, msg: String(result?.status) });
    return window.location.replace('/');
  });

  return (
    <form className="space-y-5 dark:text-white" onSubmit={onSubmit}>
      {errorMsg?.isError && <DefaultAlertComponent type="danger" message={errorMsg.msg} />}
      <div>
        <label htmlFor="Email">Email</label>
        <div className="relative">
          <input {...register('username', { required: true })} id="Email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconMail fill={true} className="text-primary" />
          </span>
        </div>
      </div>
      <ErrorMessage errors={errors} name="username" render={({ message }) => <DefaultAlertComponent type="warning" message={message} />} />
      <div>
        <label htmlFor="Password">Password</label>
        <div className="relative">
          <input {...register('password', { required: true })} id="Password" type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconPassword className="text-primary" />
          </span>
        </div>
      </div>
      <ErrorMessage errors={errors} name="password" render={({ message }) => <DefaultAlertComponent type="warning" message={message} />} />

      {isLoading && <LoadingDotComponent position="center" />}
      <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_#02988A]">
        Sign in
      </button>
    </form>
  );
};

export default ComponentsAuthLoginForm;
