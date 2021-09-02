import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';
import { buttonVariants, containerVariants } from './variants';

export const Home = (props) => {
    return (
        <motion.div
            className='home-container'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'>
            <motion.div
                className='home-start-button'
                variants={buttonVariants}
                whileHover='hover'>
                <Link
                    onClick={props.changeStart}
                    to='/maker'
                    style={{ textDecoration: 'none' }}>
                    Start
                </Link>
            </motion.div>
        </motion.div>
    );
};
