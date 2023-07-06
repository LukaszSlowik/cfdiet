"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MealProvider } from "@/context/mealContext";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";

type Props = {
  children: ReactNode;
  session?: Session | null | undefined;
};

export default function Provider({ children, session }: Props) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        <MealProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </MealProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
