'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';


gsap.registerPlugin(ScrollTrigger); 

export default function Hero() {
	const containerRef = useRef(null);
	const rectRef = useRef(null);

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger);
		const containerWidth = containerRef.current.offsetWidth;
		const containerHeight = containerRef.current.offsetHeight;
		const maskedBack = document.getElementById("masked-back");
		const backGradient = document.getElementById("back-gradient");
		const backShadow = document.getElementById("back-shadow");
		// maskedBack.style.width = containerWidth;
		// maskedBack.style.height = containerHeight;

		const tl = gsap.timeline({
			defaults: { 
				duration: 10,
				ease: 'power1.out' 
			},
			scrollTrigger: {
        		trigger: containerRef.current,
				start: 'top top',
				end: '+=100%', // or use pixel value like '+=800'
				scrub: true,
				pin: true,
				anticipatePin: 1
			},
		});

		
		tl.to(rectRef.current, {
			x: "+=7.2%",
			duration: 0.2
		}).to(maskedBack, {
			x: "+=10%",
			y: "4%",
			rotation: 20,
			scale: 1.03,
			duration: 0.2,
			onComplete: () => console.log("Animation 1!")
		}, "<")
		.to(backGradient, {
			width: "10%",
			duration: 0.2,
		}, "<");

		tl.add([
			gsap.to(rectRef.current, {
				x: "+=50%",
				duration: 2,
			}),
			gsap.to(maskedBack, {
				x: "+=100%",
				y: "23%",
				scale: 1.05,
				rotation: 15,
				duration: 2,
			}),
			gsap.to(backGradient, {
				width: "40%",
				duration: 2,
			}),
		])

		tl.add([
			gsap.to(rectRef.current, {
				x: "+=100%",
				duration: 2,
			}),
			gsap.to(maskedBack, {
				x: "+=200%",
				y: "66%",
				scale: 1.05,
				rotation: 15,
				duration: 2,
			}),
			gsap.to(backGradient, {
				left: "-85%",
				opacity: 0.2,
				duration: 2,
			})
		]);

	}, { scope: containerRef });
	

	return (
		<div className='w-full' style={{ height: "calc(var(--spacing-unit) * 18)", paddingTop: "var(--spacing-unit)" }} ref={containerRef}>
			<div className='relative w-full' style={{ height: "calc(var(--spacing-unit) * 18)" }}>
				<div className='w-full' style={{ height: "calc(var(--spacing-unit) * 12)", backgroundImage: "url(/assets/cont/home/hero/db-top.webp)", backgroundSize: "cover", backgroundPosition: "center bottom", backgroundRepeat: "no-repeat" }}>
					{/* <Image src="/assets/cont/home/hero/db-top.webp" width={2400} height={1042} alt="" className='inline-block w-full' /> */}
				</div>
				<div className='w-full' style={{ height: "calc(var(--spacing-unit) * 6)", backgroundImage: "url(/assets/cont/home/hero/db-bottom.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat" }}>
					{/* <Image src="/assets/cont/home/hero/db-bottom.webp" width={2400} height={1042} alt="" className='inline-block w-full' /> */}
				</div>
			</div>
			<div className="innerContainer w-full h-full absolute left-0 top-0 z-30" style={{ top: "var(--spacing-unit)" }}>
				<svg width="0" height="0">
					<mask id="rect-mask">
						<rect width="100%" height="100%" fill="black" />
						<rect id="sticker-front-mask" ref={rectRef} width="1800" height="1800" fill="white" />
					</mask>
				</svg>
				<div className="masked-front w-full h-full text-white flex justify-center items-center text-[24px]" style={{ WebkitMask: 'url(#rect-mask)', mask: 'url(#rect-mask)', backgroundImage: "url('/assets/cont/home/hero/business-designers-text-2.webp')", backgroundSize: "100%", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }}></div>
				<div className="absolute left-0 top-0 z-2 overflow-hidden" style={{ WebkitMask: 'url(#rect-mask)', mask: 'url(#rect-mask)', width: "300%", height: "260%" }}>
					<div className='relative' id="masked-back">
						<div className='absolute right-0 top-0 z-10' id="back-shadow"></div>
						<div className='w-full h-full z-20' style={{ backgroundImage: "url(/assets/cont/home/hero/sticker-back.webp)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}></div>
						<div className='absolute right-0 top-0 z-40' id="back-gradient"></div>
					</div>
				</div>
			</div>
		</div>
	);

}


