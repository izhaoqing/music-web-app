import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from "./root";

ReactDom.render(
    <AppContainer>
        <Root/>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./root', () => {
        const Newroot = require('./root').default;
        ReactDom.render(
            <AppContainer>
                <Newroot/>
            </AppContainer>,
            document.getElementById('root')
        )
    })
}
