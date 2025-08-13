"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function CustomAudioPlayer({ src, scope }) {
	const waveformRef = useRef(null);
	const wavesurferRef = useRef(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isRepeating, setIsRepeating] = useState(false);

	useEffect(() => {
		if (!waveformRef.current) return;

		wavesurferRef.current = WaveSurfer.create({
			container: waveformRef.current,
			waveColor: "#ccc",
			progressColor: "#000",
			cursorColor: "#000",
			height: 40,
			barWidth: 2,
			barRadius: 2,
			responsive: true,
			normalize: true,
			backend: "mediaelement",
			mediaControls: false,
		});

		wavesurferRef.current.load(src);

		const onProcess = () => {
			if (!wavesurferRef.current) return;
			const currentTime = wavesurferRef.current.getCurrentTime();
			const duration = wavesurferRef.current.getDuration() || 1;
			setProgress((currentTime / duration) * 100);
		};

		const onFinish = () => {
			if (isRepeating) {
				wavesurferRef.current.play();
			} else {
				setIsPlaying(false);
			}
		};

		wavesurferRef.current.on("audioprocess", onProcess);
		wavesurferRef.current.on("finish", onFinish);

		// 🔊 Listen for scoped pause requests
		const onScopedPause = (e) => {
			const evtScope = e?.detail?.scope;
			if (!wavesurferRef.current) return;
			if (!evtScope || evtScope === scope) {
				wavesurferRef.current.pause();
				setIsPlaying(false);
			}
		};
		window.addEventListener("PAUSE_AUDIO", onScopedPause);

		return () => {
			window.removeEventListener("PAUSE_AUDIO", onScopedPause);
			if (wavesurferRef.current) {
				wavesurferRef.current.un("audioprocess", onProcess);
				wavesurferRef.current.un("finish", onFinish);
				if(wavesurferRef?.current && isPlaying) {
					wavesurferRef.current.destroy();
					wavesurferRef.current = null;
				}
			}
		};
	}, [src, scope, isRepeating]);

	const togglePlay = () => {
		if (!wavesurferRef.current) return;
		wavesurferRef.current.playPause();
		setIsPlaying(wavesurferRef.current.isPlaying());
	};

	const handleSeek = (e) => {
		if (!wavesurferRef.current) return;
		const box = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - box.left;
		const pct = Math.max(0, Math.min(1, x / box.width));
		wavesurferRef.current.seekTo(pct);
	};

	return (
		<div className="audio-player-wrapper w-full max-w-2xl flex items-center bg-white py-4">
			<div className="flex items-center">
				<button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center">
					<span className={`playPauseButton ${isPlaying ? "pause" : "play"}`}></span>
				</button>
			</div>

			<div className="flex-1 relative audio-player-box">
				<div ref={waveformRef} className="w-full cursor-pointer" onClick={handleSeek} />
				<div className="absolute top-0 left-0 h-full bg-transparent pointer-events-none" style={{ width: `${progress}%` }} />
			</div>

			<button onClick={() => { if (!wavesurferRef.current) return; const shouldRepeat = !isRepeating; setIsRepeating(shouldRepeat); wavesurferRef.current.seekTo(0); setProgress(0); if (shouldRepeat && isPlaying) wavesurferRef.current.play(); }} className={`w-[40px] h-[40px] text-black ${progress > 0 ? "opacity-100" : "opacity-50"}`} title="Toggle Repeat" >
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="19.9993" cy="21.6666" r="12.8333" fill="white" stroke="#E0E5F6"/>
					<path d="M20 26.6667C22.785 26.6667 25 24.4484 25 21.6667C25 18.8851 22.785 16.6667 20 16.6667C17.215 16.6667 15 18.8851 15 21.6667C15 24.4484 17.215 26.6667 20 26.6667Z" fill="#25262C"/>
					<path d="M34.695 18.6433C34.3023 16.7238 33.5348 14.9007 32.4367 13.2783C31.3576 11.6821 29.9829 10.3073 28.3867 9.22825C26.764 8.13046 24.941 7.36308 23.0217 6.96992C22.0135 6.76547 20.987 6.66494 19.9583 6.66992V3.33325L13.3333 8.33325L19.9583 13.3333V10.0033C20.765 9.99992 21.5717 10.0766 22.35 10.2366C23.8417 10.5423 25.2586 11.1386 26.52 11.9916C27.764 12.8303 28.8346 13.901 29.6733 15.1449C30.9756 17.0703 31.6699 19.3422 31.6667 21.6666C31.6664 23.2264 31.3547 24.7704 30.75 26.2083C30.4559 26.9008 30.0965 27.5638 29.6767 28.1883C29.2552 28.8089 28.7764 29.3887 28.2467 29.9199C26.6333 31.5302 24.5852 32.6348 22.3533 33.0982C20.8012 33.4116 19.2021 33.4116 17.65 33.0982C16.1576 32.7923 14.7401 32.1954 13.4783 31.3416C12.2358 30.5036 11.1663 29.4341 10.3283 28.1916C9.02759 26.2642 8.33284 23.9919 8.33333 21.6666H5C5.00177 24.6561 5.89481 27.5772 7.565 30.0566C8.64475 31.6502 10.0181 33.0235 11.6117 34.1033C14.0877 35.779 17.0102 36.6721 20 36.6666C21.0155 36.6665 22.0283 36.5643 23.0233 36.3616C24.9412 35.9656 26.7632 35.1984 28.3867 34.1033C29.1838 33.5661 29.9268 32.9527 30.605 32.2716C31.2842 31.5905 31.898 30.8473 32.4383 30.0516C34.1127 27.5762 35.0051 24.6551 35 21.6666C34.9999 20.6511 34.8977 19.6383 34.695 18.6433Z" fill="#25262C"/>
				</svg>
			</button>
		</div>
	);
}
