import React, { useState, useRef, useEffect } from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { MdFullscreen } from "react-icons/md";
import { MdFontDownload } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuBookmark } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoBookmark } from "react-icons/io5";
import { toast } from "react-toastify";
import { MdFullscreenExit } from "react-icons/md";
import { Rendition, NavItem } from "epubjs";
import "./index.css";

interface Book {
	title: string;
	url: string;
	author: string;
	pages: number;
}

const sampleBook: Book = {
	// placeholder for might be later uses
	title: "How to win friends and influence people",
	url: "../../../storage/books/nhasachmienphi-dac-nhan-tam.epub",
	author: "Dale Carnegie",
	pages: 320,
};

const style: object = {
	...ReactReaderStyle,
	arrow: {
		...ReactReaderStyle.arrow,
		color: "black",
	},
};

const Reader: React.FC = () => {
	const [location, setLocation] = useState<string | null>(null);
	const [fullscreenMode, setFullscreenMode] = useState<boolean>(false);
	const [page, setPage] = useState<string>("0");
	const displaySettingRef = useRef<HTMLDivElement>(null);
	const settingRef = useRef<HTMLDivElement>(null);
	const renditionRef = useRef<Rendition>(null);
	const tocRef = useRef<NavItem[]>([]);
	const [bookmark, setBookmark] = useState<boolean>(false);
	const locationChanged = (epubcifi: string) => {
		if (renditionRef.current && tocRef.current) {
			const { displayed, href } = renditionRef.current.location.start;
			const chapter = tocRef.current?.find((item) => item.href === href);
			setPage(
				`${displayed.page + 1}/${displayed.total} - Chapter: ${
					chapter?.label ?? "Unknown"
				}`
			);
		}
		setLocation(epubcifi);
	};
	const toggleBookmark = () => {
		try {
			setBookmark((bookmark) => !bookmark);
			if (bookmark) {
				toast.success("Bookmark removed successfully");
			} else {
				toast.success("Bookmark added successfully");
			}
		} catch (err) {
			if (bookmark) {
				toast.error("Error removing bookmark, Error: " + err);
			} else {
				toast.error("Error adding bookmark, Error: " + err);
			}
		}
	};
	const toggleSettings = () => {
		if (displaySettingRef.current) {
			displaySettingRef.current.classList.toggle("hidden");
		}
	};
	const toggleOtherIcons = () => {
		if (settingRef.current) {
			const hamburgerIcon =
				settingRef.current.querySelector(".hamburgerIcon");
			if (hamburgerIcon) {
				hamburgerIcon.classList.toggle("rotate-90");
			}
			const childSettingIcon =
				settingRef.current.querySelectorAll(".childSettingIcon");
			if (childSettingIcon) {
				childSettingIcon.forEach((icon) => {
					icon.classList.toggle("hidden");
				});
			}
			if (
				displaySettingRef.current &&
				!displaySettingRef.current.classList.contains("hidden")
			) {
				displaySettingRef.current.classList.add("hidden");
			}
		}
	};
	const fullscreen = () => {
		try {
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(); // Safari
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen(); // IE11
			}
			setFullscreenMode(true);
		} catch (err) {
			toast.error("Error entering fullscreen mode, Error: " + err);
			console.error(err);
		}
	};
	const closeFullscreen = () => {
		try {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen(); // Safari
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen(); // IE11
			}
			setFullscreenMode(false);
		} catch (err) {
			toast.error("Error exiting fullscreen mode, Error: " + err);
			console.error(err);
		}
	};
	const changeFontSize = (size: number) => {
		if (renditionRef.current) {
			renditionRef.current.themes.fontSize(size + "px");
		}
	};
	const changeFont = (font: string) => {
		if (renditionRef.current) {
			renditionRef.current.themes.register('custom', {
				p: {
					'font-family': font,
				}
			})
			renditionRef.current.themes.select('custom');
		}
	};
	const changeFontWeight = (weight: string) => {
		if (renditionRef.current) {
			renditionRef.current.themes.register('custom', {
				p: {
					'font-weight': weight,
				}
			})
			renditionRef.current.themes.select('custom');
		}
	}
	const changeLineHeight = (height: string) => {
		if (renditionRef.current) {
			renditionRef.current.themes.register('custom', {
				p: {
					'line-height': height + 'px',
				}
			})
			renditionRef.current.themes.select('custom');
		}
	}
	const changeTheme = (theme: boolean) => {
		if(renditionRef.current) {
			const epubTheme = renditionRef.current.themes
			if(theme){ // dark theme
				epubTheme.override('color', '#fff');
				epubTheme.override('background', '#000');
			}
			else{ // light theme
				epubTheme.override('color', '#000');
				epubTheme.override('background', '#fff');
			}
			renditionRef.current.themes.select('custom');
		}
	}
	useEffect(() => {
		if (renditionRef.current) {
			renditionRef.current.themes.override('color', '#000');
			renditionRef.current.themes.override('background', '#fff');
		}
	}, []);
	return (
		<>
			<div className="reader w-screen h-screen flex flex-col">
				<header className="settingBar w-full h-12 bg-red-700  flex flex-row items-center justify-between relative">
					<IoIosCloseCircleOutline className="text-white h-8 w-8 cursor-pointer ml-2 absolute" onClick={() =>{
						window.location.replace("/books");
					}}></IoIosCloseCircleOutline>
					<div className="bookTitle ml-14 text-white font-bold font-serif text-xl select-none">
						{sampleBook.title}
					</div>
					<div
						ref={settingRef}
						className="settings flex-row flex items-center justify-end w-3/12"
					>
						{!fullscreenMode ? (
							<MdFullscreen
								onClick={fullscreen}
								className="text-white h-8 w-8 cursor-pointer ml-4 mr-4 childSettingIcon"
							/>
						) : (
							<MdFullscreenExit
								onClick={closeFullscreen}
								className="text-white h-8 w-8 cursor-pointer ml-4 mr-4 childSettingIcon"
							/>
						)}
						<MdFontDownload
							onClick={toggleSettings}
							className="text-white h-8 w-8 cursor-pointer ml-4 mr-4 childSettingIcon"
						/>
						{!bookmark ? (
							<LuBookmark
								onClick={toggleBookmark}
								className="text-white h-8 w-8 cursor-pointer ml-4 mr-4 childSettingIcon"
							/>
						) : (
							<IoBookmark
								onClick={toggleBookmark}
								className="text-white h-8 w-8 cursor-pointer ml-4 mr-4 childSettingIcon"
							/>
						)}
						<RxHamburgerMenu
							onClick={toggleOtherIcons}
							className="text-white h-8 w-8 cursor-pointer ml-4 mr-4 hamburgerIcon transform-cpu transition-transform"
						/>
					</div>
					<div
						ref={displaySettingRef}
						className="displaySetting hidden bg-slate-200 border-2 border-gray-800 w-64 h-80 z-50 absolute right-0 top-12 rounded-md mr-36"
					>
						<div className="settingHeader flex flex-row justify-between mt-4">
							<div className="settingTitle ml-2 font-serif font-medium text-lg">
								Display Option
							</div>
							<div
								className="closeButton mr-2"
								onClick={toggleSettings}
							>
								<IoIosCloseCircleOutline className="h-6 w-6 cursor-pointer" />
							</div>
						</div>
						<div className="separator w-full bg-black"></div>
						<div className="settingOption flex flex-row w-full h-1/6 justify-between items-center">
							<div className="optionName ml-2">Dark theme</div>
							<div className="optionSwitch mr-2">
								<label className="inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										className="hidden peer"
										onChange={(e) => changeTheme(e.target.checked)}
									></input>
									<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-500"></div>
								</label>
							</div>
						</div>
						<div className="settingOption flex flex-row w-full h-1/6 justify-between items-center">
							<div className="optionName ml-2">Font</div>
							<select
								name="font"
								id="fontSelect"
								className="optionSelect bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:"
								onChange={(e) =>
									changeFont(e.target.value)
								}
							>
								<option value='"Source Serif 4", serif'>
									Source Serif 4
								</option>
								<option value="Times New Roman">
									Times New Roman
								</option>
								<option value="Arial">Arial</option>
								<option value='"Playfair Display", serif'>
									Playfair Display
								</option>
								<option value='"Poppins", sans-serif'>Poppins</option>
							</select>
						</div>
						<div className="settingOption flex flex-row w-full h-1/6 justify-between items-center">
							<div className="optionName ml-2">Font size</div>
							<select
								name="font"
								id="fontSelect"
								className="optionSelect bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:"
								onChange={(e) =>
									changeFontSize(parseInt(e.target.value))
								}
							>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option selected value="16">
									16
								</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="20">20</option>
							</select>
						</div>
						<div className="settingOption flex flex-row w-full h-1/6 justify-between items-center">
							<div className="optionName ml-2">Font weight</div>
							<select
								name="font"
								id="fontSelect"
								className="optionSelect bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:"
								onChange={(e) =>
									changeFontWeight(e.target.value)
								}
							>
								<option value="100">Thin</option>
								<option value="200">Extra Light</option>
								<option value="300">Light</option>
								<option selected value="400">Normal</option>
								<option value="500">Medium</option>
								<option value="600">Semibold</option>
								<option value="700">Bold</option>
								<option value="800">Extrabold</option>
								<option value="900">Black</option>
							</select>
						</div>
						<div className="settingOption flex flex-row w-full h-1/6 justify-between items-center">
							<div className="optionName ml-2">Line height</div>
							<select
								name="font"
								id="fontSelect"
								className="optionSelect bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:"
								onChange={(e) =>
									changeLineHeight(e.target.value)
								}
							>
								<option value="20">20px</option>
								<option selected value="25">25px</option>
								<option value="30">30px</option>
								<option value="35">35px</option>
								<option value="40">40px</option>
								<option value="50">50px</option>
							</select>
						</div>
					</div>
				</header>
				<div className="h-screen inline-block w-screen">
					<ReactReader
						url={sampleBook.url}
						location={location}
						title={sampleBook.title}
						locationChanged={locationChanged}
						showToc={true}
						readerStyles={style}
						tocChanged={(toc) => {
							tocRef.current = toc;
						}}
						getRendition={(rendition) => {
							renditionRef.current = rendition;
						}}
					></ReactReader>
				</div>
				<footer className="footer flex items-center justify-between">
					<div className="pageCounter flex items-center justify-center ml-4">
						{page}
					</div>
					<div className="progressCounter">0%</div>
				</footer>
			</div>
		</>
	);
};

export default Reader;
