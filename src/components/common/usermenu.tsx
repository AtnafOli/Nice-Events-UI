import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface UserMenuProps {
  user: {
    name?: string;
    email?: string;
    Profile?: {
      avatarUrl?: string;
    };
  };
  menuItems: MenuItem[];
  handleNavigate: (path: string) => void;
  handleLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  menuItems,
  handleNavigate,
  handleLogout,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-14 w-14 rounded-full overflow-hidden transition-transform hover:scale-105 focus:ring-0 border border-primary/30"
        >
          <Avatar className="h-14 w-14">
            {user.Profile && (
              <AvatarImage
                src={user?.Profile?.avatarUrl || "/placeholder-user.jpg"}
                alt={user?.name}
                className="object-cover"
              />
            )}
            <AvatarFallback className="bg-gradient-to-br from-primary-400 to-primary-600 w-full h-full text-primary font-medium">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "UN"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
        align="end"
        forceMount
      >
        <div className="px-2 py-3 border-b border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {user?.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>
        </div>

        <div className="py-2">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <DropdownMenuItem key={path} className="px-1 py-0.5">
              <button
                onClick={() => handleNavigate(path)}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-150"
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </button>
            </DropdownMenuItem>
          ))}
        </div>

        <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700">
          <DropdownMenuItem className="px-1 py-0.5">
            <button
              onClick={() => handleLogout()}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Log out</span>
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
