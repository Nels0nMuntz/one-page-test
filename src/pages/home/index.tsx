import React from 'react';

import { Header } from 'components';
import { Banner } from './components';
import { GetContainer, PostContainer } from './containers';


export const HomePage = () => {
    return (
        <div>
            <Header />
            <main>
                <Banner />
                <GetContainer/>
                <PostContainer/>
            </main>
        </div>
    );
};