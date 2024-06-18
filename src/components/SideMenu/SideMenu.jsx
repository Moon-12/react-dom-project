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
            {item.menu_name}
          </span>
          <ul className={`nested ${isOpen ? "active" : ""}`}>
            {item.SubMenus.map((subItem) => (
              <MenuItem
                key={subItem.id}
                item={subItem}
                parentMenu={parentMenu + subItem.route}
              />
            ))}
          </ul>
        </>
      ) : (
        <Link className="menu-links" to={`${parentMenu}`}>
          {item.menu_name}
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
  console.log("me", menu);
  return (
    <ul id="myUL">
      {menu &&
        menu.map((item, index) => {
          console.log(item);
          return (
            <MenuItem
              key={item.id}
              item={item}
              parentMenu={"/landing-page" + currentHeaderRoute + item.route}
            />
          );
        })}
    </ul>
  );
};

export default SideMenu;
