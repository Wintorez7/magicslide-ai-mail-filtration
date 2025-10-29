"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Mail, Lock, Wallet, Apple, Coins, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md rounded-2xl shadow-lg border border-gray-200 bg-white">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center gap-2">
            <Button
              variant={isLogin ? "default" : "outline"}
              className={cn(
                "rounded-full text-sm px-6",
                isLogin ? "bg-gray-900 text-white" : "text-gray-700"
              )}
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "default" : "outline"}
              className={cn(
                "rounded-full text-sm px-6",
                !isLogin ? "bg-gray-900 text-white" : "text-gray-700"
              )}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-8 pb-6">
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <FcGoogle size={20} /> Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <Apple size={18} /> Continue with Apple
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <Coins size={18} /> Continue with Binance
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <Wallet size={18} /> Continue with Wallet
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-gray-500 uppercase">or</span>
            <Separator className="flex-1" />
          </div>

          <form className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-400"
                />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="pl-9 bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-400"
                />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="pl-9 bg-gray-50"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="rounded border-gray-300"
                />
                <label
                  htmlFor="newsletter"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Please keep me updated by email with the latest news.
                </label>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-black text-white rounded-md hover:bg-gray-800"
            >
              {isLogin ? "Login" : "Create an account"}
            </Button>

            {isLogin ? (
              <p className="text-center text-sm text-gray-500">
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="text-black font-medium"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-black font-medium"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
