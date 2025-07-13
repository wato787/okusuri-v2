import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";

// Import pages
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
					<Routes>
						<Route
							path="/auth"
							element={
								<Layout showNavigation={false}>
									<Auth />
								</Layout>
							}
						/>
						<Route
							path="/"
							element={
								<Layout>
									<ProtectedRoute>
										<Home />
									</ProtectedRoute>
								</Layout>
							}
						/>
						<Route
							path="/calendar"
							element={
								<Layout>
									<ProtectedRoute>
										<Calendar />
									</ProtectedRoute>
								</Layout>
							}
						/>
						<Route
							path="/profile"
							element={
								<Layout>
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								</Layout>
							}
						/>
						<Route
							path="/settings"
							element={
								<Layout>
									<ProtectedRoute>
										<Settings />
									</ProtectedRoute>
								</Layout>
							}
						/>
						<Route
							path="/stats"
							element={
								<Layout>
									<ProtectedRoute>
										<Stats />
									</ProtectedRoute>
								</Layout>
							}
						/>
					</Routes>
					<Toaster position="top-center" />
				</Router>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;