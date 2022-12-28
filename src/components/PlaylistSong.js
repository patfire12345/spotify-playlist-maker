import React, { useEffect, useState } from 'react';

const PlaylistSong = (props) => {
    const [hover, setHover] = useState(props.hoverArrayChild[props.index]);

    useEffect(() => {
        setHover(props.hoverArrayChild[props.index]);
        console.log(hover);
    }, [props.hoverArrayChild, props.index, hover]);
    return (
        <div className='table'>
            {hover ? (
                <div>HI</div>
            ) : (
                <div className='pr-1 table-cell align-middle'>
                    {' '}
                    {props.index + 1}{' '}
                </div>
            )}
            <img
                src={props.image}
                alt={props.name}
                className='m-1 w-1/2 h-1/2'
            />
            <div className='table-cell align-middle'>{props.name}</div>
        </div>
    );
};

export default PlaylistSong;
