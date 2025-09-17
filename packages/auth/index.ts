import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import NextAuthProvider from "@auth-kit/next";
import FoodifyAuthProvider from "./provider";
import NextAuth from "@auth-kit/next/NextAuth";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export { useAuthHeader, NextAuthProvider, FoodifyAuthProvider, NextAuth, useSignIn, useSignOut, useIsAuthenticated, useAuthUser };