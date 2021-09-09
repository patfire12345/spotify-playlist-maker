import React, { useCallback, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './Slider.css';
import { containerVariants } from './variants';

const Slider = (props) => {
    const x = useMotionValue(0);
    const xInput = [-100, 0, 100];
    const background = useTransform(x, xInput, [
        'linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)',
        'linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)',
        'linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)',
    ]);
    const color = useTransform(x, xInput, [
        'rgb(211, 9, 225)',
        'rgb(68, 0, 255)',
        'rgb(3, 209, 0)',
    ]);
    const tickPath = useTransform(x, [10, 100], [0, 1]);
    const crossPathA = useTransform(x, [-10, -55], [0, 1]);
    const crossPathB = useTransform(x, [-50, -100], [0, 1]);

    const [successOrFailText, setSuccessOrFailText] = useState('');

    const swipe = (result, song, setPoint) => {
        setSuccessOrFailText(result);
        setDummyData([...dummyData, song]);
        setIsAboveRedirectLimit(true);

        setTimeout(() => {
            setSuccessOrFailText('');
        }, 2000);
    };

    const redirectLimit = 150;
    useEffect(() => {
        x.onChange((latestX) => {
            latestX >= redirectLimit &&
                !isAboveRedirectLimit &&
                !isDragging &&
                swipe('Success', '1');

            latestX <= -redirectLimit &&
                !isAboveRedirectLimit &&
                !isDragging &&
                swipe('Failure', '0');

            Math.abs(latestX) < redirectLimit && setIsAboveRedirectLimit(false);
        });
    });

    const [dummyData, setDummyData] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isAboveRedirectLimit, setIsAboveRedirectLimit] = useState(false);

    return (
        <motion.div
            className='example-container'
            style={{ background }}
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'>
            <div className='flex justify-center pt-3 text-3xl'>
                {successOrFailText}
            </div>
            <div className=''>
                <motion.div
                    className='box relative'
                    style={{ x }}
                    drag='x'
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}>
                    <svg className='progress-icon' viewBox='0 0 50 50'>
                        <motion.path
                            fill='none'
                            strokeWidth='2'
                            stroke={color}
                            d='M14,26 L 22,33 L 35,16'
                            strokeDasharray='0 1'
                            style={{ pathLength: tickPath }}
                        />
                        <motion.path
                            fill='none'
                            strokeWidth='2'
                            stroke={color}
                            d='M17,17 L33,33'
                            strokeDasharray='0 1'
                            style={{ pathLength: crossPathA }}
                        />
                        <motion.path
                            fill='none'
                            strokeWidth='2'
                            stroke={color}
                            d='M33,17 L17,33'
                            strokeDasharray='0 1'
                            style={{ pathLength: crossPathB }}
                        />
                    </svg>
                    <div className='absolute bottom-5 right-12'>
                        <svg
                            onClick={() => {
                                x.set(150);
                                setTimeout(() => {
                                    x.set(0);
                                    setSuccessOrFailText('');
                                }, 2000);
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
                    <div className='absolute bottom-5 left-12'>
                        <svg
                            onClick={() => {
                                x.set(-150);
                                setTimeout(() => {
                                    x.set(0);
                                    setSuccessOrFailText('');
                                }, 2000);
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
            </div>
            <div className='absolute right-20 inset-y-2.5'>
                <table className=''>
                    <th>Playlist</th>
                    {dummyData.map((item) => {
                        return <tr>{item}</tr>;
                    })}
                </table>
            </div>
        </motion.div>
    );
};

export default Slider;
