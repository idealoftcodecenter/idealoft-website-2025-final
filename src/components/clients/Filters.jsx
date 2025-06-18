'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Filters({ tabs, activeTab, onTabClick }) {

	const [showFilters, setShowFilters] = useState(false);
	const dropdownRef = useRef(null);

	// Close on outside click
	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		const overlay = document.querySelector('.tab-list .tab-overlay');
		const activeLi = document.querySelector('.tab-list ul li .active')?.closest('li');

		if (!overlay || !activeLi) return;

		overlay.style.left = `${activeLi.offsetLeft - 2}px`;
		overlay.style.top = `${activeLi.offsetTop}px`;
		overlay.style.width = `${activeLi.offsetWidth + 1}px`;
		overlay.style.height = `${activeLi.offsetHeight}px`;
	}, [activeTab]);
  
    return (
        <section className="w-full mt-[var(--spacing-unit)] border-y-2 border-y-[#E0E5F6] tab-list flex overflow-hidden" style={{ height: "calc(var(--spacing-unit) + 1px)" }}>
			<ul className='hidden md:flex items-center h-full relative mx-[-8px]'>
				{tabs.map((tab, index) => {
					const isActive = index === activeTab;
					return (
						<li key={tab.type} onClick={(e) => onTabClick(index)} className='relative z-10 group overflow-hidden skew-x-[-8deg] border-r-2 border-r-[#E0E5F6]'>
							<button className={`cursor-pointer relative flex items-center justify-center transition-all duration-300 group px-12 skew-x-[8deg] ${isActive && 'active text-white font-bold'}`}>
								<svg className='absolute left-0 -top-2 -z-10' width="66" height="61" viewBox="0 0 66 61" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path className={`origin-center transition-all ${isActive ? "scale-125 -translate-x-3" : "scale-0 translate-x-3"} ${!isActive && "group-hover:scale-[0.4]"} ${isActive ? "fill-[#FEE5E5]" : "fill-[#557EF8]"}`} d="M34.4262 1.4659L37.4079 18.5963C38.0548 22.2893 41.1679 25.1835 45.1401 25.7849L63.5661 28.5569C65.6685 28.8764 65.6685 31.6861 63.5661 32.0056L45.1401 34.7776C41.1679 35.379 38.0548 38.2732 37.4079 41.9662L34.4262 59.0966C34.0825 61.0511 31.0604 61.0511 30.7167 59.0966L27.735 41.9662C27.0881 38.2732 23.975 35.379 20.0028 34.7776L1.57677 32.0056C-0.52559 31.6861 -0.52559 28.8764 1.57677 28.5569L20.0028 25.7849C23.975 25.1835 27.0881 22.2893 27.735 18.5963L30.7167 1.4659C31.0604 -0.488635 34.0825 -0.488635 34.4262 1.4659Z" />
								</svg>
								<span className="pl-5 uppercase">{tab.label}</span>
							</button>
						</li>
					);
				})}
				{/* ✅ overlay must be inside the same ul */}
				<div className="tab-overlay absolute bg-[#6AB47F] skew-x-[-8deg] transition-all duration-200 pointer-events-none z-0"></div>
			</ul>
			<p className='md:hidden h-full flex items-center justify-center w-1/3 border-r-2 border-r-[#E0E5F6] bg-white'>Filter</p>
			<div className='md:hidden w-2/3 relative'>
				<button className='block w-full h-full bg-[#6AB47F] relative' onClick={() => { setShowFilters(!showFilters); }}>
					<span>
						<svg className='absolute left-0 top-0 -z-10' style={{ width: "var(--spacing-unit)", height: "var(--spacing-unit)" }} viewBox="0 0 66 61" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path className={`origin-center transition-all scale-125`} fill="#FEE5E5" d="M34.4262 1.4659L37.4079 18.5963C38.0548 22.2893 41.1679 25.1835 45.1401 25.7849L63.5661 28.5569C65.6685 28.8764 65.6685 31.6861 63.5661 32.0056L45.1401 34.7776C41.1679 35.379 38.0548 38.2732 37.4079 41.9662L34.4262 59.0966C34.0825 61.0511 31.0604 61.0511 30.7167 59.0966L27.735 41.9662C27.0881 38.2732 23.975 35.379 20.0028 34.7776L1.57677 32.0056C-0.52559 31.6861 -0.52559 28.8764 1.57677 28.5569L20.0028 25.7849C23.975 25.1835 27.0881 22.2893 27.735 18.5963L30.7167 1.4659C31.0604 -0.488635 34.0825 -0.488635 34.4262 1.4659Z" />
						</svg>
					</span>
					{ tabs[activeTab].label }
				</button>
				<AnimatePresence>
					{ showFilters && (
						<motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease: 'easeOut' }} className="absolute right-0 w-full origin-top-right bg-white border border-gray-200 shadow-lg z-20">
							<ul className="py-1 text-sm text-gray-700">
								{ tabs.map((tab, index) => (
									<li key={index}>
										<button className={`w-full px-4 py-2 text-left hover:bg-gray-100 uppercase ${activeTab === index && "bg-[#6AB47F] text-white"}`} onClick={() => { setShowFilters(false); onTabClick(index); }}>
											{ tab.label }
										</button>
									</li>
								))}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
        </section>
    );
}
