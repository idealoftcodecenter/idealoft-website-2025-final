"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import parse from "html-react-parser";

import { arrowAccordion } from "@/components/svgs";
import { processAccordion } from "@/constants/process.constant";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


export default function ProcessSection() {
	const contentRefs = useRef([]);
	const tabRefs = useRef([]);
	const scrollTabIntoView = (i) => {
		const el = tabRefs.current[i];
		if (!el) return;
		el.scrollIntoView({ behavior: "smooth", block: "start" }); // works with scroll-mt
	};

	const [activeIndex, setActiveIndex] = useState(null);


	useEffect(() => {
		contentRefs.current.forEach((ref, i) => {
			if (ref) {
				ref.style.maxHeight = activeIndex === i ? `${ref.scrollHeight}px` : "0px";
			}
		});
	}, [activeIndex]);

	return (
		<section className={``} style={{ marginTop: "calc(var(--spacing-unit) * 3)" }}>
			<div className="inline-flex flex-col w-full">
				{/* Data backed */}

				{
					processAccordion.map((item, index) => {
						let bgColor = "bg-tabGrey";
						let iconColor = "text-gray-400";
						let textColor = "text-gray-700";

						if (activeIndex === 0 && activeIndex === index) {
							bgColor = "bg-neonGreen";
							iconColor = "text-cedar";
							textColor = "text-ilGreen";
						}

						if (activeIndex === 1 && activeIndex === index) {
							bgColor = "bg-ilGreen";
							iconColor = "text-ilPink";
							textColor = "text-neonGreen";
						}

						if (activeIndex === 2 && activeIndex === index) {
							bgColor = "bg-cedar";
							iconColor = "text-neonGreen";
							textColor = "text-ilPink";
						}

					return (
						<div
							key={`process_${index}`}
							ref={(el) => (tabRefs.current[index] = el)}
							className="w-full flex flex-col h-auto scroll-mt-[50px]"
							onClick={() => {
								const prev = activeIndex;
								const next = prev === index ? null : index;

								setActiveIndex(next);

								// If another tab is open and will collapse, wait for its transition end
								if (prev !== null && prev !== index) {
									const prevContent = contentRefs.current[prev];
									if (prevContent) {
										const onEnd = (ev) => {
											if (ev.propertyName !== "max-height") return; // only react to our height transition
											prevContent.removeEventListener("transitionend", onEnd);
											// Layout is stable now; scroll on the next frame
											requestAnimationFrame(() => scrollTabIntoView(index));
										};
										prevContent.addEventListener("transitionend", onEnd, { once: true });
										return; // stop here; we'll scroll after collapse
									}
								}

								// No previous open panel — or we couldn't find it. Just scroll next frame.
								requestAnimationFrame(() => scrollTabIntoView(index));
							}}
						>

							{/* =================================================== ACCORDION HANDLES */}
							<div className={`flex w-full justify-end items-end border-b-2 border-b-[#DCDFEB] cursor-pointer tab-bar-shadow`} style={{height: "calc(var(--spacing-unit))"}}>
								<div className={`transition-colors duration-[600ms] ${bgColor} min-w-[300px] max-sm:min-w-[80%] max-w-[420px] pl-4 py-[2px] rounded-t-[4px] relative mr-[3%] tab-inner-shadow`}>
									<h6 className={`uppercase text-lg max-sm:text-sm font-sans font-bold ${textColor}`} style={{height: "calc(var(--spacing-unit) - 14px)", transform: "translate(0, calc(var(--spacing-unit) * .1))"}}>{item?.label}</h6>
									<span className={`transition-colors duration-[600ms] ${iconColor} absolute right-0 bottom-0`} >
										{arrowAccordion}
									</span>
								</div>
							</div>

							{/* =================================================== ACCORDION DATA */}
							<div ref={(el) => (contentRefs.current[index] = el)} className="overflow-hidden w-full bg-ilBgGrey sm:px-3 md:px-7" style={{ maxHeight: "0px", transition: "max-height 0.3s ease" }}>
								<div className="inline-flex w-full items-center py-6 border-b border-b-gray-200 border-dashed">
									<h4 className="uppercase text-gray-800 text-2xl max-sm:text-xl font-medium font-display">
										{item?.heading}
									</h4>
								</div>
								{/* Desktop view: flex grid */}
								<div className="hidden sm:flex flex-row justify-between gap-10 px-3" style={{paddingTop: "var(--spacing-unit)"}}>
									{
										item?.data?.map((card, cardIndex) => {
											return (
												<div key={`card_index_${cardIndex}`} style={{ height: "calc(var(--spacing-unit) * 13)" }} className={`w-1/3 transition-all duration-300`}>
													<div className="relative w-full flex justify-center" style={{height: "calc(var(--spacing-unit) * 5)"}}>
														<Image src={card?.image} width={327} height={210} alt={card?.content} />
														{
															card?.mockup && (
															<div className={`h-[${card?.mockup?.height}px] w-[${card?.mockup?.width}px] max-sm:w-[102px] max-sm:h-[160px] absolute bottom-0 left-[6%] z-[1]`}>
																<Image src={card?.mockup?.url} fill alt="phone mockup" />
															</div>
														)}
													</div>
													<div className="text-black font-sans text-lg space-y-5 mt-10 px-3 max-w-[300px] mx-auto">
														<p className="font-extrabold leading-tight italic">{parse(`${card?.highlight}`)}</p>
														<p className="font-normal leading-normal">{parse(`${card?.content}`)}</p>
													</div>
												</div>
											);
										})
									}
								</div>

								{/* Mobile view: Swiper carousel */}
								<div className="sm:hidden w-full px-3 py-5">
									<Swiper spaceBetween={20} slidesPerView={1.1} centeredSlides={false}>
										{item?.data?.map((card, cardIndex) => (
											<SwiperSlide key={`card_index_${cardIndex}`}>
												<div className="w-full transition-all duration-300" style={{ height: "calc(var(--spacing-unit) * 14)" }}>
													<div className="relative w-full flex justify-center">
														<Image src={card?.image} width={327} height={210} alt={card?.content} />
														{
															card?.mockup && (
																<div className={`h-[${card?.mockup?.height}px] w-[${card?.mockup?.width}px] max-sm:w-[102px] max-sm:h-[160px] absolute bottom-0 left-[6%] z-[1]`} >
																	<Image src={card?.mockup?.url} fill alt="phone mockup" />
																</div>
															)
														}
													</div>
													<div className="text-black font-sans text-lg space-y-5 mt-10 px-3 max-w-[300px] mx-auto">
														<p className="font-normal leading-normal">{parse(`${card?.content}`)}</p>
														<p className="font-extrabold leading-normal italic">{parse(`${card?.highlight}`)}</p>
													</div>
												</div>
											</SwiperSlide>
										))}
									</Swiper>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
