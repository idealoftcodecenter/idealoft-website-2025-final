'use client';
import { motion } from 'framer-motion';

const Paragraph = ({ children, className, ...props }) => {

    return (
        <p className={`font-sans ${className}`} {...props}>
            <span style={{transform: "translate(0, calc(var(--spacing-unit) * .4))"}}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} >
                    {children}
                </motion.div>
            </span>
        </p>
    );
};

export default Paragraph;