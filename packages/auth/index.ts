import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import NextAuthProvider from "@auth-kit/next";
import FoodifyAuthProvider from "./provider";
import NextAuth from "@auth-kit/next/NextAuth";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export { useAuthHeader, NextAuthProvider, FoodifyAuthProvider, NextAuth, useSignIn, useSignOut };