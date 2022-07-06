import React from 'react';

import { Heading, Text, Link } from 'components';

import './Banner.scss';


export const Banner = () => {
    return (
        <section className="banner">
            <div className="banner__container">
                <Heading variant="h1">Test assignment for front-end developer</Heading>
                <Text>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</Text>
                <Link to="/">Sign Up</Link>
            </div>
        </section>
    );
};