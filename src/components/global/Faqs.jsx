"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import parse from "html-react-parser";
import Heading from "@/components/global/text/Heading";

import { ArrowCursorDown, arrowCricleUp } from "@/components/svgs/index";

const workFAQDataNotExpanded = [
	{
		question: "What do I need to know about Idealoft?",
		answer: "We recommend designs only after carefully understanding your business, requirement, needs and wants. Which means, we are going to collaborate with you with you on designs, sometimes we're going to take classes on Design with you, sometimes we're going to ask you to be unbiased and that might sound rude. But we mean well and we only want the product to win!",
	},
	{
		question: "How long does a typical project take to complete?",
		answer: "Timelines are dependent on all of us! Feedbacks, reviews, design changes, compliance edits, senior stakeholder approvals also have a great impact on the final timelines. We always keep you in loop though! It's as neat as our website. (Cheap, Fast, Good- Choose two)",
	},
];

const workFAQDataExpanded = [
	{
		question: "How does a project initiate at Idealoft?",
		answer: "Over the years, we have perfected our onboarding. We get on a quick call after initial inquiry to understand fit, take notes, typically this takes 30 minutes. The idea is to get to know the backgreound of the project. We then get on a intro call with the right team and questions that helps us bring together a creative brief. Clients are a part of crafting the proposal. It should be tailored to project and goals, something you're eager to sign. After this, we send you a no-surprise SOW, if all looks good- we decide a kick off date and begin!",
	},
	{
		question: "What is Idealoft's pricing structures?",
		answer: "1. There is project-base pricing. If a client has a specific budget or project we can work with them on a fixed project (fixed budget, fixed scope). To ensure an accurate quote, we'll need a detailed outline of the projects goals and scope. It's crucial for us to have a clear scope of work to provide a fixed price. <br /> Pros: Great for smaller projects. Clear understanding of cost upfront. <br /> Cons: Any alterations to the scope may impact the budget and timeline. <br /> 2. Retainer-based pricing: This is the preferred method for most of our clients. After understanding your goals, we assign the appropriate resources with the needed skillset over a specific term. People can work either full-time or part-time on the project, based on the requirements. People call this model subscription-based design models these days, we call them retainers. <br /> Pros: No set scope so there is 100% flexibility for the project to take shape as needed. We can swap out different people throughout a project so a client could be exposed to people with a variety of expertise but only pay for what they need when they need it. While there is a not a fixed project cost there is a predictable monthly fixed cost. <br /> Cons: Not a fixed project cost.",
	},
];

const DesktopView = () => { 
	const contentRefs = useRef([]);
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		// Update `maxHeight` for expand/collapse
		contentRefs?.current?.forEach((ref) => {
			if (ref) {
				if (expanded) {
					ref.style.maxHeight = `${ref.scrollHeight}px`; // Expand
				} else {
					ref.style.maxHeight = "0"; // Collapse
				}
			}
		});
	}, [expanded]);

	return (
		<div className="flex max-sm:hidden flex-col w-full relative mb-20 border-b-2 border-b-gray-200" style={{marginTop: "var(--spacing-unit)", paddingBottom: "calc(var(--spacing-unit) * 2)"}}>
			{workFAQDataNotExpanded?.map((item, index) => {
				return (
					<div key={`faq_${index}`}>
						<div className={`w-full card-grey-gradient flex items-start text-gray-600 px-10 space-x-16 border-b-2 border-b-gray-100`} style={{ paddingTop: "var(--spacing-unit)", paddingBottom: "calc(var(--spacing-unit) - 2px)" }}>
							<Heading level={5} fontSerif={true} className="font-bold text-3xl w-2/5">{item?.question}</Heading>
							<p className="text-lg font-normal w-3/5" style={{ lineHeight: "var(--spacing-unit)", fontSize: "calc(var(--spacing-unit) * .36)", transform: "translate(0, calc(var(--spacing-unit) * .32))" }}>{item?.answer}</p>
						</div>
					</div>
				);
			})}

			<div ref={(el) => { if (el && !contentRefs.current.includes(el)) { contentRefs.current.push(el); } }} className={`w-full overflow-hidden transition-all duration-[600ms]`} style={{ maxHeight: "0", }}>
				{workFAQDataExpanded?.map((item, index) => {
					return (
						<div key={`expanded_faq_${index}`}>
							<div  className={`w-full card-grey-gradient flex items-start text-gray-600 px-10 space-x-16 border-b-2 border-b-gray-100`} style={{ paddingTop: "var(--spacing-unit)", paddingBottom: "calc(var(--spacing-unit) - 2px)" }}>
								<Heading level={5} fontSerif={true} className="font-bold text-3xl w-2/5">{item?.question}</Heading>
								<p className="text-lg font-normal w-3/5" style={{ lineHeight: "var(--spacing-unit)", fontSize: "calc(var(--spacing-unit) * .36)", transform: "translate(0, calc(var(--spacing-unit) * .32))" }}>{parse(item?.answer)}</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className="w-full absolute left-0 -bottom-6 inline-flex items-center justify-center">
				<div className="w-auto h-auto rounded-full inline-flex items-center justify-center" style={{ boxShadow: "0px 4px 4px 0px #00000040", }}>
					<button onClick={() => { setExpanded(!expanded); }} className={`cursor-pointer h-auto w-auto rounded-full outline-none border-none ${ expanded ? "rotate-180" : "" } transition-all duration-[600ms]`}>
						{ArrowCursorDown}
					</button>
				</div>
			</div>
		</div>
	);
};

const MobileView = () => {
	const contentRefs = useRef([]);
	const faqAnswer = useRef([]);

	const [expanded, setExpanded] = useState(false);
	const [faqExpandedIndex, setFaqExpandedIndex] = useState(0);

	useEffect(() => {
		// Update `maxHeight` for expand/collapse
		faqAnswer?.current?.forEach((ref, i) => {
			if (ref) {
				if (faqExpandedIndex === i) {
					ref.style.maxHeight = `${ref.scrollHeight}px`; // Expand
				} else {
					ref.style.maxHeight = "0"; // Collapse
				}
			}
		});
	}, [faqExpandedIndex]);

	const combiledFaqData = useMemo(() => [...workFAQDataNotExpanded, ...workFAQDataExpanded], []);

	return (
		<div className="hidden max-sm:flex flex-col w-full relative" style={{marginTop: "var(--spacing-unit)"}}>
			{combiledFaqData?.map((item, index) => {
				return (
					<div key={`faq_${index}`}>
						<div className={`w-full card-grey-gradient flex flex-col items-start text-gray-600 border-b-2 border-b-gray-100 relative`} style={{ paddingTop: "var(--spacing-unit)", paddingBottom: "var(--spacing-unit)" }}>
							<div onClick={() => { setFaqExpandedIndex( index === faqExpandedIndex ? null : index ); }} className={`w-full flex px-4`} >
								<Heading level={5} fontSerif={true} className="font-bold w-[80%]" style={{ fontSize: "calc(var(--spacing-unit) * .7)" }}>{item?.question}</Heading>
								<span className={`${ index === faqExpandedIndex ? "text-blue rotate-180" : "text-gray-800" } transition-all duration-500 absolute right-3 top-[50%] translate-y-[-50%]`}>{arrowCricleUp}</span>
							</div>
							<div ref={(el) => (faqAnswer.current[index] = el)} className="overflow-hidden transition-all duration-[600ms]" style={{ maxHeight: 0 }}>
								<div className="p-4 pr-12">
									<p className="text-sm font-sans font-normal w-full" style={{ lineHeight: "var(--spacing-unit)", fontSize: "calc(var(--spacing-unit) * .46)", transform: "translate(0, calc(var(--spacing-unit) * -0.22))", marginTop: "var(--spacing-unit)" }}>{parse(item?.answer)}</p>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default function FAQSection() {
	return (
		<section className="w-full" style={{ paddingTop: "calc(var(--spacing-unit) * 2)" }}>
			{/* <SectionTitleHome subtitle="WANT TO KNOW MORE?" heading="Got questions? We've got answers" maxWidth="max-w-[30%]" /> */}
			<Heading level={6} className="text-[24px] pl-4 md:pl-6 lg:pl-8 max-xl:text-base text-[#B6BAC7] max-sm:text-lg uppercase font-medium">WANT TO KNOW MORE?</Heading>
			<Heading level={1} className="text-[36px] pl-4 md:pl-6 lg:pl-8 text-[#25262C] max-sm:text-lg max-xl:text-[20px] font-display font-bold leading-9 max-xl:leading-7 max-sm:leading-7" style={{ fontSize: "calc(var(--spacing-unit) * .7)", lineHeight: "var(--spacing-unit)" }}>
				Got questions? We've<br />got answers
			</Heading>

			<DesktopView />
			<MobileView />
		</section>
	);
}
