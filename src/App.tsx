import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Import pages (will be created)
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Calendar } from "./pages/Calendar";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Stats } from "./pages/Stats";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Router>
					<div className="min-h-screen bg-gray-50">
						<Routes>
							<Route path="/auth" element={<Auth />} />
							<Route
								path="/"
								element={
									<ProtectedRoute>
										<Home />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/calendar"
								element={
									<ProtectedRoute>
										<Calendar />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/profile"
								element={
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/settings"
								element={
									<ProtectedRoute>
										<Settings />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/stats"
								element={
									<ProtectedRoute>
										<Stats />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</div>
					<Toaster position="top-center" />
				</Router>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;