'use client';
import DefaultAlertComponent from '@/components/alert/elements-alerts-default';
import IconEmail from '@/components/icon/icon-email';
import IconIdentity from '@/components/icon/icon-identity';
import IconName from '@/components/icon/icon-name';
import LoadingDotComponent from '@/components/loading/loading-dot';
import { api } from '@/trpc/react';
import { cn } from '@/utils/cn';
import { z } from '@/utils/id-zod';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ProfilingPublicSurvey = ({ urlPublicSurveyId }: { urlPublicSurveyId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const createPublicUser = api.public.publicSurvey.createUserPublic.useMutation({
    onMutate() {
      setIsLoading(true);
    },
    onSettled() {
      setIsLoading(false);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    values: {
      urlPublicSurveyId,
      email: '',
      identifyNumber: '',
      name: '',
      checkbox: false,
    },
    resolver: zodResolver(
      z.object({
        urlPublicSurveyId: z.string().min(1),
        name: z.string().min(1, { message: 'Nama tidak boleh kosong' }),
        identifyNumber: z.string().min(1, { message: 'NIDN / NIP / No. Pegawai tidak boleh kosong' }),
        email: z.string().email().min(1, { message: 'Email tidak boleh kosong' }),
        checkbox: z.boolean().refine((value) => value === true, { message: 'Anda harus menyetujui syarat dan ketentuan' }),
      }),
    ),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    createPublicUser.mutate(data);
    // return window.location.replace('/');
  });

  return (
    <form className="space-y-5 dark:text-white" onSubmit={onSubmit}>
      {errorMsg?.isError && <DefaultAlertComponent type="danger" message={errorMsg.msg} />}

      <div className="space-y-3">
        <div>
          <label htmlFor="Name">Nama</label>
          <div className="relative">
            <input {...register('name', { required: true })} id="Name" type="text" placeholder="Masukan Nama..." autoComplete="name" className="form-input ps-10 placeholder:text-white-dark" />
            <span className="absolute start-4 top-1/2 -translate-y-1/2">
              <IconName className="text-primary" />
            </span>
          </div>
        </div>
        <ErrorMessage errors={errors} name="name" render={({ message }) => <DefaultAlertComponent type="warning" message={message} />} />
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="Email">Email</label>
          <div className="relative">
            <input {...register('email', { required: true })} id="Email" type="email" placeholder="Masukan Email..." className="form-input ps-10 placeholder:text-white-dark" />
            <span className="absolute start-4 top-1/2 -translate-y-1/2">
              <IconEmail className="text-primary" />
            </span>
          </div>
        </div>
        <ErrorMessage errors={errors} name="email" render={({ message }) => <DefaultAlertComponent type="warning" message={message} />} />
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="IdentifyNumber">NIDN / NIP / No. Pegawai</label>
          <div className="relative">
            <input
              {...register('identifyNumber', { required: true })}
              id="IdentifyNumber"
              type="identifyNumber"
              placeholder="Masukkan NIDN / NIP / No. Pegawai..."
              className="form-input ps-10 placeholder:text-white-dark"
            />
            <span className="absolute start-4 top-1/2 -translate-y-1/2">
              <IconIdentity className="text-primary" />
            </span>
          </div>
        </div>
        <ErrorMessage errors={errors} name="identifyNumber" render={({ message }) => <DefaultAlertComponent type="warning" message={message} />} />
      </div>

      <div className="space-y-3 pt-6">
        <label className="inline-flex items-center justify-center gap-2">
          <input type="checkbox" className="form-checkbox" {...register('checkbox', { required: true })} />
          <span className="text-sm">Saya sudah mengecek kembali data yang saya masukkan dan bersedia mengikuti survey ini</span>
        </label>
        <ErrorMessage errors={errors} name="checkbox" render={({ message }) => <DefaultAlertComponent type="warning" message={message} />} />
      </div>

      {isLoading && <LoadingDotComponent position="center" />}
      <button type="submit" disabled={!dirtyFields.checkbox} className={cn('btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_#02988A]')}>
        Masuk
      </button>
    </form>
  );
};

export default ProfilingPublicSurvey;
