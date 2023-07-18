import React from "react";
import {Route, Routes} from 'react-router-dom';
import {Home} from "./features/todo/Home";
import {Layout} from "./components/Layout";
import {Users} from "./features/user/Users";
import {store} from './app/store';
import {Provider} from 'react-redux';

const App = () => (
    <Provider store={store}>
        <Layout>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path="/users" element={<Users/>}/>
        </Routes>
    </Layout>
    </Provider>
);

export default App;
