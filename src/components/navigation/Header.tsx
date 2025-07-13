import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
	const { signOut, isAuthenticated } = useAuth();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur border-gray-200">
			<div className="container mx-auto flex h-14 items-center justify-between relative px-4">
				<div className="absolute left-0">
					<div className="w-10" />
				</div>

				<div className="font-medium absolute left-1/2 transform -translate-x-1/2">
					おくすり管理
				</div>

				<div className="absolute right-0">
					{isAuthenticated ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="h-10 w-10">
									<Menu className="h-5 w-5" />
									<span className="sr-only">メニューを開く</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuItem asChild>
									<Link
										to="/profile"
										className="flex items-center cursor-pointer"
									>
										<User className="mr-2 h-4 w-4" />
										<span>プロフィール</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={signOut}
									className="flex items-center cursor-pointer"
								>
									<LogOut className="mr-2 h-4 w-4" />
									<span>ログアウト</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button asChild variant="ghost">
							<Link to="/auth">ログイン</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}