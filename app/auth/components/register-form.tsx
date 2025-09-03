"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/radix/input-otp";
import {
  registerStepOneSchema,
  registerStepTwoSchema,
  registerStepThreeSchema,
  type RegisterStepOneData,
  type RegisterStepTwoData,
  type RegisterStepThreeData,
} from "@/lib/validations/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RegisterStep = 1 | 2 | 3;

export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState<RegisterStep>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationData, setRegistrationData] = useState<
    Partial<RegisterStepOneData & RegisterStepTwoData & RegisterStepThreeData>
  >({});
  const router = useRouter();

  const stepOneForm = useForm<RegisterStepOneData>({
    resolver: zodResolver(registerStepOneSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  });

  const stepTwoForm = useForm<RegisterStepTwoData>({
    resolver: zodResolver(registerStepTwoSchema),
    defaultValues: {
      otp: "",
    },
  });

  const stepThreeForm = useForm<RegisterStepThreeData>({
    resolver: zodResolver(registerStepThreeSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onStepOneSubmit = async (data: RegisterStepOneData) => {
    setIsLoading(true);
    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRegistrationData((prev) => ({ ...prev, ...data }));
      setCurrentStep(2);
    } catch (error) {
      console.error("Step 1 error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onStepTwoSubmit = async (data: RegisterStepTwoData) => {
    setIsLoading(true);
    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRegistrationData((prev) => ({ ...prev, ...data }));
      setCurrentStep(3);
    } catch (error) {
      console.error("Step 2 error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onStepThreeSubmit = async (data: RegisterStepThreeData) => {
    setIsLoading(true);
    try {
      // Simulate API call to complete registration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const finalData = { ...registrationData, ...data };
      console.log("Registration completed:", finalData);
      router.push("/auth/login");
    } catch (error) {
      console.error("Step 3 error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as RegisterStep);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                step <= currentStep
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`w-12 h-2 mx-3 rounded-full ${
                  step < currentStep
                    ? "bg-gradient-to-r from-purple-600 to-pink-600"
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <Card className="border-0 shadow-none bg-white rounded-none">
        <CardHeader className="text-center pb-8 pt-12">
          {/* Logo */}
          <div className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">دیجی</span>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            {currentStep === 1 && "ثبت نام"}
            {currentStep === 2 && "تایید شماره موبایل"}
            {currentStep === 3 && "تنظیم رمز عبور"}
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            {currentStep === 1 && "اطلاعات شخصی خود را وارد کنید"}
            {currentStep === 2 &&
              "کد تایید ارسال شده به شماره موبایل را وارد کنید"}
            {currentStep === 3 && "رمز عبور خود را تنظیم کنید"}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8">
          {renderStepIndicator()}

          {currentStep === 1 && (
            <Form {...stepOneForm}>
              <form
                onSubmit={stepOneForm.handleSubmit(onStepOneSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={stepOneForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block text-gray-700 text-lg font-medium mb-3">
                          نام
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                            <Input
                              {...field}
                              placeholder="نام خود را وارد کنید"
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
                    control={stepOneForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block text-gray-700 text-lg font-medium mb-3">
                          نام خانوادگی
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                            <Input
                              {...field}
                              placeholder="نام خانوادگی خود را وارد کنید"
                              className="pr-14 text-right bg-gray-50 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 h-14 text-lg rounded-xl"
                              dir="rtl"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-right" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={stepOneForm.control}
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
                  control={stepOneForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right block text-gray-700 text-lg font-medium mb-3">
                        ایمیل (اختیاری)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="example@email.com"
                            className="pr-14 text-left bg-gray-50 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 h-14 text-lg rounded-xl"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? "در حال ارسال..." : "ادامه"}
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </form>
            </Form>
          )}

          {currentStep === 2 && (
            <Form {...stepTwoForm}>
              <form
                onSubmit={stepTwoForm.handleSubmit(onStepTwoSubmit)}
                className="space-y-8"
              >
                <div className="text-center">
                  <p className="text-gray-600 mb-6 text-lg">
                    کد تایید به شماره {registrationData.phone} ارسال شد
                  </p>
                </div>

                <FormField
                  control={stepTwoForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-center block text-gray-700 text-lg font-medium mb-6">
                        کد تایید
                      </FormLabel>
                      <FormControl>
                        <div className="flex justify-center">
                          <InputOTP
                            maxLength={4}
                            value={field.value}
                            onChange={field.onChange}
                            className="gap-4"
                          >
                            <InputOTPGroup className="gap-4">
                              <InputOTPSlot
                                index={0}
                                className="w-16 h-16 text-2xl border-2 border-gray-200 rounded-xl"
                              />
                              <InputOTPSlot
                                index={1}
                                className="w-16 h-16 text-2xl border-2 border-gray-200 rounded-xl"
                              />
                              <InputOTPSlot
                                index={2}
                                className="w-16 h-16 text-2xl border-2 border-gray-200 rounded-xl"
                              />
                              <InputOTPSlot
                                index={3}
                                className="w-16 h-16 text-2xl border-2 border-gray-200 rounded-xl"
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />

                <div className="text-center">
                  <button
                    type="button"
                    className="text-purple-600 hover:text-purple-800 text-lg"
                  >
                    ارسال مجدد کد (۰۲:۰۰)
                  </button>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    className="flex-1 h-14 text-lg border-2 rounded-xl"
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                    بازگشت
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold h-14 text-lg rounded-xl shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? "در حال تایید..." : "تایید"}
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {currentStep === 3 && (
            <Form {...stepThreeForm}>
              <form
                onSubmit={stepThreeForm.handleSubmit(onStepThreeSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={stepThreeForm.control}
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

                <FormField
                  control={stepThreeForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right block text-gray-700 text-lg font-medium mb-3">
                        تکرار رمز عبور
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="رمز عبور خود را مجدد وارد کنید"
                            className="pr-14 pl-14 text-right bg-gray-50 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 h-14 text-lg rounded-xl"
                            dir="rtl"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
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

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    className="flex-1 h-14 text-lg border-2 rounded-xl"
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                    بازگشت
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold h-14 text-lg rounded-xl shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? "در حال تکمیل..." : "تکمیل ثبت نام"}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {currentStep === 1 && (
            <div className="text-center mt-8">
              <span className="text-gray-600 text-lg">حساب کاربری دارید؟ </span>
              <Link
                href="/auth/login"
                className="text-purple-600 hover:text-purple-800 font-bold text-lg"
              >
                ورود
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
