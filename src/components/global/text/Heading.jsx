'use client';
import { motion } from 'framer-motion';

const Heading = ({ level, children, fontSerif = false, className, ...props }) => {
    const Tag = `h${level}`;

    return (
        <Tag className={`${fontSerif ? "font-serif" : "oswald"} bold text-[#404247] flex items-end ${className}`} {...props}>
            <span style={{transform: "translate(0, calc(var(--spacing-unit) * .2))"}}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} >
                    {children}
                </motion.div>
            </span>
        </Tag>
    );
};

export default Heading;