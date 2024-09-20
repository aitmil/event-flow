import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <>
      <ThreeDots
        visible={true}
        height="100"
        width="100"
        color="#1677ff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperClass={css.loader}
      />
    </>
  );
}
