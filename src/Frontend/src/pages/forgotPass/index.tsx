import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import AccountPageLogo from "../../components/AccountPageLogo";
import AccountPageInput from "../../components/AccountPageInput";
import { toast } from "react-toastify";
import axios from "axios";

export default function ResetPass(props: any) {
	const [email, setEmail] = useState("placeholder");
	const [otp, setOTP] = useState("");
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const OTPRefs = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	];
	const navigate = useNavigate();
	useEffect(() => {
		axios
			.post(
				"http://localhost:3000/api/auth/verify",
				{},
				{ withCredentials: true }
			)
			.then((res: any) => {
				if (res.status === 200) {
					navigate("/");
				}
			});
	}, []);
	const handleOTPInputs = (e: any, index: number) => {
		const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
		e.preventDefault();
		if (e.key === "Control" && e.key === "v") {
			console.log("Pasting");
			handlePaste(e);
		}
		if (index < 5) {
			if (e.key === "Backspace") {
				if (e.target.value === "") {
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
				if (e.target.value === "") {
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
			setOTP(otp);
		}
	};
	const handlePaste = (e: any) => {
		e.preventDefault();
		const data = e.clipboardData.getData("text");
		for (let i = 0; i < 6; i++) {
			OTPRefs[i].current!.value = data[i];
		}
	};
	const checkConfirmPassword = (
		password: string,
		confirmPassword: string
	) => {
		return password === confirmPassword;
	};
	const handlePasswordChange = (
		e: any,
	) => {
		e.preventDefault();
        const password = passwordRef.current!.value;
        const confirmPassword = confirmPasswordRef.current!.value;
		if (checkConfirmPassword(password, confirmPassword)) {
			axios
				.post("http://localhost:3000/api/auth/reset-password", {
					email: email,
					otp: otp,
					password: password,
				})
				.then((res: any) => {
					if (res.status === 200) {
						toast.success("Password changed successfully");
						navigate("/login");
					}
				})
				.catch((err: any) => {
					toast.error(err.response.data.message);
				});
		} else {
			toast.error("Passwords do not match");
		}
	};
	return (
		<div className="box-border px-4 lg:w-2/5 md:w-4/5 sm:w-full flex flex-col items-center justify-center">
			<AccountPageLogo />
			<form className="flex flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg">
				<AccountPageInput
					name="email"
					type="email"
					placeholder="Email"
				/>
				<AccountPageInput
					type="submit"
					value="Send verification code"
				/>
				<div className="container flex flex-row items-center justify-center">
					<a href="/login">Remember your password? Login now!</a>
				</div>
			</form>
			<form className="flex flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg">
				<div className="flex w-full h-4 text-lg font-medium items-center justify-center">
					We have sent a verification code to {email}
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
				<AccountPageInput type="submit" value="Next" />
			</form>
			<form onSubmit={(event)=>{event.preventDefault()}} className="flex flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg">
				<AccountPageInput
					name="new-password"
					type="password"
					placeholder="New Password"
                    ref={passwordRef}
				/>
				<AccountPageInput
					name="confirm-password"
					type="password"
					placeholder="Re-enter the new password"
                    ref={confirmPasswordRef}
				/>
				<AccountPageInput
					type="submit"
					value="Confirm"
					onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
						handlePasswordChange(event);
					}}
				/>
			</form>
			<form className="flex flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg"></form>
		</div>
	);
}
