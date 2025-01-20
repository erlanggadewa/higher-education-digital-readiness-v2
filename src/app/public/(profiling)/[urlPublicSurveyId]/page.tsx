import Image from 'next/image';
import Link from 'next/link';
import ProfilingPublicSurvey from './profiling-survey';

function PublicCampusPage({ params }: { params: { urlPublicSurveyId: string } }) {
  console.log('🚀 ~ PublicCampusPage ~ params:', params);
  return (
    <div className="relative flex h-screen w-full flex-col justify-between overflow-hidden backdrop-blur-lg dark:bg-black/50 lg:flex-row lg:gap-10 xl:gap-0">
      <div className="relative hidden w-full items-center justify-center bg-cover lg:block lg:w-2/3">
        <Image
          src={'/assets/images/profiling.jpg'}
          alt={'Login Background'}
          fill
          style={{
            filter: 'brightness(40%)',
            objectFit: 'cover',
            zIndex: -1,
          }}
          priority={true}
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

      <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-md xl:max-w-2xl">
        <div className="w-full max-w-[440px]">
          <div className="flex flex-col items-center gap-5">
            <Link href="/" className="block place-content-center">
              <Image width={1000} height={1000} src="/assets/images/hedr.png" alt="Logo" className="w-20" />
            </Link>
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-extrabold capitalize !leading-snug dark:text-white md:text-2xl">Kuesioner Kaprodi</h1>
              <h1 className="text-xl font-extrabold capitalize !leading-snug dark:text-white md:text-2xl">Universitas Telkom</h1>
            </div>
          </div>
          <p className="my-8 text-center text-base font-bold leading-normal dark:text-white">Masukan identitas anda untuk mengakses survei</p>
          <ProfilingPublicSurvey />
        </div>

        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()} Higher Education Digital Readiness</p>
      </div>
    </div>
  );
}

export default PublicCampusPage;
