import React, {useContext} from 'react';
import {Link, NavLink} from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import {
	withStyles,
	// Card,
	// CardContent,
	CardActionArea,
} from '@material-ui/core';

// Material components
import {
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@material-ui/core';

// Material icons
import {
	DashboardOutlined as DashboardIcon,
	PeopleOutlined as PeopleIcon,
	ShoppingBasketOutlined as ShoppingBasketIcon,
	LockOpenOutlined as LockOpenIcon,
	TextFields as TextFieldsIcon,
	ImageOutlined as ImageIcon,
	AccountBoxOutlined as AccountBoxIcon,
	SettingsOutlined as SettingsIcon,
} from '@material-ui/icons';

// Component styles
import styles from './styles';

import UserContext from '../../../../context/user-context';

const Sidebar = (props) => {
	const user = useContext(UserContext);
	const {classes, className} = props;
	const imgSrc = user.img ? user.img : '/images/avatars/empty_avatar.png';

	const rootClassName = classNames(classes.root, className);

	return (
		<nav className={rootClassName}>
			<div className={classes.logoWrapper}>
				<Link className={classes.logoLink} to='/'>
					<CardActionArea component='div'>
						<Typography
							className={classes.title}
							variant='h1'
							color='primary'
							gutterBottom
						>
							NeuroMarket
						</Typography>
					</CardActionArea>
				</Link>
			</div>
			<Divider className={classes.logoDivider} />
			<div className={classes.profile}>
				<Link to='/dashboard/account'>
					<Avatar alt={user.name} className={classes.avatar} src={imgSrc} />
				</Link>
				<Typography className={classes.nameText} variant='h6'>
					{user.name}
				</Typography>
			</div>
			<Divider className={classes.profileDivider} />
			<List component='div' disablePadding>
				<ListItem
					activeclassname={classes.activeListItem}
					className={classes.listItem}
					component={NavLink}
					to='/dashboard'
				>
					<ListItemIcon className={classes.listItemIcon}>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText
						classes={{primary: classes.listItemText}}
						primary='Dashboard'
					/>
				</ListItem>
				<ListItem
					activeclassname={classes.activeListItem}
					className={classes.listItem}
					component={NavLink}
					to='/dashboard/users'
				>
					<ListItemIcon className={classes.listItemIcon}>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText
						classes={{primary: classes.listItemText}}
						primary='Users'
					/>
				</ListItem>
				<ListItem
					activeclassname={classes.activeListItem}
					className={classes.listItem}
					component={NavLink}
					to='/dashboard/products'
				>
					<ListItemIcon className={classes.listItemIcon}>
						<ShoppingBasketIcon />
					</ListItemIcon>
					<ListItemText
						classes={{primary: classes.listItemText}}
						primary='Products'
					/>
				</ListItem>
				<ListItem
					activeclassname={classes.activeListItem}
					className={classes.listItem}
					component={NavLink}
					to='/sign-in'
				>
					<ListItemIcon className={classes.listItemIcon}>
						<LockOpenIcon />
					</ListItemIcon>
					<ListItemText
						classes={{primary: classes.listItemText}}
						primary='Authentication'
					/>
				</ListItem>
				<ListItem
					activeclassname={classes.activeListItem}
					className={classes.listItem}
					component={NavLink}
					to='/typography'
				>
					<ListItemIcon className={classes.listItemIcon}>
						<TextFieldsIcon />
					</ListItemIcon>
					<ListItemText
						classes={{primary: classes.listItemText}}
						primary='Typography'
					/>
				</ListItem>
				<ListItem
					activeclassname={classes.activeListItem}
					className={classes.listItem}
					component={NavLink}
					to='/dashboard/icons'
				>
					<ListItemIcon className={classes.listItemIcon}>
						<ImageIcon />
					</ListItemIcon>
					<ListItemText
						classes={{primary: classes.listItemText}}
						primary='Icons and Images'
					/>
				</ListItem>
				<ListItem
					activeclassname={classes.activeListItem}
					className={classes.listItem}
					component={NavLink}
					to='/dashboard/account'
				>
					<ListItemIcon className={classes.listItemIcon}>
						<AccountBoxIcon />
					</ListItemIcon>
					<ListItemText
						classes={{primary: classes.listItemText}}
						primary='Account'
					/>
				</ListItem>
				<ListItem
					activeclassname={classes.activeListItem}
					className={classes.listItem}
					component={NavLink}
					to='/dashboard/settings'
				>
					<ListItemIcon className={classes.listItemIcon}>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText
						classes={{primary: classes.listItemText}}
						primary='Settings'
					/>
				</ListItem>
			</List>
		</nav>
	);
};

Sidebar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
