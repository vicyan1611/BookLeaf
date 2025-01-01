import bookLeafLogo from "../../assets/BookLeaf_Logo_cropped.svg"; // resize the logo to 20px
import LineChart from "../../components/Charts/LineChart";
import PieChart from "../../components/Charts/PieChart";

import "./index.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCog, FaChartPie, FaBook } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const Sidebar = ({
	active,
	setActive,
}: {
	active: string;
	setActive: Function;
}) => {
	const menuItems = [
		{ icon: <FaBook size={24} />, label: "Books", id: "books" },
		{ icon: <FaChartPie size={24} />, label: "Analysis", id: "analysis" },
		{
			icon: <IoPersonCircleOutline size={24} />,
			label: "Personal Info",
			id: "info",
		},
		{ icon: <FaCog size={24} />, label: "Account", id: "account" },
	];

	return (
		<div className="flex flex-col items-center w-16 bg-white shadow-lg h-full py-6">
			{menuItems.map((item) => (
				<div
					key={item.id}
					onClick={() => setActive(item.id)}
					className={`p-4 rounded-lg mb-4 cursor-pointer ${
						active === item.id
							? "bg-green-200 text-green-700"
							: "text-gray-700"
					}`}
				>
					{item.icon}
				</div>
			))}
		</div>
	);
};

interface BookCardProps {
	book: Book;
}
interface Book {
	_id?: string;
	title: string;
	author: string;
	totalPages: number;
	pathToCover: string;
}

const fetchBooks = async (): Promise<Book[]> => {
	try {
		const response = await fetch("http://localhost:3000/api/books");
		if (!response.ok) {
			throw new Error("Failed to fetch books");
		}
		const data: [] = await response.json();
		console.log("Fetched books:", data);
		return data;
	} catch (error) {
		console.error("Error fetching books:", error);
		return [];
	}
};

const BookCard = ({ book }: BookCardProps) => {
	return (
		<div className="bg-white p-2 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col">
			<div className="h-52 justify-center flex">
				<img
					src={book.pathToCover}
					alt={book.title}
					className="h-full object-cover rounded-lg"
				/>
			</div>
			<h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
			<p className="text-gray-600 h">{book.author}</p>
			<p className="text-gray-500 text-sm mt-2">
				{book.totalPages} pages
			</p>
		</div>
	);
};

function BooksSection() {
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		const loadBooks = async () => {
			try {
				const fetchedBooks = await fetchBooks();
				setBooks(fetchedBooks);
			} catch (err) {
				console.error("Error loading books:", err);
			}
		};

		loadBooks();
	}, []);

	return (
		<div className="p-6">
			<h2 className="text-lg font-bold mb-4">Currently Reading</h2>
			<div className="grid grid-cols-4 gap-4">
				<div className="col-span-3">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
						{books && books.length > 0 ? (
							books.map((book) => (
								<BookCard key={book._id} book={book} />
							))
						) : (
							<div className="flex justify-center items-center h-48 col-span-3">
								<p>No books found</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

function GridItem({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-lg">
			{children}
		</div>
	);
}

const AnalysisSection = () => (
	<div className="p-6">
		<h2 className="text-lg font-bold mb-4">Reading Analytics</h2>
		<div className="grid grid-cols-2 gap-6">
			<div className="bg-white shadow rounded-lg p-3">
				<h3 className="text-sm font-medium mb-2">Reading Insights</h3>
				<GridItem>
					<PieChart />
				</GridItem>
			</div>
			<div className="bg-white shadow rounded-lg p-3">
				<h3 className="text-sm font-medium mb-2">Reading Time</h3>
				<GridItem>
					<LineChart />
				</GridItem>
			</div>
		</div>
	</div>
);

const PersonalInfoSection = () => (
	<div className="p-6">
		<h2 className="text-lg font-bold mb-4">About Me</h2>
		<div className="bg-white p-4 shadow rounded-lg">
			<p>
				Hello, I’m an avid reader and especially love mangoes,
				fanfictions, yahdeeyahda, blah blah blah...
			</p>
		</div>
		<h3 className="text-lg font-bold mt-6">More Info</h3>
		<div className="bg-white p-4 shadow rounded-lg mt-4">
			<p>Full name: Alexa Rawles</p>
			<p>Gender: Female</p>
		</div>
	</div>
);

interface AccountManagementSectionProps {
	isActiveUser: boolean;
}

const AccountManagementSection = (props: AccountManagementSectionProps) => {
	const handleLogout = () => {
		// delete the access token and refresh token
		fetch("http://localhost:3000/api/auth/logout", {
			method: "POST",
			credentials: "include",
		}).then(() => {
			toast.success("Logged out successfully");
			setTimeout(() => { window.location.href = "/login"; }, 2000);
		}).catch(err => {
			console.error("Failed to logout:", err);
			toast.error("Failed to logout");
		});
	}
	return (
		<>
			{props.isActiveUser && (
				<div className="p-6">
					<h2 className="text-lg font-bold mb-4">Account Management</h2>
					<div className="bg-white p-4 shadow rounded-lg">
						<button onClick={handleLogout} className="block w-full text-left text-red-600">
							Logout
						</button>
						<button className="block w-full text-left mt-2">
							Change Password
						</button>
					</div>
				</div>
			)}
		</>
	);
};

interface User {
	id: string;
	username: string;
	email: string;
}

interface UserProfileProps {
	activeUser: User;
	viewingUser: User;
	isActiveUser: boolean;
}

const UserProfile = (props: UserProfileProps) => {
	const [active, setActive] = useState("books");
	return (
		<div className="flex h-screen mx-auto my-0">
			<Sidebar active={active} setActive={setActive} />
			<div className="flex-grow bg-gray-50">
				<header className="bg-green-100 p-4 flex justify-between items-center">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 bg-gray-300 rounded-full"></div>
						<div>
							<h1 className="text-lg font-bold">
								{props.viewingUser.username}
							</h1>
							<p className="text-sm text-gray-600">
								{props.viewingUser.email}
							</p>
						</div>
					</div>
					{(!props.isActiveUser) ? (
					<div className="flex gap-2">
						<button className="bg-green-500 text-white px-4 py-2 rounded">
							Add Friend
						</button>
						<button className="bg-red-500 text-white px-4 py-2 rounded">
							Block
						</button>
					</div>
					) : null}
				</header>
				<main>
					{active === "books" && <BooksSection />}
					{active === "analysis" && <AnalysisSection />}
					{active === "info" && <PersonalInfoSection />}
					{active === "account" && <AccountManagementSection isActiveUser={props.isActiveUser}/>}
				</main>
			</div>
		</div>
	);
};

const UserProfilePage = () => {
	const navigate = useNavigate();
	const [activeUser, setActiveUser] = useState<User>({} as User);
	const [viewingUser, setViewingUser] = useState<User>({} as User);
	const [isActiveUser, setIsActiveUser] = useState(false);

	useEffect(() => {
		fetch("http://localhost:3000/api/auth/verify", {
			method: "POST",
			credentials: "include",
		})
		.then((res) => {
			if (res.status !== 200) {
				navigate("/login");
			}
		})
		const viewingUserID = window.location.pathname.split("/")[2]; // https://localhost:5173/user-profile/:id
		fetch(`http://localhost:3000/api/user-profile/${viewingUserID}`,{
			method: "GET",
			credentials: "include",
		}).then(res => res.json()).then(data => {
			setViewingUser(data.viewing);
			setActiveUser(data.active);
			setIsActiveUser(data.active._id === data.viewing._id);
		}).catch(err => {
			console.error("Failed to fetch user profile:", err);
			toast.error("Failed to fetch user profile");
		});
	}, []);

	return (
		<div className="w-[1420px] mx-auto">
			<div className="flex flex-col h-full">
				<header className="bg-white shadow-md">
					<div className="flex justify-between items-center p-4">
						<img
							src={bookLeafLogo}
							alt="BookLeaf Logo"
							className="h-6"
						/>
						<div className="flex gap-3">
							<Link
								to="/books"
								className="font-semibold hover:bg-green-500 hover:text-white py-2 px-3 rounded"
							>
								Books
							</Link>
							<button className="font-semibold hover:bg-green-500 hover:text-white py-2 px-3 rounded">
								My Libraries
							</button>
							<button className="font-semibold hover:bg-green-500 hover:text-white py-2 px-3 rounded">
								Goals
							</button>
							<button className="font-semibold hover:bg-green-500 hover:text-white py-2 px-3 rounded">
								Friends
							</button>
						</div>
					</div>
				</header>
				<main className="flex-grow overflow-y-auto">
					<UserProfile activeUser={activeUser} viewingUser={viewingUser} isActiveUser={isActiveUser} />
				</main>
			</div>
		</div>
	);
};

export default UserProfilePage;
