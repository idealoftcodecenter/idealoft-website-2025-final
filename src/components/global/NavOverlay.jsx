'use client';

import { useEffect } from 'react';

export default function NavOverlay() {
	useEffect(() => {
		const overlay = document.querySelector('.nav-list .nav-overlay');
		const navListItems = document.querySelectorAll('.nav-list li');
		const activeLi = document.querySelector('.nav-list li.active');

		if (!overlay || navListItems.length === 0) return;
		const handleMouseEnter = (e) => {
			const target = e.target;
			setOverlayStyles(e.target);
		};
		const handleMouseLeave = () => {
			// overlay.classList.remove('active');
			setActiveOverlay();
		};

		navListItems.forEach((li) => {
			li.addEventListener('mouseenter', handleMouseEnter);
			li.addEventListener('mouseleave', handleMouseLeave);
		});

		function setOverlayStyles(el) {
			overlay.classList.add('active');
			overlay.style.left = `${el.offsetLeft}px`;
			overlay.style.top = `${el.offsetTop}px`;
			overlay.style.width = `${el.offsetWidth}px`;
			overlay.style.height = `${el.offsetHeight}px`;
		}

		function setActiveOverlay() {
			if (!activeLi) {
				overlay.classList.remove('active');
				overlay.style.left = `-100px`;
			} else {
				setOverlayStyles(activeLi);
			}
		};
		setActiveOverlay();

		return () => {
			navListItems.forEach((li) => {
			li.removeEventListener('mouseenter', handleMouseEnter);
			li.removeEventListener('mouseleave', handleMouseLeave);
			});
		};
	}, []);

	return null;
}
