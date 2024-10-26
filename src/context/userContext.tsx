import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authService } from "@/services/auth.service";
import { User } from "@/types/api";

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await authService.checkAuth();
      if (currentUser) {
        setUser(currentUser?.user);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
