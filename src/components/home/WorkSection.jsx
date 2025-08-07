"use client";

import { useState } from "react";
import Heading from "../global/text/Heading";
import { Tab } from "@/components/global/Tab";
import { TabContent } from "@/components/global/TabContent";

import { homeWorkTab, homeWorkTabContent, homeWorkTabContentLeft } from "@/constants/work.constant";
import Filters from "../clients/Filters";


const tabs = [
	{
		label: "Strategy",
		type: "strategy",
	},
	{
		label: "Web & App",
		type: "startup",
	},
	{
		label: "Communication",
		type: "communication",
	}
];

export default function WorkSection() {
	const [activeTab, setActiveTab] = useState(0);
	const [tabContentData, setTabContentData] = useState({...homeWorkTabContent[0],});
	const [tabContentLeftData, setTabContentLeftData] = useState({...homeWorkTabContentLeft[0]});

	const handleActiveIndex = (i) => {
		setActiveTab(i);
		setTabContentData(homeWorkTabContent[i]);
		setTabContentLeftData(homeWorkTabContentLeft[i]);
	};

	return (
		<section style={{ marginTop: "calc(var(--spacing-unit) * 2)", marginBottom: "calc(var(--spacing-unit) * 4)" }}>
			<Heading level={6} className="text-[24px] pl-4 md:pl-6 lg:pl-8 max-xl:text-base text-[#B6BAC7] max-sm:text-lg uppercase font-medium">
				OUR WORK
			</Heading>
			<Heading level={1} className="pl-4 md:pl-6 lg:pl-8" style={{ fontSize: "calc(var(--spacing-unit) * .7)", lineHeight: "var(--spacing-unit)" }}>
				Building products with your business<br className="hidden md:block" />objectives in mind.
			</Heading>

			<div className="inline-flex flex-col w-full h-auto">
				{
					tabContentData && tabContentLeftData && 
					<>
						<Filters tabs={tabs} activeTab={activeTab} onTabClick={handleActiveIndex} />
						<TabContent data={tabContentData} leftSideData={tabContentLeftData} />
					</>
				}
			</div>
		</section>
	);
}
