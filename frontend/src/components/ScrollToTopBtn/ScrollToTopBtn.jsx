import { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

import css from './ScrollToTopBtn.module.css';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className={css.btn}>
          <IoIosArrowUp size={36} />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
