import styles from "./Navbar.module.scss";
import clsx from "clsx";
import logo from "assets/Logo.jpg";
import { navOptions } from "data/navOptions";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 1024 && showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  });

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1024) {
      setShowMenu(false);
    }
  };

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav className={clsx(styles.navContainer, !show && styles.hidden)}>
      <div className={clsx("container", styles.navbar)}>
        <div className={styles.logoBox}>
          <img src={logo} alt="my logo" className={styles.logo} />
        </div>

        <div className={clsx(styles.menu, showMenu && styles.showMenu)}>
          <ul className={styles.navLinks}>
            {navOptions.map((option) => (
              <li key={nanoid()}>
                <a href={option.path} onClick={closeMenuOnMobile}>
                  {option.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.navBtn} onClick={toggleMenu}>
          {showMenu ? <IoClose /> : <IoMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
