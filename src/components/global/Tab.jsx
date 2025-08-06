import { useState } from "react";
import { motion } from "framer-motion";

import { starTab } from "@/components/svgs";

export function Tab({ data = [], handleActiveIndex = () => null }) {
  const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="flex">
			<div className="w-1/2">
				<div className="flex items-center h-[2.22vw] border-[4px] border-[#E0E5F6] mt-[calc(2.22vw-2px)] overflow-hidden">
					{data.map((item, index) => {
						return (
							<div key={`tab_${index}`} className={`relative basis-1/3 h-[2.22vw] cursor-pointer`} onClick={() => { setActiveTab(index); handleActiveIndex(index); }}>
								{/* Main tilted div */}
								<motion.div className={`group relative z-[1] flex justify-center items-center h-full w-full ${ activeTab === index ? "bg-green" : "bg-transparent" } transition-all duration-300 overflow-hidden -skew-x-12 ${index < data.length - 1 && "border-r-[4px] border-r-[#E0E5F6]"}`}>
									<span className={`absolute z-1 left-[-1rem] transition-all duration-500 scale-0 ${ activeTab === index ? "scale-100 text-pink" : "text-blue group-hover:scale-50" } skew-x-12`}>
										{starTab}
									</span>
									<div className={`skew-x-12`}>

										<div className={`bg-transparent transition-all duration-500 h-[40px] w-full inline-flex items-center justify-center pl-[56px] max-sm:pl-3 ${ activeTab === index ? "max-sm:!pl-[1.8rem]" : "" } pr-[56px] max-sm:pr-3 relative`}>
											<span className={`text-lg max-xs:text-sm font-sans text-center uppercase whitespace-nowrap ${ activeTab === index ? "text-white font-bold" : "text-gray-800 font-normal" }`} >
												{item?.label}
											</span>
										</div>
									</div>
								</motion.div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="w-1/2"></div>
		</div>
	);
}
