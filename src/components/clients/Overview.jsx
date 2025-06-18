import Heading from "../global/text/Heading";
import AnimatedLogo from "../global/AnimatedLogo";

export default function Overview() {
	return (
		<section className={`relative w-full flex flex-col lg:flex-row items-center justify-around overflow-hidden company-experience-overview`}>
			<div className="px-6 lg:px-0">
				<AnimatedLogo />
				<Heading level={6} className="text-[20px] max-xl:text-base text-gray-200 max-sm:text-lg uppercase font-medium">IDEALOFT IN A FLASH</Heading>
				<Heading level={1} className="text-[28px] text-[#537AFF] max-sm:text-lg max-xl:text-[20px] font-display font-bold leading-9 max-xl:leading-7 max-sm:leading-7" style={{ fontSize: "calc(var(--spacing-unit) * .7)", lineHeight: "var(--spacing-unit)" }}>
					Building products with your business<br className="hidden lg:block" />objectives in mind.
				</Heading>
			</div>
			<div>
				<ul className={`w-[220px] lg:w-auto list-disc marker:text-[#E0E5F6]`}>
					<li className="leading-[1.6em]"><span className="bold leading-[1.6em]">8 Years</span> of existence</li>
					<li className="leading-[1.6em]"><span className="bold leading-[1.6em]">50+ clients</span></li>
					<li className="leading-[1.6em]"><span className="bold leading-[1.6em]">HQ</span> in Mumbai</li>
					<li className="leading-[1.6em]">Presence <span className="bold leading-[1.6em]">All orver India</span></li>
				</ul>
			</div>
			<div>
				<ul className={`w-[220px] lg:w-auto list-disc marker:text-[#E0E5F6]`}>
					<li className="leading-[1.6em]">Over <span className="bold leading-[1.6em]">8k projects completed</span></li>
					<li className="leading-[1.6em]">Hybrid <span className="bold leading-[1.6em]">Global Team</span></li>
					<li className="leading-[1.6em]">Team of <span className="bold leading-[1.6em]">25</span> &amp; A <span className="bold leading-[1.6em]">Network of specialists</span></li>
				</ul>
			</div>
		</section>
	);
}
