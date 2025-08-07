'use client';
import { useEffect } from 'react';

export default function NavOverlay({ pathName }) {
	useEffect(() => {
		const overlay = document.querySelector('.nav-list .nav-overlay');
		const navListItems = document.querySelectorAll('.nav-list li');

		if (!overlay || navListItems.length === 0) return;

		// Set overlay position based on hovered item
		const handleMouseEnter = (e) => {
			const target = e.target.closest('li');
			if (target) setOverlayStyles(target);
		};

		// Return overlay to the active item
		const handleMouseLeave = () => {
			setActiveOverlay();
		};

		// Apply styles to overlay
		function setOverlayStyles(el) {
			overlay.classList.add('active');
			overlay.style.left = `${el.offsetLeft}px`;
			overlay.style.top = `${el.offsetTop}px`;
			overlay.style.width = `${el.offsetWidth}px`;
			overlay.style.height = `${el.offsetHeight}px`;
		}

		// Reposition overlay to the current active nav item
		function setActiveOverlay() {
			const activeLi = document.querySelector('.nav-list li.active');
			if (!activeLi) {
				overlay.classList.remove('active');
				overlay.style.left = `-100px`;
			} else {
				setOverlayStyles(activeLi);
			}
		}

		// Add event listeners for hover
		navListItems.forEach((li) => {
			li.addEventListener('mouseenter', handleMouseEnter);
			li.addEventListener('mouseleave', handleMouseLeave);
		});

		// Set initial overlay on mount and route change
		setActiveOverlay();

		// Cleanup listeners on unmount
		return () => {
			navListItems.forEach((li) => {
				li.removeEventListener('mouseenter', handleMouseEnter);
				li.removeEventListener('mouseleave', handleMouseLeave);
			});
		};
	}, [pathName]); // re-run on route change

	return null;
}
