import ClientsGrid from "@/components/clients/ClientsGrid";
import Heading from "@/components/global/text/Heading";
import Overview from "@/components/clients/Overview";
import QuickContact from "@/components/global/QuickContact";
import FAQSection from "@/components/global/Faqs";

export default function OurClients() {
	return (
		<main className="container overflow-hidden lg:pt-[calc(var(--spacing-unit))]">
			<Heading level={1} className="pl-4 md:pl-6 lg:pl-8" style={{marginTop: "var(--spacing-unit)", fontSize: "calc(var(--spacing-unit) * .7)", lineHeight: "var(--spacing-unit)" }}>
				We build <span className="text-[#DE90A5]">scalable Digital Products</span> with a<br className="hidden md:block" />focus on strategy-led design 
			</Heading>
			<ClientsGrid />
			<Overview />
			<QuickContact />
			<FAQSection />
			<div style={{ marginBottom: "calc(var(--spacing-unit) * 6)" }}></div>
		</main>
	);
}
