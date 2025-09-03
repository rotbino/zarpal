"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Phone, Lock } from "lucide-react";
import { Button } from "@/components/radix/button";
import { Input } from "@/components/radix/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/radix/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/radix/form";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login data:", data);
      // Redirect to home page after successful login
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Card className="border-0 shadow-none bg-white rounded-none">
        <CardHeader className="text-center pb-8 pt-12">
          {/* Logo */}
          <div className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">دیجی</span>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            ورود
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            برای ورود به حساب کاربری خود اطلاعات زیر را وارد کنید
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right block text-gray-700 text-lg font-medium mb-3">
                      شماره موبایل
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                        <Input
                          {...field}
                          type="tel"
                          placeholder="09123456789"
                          className="pr-14 text-right bg-gray-50 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 h-14 text-lg rounded-xl"
                          dir="rtl"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right block text-gray-700 text-lg font-medium mb-3">
                      رمز عبور
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="رمز عبور خود را وارد کنید"
                          className="pr-14 pl-14 text-right bg-gray-50 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 h-14 text-lg rounded-xl"
                          dir="rtl"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-6 w-6" />
                          ) : (
                            <Eye className="h-6 w-6" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center">
                <Link
                  href="/auth/forgot-password"
                  className="text-purple-600 hover:text-purple-800 text-lg"
                >
                  فراموشی رمز عبور
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? "در حال ورود..." : "ورود"}
              </Button>

              <div className="text-center mt-8">
                <span className="text-gray-600 text-lg">
                  حساب کاربری ندارید؟{" "}
                </span>
                <Link
                  href="/auth/register"
                  className="text-purple-600 hover:text-purple-800 font-bold text-lg"
                >
                  ثبت نام
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
