"use client"
import { Body } from "./customs/body";
import { Header } from "./customs/header";

export const Worker = () => {
  return (
    <div className="h-[calc(100vh-130px)] m-4 space-y-2">
      <Header />
      <Body />
    </div>
  )
}
