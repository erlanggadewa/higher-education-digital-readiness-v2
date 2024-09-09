'use client';
import IconArrowBackward from '@/components/icon/icon-arrow-backward';
import Tippy from '@tippyjs/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import 'tippy.js/dist/tippy.css';

function BackButton() {
  const router = useRouter();
  return (
    <div className="hidden items-center justify-center sm:flex">
      <Tippy content={`Kembali`} theme="danger">
        <button
          type="button"
          className="btn-sm btn bg-white"
          onClick={async () => {
            const status = await Swal.fire({
              icon: 'warning',
              title: 'Anda yakin ingin keluar dari survei ini?',
              text: 'Semua yang anda kerjakan tidak akan tersimpan!',
              showCancelButton: true,
              confirmButtonText: 'Ya',
              cancelButtonText: 'Batal',
              padding: '2em',
              customClass: { container: 'sweet-alerts' },
            });

            if (!status.isConfirmed) return;

            router.back();
          }}
        >
          <IconArrowBackward className="h-5 w-5 text-danger" />
        </button>
      </Tippy>
    </div>
  );
}

export default BackButton;
