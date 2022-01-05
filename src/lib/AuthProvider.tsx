import {
  User,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { auth, db } from "./firebase";
import { FC, createContext, useEffect, useState, useContext } from "react";
import { CircularProgress } from "@chakra-ui/react";

type AuthContextType = {
  currentUser: User | null;
  loginWithGoogle?: () => Promise<void>;
  logout?: () => void;
  loginWithEmailAndPassword?: (
    email: string,
    password: string
  ) => Promise<void>;
  createUser?: (
    userName: string,
    email: string,
    password: string
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({ currentUser: null });

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // アカウント新規作成
  const createUser = async (email, password, userName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      let userID = auth.currentUser!.uid;
      await setDoc(doc(db, "users", userID), {
        displayName: userName,
      });
      router.push("/works");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err);
      }
    }
  };

  // Eメールとパスワードでログイン
  const loginWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/works");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  // Googleアカウントでログイン及び登録
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      router.push("/works");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    router.push("/login");
    auth.signOut();
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);

  const value: AuthContextType = {
    currentUser,
    createUser,
    loginWithGoogle,
    loginWithEmailAndPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <CircularProgress
          height={"100vh"}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          isIndeterminate
          color="teal.300"
          size="70px"
        />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
