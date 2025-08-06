"use client";
import React, { useEffect, useRef } from 'react';
import Heading from '../global/text/Heading';
import SetupSection from './SetupSection';
import BuildSection from './BuildSection';
import ScaleSection from './ScaleSection';

function ServicesSection() {
	
	return (
		<section className="w-full" style={{ paddingTop: 'calc(var(--spacing-unit) * 2)' }}>
			<Heading level={6} className="text-[24px] pl-4 md:pl-6 lg:pl-8 max-xl:text-base text-[#B6BAC7] max-sm:text-lg uppercase font-medium">
				LIST OF SERVICES
			</Heading>
			<Heading level={1} className="text-[36px] pl-4 md:pl-6 lg:pl-8 text-[#25262C] max-sm:text-lg max-xl:text-[20px] font-display font-bold leading-9 max-xl:leading-7 max-sm:leading-7" style={{ fontSize: 'calc(var(--spacing-unit) * .7)', lineHeight: 'var(--spacing-unit)', }} >
				We are your extended team to build digital<br />
				products, website & apps
			</Heading>

			<div className="flex items-center justify-center" style={{ marginTop: 'var(--spacing-unit)' }}>
				<div className="flex-1 flex items-center justify-center">
					<SetupSection />
				</div>
				<div className="flex-1 flex items-center justify-center">
					<BuildSection />
				</div>
				<div className="flex-1 flex items-center justify-center">
					<ScaleSection />
				</div>
			</div>
		</section>
	);
}

export default ServicesSection;
