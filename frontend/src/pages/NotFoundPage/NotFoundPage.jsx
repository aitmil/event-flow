import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <p className={css.text}>
      Sorry, page is not found! Please back to <Link to="/">home page</Link>!
    </p>
  );
}
