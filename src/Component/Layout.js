import React, {Component} from 'react';
import '../Component/Layout.css'
import Auxiliary from '../hoc/Auxiliary'
import Toolbar from '../Component/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Component/Navigation/SideDrawer/SideDrawer';
class Layout extends Component  {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer};
        });
    }
    render() {
        return (
    <Auxiliary>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler}/>
        <main className="Content">{this.props.children}</main>
    </Auxiliary>
        )
    }
};
export default Layout;

