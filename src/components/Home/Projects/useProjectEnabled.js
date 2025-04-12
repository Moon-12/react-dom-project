import { useSelector } from "react-redux";

const useProjectEnabled = (headerName, menuName, level) => {
  const headers = useSelector((state) => state.header.headers);

  if (!headers) return false;

  const menu = headers.find((header) => header.header_name === headerName);
  if (!menu || !menu.subMenus) return false;

  const projectLevel = menu.subMenus.find((menu) => menu.menu_name === level);

  if (!projectLevel || !projectLevel.SubMenus) return false;

  const subMenu = projectLevel.SubMenus.find(
    (subMenu) => subMenu.menu_name === menuName
  );
  return subMenu ? subMenu.enable : false;
};

export default useProjectEnabled;
