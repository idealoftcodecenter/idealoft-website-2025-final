"use client";

import React, { useState } from 'react';
import Heading from '../global/text/Heading';
import SetupSection from './SetupSection';
import BuildSection from './BuildSection';
import ScaleSection from './ScaleSection';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function ServicesSection() {
	const [hoverIndex, setHoverIndex] = useState(-1);

	return (
		<section className="w-full" style={{ paddingTop: 'calc(var(--spacing-unit) * 2)' }}>
			<Heading level={6} className="text-[24px] pl-4 md:pl-6 lg:pl-8 max-xl:text-base text-[#B6BAC7] max-sm:text-lg uppercase font-medium">
				LIST OF SERVICES
			</Heading>
			<Heading level={1} className="text-[36px] pl-4 md:pl-6 lg:pl-8 text-[#25262C] max-sm:text-lg max-xl:text-[20px] font-display font-bold leading-9 max-xl:leading-7 max-sm:leading-7" style={{ fontSize: 'calc(var(--spacing-unit) * .7)', lineHeight: 'var(--spacing-unit)', marginBottom: 'var(--spacing-unit)' }} >
				We are your extended team to build digital<br className='hidden md:block' />
				products, website & apps
			</Heading>

			{/* Desktop View */}
			<div className="hidden xl:flex items-center justify-center">
				<div className={`flex-1 flex items-center justify-center transition-all duration-300 ${hoverIndex === 1 || hoverIndex === 2 ? "blur-sm " : ""}`} onMouseEnter={() => setHoverIndex(0)} onMouseLeave={() => setHoverIndex(-1)}>
					<SetupSection blur={hoverIndex > -1 && (hoverIndex === 1 || hoverIndex === 2)} />
				</div>
				<div className={`flex-1 flex items-center justify-center transition-all duration-300 ${hoverIndex === 0 || hoverIndex === 2 ? "blur-sm" : ""}`} onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(-1)}>
					<BuildSection blur={hoverIndex === 0 || hoverIndex === 2} />
				</div>
				<div className={`flex-1 flex items-center justify-center transition-all duration-300 ${hoverIndex === 0 || hoverIndex === 1 ? "blur-sm" : ""}`} onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(-1)}>
					<ScaleSection blur={hoverIndex === 0 || hoverIndex === 1} />
				</div>
			</div>

			{/* Mobile Swiper View */}
			<div className="xl:hidden"> <Swiper spaceBetween={20} slidesPerView={'auto'} centeredSlides={false} breakpoints={{ 768: { spaceBetween: 30, }, }} className="mt-[var(--spacing-unit)] px-4" >
				{/* Setup Card */}
				<SwiperSlide className="!w-auto flex justify-center" >
					<SetupSection blur={hoverIndex > -1 && hoverIndex !== 0} />
				</SwiperSlide>

				{/* Build Card */}
				<SwiperSlide className="!w-auto flex justify-center" >
					<BuildSection blur={hoverIndex > -1 && hoverIndex !== 1} />
				</SwiperSlide>

				{/* Scale Card */}
				<SwiperSlide className="!w-auto flex justify-center" >
					<ScaleSection blur={hoverIndex > -1 && hoverIndex !== 2} />
				</SwiperSlide>
			</Swiper>
			</div>
		</section>
	);
}

export default ServicesSection;
