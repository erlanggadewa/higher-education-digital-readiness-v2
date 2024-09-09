'use client';
import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const onScrollHandler = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);
    return () => {
      window.removeEventListener('onscroll', onScrollHandler);
    };
  });

  return (
    <div className="fixed bottom-6 z-50 ltr:right-6 rtl:left-6">
      {showTopButton && (
        <button type="button" className="btn btn-outline-primary animate-pulse rounded-full bg-[#fafafa] p-2 dark:bg-[#060818] dark:hover:bg-primary" onClick={goToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m3.165 19.503l7.362-16.51c.59-1.324 2.355-1.324 2.946 0l7.362 16.51c.667 1.495-.814 3.047-2.202 2.306l-5.904-3.152c-.459-.245-1-.245-1.458 0l-5.904 3.152c-1.388.74-2.87-.81-2.202-2.306"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
