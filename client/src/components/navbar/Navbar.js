import React, { useState, useContext, useCallback } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { ShoppingCart, Favorite } from "@material-ui/icons";
import MoreIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles";
import ShopContext from "../../context/shop-context";
import { useIntlState } from "../../context/intl-context";
import { withRouter } from "react-router-dom";

import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

function Navbar(props) {
  const classes = useStyles();
  const shopContext = useContext(ShopContext);
  const intlContext = useIntlState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const checked = intlContext.locale === "en";
  const isMenuOpen = !!anchorEl;
  const isMobileMenuOpen = !!mobileMoreAnchorEl;
  const [busqueda, gurdarbusqueda] = useState('');


  const cartItemsCount = shopContext.cart.reduce(
    (count, curItem) => count + curItem.quantity,
    0
  );

  const goTo = useCallback(route => event => props.history.push(route), [
    props.history
  ]);

  const busquedacomparar = (product) => e => {
    console.log("product: ", product);

    shopContext.lookForProduct(product);
    goTo('/busqueda')();
  };

  const favoriteItemsCount = shopContext.favorites.reduce(
    (count, curItem) => count + curItem.quantity,
    0
  );
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleChange = event => {
    let checked = event.target.checked;
    if (!checked) return intlContext.switchToSpanish();
    return intlContext.switchToEnglish();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
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
            NeuroMarker
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>

            </div>
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
              aria-label={`lookingo for your  product `}
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
        <Toolbar component="nav" variant="dense" color="secondary">
          <Typography variant="h6" noWrap gutterBottom onClick={goTo("/products")}>
            Categories
          </Typography>
          <div className={classes.grow} />
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Spanish</Grid>
              <Grid item>
                <Switch checked={checked} onChange={handleChange} />
              </Grid>
              <Grid item>English</Grid>
            </Grid>
          </Typography>
        </Toolbar>
      </AppBar>
      <MemoMobileMenu
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
      <MemoMenu {...{ menuId, anchorEl, isMenuOpen, handleMenuClose, goTo }} />
    </div>
  );
}
const MemoMobileMenu = React.memo(MobileMenu);

function MobileMenu({
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
      keepMounted
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
}
const MemoMenu = React.memo(MyMenu);
function MyMenu({ menuId, anchorEl, isMenuOpen, handleMenuClose, goTo }) {
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
      <MenuItem onClick={goTo('/dashboard/account')}>Profile</MenuItem>
      <MenuItem onClick={goTo('/dashboard')}>My account</MenuItem>
    </Menu>
  );
}

export default withRouter(React.memo(Navbar));
