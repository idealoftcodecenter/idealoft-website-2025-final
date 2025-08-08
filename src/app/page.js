import BoxAnimation from "@/components/home/BoxAnimation";
import ContactSection from "@/components/home/ContactSection";
import Hero from "@/components/home/Hero";
import ProcessSection from "@/components/home/ProcessSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkSection from "@/components/home/WorkSection";

export default function Home() {
	return (
		<>
			{/* <Hero /> */}
			<div className="bg-noise w-full">
				{/* background with lines */}
				<div className="book-lines w-full">
					<main className="container mx-auto">
						{/* ===================== Banner ===================== */}
						<ServicesSection />
						<ProcessSection />
						<WorkSection />
						<ContactSection />
					</main>
				</div>
			</div>
		</>
	);
}
