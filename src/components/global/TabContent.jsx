import { useRouter } from "next/navigation";
import parse from 'html-react-parser';
import Image from "next/image";
import { useEffect, useState } from "react";



function useIsMobile(breakpoint = 667) {
	const [isMobile, setIsMobile] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < breakpoint);
		check();
		window.addEventListener("resize", check);
		setIsMounted(true);
		return () => window.removeEventListener("resize", check);
	}, [breakpoint]);

	return { isMobile, isMounted };
}


export const TabContent = ({ data = {}, leftSideData = {} }) => {
	const router = useRouter();
	const tabData = { ...data };
	const leftTabData = {...leftSideData};

	const { isMobile, isMounted } = useIsMobile(1200);

	const getInitials = (nameArray) => {
		let inits = "";
		if(nameArray[0][0]) {
			inits += nameArray[0][0].toUpperCase();
		}
		if(nameArray[1][0]) {
			inits += nameArray[1][0].toUpperCase();
		}
		return inits;
	};
	const initialsArray = tabData.name? tabData.name.split(" ") : [];
	const initials = getInitials(initialsArray);

	return (
		<div className="flex flex-col xl:flex-row xl:items-stretch w-full" style={{ height: isMounted && isMobile ? "calc(var(--spacing-unit) * 25)" : "calc(var(--spacing-unit) * 12)" }}>
			<div key={`tab-fix-content-${tabData?.name}`} className="flex-1 bg-white border-x border-x-[#E0E5F6] border-b border-b-[#E0E5F6] relative">
				<div className="px-8 flex flex-col space-y-10">
					<div className="max-w-[520px]" style={{ marginTop: "var(--spacing-unit)" }}>
						{
							leftTabData.paragraphs && leftTabData.paragraphs.length > 0 &&
							leftTabData.paragraphs.map((para, key) => <p key={key} className={`leading-[1.4em] text-md md:text-lg lg:text-xl ${isMounted && isMobile ? "mb-6" : "mb-0"}`} style={{ height: isMounted && isMobile ? "auto" : "calc(var(--spacing-unit) * var(--home-work-para-height-multiplier))" }}>{parse(para.text)}</p>)
						}
					</div>

					<div className="flex items-center justify-between" style={{ marginTop: "calc(-1 * var(--spacing-unit))" }}>
						{
							leftTabData.logos && leftTabData.logos.length > 0 && 
							leftTabData.logos.map((logo, key) => {
								return (
									<div key={key} className={`flex-1 flex items-center justify-center ${key === 0 && "pr-2 md:pr-12 lg:pr-16"} ${key === leftTabData.logos.length - 1 && "pl-2 md:pl-12 lg:pl-16"} ${key !== 0 && key !== leftTabData.logos.length - 1 && "px-1 md:px-6 lg:px-8"}`} style={{height: "calc(var(--spacing-unit) * 4)"}}>
										<Image src={logo.image} height={18} width={82} alt="logo" className="inline-block w-full aspect-[1/1]" />
									</div>
								);
							})

						}
					</div>

					<p className="hidden lg:block text-center font-normal text-[1.4em] text-[#E0E5F6] font-sans" style={{ height: "var(--spacing-unit)", marginTop: "calc(-0.5 * var(--spacing-unit))", marginBottom: "calc(0.5 * var(--spacing-unit))" }}>+ Many More</p>
				</div>

				<div className="px-6 lg:px-0">
					<button className="lg:absolute lg:left-0 lg:bottom-0 text-left text-white px-8 justify-start font-bold w-full text-[18px] lg:text-[28px] font-oswald bg-[#6AB47F]" style={{height: "calc(var(--spacing-unit) * 1.5)"}} arrowcolor="text-blue" onClick={() => { router.push("/our-work"); }}>
						EXPLORE BRAND WORK
					</button>
				</div>
			</div>

			<div key={`tab-content-${tabData?.name}`} className="flex-1 bg-white relative inline-flex flex-col justify-between border-b border-b-[#E0E5F6]">
				<div className="pl-10 pr-6 max-sm:pl-8 max-sm:pr-8" style={{ marginTop: "var(--spacing-unit)" }}>
					<div className="block lg:flex lg:items-start lg:space-x-[18px]">
						<div className="flex w-full">
							<div className="min-w-[42px] min-h-[42px] w-[42px] lg:w-[80px] h-[42px] lg:h-[80px] leading-[42px] lg:leading-[80px] font-display text-cedar rounded-full mb-2 bg-[#FEE5E5] text-[#DE90A5] text-center text-[20px] font-bold overflow-hidden border">
								{ tabData?.profilePic ? <Image src={tabData.profilePic} width={80} height={80} alt={`Idealoft client testimonial form ${tabData?.name}`} className="w-[42px] lg:w-[80px] h-[42px] lg:h-[80px]" /> : initials }
							</div>
							<div className="pl-4 lg:pl-6">
								<span className="block uppercase font-display font-normal text-xl max-sm:text-md mb-2 leading-[1.2em]">
									{tabData?.name}
								</span>
								<p className="font-sans text-lg max-sm:text-xs leading-[1.2em] text-[#404247] max-w-[380px] mb-2">
									"{tabData?.testimonial}"
								</p>
								<span className="block text-gray-200 font-sans font-bold italic text-md max-sm:text-[12px] leading-[1.2em]">
									<span className="text-[#B6BAC7] font-normal leading-[1.2em]">{ tabData?.designation }</span><br /><span className="text-cedar font-bold leading-[1.2em]">{tabData?.company}</span>
								</span>
							</div>
						</div>
						<div>
						</div>
					</div>
				</div>

				<div className="absolute bottom-0 left-0 w-full h-[65%] z-0">
					<Image src={tabData?.projectImage} fill objectFit="contain" alt={tabData?.company} />
				</div>
			</div>
		</div>
	);
};
