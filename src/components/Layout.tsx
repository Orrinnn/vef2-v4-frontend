import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="layout">
      <header className="site-header">
        <h1>Fréttavefur</h1>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/">Forsíða</Link>
            </li>
            <li>
              <Link to="/news/create">Ný frétt</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Vefforritun 2 – Verkefni 4</p>
      </footer>
    </div>
  );
}