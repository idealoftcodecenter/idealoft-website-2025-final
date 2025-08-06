import BoxAnimation from "@/components/home/BoxAnimation";
import ContactSection from "@/components/home/ContactSection";
import Hero from "@/components/home/Hero";
import ProcessSection from "@/components/home/ProcessSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkSection from "@/components/home/WorkSection";

export default function Home() {
	return (
		<main className="container" style={{height: "4000px"}}>
			{/* ===================== Banner ===================== */}
			<Hero />
			<ServicesSection />
			<ProcessSection />
			<WorkSection />
			<ContactSection />
		</main>
	);
}
