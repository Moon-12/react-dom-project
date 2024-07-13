import { useSelector } from "react-redux";

const useProjectEnabled = (headerName, menuName) => {
  const headers = useSelector((state) => state.header.headers);

  if (!headers) return false;

  const menu = headers.find((header) => header.header_name === headerName);
  if (!menu || !menu.subMenus || !menu.subMenus[0]) return false;

  const subMenu = menu.subMenus[0].SubMenus.find(
    (subMenu) => subMenu.menu_name === menuName
  );
  return subMenu ? subMenu.enable : false;
};

export default useProjectEnabled;
