'use client';

import IconArrowBackward from '@/components/icon/icon-arrow-left';
import Tippy from '@tippyjs/react';
import { useRouter } from 'next/navigation';
import 'tippy.js/dist/tippy.css';

function BackButton() {
  const router = useRouter();
  return (
    <div className="hidden items-center justify-center sm:flex">
      <Tippy content={`Kembali`} theme="primary">
        <button
          type="button"
          className="bg-white rounded-full p-1"
          onClick={async () => router.back()}
        >
          <IconArrowBackward className="h-5 w-5 text-primary" />
        </button>
      </Tippy>
    </div>
  );
}

export default BackButton;
