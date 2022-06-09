import { Link } from "@remix-run/react";

export function AppLayout({ children }) {
  return (
    <div className="d-grid h-100" style={{ gridTemplateRows: "auto 1fr auto" }}>
      <header className="border-bottom d-flex px-4 py-2 justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-5">
          <Link to="/" className="text-decoration-none d-inline-block fw-bolder fs-2 m-0">
            App Logo
          </Link>
          <div className="d-flex gap-4 position-relative" style={{ top: "3px" }}>
            <Link to="bookmarks" className="text-decoration-none">
              Bookmarks
            </Link>
            <Link to="users" className="text-decoration-none">
              Users
            </Link>
          </div>
        </div>
        <div>
          <Link to="login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="p-4 border-top d-flex justify-content-between align-items-center">
        <div>Remix Enterprise Starter</div>
        <nav className="d-flex gap-4">
          <a href="https://github.com/DroopyTersen/remix-enterprise-starter" target="_blank">
            Source Code
          </a>
          <a href="https://getbootstrap.com/docs/5.0/getting-started/introduction/" target="_blank">
            Bootstrap Docs
          </a>
          <a href="https://remix.run/docs/en/v1" target="_blank">
            Remix Docs
          </a>
        </nav>
      </footer>
    </div>
  );
}
