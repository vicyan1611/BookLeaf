import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import AccountPageLogo from "../../components/AccountPageLogo";
import AccountPageInput from "../../components/AccountPageInput";
import { toast } from "react-toastify";
import axios from "axios";
import { OTPInput } from "../forgotPass";

export function checkPassword(password: string) {
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#*@+\-])[A-Za-z\d!#*@+\-]{8,}$/;
	return password.match(passwordRegex);
}

export function checkUsername(username: string) {
	const usernameRegex = /^[a-zA-Z0-9._]+$/;
	return username.match(usernameRegex);
}

export default function Register(props: any) {
	const navigate = useNavigate();
	const [registered, setRegistered] = useState(false);
	const [email, setEmail] = useState("");
	const [verify, setVerify] = useState(false);
	const emailRef = useRef(null);
	useEffect(() => {
		axios
			.post(
				"http://localhost:3000/api/auth/verify",
				{},
				{ withCredentials: true }
			)
			.then((res) => {
				if (res.status === 200) {
					navigate("/");
				}
			});
	}, []);
	async function handleRegister(e: any) {
		e.preventDefault();
		const email = e.target.email.value;
		const username = e.target.username.value;
		const password = e.target.password.value;
		const confirmPassword = e.target.confirmPassword.value;
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		if(!checkUsername(username)) {
			toast.error("Username must contain only letters, numbers, periods, and underscores");
			return;
		}
		if (!checkPassword(password)) {
			toast.error("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character");
			return;
		}
		setEmail(email);
		const toaster = toast.loading("Registering user...");
		fetch("http://localhost:3000/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, username, password }),
		}).then((res) => {
			if (res.status === 200) {
				toast.update(toaster, {
					render: "User registered successfully",
					type: "success",
					isLoading: false,
					autoClose: 3000,
				});
				setRegistered(true);
			} else {
				res.text().then((text) =>
					toast.update(toaster, {
						render: "Error " + res.status + ": " + text,
						type: "error",
						isLoading: false,
					})
				);
			}
		});
	}
	async function sendVerificationEmail() {
		const toaster = toast.loading("Sending verification email...");
		axios
			.post("http://localhost:3000/api/auth/send-verification-mail", {
				email: email,
			})
			.then((res) => {
				if (res.status === 200) {
					toast.update(toaster, {
						render: "Verification email sent",
						type: "success",
						isLoading: false,
						autoClose: 3000,
					});
				} else {
					toast.update(toaster, {
						render: "Error " + res.status + ": " + res.statusText,
						type: "error",
						isLoading: false,
					});
				}
			});
	}
	useEffect(() => {
		if (registered) {
			sendVerificationEmail();
		}
	}, [registered]);
	useEffect(() => {
		if (verify) {
			navigate("/login");
		}
	}, [verify]);
	return (
		<>
			{registered && (
			<div className="verify-banner w-full h-16 fixed top-0 left-0 flex flex-row justify-between items-center bg-blue-400 px-8">
				<div className="banner-text text-white font-semibold text-md font-sans text-center">
					We have sent you a verification email. Please check your
					mail service for further instruction
				</div>
				<div className="buttons flex flex-row gap-3 justify-center items-center h-full">
					<div onClick={sendVerificationEmail} className="resend-button text-white font-semibold text-md font-sans text-center hover:bg-green-400 cursor-pointer p-2 rounded-md">Resend email</div>
					<a href="/login" className="back-button text-white font-semibold text-md font-sans text-center hover:bg-green-400 cursor-pointer p-2 rounded-md">Back to login</a>
				</div>
			</div>)}
			<div className="box-border px-4 lg:w-2/5 md:w-4/5 sm:w-full flex flex-col items-center justify-center">
				<AccountPageLogo />
				{!registered && (
					<form
						className="flex flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg"
						onSubmit={handleRegister}
					>
						<input
						className="w-full px-2 py-2 rounded-lg border-2 focus:outline-none"
						ref={emailRef}
						name="email"
						type="email"
						placeholder="Enter your email"
						required
						/>
						<AccountPageInput
							name="username"
							type="input"
							placeholder="Username"
						/>
						<AccountPageInput
							name="password"
							type="password"
							placeholder="Password"
						/>
						<AccountPageInput
							name="confirmPassword"
							type="password"
							placeholder="Confirm Password"
						/>
						<AccountPageInput type="submit" value="Register" />
						<div className="container flex flex-row items-center justify-center">
							<a href="/login">
								Already have an account? Sign in now!
							</a>
						</div>
					</form>
				)}
				{registered && (
					<OTPInput 
					email={email}
					link={"http://localhost:3000/api/auth/verify-account"}
					setVerify={setVerify}
					/>
				)}
			</div>
		</>
	);
}
