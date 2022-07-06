import React from 'react';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { Instance } from '@popperjs/core';

import { ChildrenProps } from 'models';

import './Text.scss';
import 'assets/styles/global/globalCssTooltip.scss';


interface TextWithTooltipProps extends ChildrenProps {
    className?: string;
};

export const TextWithTooltip: React.FC<TextWithTooltipProps> = ({ className, children }) => {

    const [tooltipTitle, setTooltipTitle] = React.useState<string>('');

    const positionRef = React.useRef<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const popperRef = React.useRef<Instance>(null);
    const areaRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: React.MouseEvent) => {
        positionRef.current = { x: event.clientX - 16, y: event.clientY };

        if (popperRef.current != null) {
            popperRef.current.update();
        }
    };

    React.useEffect(() => {
        if (!areaRef.current) return;
        if (areaRef.current.offsetWidth < areaRef.current.scrollWidth && areaRef.current.textContent) {
            setTooltipTitle(areaRef.current.textContent);
        };
    }, [])

    return (
        <Tooltip
            title={tooltipTitle}
            placement="bottom-start"
            PopperProps={{
                popperRef,
                anchorEl: {
                    getBoundingClientRect: () => {
                        return new DOMRect(
                            positionRef.current.x,
                            areaRef.current!.getBoundingClientRect().y + 26,
                            0,
                            0,
                        );
                    },
                },
            }}
        >
            <Typography
                className={`typography-text ${!!className && className}`}
                ref={areaRef}
                onMouseMove={handleMouseMove}
            >
                {children}
            </Typography>
        </Tooltip >
    )
};