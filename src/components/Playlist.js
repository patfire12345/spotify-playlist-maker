import React, { useEffect, useState } from 'react';
import PlaylistSong from './PlaylistSong';

const Playlist = (props) => {
    const [hoverArray, setHoverArray] = useState([]);

    useEffect(() => {
        if (hoverArray.length === 0) {
            props.data.map(() => {
                return setHoverArray([...hoverArray, false]);
            });
        }
    }, [hoverArray, props.data]);

    return (
        <div className='flex justify-end m-10 border-2 h-4/5 float-right bg-black text-white overflow-auto rounded-lg'>
            <ul className='p-5' id='test'>
                <div className='font-bold text-center'>Playlist {'\n'}</div>
                {props.data.map((item, index) => {
                    return (
                        <li
                            className='hover:bg-gray-400'
                            onMouseEnter={(event) => {
                                setHoverArray((oldArray) => {
                                    let newArray = oldArray;
                                    newArray[index] = true;
                                    return newArray;
                                });
                                // console.log(hoverArray);
                            }}
                            onMouseLeave={(event) => {
                                setHoverArray((oldArray) => {
                                    let newArray = oldArray;
                                    newArray[index] = false;
                                    return newArray;
                                });
                                // console.log(hoverArray);
                            }}>
                            <div className='table'>
                                <PlaylistSong
                                    image={item.image}
                                    index={index}
                                    name={item.name}
                                    hoverArrayChild={hoverArray}
                                />
                                {/* {hover ? (
                                    <div>HI</div>
                                ) : (
                                    <div className='pr-1 table-cell align-middle'>
                                        {' '}
                                        {index + 1}{' '}
                                    </div>
                                )}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className='m-1 w-1/2 h-1/2'
                                />
                                <div className='table-cell align-middle'>
                                    {item.name}
                                </div> */}
                                {/* <ul className=''>
                                    <li>{item.name}</li>
                                    <li>
                                        {item.artists.map((artist) => {
                                            return <div> {artist.name} </div>;
                                        })}
                                    </li>
                                </ul> */}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Playlist;
