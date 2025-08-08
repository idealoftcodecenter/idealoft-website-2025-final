"use client"

import { useEffect, useRef } from "react";
import CustomAudioPlayer from "./CustomAudioPlayer";

const SetupSection = ({blur}) => {
	const cardsContainerRef = useRef(null);

	useEffect(() => {
		const container = cardsContainerRef.current;
		const cards = container.querySelectorAll(".rotatable-cards");
		const customCursor = document.querySelector(".custom-cursor");

		// Hide cursor when hovering audio player
		const audioBlocks = container.querySelectorAll(".content");

		audioBlocks.forEach((block) => {
			const arrow = block.closest(".rotatable-cards")?.querySelector(".hover-arrow");

			block.addEventListener("mouseenter", () => {
				if (customCursor) customCursor.classList.add("hidden");
				if (arrow) arrow.style.opacity = "0"; // Fade out arrow
			});
			block.addEventListener("mouseleave", () => {
				if (customCursor) customCursor.classList.remove("hidden");
				if (arrow) arrow.style.opacity = "1"; // Fade back in
			});
		});


		cards.forEach((card, i) => {
			const arrow = card.querySelector(".hover-arrow");

			const handleCardClick = (e) => {
				// Prevent click if it originated inside the audio player
				if (e.target.closest(".audio-player-box")) return;

				const clickedCard = e.currentTarget;
				const index = parseInt(clickedCard.getAttribute("data-index"), 10);
				
				const cardWidth = card.offsetWidth;
				const clickX = e.clientX - card.getBoundingClientRect().left;
				
				let isLeftClick = clickX < cardWidth / 2;

				// ✅ Force overrides
				if (index === 1) {
					isLeftClick = false; // always right
				} else if (index === 4) {
					isLeftClick = true; // always left
				}
				
				// Animate out
				if(isLeftClick) {
					if(index === 1) {
						return false;
					} else if(index === 2) {
						cards[0].style.transform = "translateX(-100%) rotate(-10deg) scale(.9)";
					} else if(index === 3) {
						cards[1].style.transform = "translateX(-100%) rotate(-10deg) scale(.9)";
					} else if(index === 4) {
						cards[2].style.transform = "translateX(-100%) rotate(-10deg) scale(.9)";;
					}
				} else {
					card.style.transform = "translateX(100%) rotate(10deg) scale(.9)";
				}

				// Reset position after a delay
				setTimeout(() => {
					
					if(isLeftClick) {
						if (index === 1) {
							return false;
							
						} else if (index === 2) {
							cards[0].style.zIndex = 4;
							cards[1].style.zIndex = 3;
							cards[2].style.zIndex = 2;
							cards[3].style.zIndex = 1;
							cards[0].style.transform = "translateX(0) rotate(0)";
						} else if (index === 3) {
							cards[0].style.zIndex = 2;
							cards[3].style.zIndex = 1;
							cards[2].style.zIndex = 3;
							cards[1].style.zIndex = 4;
							cards[1].style.transform = "translateX(0) rotate(0)";
						} else if(index === 4) {
							cards[0].style.zIndex = 2;
							cards[1].style.zIndex = 1;
							cards[2].style.zIndex = 4;
							cards[3].style.zIndex = 3;
							cards[2].style.transform = "translateX(0) rotate(0)";
						}
					} else {
						card.style.transform = "translateX(0) rotate(0)";
						if (index === 1) {
							cards[0].style.zIndex = 1;
							cards[1].style.zIndex = 4;
							cards[2].style.zIndex = 3;
							cards[3].style.zIndex = 2;
						} else if (index === 2) {
							cards[0].style.zIndex = 2;
							cards[1].style.zIndex = 1;
							cards[2].style.zIndex = 4;
							cards[3].style.zIndex = 3;
						} else if (index === 3) {
							cards[0].style.zIndex = 3;
							cards[1].style.zIndex = 2;
							cards[2].style.zIndex = 1;
							cards[3].style.zIndex = 4;
						} else if (index === 4) {
							return false;
							// cards[0].style.zIndex = 4;
							// cards[1].style.zIndex = 3;
							// cards[2].style.zIndex = 2;
							// cards[3].style.zIndex = 1;
						}
					}
				}, 600);
			};

			const handleMouseEnter = () => {
				const angle = (Math.random() * 16 - 8).toFixed(2);
				card.style.transition = `transform 0.4s ease ${i * 0.05}s`;
				card.style.transform = `rotate(${angle}deg)`;

				const index = parseInt(card.dataset.index, 10);

				if (arrow) {
					if (index === 1) {
						// Show NEXT arrow → pointing right (180deg)
						arrow.style.transform = "translate(-50%, -50%) rotate(180deg)";
						arrow.style.opacity = "1";
					} else if (index === 4) {
						// Show PREV arrow → pointing left (0deg)
						arrow.style.transform = "translate(-50%, -50%) rotate(0deg)";
						arrow.style.opacity = "1";
					} else {
						arrow.style.opacity = "0";
					}
				}
			};
			
			const handleMouseLeave = () => {
				card.style.transition = `transform 0.4s ease ${i * 0.05}s`;
				card.style.transform = "rotate(0deg)";
				if (arrow) {
					arrow.style.opacity = "0";
				}
			};

			const handleMouseMove = (e) => {
				if (!arrow || !card) return;

				const index = parseInt(card.dataset.index, 10);

				// Only show arrow for card 1 and 4
				if (index !== 1 && index !== 4) {
					arrow.style.opacity = "0";
					return;
				}

				const rect = card.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				arrow.style.left = `${x}px`;
				arrow.style.top = `${y}px`;

				if (index === 1) {
					// Card 1 → NEXT → rotate right
					arrow.style.transform = "translate(-50%, -50%) rotate(180deg)";
					arrow.style.opacity = "1";
				} else if (index === 4) {
					// Card 4 → PREV → rotate left
					arrow.style.transform = "translate(-50%, -50%) rotate(0deg)";
					arrow.style.opacity = "1";
				}
			};

			card.addEventListener("mouseenter", handleMouseEnter);
			card.addEventListener("mouseleave", handleMouseLeave);
			card.addEventListener("mousemove", handleMouseMove);
			card.addEventListener("click", handleCardClick);


			// Cleanup for cursor
			return () => {
				card.removeEventListener("mouseenter", handleMouseEnter);
				card.removeEventListener("mouseleave", handleMouseLeave);
				card.removeEventListener("mousemove", handleMouseMove);
				card.removeEventListener("click", handleCardClick);

			};
		});
	}, []);



	return (
		<div ref={cardsContainerRef} className="relative" style={{ width: 'var(--services-card-width)', height: 'var(--services-card-height)' }}>
			{blur && <div className={`absolute left-0 top-0 z-50 w-full h-full inset-0 bg-green-400/60 transition-all duration-300 pointer-events-none`}></div>}
			{/* =================================================== TOP CARD */}
			<div data-index="1" className="absolute left-0 top-0 transition-transform ease-linear duration-500 inset-0 bg-slate-200 rotatable-cards" style={{ zIndex: 4, backgroundImage: "url('/assets/cont/home/services/setup/cover.webp')", backgroundPosition: "center center", backgroundRepeat: "no-repeat", backgroundSize: "101% auto" }}>
				<img src="/assets/cont/home/services/arrow.webp" width={60} height={60} className="hover-arrow absolute top-1/2 left-1/2 w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 pointer-events-none z-50" alt="arrow" style={{filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))"}} />
			</div>


			{/* =================================================== CARD-2 */}
			<div data-index="2" className="absolute left-0 top-0 inset-0 bg-white rotatable-cards flex items-center justify-center overflow-hidden" style={{ zIndex: 3 }}>
				<img src="/assets/cont/home/services/arrow.webp" width={60} height={60} className="hover-arrow absolute top-1/2 left-1/2 w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 pointer-events-none z-50" alt="arrow" style={{filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))"}} />
				<img src="/assets/cont/home/services/setup/cover-flying-lego.webp" width={175} height={200} className="inline-block w-[175px] h-[200px] 2xl:w-[380px] 2xl:h-[393px] absolute left-0 bottom-[-34%] md:bottom-[-20%] lg:bottom-[-26%] lg:left-[10%] lg:scale-125 2xl:left-0 2xl:bottom-[-34%] 2xl:scale-100 translate-x-[-20%] z-10" alt="" />
				<img src="/assets/cont/home/services/setup/cover-flying-lego-2.webp" width={175} height={200} className="inline-block w-[158px] h-[170px] 2xl:w-[319px] 2xl:h-[328px] absolute right-[-53%] top-[-16%] md:right-[-24%] md:top-[-7%] lg:top-[60%] lg:right-[-35%] 2xl:right-[-53%] 2xl:top-[-16%] translate-x-[-20%] z-10" alt="" />
				<div className="content w-[280px] lg:w-[320px] h-[320px] lg:h-[360px] flex flex-col border border-[#E0E5F6] relative">
					<div className="absolute left-0 top-0 border-r border-r-[#E0E5F6] border-b border-b-[#E0E5F6] w-[100px] h-[100px] translate-x-[-100%] translate-y-[-100%]"></div>
					<div className="absolute right-0 top-0 border-l border-l-[#E0E5F6] border-b border-b-[#E0E5F6] w-[100px] h-[100px] translate-x-[100%] translate-y-[-100%]"></div>
					<h3 className="text-ilGreen oswald font-bold text-[18px] md:text-[24px] leading-tight pb-2 border-b border-b-[#E0E5F6] p-2 lg:p-3">Not sure an in-house team, freelancers or an agency?</h3>
					<p className="leading-tight p-2 lg:p-3 text-[14px] md:text-[16px] my-4">
						We work as your extended design team to help set up a lean company- clean and consistent right from start.
					</p>
					<p className="leading-tight font-bold p-2 lg:p-3">
						We are experts in finding the right strategy and design for your audience
					</p>
				</div>
			</div>


			{/* =================================================== CARD-3 (AUDIO CARD) */}
			<div data-index="3" className="absolute left-0 top-0 inset-0 bg-white rotatable-cards flex items-center justify-center overflow-hidden" style={{ zIndex: 2 }}>
				<img src="/assets/cont/home/services/arrow.webp" width={60} height={60} className="hover-arrow absolute top-1/2 left-1/2 w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 pointer-events-none z-50" alt="arrow" style={{filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))"}} />
				<img src="/assets/cont/home/services/setup/card-2-lego.webp" width={230} height={252} className="inline-block w-[230] h-[252px] lg:w-[475px] lg:h-[520px] absolute left-[10%] bottom-[-45%] md:bottom-[-27%] md:scale-125 lg:left-[-20%] lg:bottom-[-70%] lg:scale-75 2xl:left-[10%] 2xl:bottom-[-45%] 2xl:scale-100 z-10" alt="" />
				<div className="content w-[280px] lg:w-[320px] h-[320px] lg:h-[360px] flex flex-col border border-[#E0E5F6] relative">
					<div className="absolute left-0 top-0 border-r border-r-[#E0E5F6] border-b border-b-[#E0E5F6] w-[100px] h-[100px] translate-x-[-100%] translate-y-[-100%]"></div>
					<div className="absolute right-0 top-0 border-l border-l-[#E0E5F6] border-b border-b-[#E0E5F6] w-[100px] h-[100px] translate-x-[100%] translate-y-[-100%]"></div>
					<div className="pb-2 border-b border-b-[#E0E5F6] p-2 lg:p-3 audio-player-box">
						<CustomAudioPlayer src="/assets/cont/home/services/setup/setup-card-audio.mp3" />
					</div>
					<ol className="list-decimal p-2 lg:p-3 text-[14px] md:text-[16px] my-4 ml-4">
						<li className="leading-tight mb-2">We’re your extended team</li>
						<li className="leading-tight mb-2">Alpha testing, analysing performance, studying UX </li>
						<li className="leading-tight mb-2">Human-centric design</li>
					</ol>
				</div>
			</div>


			{/* =================================================== CARD-4 (BOTTOM LIST CARD) */}
			<div data-index="4" className="absolute left-0 top-0 inset-0 bg-white rotatable-cards flex items-center justify-center overflow-hidden" style={{ zIndex: 1 }}>
				<img src="/assets/cont/home/services/arrow.webp" width={60} height={60} className="hover-arrow absolute top-1/2 left-1/2 w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 pointer-events-none z-50" alt="arrow" style={{filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))"}} />
				<img src="/assets/cont/home/services/setup/card-3-lego.webp" width={175} height={200} className="inline-block w-[175px] h-[200px] 2xl:w-[350px] 2xl:h-[450px] absolute right-[-40%] bottom-[-40%] md:right-[-20%] md:bottom-[-15%] lg:right-[-20%] 2xl:right-[-40%] 2xl:bottom-[-40%] 2xl:scale-100 z-10" alt="" />
				<div className="content w-[280px] lg:w-[320px] h-[320px] lg:h-[360px] flex flex-col border border-[#E0E5F6] relative">
					<div className="absolute left-0 top-0 border-r border-r-[#E0E5F6] border-b border-b-[#E0E5F6] w-[100px] h-[100px] translate-x-[-100%] translate-y-[-100%]"></div>
					<div className="absolute right-0 top-0 border-l border-l-[#E0E5F6] border-b border-b-[#E0E5F6] w-[100px] h-[100px] translate-x-[100%] translate-y-[-100%]"></div>
					<h3 className="text-ilGreen oswald font-bold text-[18px] md:text-[24px] leading-tight pb-2 border-b border-b-[#E0E5F6] p-2 lg:p-3">How do we do it?</h3>
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

export default SetupSection