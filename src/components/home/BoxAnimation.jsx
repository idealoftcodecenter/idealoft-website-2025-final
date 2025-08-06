'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ClipPathScrollReveal() {
	const boxRef = useRef(null);
	const containerRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				boxRef.current,
				{
					clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
				},
				{
					clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					ease: 'none',
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top bottom',
						end: 'top top',
						scrub: true
					}
				}
			);
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={containerRef} className="h-[200vh] bg-white">
			<div
				ref={boxRef}
				className="w-full bg-black"
				style={{
					height: 'calc(var(--spacing-unit) * 14)',
					clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
					WebkitClipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
				}}
			/>
		</section>
	);
}
