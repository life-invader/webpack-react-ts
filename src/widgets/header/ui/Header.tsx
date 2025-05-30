import { Link } from 'react-router';
import '../style.scss';

export const Header = () => {
  return (
    <header className="header">
      <p>Hrader</p>

      <ul>
        <li>
          <a href="">Главная</a>
        </li>

        <li>
          <Link to="/about">О компании</Link>
        </li>

        <li>
          <a href="">Shop</a>
        </li>
      </ul>
    </header>
  );
};
