import logodark from "../assets/logo-dark.svg";
import logolight from "../assets/logo-light.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import AlertModal from "../AlertModel/AlertModel";

export default function SignUp() {
	const isDark = (localStorage.theme === 'dark') ? true : false;
	const [visible, setVisible] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false); // Control modal visibility
	const [message, setMessage] = useState(""); // Store success/error message
	const [isError, setIsError] = useState(false); // Control error or success state
	const [shouldNavigate, setShouldNavigate] = useState(false); // Control navigation
	const [isLoading, setIsLoading] = useState(false); // Loading state for sign up button
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};



	const validatePasswordStrength = (password) => {
		// Check for at least one uppercase letter, one lowercase letter, one digit, one special character, and a minimum length of 8
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		return passwordRegex.test(password);
	};

	const handleSignUp = () => {
		setIsLoading(true); // Set loading to true when request starts
		axios.post("http://localhost:5000/teacher/signup", {
			name: formData.name,
			email: formData.email,
			password: formData.password,
		})
			.then(response => {
				console.log(response.data);
				setFormData({
					name: "",
					email: "",
					password: "",

				});
				// setPhoneNumber("");
				setMessage(response.data.message);
				setIsError(false); // Success
				setModalIsOpen(true); // Open modal
				setShouldNavigate(true); // Allow navigation after modal is closed
			})
			.catch(error => {
				console.error(error);
				setMessage("Error signing up.");
				setIsError(true); // Error
				setModalIsOpen(true); // Open modal
			})
			.finally(() => {
				setIsLoading(false); // Set loading to false when request completes
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();



		// Check if password matches the strength criteria
		if (!validatePasswordStrength(formData.password)) {
			setMessage("Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
			setIsError(true);
			setModalIsOpen(true);
			return;
		}

		handleSignUp();
	};

	const closeModal = () => {
		setModalIsOpen(false);
		if (shouldNavigate && !isError) {
			navigate("/login"); // Navigate to the desired page only on success
		}
	};

	return (
		<div className={`flex items-center justify-center min-h-screen bg-gray-100 dark:bg-background-dark bg-background-light`}>

			<div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md bg-container-light dark:bg-container-dark">
				<div className="flex flex-col items-center space-y-2">
					<img src={isDark ? logodark : logolight} className="w-20" alt="EduWiz Logo" />
					<h1 className="text-2xl font-bold text-center text-black dark:text-white">Create an Account</h1>
					<p className="text-gray-500 text-center text-black dark:text-white">
						Join EduWiz and start learning today!
					</p>
				</div>
				<form className="space-y-4" onSubmit={handleSubmit}>
					{/* Full Name Input */}
					<div className="space-y-2 flex flex-col">
						<label htmlFor="fullName" className="text-sm font-medium text-black dark:text-white">
							Full Name
						</label>
						<input
							name="name"
							placeholder="Enter Your Name"
							type="text"
							value={formData.name}
							onChange={handleInputChange}
							required
							className="bw-full border p-2 pr-10 rounded-md border-gray text-black dark:text-black"
						/>
					</div>

					{/* Email Input */}
					<div className="space-y-2 flex flex-col">
						<label htmlFor="email" className="text-sm font-medium text-black dark:text-white">
							Email
						</label>
						<input
							name="email"
							placeholder="Enter Your Email"
							type="email"
							value={formData.email}
							onChange={handleInputChange}
							required
							className="w-full border p-2 pr-10 rounded-md border-gray text-black dark:text-black"
						/>
					</div>

					{/* Password Input */}
					<div className="space-y-2 flex flex-col">
						<label htmlFor="password" className="text-sm font-medium text-black dark:text-white">
							Password
						</label>
						<div className="relative w-full">
							<input
								name="password"
								placeholder="Enter Your Password"
								type={visible ? "text" : "password"}
								value={formData.password}
								onChange={handleInputChange}
								className="w-full border p-2 pr-10 rounded-md border-gray text-black dark:text-black" // Adjusted padding-right (pr-10) for icon spacing
							/>
							<span
								onClick={() => setVisible(!visible)}
								className="absolute right-2 top-2 cursor-pointer text-gray-500 dark:text-black mt-1"
							>
								{visible ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>
					</div>

					{/* Sign Up Button */}
					<div>
						<button
							className="w-full bg-primary-light hover:bg-hover-light dark:bg-primary-dark dark:hover:bg-hover-dark text-white rounded-md p-2"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? "Signing Up..." : "SIGN UP"}
						</button>
					</div>

					{/* Redirect to Sign In */}
					<div className="text-center">
						<p className="text-sm text-black dark:text-white">
							Already have an account?{" "}
							<Link to="/login" className="text-primary-light dark:text-primary-dark hover:underline">Sign In</Link>
						</p>
					</div>
				</form>
				<AlertModal
					isOpen={modalIsOpen}
					onClose={closeModal} // Close modal and navigate if needed
					message={message}
					isError={isError}
				/>
			</div>
		</div>
	);
}
