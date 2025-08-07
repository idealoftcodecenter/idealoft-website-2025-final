'use client';

import dynamic from "next/dynamic";
import { AnimatePresence, motion, stagger } from "framer-motion";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false, });
import { Play, clientEye, clientPause } from "@/components/svgs/index";

import ICICIBank from "@/lottie-json/ICICIBank.json";
import iBank from "@/lottie-json/iBank.json";
import BajajFinserv from "@/lottie-json/BajajFinserv.json";
import BBC from "@/lottie-json/BBC.json";
import Coquette from "@/lottie-json/Coquette.json";
import Exponent from "@/lottie-json/Exponent.json";
import TheConsciousBaker from "@/lottie-json/TheConsciousBaker.json";
import H3Mart from "@/lottie-json/H3Mart.json";
import ICICIPOS from "@/lottie-json/ICICIPOS.json";
import ICICIPru from "@/lottie-json/ICICIPru.json";
import Initia from "@/lottie-json/Initia.json";
import InstaBiz from "@/lottie-json/InstaBiz.json";
import Kotak from "@/lottie-json/Kotak.json";
import Levis from "@/lottie-json/Levis.json";
import LivLyt from "@/lottie-json/LivLyt.json";
import MightyCrust from "@/lottie-json/MightyCrust.json";
import Piramal from "@/lottie-json/Piramal.json";
import Mintifi from "@/lottie-json/Mintifi.json";
import Rata from "@/lottie-json/Rata.json";
import Reciplay from "@/lottie-json/Reciplay.json";
import Sucharita from "@/lottie-json/Sucharita.json";
import TheTestTribe from "@/lottie-json/TheTestTribe.json";
import UnsweetenedBeauty from "@/lottie-json/UnsweetenedBeauty.json";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import Filters from "./Filters";

export const clientList = [
    {
        id: 1,
        alt: "ICICI Bank",
        lottie: ICICIBank,
        categories: ["enterprise", "tech"],
    },
    {
        id: 2,
        alt: "Bajaj Finserv",
        lottie: BajajFinserv,
        categories: ["enterprise", "tech", "communication"],
    },
    {
        id: 3,
        alt: "BBC",
        lottie: BBC,
        categories: ["enterprise", "communication"],
    },
    {
        id: 4,
        alt: "Levis",
        lottie: Levis,
        categories: ["brand", "communication"],
    },
    {
        id: 5,
        alt: "Coquette",
        lottie: Coquette,
        categories: ["brand", "communication"],
    },
    {
        id: 6,
        alt: "Exponent",
        lottie: Exponent,
        categories: ["mvp", "communication"],
    },
    {
        id: 7,
        alt: "The Conscious Baker",
        lottie: TheConsciousBaker,
        categories: ["brand", "strategy"],
    },
    {
        id: 8,
        alt: "iBank",
        lottie: iBank,
        categories: ["enterprise", "tech"],
    },
    {
        id: 9,
        alt: "H3Mart",
        lottie: H3Mart,
        categories: ["brand", "product"],
    },
    {
        id: 10,
        alt: "ICICI POS",
        lottie: ICICIPOS,
        categories: ["enterprise", "product"],
    },
    {
        id: 11,
        alt: "ICICI Prudential",
        lottie: ICICIPru,
        categories: ["enterprise", "strategy"],
    },
    {
        id: 12,
        alt: "Initia",
        lottie: Initia,
        categories: ["enterprise", "tech"],
    },
    {
        id: 13,
        alt: "ICICI InstaBiz",
        lottie: InstaBiz,
        categories: ["enterprise", "strategy"],
    },
    {
        id: 14,
        alt: "Kotak",
        lottie: Kotak,
        categories: ["enterprise", "tech"],
    },
    {
        id: 15,
        alt: "LivLyt",
        lottie: LivLyt,
        categories: ["mvp", "product"],
    },
    {
        id: 16,
        alt: "MightyCrust",
        lottie: MightyCrust,
        categories: ["startup", "communication"],
    },
    {
        id: 17,
        alt: "Mintifi",
        lottie: Mintifi,
        categories: ["startup", "strategy"],
    },
    {
        id: 18,
        alt: "Piramal",
        lottie: Piramal,
        categories: ["startup", "strategy"],
    },
    {
        id: 19,
        alt: "Rata",
        lottie: Rata,
        categories: ["startup", "tech"],
    },
    {
        id: 20,
        alt: "Reciplay",
        lottie: Reciplay,
        categories: ["startup", "product"],
    },
    {
        id: 21,
        alt: "Sucharita",
        lottie: Sucharita,
        categories: ["mvp", "tech"],
    },
    {
        id: 22,
        alt: "TheTestTribe",
        lottie: TheTestTribe,
        categories: ["brand", "product"],
    },
    {
        id: 23,
        alt: "UnsweetenedBeauty",
        lottie: UnsweetenedBeauty,
        categories: ["brand", "strategy"],
    },
];


const tabs = [
	{
		label: "All",
		type: "all",
	},
	{
		label: "Start-Ups",
		minWidth: "min-w-[180px]",
		type: "startup",
	},
	{
		label: "Funded Projects",
		minWidth: "min-w-[260px]",
		type: "brand",
	},
	{
		label: "Enterprise",
		minWidth: "min-w-[200px]",
		type: "enterprise",
	},
	{
		label: "MVPs",
		type: "mvp",
	},
];


export default function ClientsGrid() {

	const animationRef = useRef(null);
	const [filteredClients, setFilteredClients] = useState([]);

	const [activeTab, setActiveTab] = useState(0);
	const [clientCardHoverIndex, setClientCardHoverIndex] = useState(null);
	const [tabContent, setTabContent] = useState([...clientList]);
	const [pauseAnimation, setPauseAnimation] = useState(false);
	const [animationProgress, setAnimationProgress] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);

	const { width } = useWindowSize();

	const containerVariants = {
		animate: {
			transition: {
				staggerChildren: 0.5,
			},
		},
	};
	const itemVariants = {
		initial: { opacity: 0, y: 10, scale: 0 },
		animate: { opacity: 1, y: 0, scale: 1 },
		exit: { opacity: 0, y: 10, scale: 0 }
	};

	useEffect(() => {
		if(filteredClients.length === 0 && activeTab === 0) {
			setFilteredClients(clientList);
		} 
	}, []);

	useEffect(() => {
		if(tabs[activeTab].type === "all") {
			setFilteredClients(clientList);
		} else {
			const data = clientList.filter((d) => d.categories.includes(tabs[activeTab].type));
			setFilteredClients(data);
		}
	}, [activeTab]);

	// useEffect(() => {
	// 	let interval = null;

	// 	if (!isAnimating || pauseAnimation) {
	// 		clearInterval(interval);
	// 		return;
	// 	}

	// 	const anim = animationRef.current?.anim;
	// 	if (!anim) return;

	// 	const frameRate = anim.frameRate; // FPS
	// 	const totalFrames = anim.totalFrames;
	// 	const animationDuration = totalFrames / frameRate; // Convert frames to seconds

    // 	interval = setInterval(() => {
	// 		if (clientCardHoverIndex !== null && isAnimating) {
	// 			setElapsedTime((prev) => {
	// 				const newElapsedTime = prev + 0.1; // Increase every 100ms
	// 				const progress = Math.min((newElapsedTime / animationDuration) * 100, 100);
	// 				setAnimationProgress(progress);

	// 				// Stop when animation is complete
	// 				if (newElapsedTime >= animationDuration) {
	// 					clearInterval(interval);
	// 					return animationDuration; // Ensure elapsedTime stays at max duration
	// 				}
	// 				return newElapsedTime;
	// 			});
	// 		}

	// 		if (clientCardHoverIndex === null || !isAnimating) {
	// 			clearInterval(interval);
	// 		}
	// 	}, 100);

    // 	return () => clearInterval(interval);
	// }, [isAnimating, clientCardHoverIndex, pauseAnimation]);

	return (
		<>
			<Filters tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
			<motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ marginTop: "var(--spacing-unit)" }}>
				<AnimatePresence mode="popLayout">
					{
						filteredClients.map((client, index) => {
							let isLastInRow = false;
							if (width < 640) {
								// Mobile: one item per row
								isLastInRow = true;
							} else if (width >= 640 && width <= 768) {
								// Tablet: two items per row
								isLastInRow = (index + 1) % 2 === 0;
							} else {
								// Desktop: three items per row
								isLastInRow = (index + 1) % 3 === 0;
							}

							return (
								<motion.div layout key={client.alt} variants={itemVariants} transition={{ type: "spring", damping: 22, stiffness: 200 }}>
									<div
										key={`client_${index}`}
										onMouseEnter={() => {
											setClientCardHoverIndex(index);
											setAnimationProgress(0);
											setElapsedTime(0);
										}}
										onMouseLeave={() => {
											setClientCardHoverIndex(null);
											setAnimationProgress(0);
											setElapsedTime(0);
										}}
										onClick={() => {
											setPauseAnimation(!pauseAnimation);
										}}
										style={{ height: "calc(var(--spacing-unit) * 6)", width: "auto" }} className={`relative bg-white border-b-2 border-b-[#E0E5F6] ${ !isLastInRow ? 'border-r-2 border-r-[#E0E5F6]' : '' }`}>
										<div className="w-full flex items-start justify-start h-[2px] bg-transparent absolute top-0 left-0 z-10">
											<div className="h-full bg-green transition-all duration-300" style={{ width: clientCardHoverIndex === index ? animationProgress + "%" : 0, }} />
										</div>
										<Lottie
											ref={animationRef}
											options={{ loop: false, autoplay: false, animationData: client?.lottie, rendererSettings: { preserveAspectRatio: "xMidYMid slice", }, }}
											height="100%"
											width="auto"
											isStopped={clientCardHoverIndex !== index ? true : false}
											isPaused={pauseAnimation}
											isClickToPauseDisabled={true}
											style={{ cursor: "default", }}
											eventListeners={[
												{
													eventName: "enterFrame",
													callback: () => setIsAnimating(true),
												},
												{
													eventName: "complete",
													callback: () => {
														setIsAnimating(false);
														setAnimationProgress(100);
													},
												},
											]}
										/>
										<div className="absolute bottom-4 left-4 border border-green rounded-full px-3 py-1 inline-flex items-center justify-center space-x-1 bg-white bg-opacity-70 backdrop-blur">
											<span className="text-blue"> {clientCardHoverIndex !== index ? clientEye : pauseAnimation ? Play : clientPause } </span>
											<span className="font-sans font-bold text-xs text-gray-600"> 235 </span>
										</div>
									</div>
								</motion.div>
							);
						})
					}
				</AnimatePresence>
			</motion.div>
		</>
	)
}
