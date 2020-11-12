import React from 'react';
import AppBar from '@material-ui/core/AppBar';

const styles = {
    appbar: {
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
    },
    logo: {
        width: '80px'
    },
};
  
const Header = () => {
	return (
		<AppBar position="static" style={styles.appbar}>
            <div>
                <img src="shell-logo.png" alt="logo" style={styles.logo} />
            </div>
        </AppBar>
	)
}
export default Header;