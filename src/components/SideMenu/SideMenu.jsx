import { useState } from "react";
import { useSelector } from "react-redux";
import "./SideMenu.css";
import { Link } from "react-router-dom";

const routeFormatter = (menuName) => {
  return "/" + menuName.toLowerCase().replace(/\s+/g, "-");
};

const MenuItem = ({ item, parentMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      {item.SubMenus && item.SubMenus.length > 0 ? (
        <>
          <span
            className={`caret ${isOpen ? "caret-down" : ""}`}
            onClick={handleToggle}
          >
            {item.MENU_NAME}
          </span>
          <ul className={`nested ${isOpen ? "active" : ""}`}>
            {item.SubMenus.map((subItem) => (
              <MenuItem
                key={subItem.ID}
                item={subItem}
                parentMenu={parentMenu + routeFormatter(subItem.MENU_NAME)}
              />
            ))}
          </ul>
        </>
      ) : (
        <Link className="menu-links" to={`${parentMenu}`}>
          {item.MENU_NAME}
        </Link>
      )}
    </li>
  );
};

const SideMenu = () => {
  const menu = useSelector((state) => state.menu.menu);
  const currentHeaderRoute = useSelector(
    (state) => state.header.currentHeaderRoute
  );
  return (
    <ul id="myUL">
      {menu &&
        menu.map((item) => (
          <MenuItem
            key={item.ID}
            item={item}
            parentMenu={
              "/landing-page" +
              currentHeaderRoute +
              routeFormatter(item.MENU_NAME)
            }
          />
        ))}
    </ul>
  );
};

export default SideMenu;
