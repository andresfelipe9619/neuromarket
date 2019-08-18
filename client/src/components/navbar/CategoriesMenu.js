import React, { memo } from "react";
import {
  Menu,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem
} from "@material-ui/core";
import {
  ArrowForwardIos as ArrowForwardIosIcon,
  Payment as PaymentIcon,
  PeopleOutlined as PeopleIcon,
  Code as CodeIcon,
  Store as StoreIcon
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const icons = {
  order: {
    icon: <PaymentIcon />,
    color: "blue"
  },
  user: {
    icon: <PeopleIcon />,
    color: "red"
  },
  product: {
    icon: <StoreIcon />,
    color: "green"
  },
  feature: {
    icon: <CodeIcon />,
    color: "purple"
  }
};
const categories = [
  {
    id: 1,
    name: "Deportes",
    description: ""
  },
  {
    id: 2,
    name: "Tecnología",
    description: ""
  },
  {
    id: 3,
    name: "Juguetes y Bebés",
    description: ""
  },
  {
    id: 4,
    name: "Belleza y Cuidado Personal",
    description: ""
  },
  {
    id: 5,
    name: "Libros",
    description: ""
  },
  {
    id: 6,
    name: "Hoogar y Electrodomésticos",
    description: ""
  },
  {
    id: 7,
    name: "Vehículos",
    description: ""
  }
];
function CategoriesMenu({ anchorEl, menuId, isMenuOpen, handleMenuClose }) {
  const onSelect = () => {};
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      // id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <List component="div">
        {categories.map(category => (
          <Link key={category.id} to="#">
            <ListItem component="div" onClick={onSelect}>
              <ListItemIcon style={{ color: icons["feature"].color }}>
                {icons["feature"].icon}
              </ListItemIcon>
              <ListItemText
                primary={category.name}
                secondary={category.description}
              />
              <ArrowForwardIosIcon />
            </ListItem>
            <Divider />
          </Link>
        ))}
      </List>
    </Menu>
  );
}

export default memo(CategoriesMenu);
