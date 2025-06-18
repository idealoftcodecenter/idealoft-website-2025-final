import Hero from "@/components/home/Hero";

export default function Home() {
	return (
		<main className="container lg:pt-[calc(var(--spacing-unit))]" style={{height: "4000px"}}>
			{/* ===================== Banner ===================== */}
			<Hero />
		</main>
	);
}
