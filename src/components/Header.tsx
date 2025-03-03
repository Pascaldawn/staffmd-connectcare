import { Building2, Menu, X, User, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">StaffMD</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/search" className="text-gray-600 hover:text-primary dark:text-gray-300">
              Find Providers
            </Link>
            <Link to="/register/company" className="text-gray-600 hover:text-primary dark:text-gray-300">
              Companies
            </Link>
            <Link to="/register/provider" className="text-gray-600 hover:text-primary dark:text-gray-300">
              Healthcare Providers
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/search"
                className="text-gray-600 hover:text-primary dark:text-gray-300 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Providers
              </Link>
              <Link
                to="/register/company"
                className="text-gray-600 hover:text-primary dark:text-gray-300 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Companies
              </Link>
              <Link
                to="/register/provider"
                className="text-gray-600 hover:text-primary dark:text-gray-300 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Healthcare Providers
              </Link>
              {user ? (
                <>
                  <Link
                    to="/settings"
                    className="text-gray-600 hover:text-primary dark:text-gray-300 px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-primary dark:text-gray-300 px-2 py-1"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
