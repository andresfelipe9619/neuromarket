import React, { memo, useEffect, useState } from "react";
import {
  Menu,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import {
  ArrowForwardIos as ArrowForwardIosIcon,
  Payment as PaymentIcon,
  PeopleOutlined as PeopleIcon,
  Code as CodeIcon,
  Store as StoreIcon
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Category } from "@neuromarket/services";
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

function CategoriesMenu({ anchorEl, menuId, isMenuOpen, handleMenuClose }) {
  const [categories, setCategories] = useState([]);
  const onSelect = () => {};
  useEffect(() => {
    async function getCategories() {
      const { categories } = await Category.getAll();
      setCategories(categories);
    }
    getCategories();
  }, []);
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
          <Link key={category._id} to={`/category/${category._id}`}>
            <ListItem component="div" onClick={onSelect}>
              <ListItemIcon style={{ color: icons["feature"].color }}>
                {icons["feature"].icon}
              </ListItemIcon>
              <ListItemText primary={category.name} />
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
