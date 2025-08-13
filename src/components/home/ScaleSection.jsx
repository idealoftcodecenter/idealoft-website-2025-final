"use client"

import { useEffect, useRef } from "react";
import CustomAudioPlayer from "./CustomAudioPlayer";

const ScaleSection = ({ blur }) => {
	const cardsContainerRef = useRef(null);
	const scopeRef = useRef(`stack-${Math.random().toString(36).slice(2)}`);

	useEffect(() => {
		const container = cardsContainerRef.current;
		if (!container) return;

		const cards = Array.from(container.querySelectorAll(".rotatable-cards"));
		const arrow = container.querySelector(".hover-arrow");
		if (!arrow) return;

		const audioBlocks = container.querySelectorAll(".audio-player-box");
		const onAudioEnter = () => (arrow.style.opacity = "0");
		const onAudioLeave = () => (arrow.style.opacity = "1");
		audioBlocks.forEach(b => {
			b.addEventListener("mouseenter", onAudioEnter);
			b.addEventListener("mouseleave", onAudioLeave);
		});

		const disposers = [];
		cards.forEach((card) => {
			const index = parseInt(card.getAttribute("data-index"), 10);
			let rafId = null;

			const handleMouseEnter = () => { arrow.style.opacity = "1"; };

			const handleMouseMove = (e) => {
				if (rafId) return;
				rafId = requestAnimationFrame(() => {
					rafId = null;
					const containerRect = container.getBoundingClientRect();
					const cardRect = card.getBoundingClientRect();
					const xInCard = e.clientX - cardRect.left;
					const isRight = index === 1 ? true : index === 4 ? false : xInCard >= cardRect.width / 2;
					arrow.style.left = `${e.clientX - containerRect.left}px`;
					arrow.style.top = `${e.clientY - containerRect.top}px`;
					arrow.style.transform = isRight ? "translate(-50%, -50%) rotate(180deg)" : "translate(-50%, -50%) rotate(0deg)";
					arrow.style.opacity = e.target.closest(".audio-player-box") ? "0" : "1";
				});
			};

			const handleMouseLeave = () => { arrow.style.opacity = "0"; };

			const handleCardClick = (e) => {
			// ignore clicks inside audio UI
			if (e.target.closest(".audio-player-box")) return;

			// 🔇 tell audio players in THIS stack to pause
			window.dispatchEvent(new CustomEvent("PAUSE_AUDIO", { detail: { scope: scopeRef.current } }));

			const cardRect = card.getBoundingClientRect();
			const clickX = e.clientX - cardRect.left;
			let isLeftClick = index === 4 ? true : index === 1 ? false : clickX < cardRect.width / 2;

			// … your existing rotate/z-index logic …
			if (isLeftClick) {
				if (index === 1) return;
				else if (index === 2) cards[0].style.transform = "translateX(-100%) rotate(-10deg) scale(.9)";
				else if (index === 3) cards[1].style.transform = "translateX(-100%) rotate(-10deg) scale(.9)";
				else if (index === 4) cards[2].style.transform = "translateX(-100%) rotate(-10deg) scale(.9)";
			} else {
				card.style.transform = "translateX(100%) rotate(10deg) scale(.9)";
			}

			setTimeout(() => {
				if (isLeftClick) {
				if (index === 2) { cards[0].style.zIndex = 4; cards[1].style.zIndex = 3; cards[2].style.zIndex = 2; cards[3].style.zIndex = 1; cards[0].style.transform = "translateX(0) rotate(0)"; }
				else if (index === 3) { cards[0].style.zIndex = 2; cards[3].style.zIndex = 1; cards[2].style.zIndex = 3; cards[1].style.zIndex = 4; cards[1].style.transform = "translateX(0) rotate(0)"; }
				else if (index === 4) { cards[0].style.zIndex = 2; cards[1].style.zIndex = 1; cards[2].style.zIndex = 4; cards[3].style.zIndex = 3; cards[2].style.transform = "translateX(0) rotate(0)"; }
				} else {
				card.style.transform = "translateX(0) rotate(0)";
				if (index === 1) { cards[0].style.zIndex = 1; cards[1].style.zIndex = 4; cards[2].style.zIndex = 3; cards[3].style.zIndex = 2; }
				else if (index === 2) { cards[0].style.zIndex = 2; cards[1].style.zIndex = 1; cards[2].style.zIndex = 4; cards[3].style.zIndex = 3; }
				else if (index === 3) { cards[0].style.zIndex = 3; cards[1].style.zIndex = 2; cards[2].style.zIndex = 1; cards[3].style.zIndex = 4; }
				}
			}, 600);
			};

			card.addEventListener("mouseenter", handleMouseEnter);
			card.addEventListener("mousemove", handleMouseMove);
			card.addEventListener("mouseleave", handleMouseLeave);
			card.addEventListener("click", handleCardClick);

			disposers.push(() => {
			if (rafId) cancelAnimationFrame(rafId);
			card.removeEventListener("mouseenter", handleMouseEnter);
			card.removeEventListener("mousemove", handleMouseMove);
			card.removeEventListener("mouseleave", handleMouseLeave);
			card.removeEventListener("click", handleCardClick);
			});
		});

		return () => {
			audioBlocks.forEach(b => {
			b.removeEventListener("mouseenter", onAudioEnter);
			b.removeEventListener("mouseleave", onAudioLeave);
			});
			disposers.forEach(off => off());
		};
	}, []);

	return (
		<div ref={cardsContainerRef} className="relative" style={{ width: 'var(--services-card-width)', height: 'var(--services-card-height)' }}>
			{blur && <div className={`absolute left-0 top-0 z-50 w-full h-full inset-0 bg-green-400/60 transition-all duration-300 pointer-events-none`}></div>}
			<img src="/assets/cont/home/services/arrow.webp" width={60} height={60} className="hover-arrow absolute top-1/2 left-1/2 w-[48px] h-[48px] opacity-0 transition-opacity duration-150 pointer-events-none z-50" alt="arrow" style={{ filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))", willChange: "transform,left,top" }} />

			{/* =================================================== TOP CARD */}
			<div data-index="1" className="rotatable-cards absolute left-0 top-0 inset-0 bg-slate-200 transition-all duration-500 ease-linear" style={{ zIndex: 4, backgroundImage: "url('/assets/cont/home/services/scale/cover.webp')", backgroundPosition: "center center", backgroundRepeat: "no-repeat", backgroundSize: "101% auto" }}></div>


			{/* =================================================== CARD-2 */}
			<div data-index="2" className="absolute left-0 top-0 inset-0 bg-white rotatable-cards flex items-center justify-center overflow-hidden transition-all duration-500 ease-linear" style={{ zIndex: 3 }}>
				<img src="/assets/cont/home/services/arrow.webp" width={60} height={60} className="hover-arrow absolute top-1/2 left-1/2 w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 pointer-events-none z-50" alt="arrow" style={{filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))"}} />
				<img src="/assets/cont/home/services/scale/card-1-lego-1.webp" width={175} height={200} className="inline-block w-[175px] h-[200px] 2xl:w-[380px] 2xl:h-[393px] absolute left-0 bottom-[-34%] md:bottom-[-20%] lg:bottom-[-24%] xl:scale-125 2xl:left-0 2xl:bottom-[-38%] 2xl:scale-100 translate-x-[-20%] z-10" alt="" />
				<div className="content w-[280px] lg:w-[320px] h-[320px] lg:h-[360px] flex flex-col border border-[#E0E5F6] relative">
					<div className="absolute left-0 top-0 border-r border-r-[#E0E5F6] border-b border-b-[#E0E5F6] w-[100px] h-[100px] translate-x-[-100%] translate-y-[-100%]"></div>
					<div className="absolute right-0 top-0 border-l border-l-[#E0E5F6] border-b border-b-[#E0E5F6] w-[100px] h-[100px] translate-x-[100%] translate-y-[-100%]"></div>
					<h3 className="text-cedar oswald font-bold text-[18px] md:text-[24px] leading-tight pb-2 border-b border-b-[#E0E5F6] p-2 lg:p-3">Standardise and scaling up your business?</h3>
					<p className="leading-tight p-2 lg:p-3 text-[14px] md:text-[16px] my-4">
						We excel in working with tools & platforms that manages deadlines and objectives.
					</p>
					<p className="leading-tight font-bold p-2 lg:p-3">
						More importantly, sync between your managers, designers and developers. We have done this before!
					</p>
				</div>
			</div>


			{/* =================================================== CARD-3 (AUDIO CARD) */}
			<div data-index="3" className="absolute left-0 top-0 inset-0 bg-white rotatable-cards flex items-center justify-center overflow-hidden transition-all duration-500 ease-linear" style={{ zIndex: 2 }}>
				<img src="/assets/cont/home/services/arrow.webp" width={60} height={60} className="hover-arrow absolute top-1/2 left-1/2 w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 pointer-events-none z-50" alt="arrow" style={{filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))"}} />
				<img src="/assets/cont/home/services/scale/card-2-lego-1.webp" width={241} height={231} className="inline-block w-[241] h-[231px] 2xl:w-[363px] 2xl:h-[348px] absolute left-[-14%] bottom-[-30%] md:left-[-5%] md:bottom-[-25%] z-10" alt="" />
				<div className="content w-[280px] lg:w-[320px] h-[320px] lg:h-[360px] flex flex-col border border-[#E0E5F6] relative">
					<div className="absolute left-0 top-0 border-r border-r-[#E0E5F6] border-b border-b-[#E0E5F6] w-[100px] h-[100px] translate-x-[-100%] translate-y-[-100%]"></div>
					<div className="absolute right-0 top-0 border-l border-l-[#E0E5F6] border-b border-b-[#E0E5F6] w-[100px] h-[100px] translate-x-[100%] translate-y-[-100%]"></div>
					<div className="pb-2 border-b border-b-[#E0E5F6] p-2 lg:p-3 audio-player-box">
						<CustomAudioPlayer scope={scopeRef.current} src="/assets/cont/home/services/scale/scale-card-audio.mp3" />
					</div>
					<ol className="list-decimal p-2 lg:p-3 text-[14px] md:text-[16px] my-4 ml-4">
						<li className="leading-tight mb-2">We’re your extended team</li>
						<li className="leading-tight mb-2">Alpha testing, analysing performance, studying UX </li>
						<li className="leading-tight mb-2">Human-centric design</li>
					</ol>
				</div>
			</div>


			{/* =================================================== CARD-4 (BOTTOM LIST CARD) */}
			<div data-index="4" className="rotatable-cards absolute left-0 top-0 inset-0 bg-white flex items-center justify-center overflow-hidden transition-all duration-500 ease-linear" style={{ zIndex: 1 }} >
				<img src="/assets/cont/home/services/arrow.webp" width={60} height={60} className="hover-arrow absolute top-1/2 left-1/2 w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 pointer-events-none z-50" alt="arrow" style={{filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))"}} />
				<img src="/assets/cont/home/services/scale/card-3-lego-1.webp" width={160} height={220} className="inline-block w-[160px] h-[220px] 2xl:w-[240px] 2xl:h-[332px] absolute bottom-[-25%] right-[-12%] sm:right-[-10%] sm:bottom-[-20%] lg:right-[-5%] xl:right-0 z-10" alt="" />
				<div className="content w-[280px] lg:w-[320px] h-[320px] lg:h-[360px] flex flex-col border border-[#E0E5F6] relative">
					<div className="absolute left-0 top-0 border-r border-r-[#E0E5F6] border-b border-b-[#E0E5F6] w-[100px] h-[100px] translate-x-[-100%] translate-y-[-100%]"></div>
					<div className="absolute right-0 top-0 border-l border-l-[#E0E5F6] border-b border-b-[#E0E5F6] w-[100px] h-[100px] translate-x-[100%] translate-y-[-100%]"></div>
					<h3 className="text-cedar oswald font-bold text-[18px] md:text-[24px] leading-tight pb-2 border-b border-b-[#E0E5F6] p-2 lg:p-3">How do we do it?</h3>
					<ul className="space-y-1 text-[16px] leading-tight font-light text-[#25262C] ml-4">
						<li className="flex items-start gap-2 border-b border-[#E0E5F6] leading-tight py-1">
							<span className="mt-[6px] w-[6px] h-[6px] bg-cedar"></span>
							<span className="leading-tight">Product Ideation & Concepts</span>
						</li>
						<li className="flex items-start gap-2 border-b border-[#E0E5F6] leading-tight py-1">
							<span className="mt-[6px] w-[6px] h-[6px] bg-cedar"></span>
							<span className="leading-tight">Wireframes & User Mapping</span>
						</li>
						<li className="flex items-start gap-2 border-b border-[#E0E5F6] leading-tight py-1">
							<span className="mt-[6px] w-[6px] h-[6px] bg-cedar"></span>
							<span className="leading-tight">Product Growth Strategy</span>
						</li>
						<li className="flex items-start gap-2 border-b border-[#E0E5F6] leading-tight py-1">
							<span className="mt-[6px] w-[6px] h-[6px] bg-cedar"></span>
							<span className="leading-tight">UX Audits & Product Revamps</span>
						</li>
						<li className="flex items-start gap-2 border-b border-[#E0E5F6] leading-tight py-1">
							<span className="mt-[6px] w-[6px] h-[6px] bg-cedar"></span>
							<span className="leading-tight">Design Sprints for Innovation</span>
						</li>
						<li className="flex items-start gap-2 border-b border-[#E0E5F6] leading-tight py-1">
							<span className="mt-[6px] w-[6px] h-[6px] bg-cedar"></span>
							<span className="leading-tight">Conceptual UX</span>
						</li>
						<li className="flex items-start gap-2 border-b border-[#E0E5F6] leading-tight py-1">
							<span className="mt-[6px] w-[6px] h-[6px] bg-cedar"></span>
							<span className="leading-tight">Full coded prototypes</span>
						</li>
						<li className="flex items-start gap-2 leading-tight py-1">
							<span className="mt-[6px] w-[6px] h-[6px] bg-cedar"></span>
							<span className="leading-tight">Creative Direction</span>
						</li>
					</ul>
				</div>
			</div>			
		</div>
	)
}

export default ScaleSection