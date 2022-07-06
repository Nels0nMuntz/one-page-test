import React from 'react';

import { Heading, Card, Button } from 'components';
import { UserModel } from 'models';

import './GetSection.scss';


interface GetSectionProps {
  users: UserModel[];
  loading: boolean;
  showButton: boolean;
  onLoadUsers: () => void;
}

export const GetSection: React.FC<GetSectionProps> = ({ users, loading, showButton, onLoadUsers }) => {
  return (
    <div className="container">
      <section className="get page-section">
        <Heading variant="h2">Working with GET request</Heading>
        <div className="get__list">
          {users.map(({ id, name, email, position, phone, photo }) => (
            <div className="get__item" key={id}>
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
        {showButton && (
          <Button
            type="button"
            loading={loading}
            onClick={onLoadUsers}
          >
            Show more
          </Button>
        )}
      </section>
    </div>
  )
};