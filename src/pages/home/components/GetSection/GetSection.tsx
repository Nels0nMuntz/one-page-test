import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { Heading, Card, Button } from 'components';
import { Status, UserModel } from 'models';

import './GetSection.scss';


interface GetSectionProps {
    status: Status;
    users: UserModel[];
    showButton: boolean;
    onLoadUsers: () => void;
}

export const GetSection: React.FC<GetSectionProps> = ({ status, users, showButton, onLoadUsers }) => {

    const contentLoading = status === 'initial' || status === 'running';

    const userList = React.useMemo(() => {
        return users.map(({ id, name, email, position, phone, photo }) => (
            <div className="get__item" key={id}>
                <Card
                    name={name}
                    email={email}
                    position={position}
                    phone={phone}
                    photo={photo}
                />
            </div>
        ))
    }, [users]);

    return (
        <section className="get page-section">
            <div className="container">
                <Heading variant="h2">Working with GET request</Heading>
                {contentLoading && (
                    <div className="get__progress">
                        <CircularProgress size={48} color='inherit'/>
                    </div>
                )}
                <div className="get__list">{userList}</div>
                {showButton && (
                    <Button
                        type="button"
                        onClick={onLoadUsers}
                    >
                        Show more
                    </Button>
                )}
            </div>
        </section>
    )
};