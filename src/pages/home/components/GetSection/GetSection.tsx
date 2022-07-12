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

    const id = React.useId()
    const initialStatus = status === 'initial';
    const runningStatus = status === 'running';

    return (
        <section id="users" className="get page-section">
            <div className="container">
                <Heading variant="h2">Working with GET request</Heading>
                {initialStatus && (
                    <div className="get__progress">
                        <CircularProgress size={48} color='inherit' />
                    </div>
                )}
                {!!users.length && (
                    <React.Fragment>
                        <div className="get__list">
                            {users.map(({ id: userId, name, email, position, phone, photo }) => (
                                <div className="get__item" key={`${id}-${userId}`}>
                                    <Card
                                        name={name}
                                        email={email}
                                        position={position}
                                        phone={phone}
                                        photo={photo}
                                    />
                                </div>
                            ))}
                        </div>
                        {(showButton) && (
                            <Button
                                type="button"
                                loading={runningStatus}
                                onClick={onLoadUsers}
                            >
                                Show more
                            </Button>
                        )}
                    </React.Fragment>
                )}
            </div>
        </section>
    )
};