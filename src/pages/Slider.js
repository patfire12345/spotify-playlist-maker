import React, { useState, useEffect } from 'react';
import {
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
} from 'framer-motion';
import './Slider.css';
import { containerVariants } from './variants';
import PlayButton from '../components/PlayButton';
import Playlist from '../components/Playlist';
import { songs as album } from './SliderData';

const Slider = ({ tracks, albumImageURL }) => {
    var songs = album;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [loading, tracks]);

    const x = useMotionValue(0);
    const xInput = [-100, 0, 100];
    const background = useTransform(x, xInput, [
        'linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)',
        'linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)',
        'linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)',
    ]);
    // const color = useTransform(x, xInput, [
    //     'rgb(211, 9, 225)',
    //     'rgb(68, 0, 255)',
    //     'rgb(3, 209, 0)',
    // ]);
    // const tickPath = useTransform(x, [10, 100], [0, 1]);
    // const crossPathA = useTransform(x, [-10, -55], [0, 1]);
    // const crossPathB = useTransform(x, [-50, -100], [0, 1]);

    const [playlistData, setPlaylistData] = useState([]);
    const [songIndex, setSongIndex] = useState(
        Math.floor(Math.random() * (tracks.length - 1)),
    );
    const [songPlaying, setSongPlaying] = useState(false);
    const [songPreview, setSongPreview] = useState(
        new Audio(tracks[songIndex].preview_url),
    );

    const redirectLimit = 150;

    const controls = useAnimation();

    useEffect(() => {
        setSongPreview(new Audio(tracks[songIndex].preview_url));
    }, [songIndex]);

    const swipe = (swipedRight) => {
        if (Math.abs(x.get()) >= redirectLimit || swipedRight !== undefined) {
            controls.start({
                x:
                    x.get() > 0 || swipedRight
                        ? [x.get(), 500, 0]
                        : [x.get(), -500, 0],
                opacity: [1, 0, 0],
                transition: {
                    duration: 1,
                },
            });

            (x.get() > 0 || swipedRight) &&
                setPlaylistData([
                    ...playlistData,
                    {
                        name: tracks[songIndex].name,
                        image: albumImageURL[2].url,
                        artists: tracks[songIndex].artists[0].name,
                    },
                ]);
            setTimeout(() => {
                songPreview.pause();
                setSongPlaying(false);
                songIndex !== tracks.length - 1
                    ? setSongIndex(songIndex + 1)
                    : setSongIndex(0);
                controls.start({
                    opacity: 1,
                    transition: {
                        duration: 0.5,
                    },
                });
            }, 1000);
        } else {
            controls.start({ x: 0 });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div
            className='h-screen w-screen truncate'
            style={{ background }}
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'>
            <motion.div
                className='box absolute w-1/4 h-3/4 bg-white rounded-lg'
                animate={controls}
                style={{ x }}
                drag='x'
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={() => {
                    swipe();
                }}>
                <div className='absolute top-5 text-center'>
                    {' '}
                    {tracks[songIndex].name}{' '}
                    <img
                        className='h-2/3 w-2/3 mx-auto my-6'
                        draggable='false'
                        src={albumImageURL[1].url}
                        alt={tracks[songIndex].name}
                    />
                    {tracks[songIndex].preview_url !== null && (
                        <PlayButton
                            active={songPlaying}
                            onClick={() => {
                                songPlaying
                                    ? songPreview.pause()
                                    : songPreview.play();
                                setSongPlaying(!songPlaying);
                            }}
                        />
                    )}
                </div>
                <div className='absolute bottom-2 right-12'>
                    <svg
                        onClick={() => {
                            swipe(true);
                        }}
                        xmlns='http://www.w3.org/2000/svg'
                        class='h-12 w-12'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'>
                        <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                    </svg>
                </div>
                <div className='absolute bottom-2 left-12'>
                    <svg
                        onClick={() => {
                            swipe(false);
                        }}
                        xmlns='http://www.w3.org/2000/svg'
                        class='h-12 w-12'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'>
                        <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                    </svg>
                </div>
            </motion.div>
            <Playlist data={playlistData} />
        </motion.div>
    );
};

export { Slider };
