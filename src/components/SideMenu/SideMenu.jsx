import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useDispatch, useSelector } from "react-redux";
import { clearMenu } from "../../redux/slice/menuSlice";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import "./SideMenu.css";

export default function SideMenu() {
  const menu = useSelector((state) => state.menu.menu);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(clearMenu());
  };

  const currentHeaderRoute = useSelector(
    (state) => state.header.currentHeaderRoute
  );
  const MenuItem = ({ item, parentMenu }) => {
    return (
      <div>
        {item.SubMenus && item.SubMenus.length > 0 ? (
          <>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>{item.menu_name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item.SubMenus.map((subItem) => (
                  <MenuItem
                    key={subItem.id}
                    item={subItem}
                    parentMenu={parentMenu + subItem.route}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          </>
        ) : (
          <Link to={`${parentMenu}`} className="menu-links">
            <ListItem key={item.id} disablePadding onClick={toggleDrawer}>
              <ListItemButton>
                <ListItemIcon>
                  {item.menu_name === "My Resume" ? (
                    <InboxIcon />
                  ) : (
                    <DoubleArrowIcon />
                  )}
                </ListItemIcon>

                <ListItemText primary={item.menu_name} />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
      </div>
    );
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menu &&
          menu.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              parentMenu={"/landing-page" + currentHeaderRoute + item.route}
            />
          ))}
      </List>
      <Divider />
      <List></List>
    </Box>
  );

  return (
    <div>
      <Drawer open={menu && menu.length > 0} onClose={toggleDrawer}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
