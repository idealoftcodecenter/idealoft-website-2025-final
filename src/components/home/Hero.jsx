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
		const bgAnimTop = document.getElementById("bg-anim-top");
		const bgAnimBottom = document.getElementById("bg-anim-bottom");
		const animPointWrapper = document.getElementById("anim-points-wrapper");
		const landingPoint1 = document.getElementById("landing-point-1");
		const landingPoint2 = document.getElementById("landing-point-2");
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
				end: '+=200%', // or use pixel value like '+=800'
				scrub: true,
				pin: true,
				// anticipatePin: 1,
				// once: true 
			},
		});

		
		tl
		.to(rectRef.current, {
			x: "+=7.2%",
			duration: 0.2
		})
		.to(maskedBack, {
			x: "+=10%",
			y: "4%",
			rotation: 20,
			scale: 1.03,
			duration: 0.2,
			onComplete: () => console.log("Animation 1!")
		}, "<")
		.to(backGradient, {
			width: "10%",
			opacity: 1,
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
				opacity: 1,
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

		tl.add([
			gsap.from(animPointWrapper, {
				height: 0,
				duration: 1,
				delay: 1
			}),
		]);

		tl.add([
			gsap.to(landingPoint1, {
				scale: 1,
				duration: 1,
				delay: 2
			}),
		]);
		
		tl.add([
			gsap.to(landingPoint2, {
				scale: 1,
				duration: 1,
				delay: 2
			}),
			gsap.to(bgAnimTop, {
				scale: 0,
				opacity: 0,
				duartion: 1,
				delay: 3,
			}),
			gsap.to(bgAnimBottom, {
				scale: 0,
				opacity: 0,
				duartion: 1,
				delay: 3,
			})
		]);

	}, { scope: containerRef });
	

	return (
		<div className='w-full' style={{ height: "calc(var(--spacing-unit) * 18)", paddingTop: "var(--spacing-unit)" }} ref={containerRef}>
			<div className='relative w-full' style={{ height: "calc(var(--spacing-unit) * 18)" }}>
				<div className='w-full' id='bg-anim-top' style={{ height: "calc(var(--spacing-unit) * 12)", backgroundImage: "url(/assets/cont/home/hero/db-top.webp)", backgroundSize: "cover", backgroundPosition: "center bottom", backgroundRepeat: "no-repeat" }}></div>
				<div className='w-full flex bg-white' id='anim-points-wrapper' style={{ height: "calc(var(--spacing-unit) * 8)" }}>
					<div className="flex-1 flex items-center justify-center">
						<Image src={"/assets/cont/home/hero/one.webp"} id="landing-point-1" width={1002} height={300} alt='test' className='inline-block' style={{ height: "calc(var(--spacing-unit) * 3)", width: "auto", transform: "scale(0)" }} />
					</div>
					<div className="flex-1 flex items-center justify-center" id="lading-point-2">
						<Image src={"/assets/cont/home/hero/two.webp"} id="landing-point-2" width={1002} height={300} alt='test' className='inline-block' style={{ height: "calc(var(--spacing-unit) * 3)", width: "auto", transform: "scale(0)" }} />
					</div>
				</div>
				<div className='w-full' id="bg-anim-bottom" style={{ height: "calc(var(--spacing-unit) * 6)", backgroundImage: "url(/assets/cont/home/hero/db-bottom.webp)", backgroundSize: "cover", backgroundPosition: "center top", backgroundRepeat: "no-repeat" }}></div>
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
						<div className='absolute right-0 top-0 z-10' id="back-shadow"></div>
					</div>
				</div>
			</div>
		</div>
	);

}


