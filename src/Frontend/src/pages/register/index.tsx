import { useNavigate } from "react-router-dom";
import AccountPageLogo from "../../components/AccountPageLogo";
import AccountPageInput from "../../components/AccountPageInput";
import { toast } from "react-toastify";

export default function Register(props: any) {
	const navigate = useNavigate();
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
		const toaster = toast.loading("Registering user...");
        // const promise = new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve('Success!');
        //     }, 50000);
        // });
        // await promise;
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
				setTimeout(() => navigate("/login"), 3000); // Redirect to login page after 3 seconds
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
	return (
		<div className="box-border px-4 lg:w-2/5 md:w-4/5 sm:w-full flex flex-col items-center justify-center">
			<AccountPageLogo />
			<form
				className="flex flex-col items-center justify-center w-full gap-4 min-w-96 max-w-lg"
				onSubmit={handleRegister}
			>
				<AccountPageInput
					name="email"
					type="email"
					placeholder="Email"
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
					<a href="/login">Already have an account? Sign in now!</a>
				</div>
			</form>
		</div>
	);
}
