"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import parse from "html-react-parser";

import { arrowAccordion } from "@/components/SVGs";
import { processAccordion } from "@/constants/process.constant";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


export default function ProcessSection() {
	const contentRefs = useRef([]);
	const [activeIndex, setActiveIndex] = useState(null);

	const [hoveredCard, setHoveredCard] = useState(null);


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
						<div key={`process_${index}`} onClick={() => { if (activeIndex === index) { setActiveIndex(null); return; } setActiveIndex(index); }} className={`w-full flex flex-col  h-auto`}>

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
							<div ref={(el) => (contentRefs.current[index] = el)} className="overflow-hidden w-full bg-ilBgGrey sm:px-3 md:px-7" style={{ maxHeight: "0px", transition: "max-height 0.3s ease", height: "calc(var(--spacing-unit) * var(--card-height-multiplier))" }}>
								<div className="inline-flex w-full items-center py-6 border-b border-b-gray-200 border-dashed">
									<h4 className="uppercase text-gray-800 text-2xl max-sm:text-xl font-medium font-display">
										{item?.heading}
									</h4>
								</div>
								{/* Desktop view: flex grid */}
								<div className="hidden sm:flex flex-row justify-between gap-10 px-3" style={{paddingTop: "var(--spacing-unit)"}}>
									{
										item?.data?.map((card, cardIndex) => {
											const isBlurred = hoveredCard !== null && hoveredCard !== cardIndex;
											return (
												<div key={`card_index_${cardIndex}`} style={{ height: "calc(var(--spacing-unit) * 13)" }} className={`w-1/3 transition-all duration-300 ${ isBlurred ? "blur-sm opacity-50" : "" }`} onMouseEnter={() => setHoveredCard(cardIndex)} onMouseLeave={() => setHoveredCard(null)} >
													<div className="relative w-full flex justify-center">
														<Image src={card?.image} width={327} height={210} alt={card?.content} />
														{
															card?.mockup && (
															<div className={`h-[${card?.mockup?.height}px] w-[${card?.mockup?.width}px] max-sm:w-[102px] max-sm:h-[160px] absolute bottom-0 left-[6%] z-[1]`}>
																<Image src={card?.mockup?.url} fill alt="phone mockup" />
															</div>
														)}
													</div>
													<div className="text-black font-sans text-lg space-y-5 mt-10 px-3 max-w-[300px] mx-auto">
														<p className="font-extrabold leading-normal italic">{parse(`${card?.highlight}`)}</p>
														<p className="font-normal leading-normal">{parse(`${card?.content}`)}</p>
													</div>
												</div>
											);
										})
									}
								</div>

								{/* Mobile view: Swiper carousel */}
								<div className="sm:hidden w-full px-3 py-5">
									<Swiper spaceBetween={20} slidesPerView={1.1} centeredSlides={false} onSlideChange={() => setHoveredCard(null)} >
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
