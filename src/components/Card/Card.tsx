import React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import { UserModel } from 'models';
import { TextWithTooltip } from 'components';
import fallbackImage from '../../assets/img/avatar-fallback.jpg';

import './Card.scss';


const formatPhone = (phone: string) => `+${phone.replace(/\D/, "")}`;

type CardProps = Pick<UserModel, "name" | "email" | "phone" | "position" | "photo">;

export const Card: React.FC<CardProps> = ({ name, email, phone, position, photo }) => {

    return (
        <div className="card">
            <Stack spacing={2.5} alignItems="center">
                <Avatar src={photo} alt={name} sx={{ width: 70, height: 70 }}>
                    <img src={fallbackImage} alt={name} />
                </Avatar>
                <TextWithTooltip className="card__text">{name}</TextWithTooltip>
                <div className="card__info">
                    <TextWithTooltip className="card__text">{position}</TextWithTooltip>
                    <a href={`mailto:${email}`}>
                        <TextWithTooltip className="card__text">{email}</TextWithTooltip>
                    </a>
                    <a href={`tel:${formatPhone(phone)}`}>
                        <TextWithTooltip className="card__text">{formatPhone(phone)}</TextWithTooltip>
                    </a>
                </div>
            </Stack>
        </div>
    );
};