import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, forwardRef } from "react";
import AccountPageLogo from "../../components/AccountPageLogo";
import { toast } from "react-toastify";
import axios from "axios";
import { checkPassword } from "../register";

interface EmailInputProps {
	setChangeOTP: React.Dispatch<React.SetStateAction<boolean>>;
	changeOTP: boolean;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
}
interface PasswordInputProps {
	email: string;
	changePassword: boolean;
}

export interface OTPInputProps {
	email: string;
	setChangePassword?: React.Dispatch<React.SetStateAction<boolean>>;
	changePassword?: boolean;
	changeOTP?: boolean;
	link: string;
	setVerify?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
	(props, ref) => {
		const formRef = useRef<HTMLFormElement>(null);
		function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
			e.preventDefault();
			const toaster = toast.loading("Sending verification code...");
			axios
				.post(
					"http://localhost:3000/api/auth/reset-password/verify-email",
					{
						email: (
							ref as React.MutableRefObject<HTMLInputElement | null>
						).current!.value,
					}
				)
				.then((res) => {
					if (res.status === 200) {
						props.setChangeOTP(true);
						toast.update(toaster, {
							render: "Verification code sent successfully",
							type: "success",
							autoClose: 2000,
							isLoading: false,
						});
					}
				})
				.catch((err) => {
					toast.update(toaster, {
						render: "Error occurred: " + err.response.data,
						type: "error",
						autoClose: 2000,
						isLoading: false,
					});
				});
		}
		function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
			props.setEmail(e.target.value);
		}
		useEffect(() => {
			if (props.changeOTP) {
				formRef.current!.style.display = "none";
			}
		}, [props]);
		return (
			<form
				onSubmit={(e) => {
					handleEmailSubmit(e);
				}}
				ref={formRef}
				className="flex flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg"
			>
				<input
					className="w-full px-2 py-2 rounded-lg border-2 focus:outline-none"
					ref={ref}
					name="email"
					type="email"
					placeholder="Enter your email"
					required
					onChange={(e) => {
						handleEmailInput(e);
					}}
				/>
				<input
					className="w-full px-2 py-2 rounded-lg border-2 focus:outline-none cursor-pointer"
					type="submit"
					placeholder="Send verification code"
				/>
				<div className="container flex flex-row items-center justify-center">
					<a href="/login">Remember your password? Login now!</a>
				</div>
			</form>
		);
	}
);

export function OTPInput(props: OTPInputProps) {
	const [code, setCode] = useState("");
	const formRef = useRef<HTMLFormElement>(null);
	const OTPRefs = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	];
	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const data = e.clipboardData.getData("Text");
		for (let i = 0; i < 6; i++) {
			OTPRefs[i].current!.value = data[i];
		}
		setCode(data);
	};
	const handleOTPInputs = (e: React.KeyboardEvent, index: number) => {
		const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		e.preventDefault();
		if (index < 5) {
			if (e.key === "Backspace") {
				if ((e.target as HTMLInputElement).value === "") {
					if (index > 0) {
						OTPRefs[index].current!.value = "";
						OTPRefs[index - 1].current?.focus();
					} else if (index === 0) {
						OTPRefs[index].current!.value = "";
					}
				} else {
					OTPRefs[index].current!.value = "";
				}
				return;
			}
			if (e.key === "ArrowRight") {
				OTPRefs[index + 1].current?.focus();
				return;
			}
			if (e.key === "ArrowLeft") {
				if (index > 0) {
					OTPRefs[index - 1].current?.focus();
				}
				return;
			}
			if (validKeys.includes(e.key)) {
				OTPRefs[index].current!.value = e.key;
			} else {
				return;
			}
			OTPRefs[index + 1].current?.focus();
		}
		if (index === 5) {
			if (e.key === "Backspace") {
				if ((e.target as HTMLInputElement).value === "") {
					OTPRefs[index].current!.value = "";
					OTPRefs[index - 1].current?.focus();
				} else {
					OTPRefs[index].current!.value = "";
				}
				return;
			}
			if (e.key === "ArrowLeft") {
				OTPRefs[index - 1].current?.focus();
				return;
			}
			if (validKeys.includes(e.key)) {
				OTPRefs[index].current!.value = e.key;
			} else {
				return;
			}
			let otp = "";
			for (let i = 0; i < 6; i++) {
				otp += OTPRefs[i].current!.value;
			}
			setCode(otp);
		}
	};
	function handleOTPSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const toaster2 = toast.loading("Verifying OTP...");
		axios
			.post(props.link, {
				email: props.email,
				code: code,
			})
			.then((res) => {
				if (res.status === 200) {
					toast.update(toaster2, {
						render: "OTP verified successfully",
						type: "success",
						autoClose: 2000,
						isLoading: false,
					});
					setTimeout(() => {
						if(props.setChangePassword){
							props.setChangePassword(true);
						}
						if(props.setVerify){
							props.setVerify(true);
						}
					}, 1000);
				}
			})
			.catch((err) => {
				toast.update(toaster2, {
					render: "Error occurred: " + err.response.data,
					type: "error",
					autoClose: 2000,
					isLoading: false,
				});
			});
	}
	useEffect(() => {
		if (props.changeOTP && props.email) {
			formRef.current!.style.display = "flex";
		}
	}, [props]);
	useEffect(() => {
		if (props.changePassword) {
			formRef.current!.style.display = "none";
		}
		else if(!props.changeOTP && !props.changePassword && !props.setChangePassword){
			formRef.current!.style.display = "flex";
		}
	}, [props]);
	return (
		<form
			onSubmit={handleOTPSubmit}
			ref={formRef}
			className="flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg hidden"
		>
			<div className="flex w-full h-4 text-sm font-medium items-center justify-center">
				We have sent a verification code to {props.email}
			</div>
			<div className="OTPInput w-full h-32 flex items-center justify-evenly">
				<input
					onKeyDown={(event) => {
						handleOTPInputs(event, 0);
					}}
					onPaste={(e) => {
						handlePaste(e);
					}}
					type="text"
					ref={OTPRefs[0]}
					className="w-16 h-28 border border-black rounded-lg text-center text-4xl"
					maxLength={1}
				/>
				<input
					onKeyDown={(event) => {
						handleOTPInputs(event, 1);
					}}
					onPaste={(e) => {
						handlePaste(e);
					}}
					type="text"
					ref={OTPRefs[1]}
					className="w-16 h-28 border border-black rounded-lg text-center text-4xl"
					maxLength={1}
				/>
				<input
					onKeyDown={(event) => {
						handleOTPInputs(event, 2);
					}}
					onPaste={(e) => {
						handlePaste(e);
					}}
					type="text"
					ref={OTPRefs[2]}
					className="w-16 h-28 border border-black rounded-lg text-center text-4xl"
					maxLength={1}
				/>
				<input
					onKeyDown={(event) => {
						handleOTPInputs(event, 3);
					}}
					onPaste={(e) => {
						handlePaste(e);
					}}
					type="text"
					ref={OTPRefs[3]}
					className="w-16 h-28 border border-black rounded-lg text-center text-4xl"
					maxLength={1}
				/>
				<input
					onKeyDown={(event) => {
						handleOTPInputs(event, 4);
					}}
					onPaste={(e) => {
						handlePaste(e);
					}}
					type="text"
					ref={OTPRefs[4]}
					className="w-16 h-28 border border-black rounded-lg text-center text-4xl"
					maxLength={1}
				/>
				<input
					onKeyDown={(event) => {
						handleOTPInputs(event, 5);
					}}
					onPaste={(e) => {
						handlePaste(e);
					}}
					type="text"
					ref={OTPRefs[5]}
					className="w-16 h-28 border border-black rounded-lg text-center text-4xl"
					maxLength={1}
				/>
			</div>
			<input
				className="w-full px-2 py-2 rounded-lg border-2 focus:outline-none"
				type="submit"
				placeholder="Continue"
			/>
		</form>
	);
}

const PasswordInput = (props: PasswordInputProps) => {
	const navigate = useNavigate();
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const checkConfirmPassword = (
		password: string,
		confirmPassword: string
	) => {
		return password === confirmPassword;
	};
	const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!checkPassword(passwordRef.current!.value)) {
			toast.error(
				"Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character, and must be at least 8 characters long"
			);
			return;
		}
		const password = passwordRef.current!.value;
		const confirmPassword = confirmPasswordRef.current!.value;
		const toaster = toast.loading("Changing password...");
		if (checkConfirmPassword(password, confirmPassword)) {
			axios
				.put("http://localhost:3000/api/auth/reset-password", {
					password: password,
					email: props.email,
				})
				.then((res) => {
					if (res.status === 200) {
						toast.update(toaster, {
							render: "Password changed successfully",
							type: "success",
							autoClose: 2000,
							isLoading: false,
						});
						setTimeout(() => {
							navigate("/login");
						}, 10000);
					}
				})
				.catch((err) => {
					toast.update(toaster, {
						render: "Error occurred: " + err.response.data,
						type: "error",
						autoClose: 2000,
						isLoading: false,
					});
				});
		} else {
			toast.update(toaster, {
				render: "Passwords do not match",
				type: "error",
				autoClose: 2000,
				isLoading: false,
			});
		}
	};
	useEffect(() => {
		if (props.changePassword) {
			formRef.current!.style.display = "flex";
		}
	}, [props]);
	return (
		<form
			onSubmit={(event) => {
				handlePasswordChange(event);
			}}
			ref={formRef}
			className="flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg hidden"
		>
			<input
				className="w-full px-2 py-2 rounded-lg border-2 focus:outline-none"
				ref={passwordRef}
				name="password"
				type="password"
				placeholder="New password"
				required
			/>
			<input
				className="w-full px-2 py-2 rounded-lg border-2 focus:outline-none"
				ref={confirmPasswordRef}
				name="confirmPassword"
				type="password"
				placeholder="Re-enter new password"
				required
			/>
			<input
				className="w-full px-2 py-2 rounded-lg border-2 focus:outline-none cursor-pointer"
				type="submit"
				placeholder="Confirm"
			/>
		</form>
	);
};

export default function ResetPass() {
	const navigate = useNavigate();
	const emailRef = useRef<HTMLInputElement>(null);
	const [email, setEmail] = useState("");
	const [changeOTP, setChangeOTP] = useState(false);
	const [changePassword, setChangePassword] = useState(false);
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

	useEffect(() => {}, [changeOTP]);

	useEffect(() => {}, [changePassword]);
	return (
		<div className="box-border px-4 lg:w-2/5 md:w-4/5 sm:w-full flex flex-col items-center justify-center">
			<AccountPageLogo />
			<EmailInput
				ref={emailRef}
				setChangeOTP={setChangeOTP}
				setEmail={setEmail}
				changeOTP={changeOTP}
			/>
			<OTPInput
				email={email}
				setChangePassword={setChangePassword}
				changePassword={changePassword}
				changeOTP={changeOTP}
				link={"http://localhost:3000/api/auth/reset-password/verify-OTP"}
			/>
			<PasswordInput changePassword={changePassword} email={email} />
		</div>
	);
}
