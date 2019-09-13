import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Order } from "@neuromarket/services";

import { withStyles } from "@material-ui/core";
import {
  Button,
  IconButton,
  Typography,
  CircularProgress
} from "@material-ui/core";
import {
  ArrowRight as ArrowRightIcon,
  MoreVert as MoreVertIcon
} from "@material-ui/icons";
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from "../../../../components";
import styles from "./styles";

class ProductList extends Component {


  signal = true;

  state = {
    isLoading: false,
    limit: 4,
    products: [],
    productsTotal: 0,
    order: [],
    orderTotal: 0,
    error: null
  };


  async getorders() {
    try {
      this.setState({ isLoading: true });
      const order = await Order.getAll();
      const newOrder = order.orders;
      console.log(newOrder);
      {
        newOrder.map(order => {
          const json = order.products
          console.log(json);
        })
      }


      if (this.signal) {
        this.setState({
          isLoading: false,
          products: newOrder,

        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }




  componentDidMount() {
    this.signal = true;
    this.getorders();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderProducts() {
    const { classes } = this.props;
    const { isLoading, products } = this.state;
    console.log(products);


    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <Typography variant="h6">There are no products available</Typography>
      );
    }

    return (
      <Fragment>
        {products.map((product, i) => (
          <div className={classes.product}
            key={i}>
            {product.products.map(product => (
              <>
                < div className={classes.productImageWrapper}>
                  <img
                    alt="Product Name"
                    className={classes.productImage}
                    src={product.imageUrl}
                  />
                </div>
                <div className={classes.productDetails}>
                  <Link to="#">
                    <Typography className={classes.productTitle} variant="h5">
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography className={classes.productTimestamp} variant="body2">
                    Updated 5hr ago
                   </Typography>
                </div>

              </>
            ))}
          </div>
        ))
        }
      </Fragment>
    );
  }

  render() {
    const { classes, className, ...rest } = this.props;
    const { productsTotal } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel
            subtitle={`${productsTotal} in total`}
            title="Latest products"
          />
        </PortletHeader>
        <PortletContent className={classes.portletContent}>
          {this.renderProducts()}
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button color="secondary" size="small" variant="text">
            View all <ArrowRightIcon />
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

ProductList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductList);
