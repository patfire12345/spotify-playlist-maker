import React from 'react';
import PauseIcon from '../icons/PauseIcon';
import PlayIcon from '../icons/PlayIcon';

const PlayButton = ({
    className = 'p-3',
    iconClassName = 'w-4 h-4',
    color = 'text-white',
    backgroundColor = 'bg-green-500',
    active = false,
    ...props
}) => {
    return (
        <button
            className={`rounded-full ${backgroundColor} ${className}`}
            {...props}>
            {active ? (
                <PauseIcon className={`${color} ${iconClassName}`} />
            ) : (
                <PlayIcon className={`${color} ${iconClassName}`} />
            )}
        </button>
    );
};

export default PlayButton;
