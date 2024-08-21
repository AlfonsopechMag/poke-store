import { useState } from 'react';
import css from "./header.module.scss"

export default function NewHeader(params) {
    const [isActive, setIsActive] = useState(false);

    //add the active class
    const toggleActiveClass = () => {
      setIsActive(!isActive);
    };
  
    //clean up function to remove the active class
    const removeActive = () => {
      setIsActive(false)
    }

    return(
        <div className="App">
      <header className="App-header">

        <nav className={css.navbar}>

          {/* logo */}
          <a href='#home' className={css.logo}>Dev. </a>

          <ul className={`${css.navMenu} ${isActive ? css.active : ''}`}>
            <li onClick={removeActive}>
              <a href='#home' className={css.navLink}>Home</a>
            </li>
            <li onClick={removeActive}>
              <a href='#home' className={css.navLink}>Catalog</a>
            </li>
            <li onClick={removeActive}>
              <a href='#home' className={css.navLink}>All products</a>
            </li>
            <li onClick={removeActive}>
              <a href='#home' className={css.navLink}>Contact</a>
            </li>
          </ul>

          <div className={`${css.hamburger} ${isActive ? css.active : ''}`}  onClick={toggleActiveClass}>
            <span className={css.bar}></span>
            <span className={css.bar}></span>
            <span className={css.bar}></span>
          </div>
        </nav>

      </header>
    </div>
    )
    
}