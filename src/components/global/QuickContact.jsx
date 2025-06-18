"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { mail, whatsapp, instagram, linkedIn, ArrowUpRight, } from "@/components/SVGs";

export default function QuickContact() {
	const [showContactHoverIndex, setShowContactHoverIndex] = useState(null);

	return (
		<section id="quick-contact-section" className="w-full inline-flex max-sm:flex-col items-center max-sm:items-start justify-between bg-[#E0E5F6] px-4 max-sm:px-3" style={{ marginTop: "var(--spacing-unit)" }}>
			<div className="inline-flex items-center space-x-3" style={{ height: "var(--spacing-unit)" }}>
				<span className="text-gray-600 font-serif font-bold text-[30px] max-sm:text-lg whitespace-nowrap">In a hurry?</span>
				<span className="text-gray-600 font-sans font-normal text-lg max-sm:text-sm whitespace-nowrap max-2xs:truncate max-2xs:max-w-[64%]">Leave a voice note/ message on</span>
			</div>

			<div className="inline-flex items-center space-x-10 max-sm:space-x-5" style={{ height: "var(--spacing-unit)" }} onMouseLeave={() => setShowContactHoverIndex(null)}>
				{[
					{
						name: "mail",
						icon: mail,
						hoverColor: "hover:text-[#537AFF]",
						bgColor: "bg-[#537AFF]",
						label: "hey@idealoftstudio.com",
					},
					{
						name: "whatsapp",
						icon: whatsapp,
						hoverColor: "hover:text-[#25d366]",
						bgColor: "bg-[#25d366]",
						label: "+91-84699 06603",
					},
					{
						name: "instagram",
						icon: instagram,
						hoverColor: "hover:text-[#537AFF]",
						bgColor: "bg-[#537AFF]",
						label: "@idealoftstudio",
					},
					{
						name: "linkedIn",
						icon: linkedIn,
						hoverColor: "hover:text-[#0072b1]",
						bgColor: "bg-[#0072b1]",
						label: "@idealoftstudio",
						},
				].map((item, index) => {
					return (
						<div key={`quick-contact_${index}`} className="flex flex-col relative" >
							<motion.button
								id="social-detail"
								className={`absolute top-[-2.75rem] right-0 ${item.name === "instagram" ? "instagram-gradient" : item.bgColor} inline-flex items-center justify-center h-10 space-x-3 font-display font-normal text-[22px] text-white px-3 py-0 mt-[-3.5%] w-auto`}
								initial={{ scale: 0.8, y: 10, opacity: 0 }}
								animate={ showContactHoverIndex === index ? { scale: 1, y: [0, -5], opacity: 1 } : { scale: 0.8, y: 10, opacity: 0 } }
								transition={{ type: "spring", stiffness: 300, damping: 10, duration: 0.6, }}
							>
								<span className="whitespace-nowrap">{item?.label}</span>
								{ ArrowUpRight }
							</motion.button>
							<button className={`${item?.name} relative outline-none border-none h-10 w-10 max-sm:h-[26px] max-sm:w-[26px] text-gray-800 ${item?.hoverColor} transition-colors duration-[500ms] inline-flex items-center justify-center`} onMouseEnter={() => setShowContactHoverIndex(index)} onMouseLeave={() => setShowContactHoverIndex(null)}>
								{ item?.icon }
							</button>
						</div>
					);
				})}
			</div>
		</section>
	);
}
