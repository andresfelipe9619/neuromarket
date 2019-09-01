import React, { memo, useState, useContext, useCallback } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import CategoryIcon from "@material-ui/icons/Category";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { ShoppingCart, Favorite } from "@material-ui/icons";
import MoreIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles";
import ShopContext from "../../context/shop-context";
import { withRouter } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import CategoriesMenu from "./CategoriesMenu";
function Navbar(props) {
  const classes = useStyles();
  const shopContext = useContext(ShopContext);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [categoriesAnchorEl, setCategoriesAnchorEl] = useState(null);
  const isProfileMenuOpen = !!profileAnchorEl;
  const isMobileMenuOpen = !!mobileMoreAnchorEl;
  const isCategoriesMenuOpen = !!categoriesAnchorEl;
  const [busqueda, gurdarbusqueda] = useState("");

  const cartItemsCount = shopContext.cart.reduce(
    (count, curItem) => count + curItem.quantity,
    0
  );

  const goTo = useCallback(route => event => props.history.push(route), [
    props.history
  ]);

  const busquedacomparar = product => e => {
    shopContext.lookForProduct(product);
    goTo("/busqueda")(e);
  };

  const favoriteItemsCount = shopContext.favorites.reduce(
    (count, curItem) => count + curItem.quantity,
    0
  );
  const handleProfileMenuOpen = event => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCategoriesMenuOpen = event => {
    setCategoriesAnchorEl(event.currentTarget);
  };

  const handleCategoriesMenuClose = () => {
    setCategoriesAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h1"
            color="inherit"
            gutterBottom
            noWrap
            onClick={goTo("/")}
          >
            NeuroMarket
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              onChange={e => gurdarbusqueda(e.target.value)}
              inputProps={{ "aria-label": "Search" }}
            />
            <IconButton
              aria-label={`looking for your  product `}
              color="inherit"
              onClick={busquedacomparar(busqueda)}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label={`Show ${cartItemsCount} cart`}
              color="inherit"
              onClick={goTo("/cart")}
            >
              <Badge badgeContent={cartItemsCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="Show 4 new notifications"
              color="inherit"
              onClick={goTo("/favorites")}
            >
              <Badge badgeContent={favoriteItemsCount} color="secondary">
                <Favorite />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="Account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="Show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Toolbar component="nav" variant="regular" color="secondary">
          <Typography color="inherit" variant="h4" noWrap gutterBottom>
            Categories
          </Typography>
          <IconButton color="inherit" onClick={handleCategoriesMenuOpen}>
            <CategoryIcon />
          </IconButton>

          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <CategoriesMenu
        {...{
          goTo,
          menuId,
          anchorEl: categoriesAnchorEl,
          isMenuOpen: isCategoriesMenuOpen,
          handleMenuClose: handleCategoriesMenuClose
        }}
      />
      <MobileMenu
        {...{
          goTo,
          mobileMenuId,
          cartItemsCount,
          isMobileMenuOpen,
          favoriteItemsCount,
          mobileMoreAnchorEl,
          handleProfileMenuOpen,
          handleMobileMenuClose
        }}
      />
      <ProfileMenu
        {...{
          goTo,
          menuId,
          anchorEl: profileAnchorEl,
          isMenuOpen: isProfileMenuOpen,
          handleMenuClose: handleProfileMenuClose
        }}
      />
    </div>
  );
}

export default withRouter(memo(Navbar));
