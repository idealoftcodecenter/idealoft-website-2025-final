'use client';
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AnimatedLogo() {
	const ref = useRef(null);
	const isInView = true; //useInView(ref, { once: false, margin: "0px 0px -50% 0px" });

	return (
		<div ref={ref} className="relative min-h-[36px] overflow-hidden">
			{
				isInView && (
					<>
						{/* Emoji Animation */}
						<motion.span className="text-[28px] max-sm:text-lg absolute bottom-0" initial={{ y: 50, opacity: 0 }} animate={{ y: [50, 0, 0, -50], opacity: [0, 1, 1, 0] }} transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }} >
							⚡
						</motion.span>

						{/* Logo Animation */}
						<motion.div className="absolute bottom-2" initial={{ y: 50, opacity: 0 }} animate={{ y: [50, 0, 0, -50], opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, delay: 1 }} >
							<Image src="/assets/cont/Idealoft-logo.svg" height={28} width={28} alt="Idealoft Studio" />
						</motion.div>
					</>
				)
			}
		</div>
	);
}
