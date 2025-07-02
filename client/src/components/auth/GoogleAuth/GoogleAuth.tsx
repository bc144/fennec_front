"use client";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../../../services/api";

interface GoogleAuthProps {
  mode: "login" | "signup";
}

interface BackendError {
  response?: {
    status: number;
  };
  message?: string;
}

const GoogleAuth = ({ mode }: GoogleAuthProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Handle backend registration/login based on mode
      try {
        if (mode === "signup") {
          // For signup, use the /auth/google endpoint that creates the user
          await api.post("/auth/google");
        } else {
          // For login, use the /auth/login endpoint to verify existing user
          const loginData = {
            firebaseId: user.uid
          };
          await api.post("/auth/login", loginData);
        }
      } catch (backendError: unknown) {
        // Backend failed - sign out from Firebase to prevent redirect
        await signOut(auth);

        const error = backendError as BackendError;

        // Handle specific error messages
        if (error.response?.status === 401 && mode === "login") {
          throw new Error("Account not found. Please sign up first.");
        } else if (error.response?.status === 400 && mode === "signup") {
          throw new Error("Account already exists. Please login instead.");
        } else {
          throw new Error("Backend server is not available. Please try again later.");
        }
      }

      // Only redirect if everything succeeded
      router.push("/platform/dashboard");
    } catch (err: unknown) {
      console.error('Error en autenticación con Google:', err);
      
      if (err && typeof err === 'object' && 'code' in err) {
        const firebaseError = err as { code?: string; message?: string };
        console.error(firebaseError.message || 'Error al iniciar sesión con Google');
      } else {
        console.error('Error al iniciar sesión con Google');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      Continuar con Google
    </button>
  );
};

export default GoogleAuth;