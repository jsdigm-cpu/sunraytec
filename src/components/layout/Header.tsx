import { Link } from 'react-router-dom';
import MainNav from './MainNav';

export default function Header() {
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
        <Link to="/" style={{ fontWeight: 800, fontSize: '1.25rem' }}>
          (주)썬레이텍
        </Link>
        <MainNav />
      </div>
    </header>
  );
}
