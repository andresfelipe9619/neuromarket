import React, { memo } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
const ProfileMenu = memo(function ProfileMenu({
  goTo,
  menuId,
  anchorEl,
  isMenuOpen,
  handleMenuClose
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={goTo("/dashboard/account")}>Profile</MenuItem>
      <MenuItem onClick={goTo("/dashboard")}>My account</MenuItem>
    </Menu>
  );
});
export default ProfileMenu;
