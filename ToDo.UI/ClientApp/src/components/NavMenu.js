import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import "./NavMenu.css";
import useCurrentUser from "hooks/useCurrentUser";

export const NavMenu = () => {
    const user = useCurrentUser();

    const [collapsed, setCollapsed] = useState(false);

    const toggleNavbar = () => {
        setCollapsed(v => !v);
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
                    container light>
                <NavbarBrand tag={Link} to="/">ToDo</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2"/>
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">

                        {user ? (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/">
                                            ToDo
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            tag={Link}
                                            className="text-dark"
                                            to="/users"
                                        >
                                            Users
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <a className="text-dark nav-link" href={user.logoutUrl}>Logout</a>
                                    </NavItem>
                                </>
                            ) :
                            (
                                <NavItem>
                                    <a className="text-dark nav-link" href="/bff/login">Login</a>
                                </NavItem>
                            )
                        }

                    < /ul>
                </Collapse>
            </Navbar>
        </header>

    );

}
