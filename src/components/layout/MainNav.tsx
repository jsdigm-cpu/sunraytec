import { NavLink } from 'react-router-dom';

const menus = [
  { to: '/products', label: '제품소개' },
  { to: '/', label: '홈' },
  { to: '/admin', label: 'CMS' },
];

export default function MainNav() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', fontWeight: 700 }}>
      {menus.map((menu) => (
        <NavLink
          key={menu.to}
          to={menu.to}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
            borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
            paddingBottom: '0.35rem',
          })}
        >
          {menu.label}
        </NavLink>
      ))}
    </nav>
  );
}
