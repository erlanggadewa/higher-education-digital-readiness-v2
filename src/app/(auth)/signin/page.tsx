import ComponentsAuthLoginForm from '@/components/auth/components-auth-login-form';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login HEDR',
};

const SignIn = () => {
  return (
    <div className="relative flex h-screen w-full flex-col justify-between overflow-hidden rounded-md backdrop-blur-lg dark:bg-black/50 lg:flex-row lg:gap-10 xl:gap-0">
      <div className="relative hidden w-full items-center justify-center bg-cover lg:block lg:w-2/3">
        <Image
          src={'/assets/images/auth/login-background.jpg'}
          alt={'Login Background'}
          fill
          style={{
            filter: 'brightness(40%)',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
        <div className="z-[999] flex h-full w-full items-center px-20">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Higher Education Digital Readiness</h2>

            <p className="mt-3 max-w-3xl text-gray-200 md:text-xl">
              Tingkat kesiapan sumber daya dan sistem yang mendukung berjalannya aktivitas dari institusi pendidikan dengan memanfaatkan teknologi digital, yang meliputi elemen - elemen budaya
              organisasi, kompetensi, infrastruktur dan kebijakan, dan proses
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-md xl:max-w-xl">
        <div className="flex w-full items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
          <Link href="/" className="block w-8 lg:hidden">
            <Image width={1000} height={1000} src="/assets/images/logo.svg" alt="Logo" className="mx-auto w-10" />
          </Link>
        </div>

        <div className="w-full max-w-[440px] lg:mt-16 ">
          <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
          <p className="text-base font-bold leading-normal ">Masukan email dan password anda untuk login</p>
          <br />
          <ComponentsAuthLoginForm />
        </div>

        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()} Higher Education Digital Readiness</p>
      </div>
    </div>
  );
};

export default SignIn;
