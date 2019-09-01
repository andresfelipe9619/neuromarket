import React, { memo } from "react";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { ShoppingCart, Favorite } from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";

const MobileMenu = memo(function MobileMenu({
  goTo,
  mobileMenuId,
  cartItemsCount,
  isMobileMenuOpen,
  favoriteItemsCount,
  mobileMoreAnchorEl,
  handleProfileMenuOpen,
  handleMobileMenuClose
}) {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          aria-label={`Show ${cartItemsCount} cart`}
          color="inherit"
          onClick={goTo("/cart")}
        >
          <Badge badgeContent={cartItemsCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label="Show 4 new notifications"
          color="inherit"
          onClick={goTo("/favorites")}
        >
          <Badge badgeContent={favoriteItemsCount} color="secondary">
            <Favorite />
          </Badge>
        </IconButton>
        <p>Favorites</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="Account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
});

export default MobileMenu;