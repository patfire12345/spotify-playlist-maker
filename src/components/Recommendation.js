import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Recommendation.css';
import { containerVariants, buttonVariants } from './variants';

export const Recommendation = (props) => {
    return (
        <motion.div
            className='recommendation-container'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'>
            <motion.div
                className='recommendation-button'
                variants={buttonVariants}
                whileHover='hover'>
                {/* Temporary onClick for convenience, will delete later */}
                <Link
                    onClick={() => props.selectionDone()}
                    to='/'
                    style={{ textDecoration: 'none' }}>
                    Back to Home
                </Link>
            </motion.div>
        </motion.div>
    );
};
