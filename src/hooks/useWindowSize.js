import { useState, useEffect } from 'react';

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
        }

		// Only run on client
		if (typeof window !== 'undefined') {
			// Set size initially
			handleResize();

			// Add event listener
			window.addEventListener('resize', handleResize);

			// Clean up
			return () => window.removeEventListener('resize', handleResize);
		}
	}, []);

	return windowSize;
}
