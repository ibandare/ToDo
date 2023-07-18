import React from 'react';
import {Container} from 'reactstrap';
import {NavMenu} from './NavMenu';
import Toasts from "../features/toasts/components/Toasts";

export const Layout = ({children}) =>
    (
        <div>
            <NavMenu/>
            <Container>
                <Toasts/>
                {children}
            </Container>
        </div>
    );

