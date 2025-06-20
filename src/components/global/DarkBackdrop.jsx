import { motion, AnimatePresence } from 'framer-motion';

export default function DarkBackdrop({ onClose, children }) {
	const handleClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
				onClick={handleClick}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<motion.div
					initial={{ scale: 0.95, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.95, opacity: 0 }}
					transition={{ type: 'spring', stiffness: 200, damping: 20 }}
				>
					{children}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
