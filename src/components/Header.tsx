import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <p className="title-block">Awesome Kanban Board</p>
        <div className="user-menu" onClick={() => setMenuOpen(!isMenuOpen)}>
          <img src="./image/user-menu.svg" alt="" />
          {isMenuOpen && (
            <div className="menu-dropdown ">
              <p className="dropdown-text-top">Profile</p>
              <p className="dropdown-text-bot">Log out</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
