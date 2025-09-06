"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ 1. Import useRouter
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Google Icon Component (unchanged)
const GoogleIcon = () => (
  <svg className="mr-3 h-5 w-5" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.012,35.836,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
  </svg>
);

const registerFormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters.",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const otpFormSchema = z.object({
  otp: z
    .string()
    .length(5, {
      message: "OTP must be exactly 5 digits.",
    })
    .regex(/^\d{5}$/, {
      message: "OTP must contain only digits.",
    }),
});

export default function RegisterForm() {
  const router = useRouter();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${backendURL}/api/csrf-token`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setCsrfToken(data.csrfToken);
          console.log("CSRF Token fetched successfully.");
        } else {
          console.error("Failed to fetch CSRF token");
          toast.error("Security Error", {
            description: "Could not initialize a secure session.",
          });
        }
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
        toast.error("Connection Error", {
          description: "Could not connect to the server for security setup.",
        });
      }
    };
    fetchCsrfToken();
  }, []);

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onChange",
  });

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onRegisterSubmit(values: RegisterFormValues) {
    if (!csrfToken) {
      toast.error("Security Error", {
        description: "Cannot submit form. Secure token is missing.",
      });
      return;
    }

    toast.info("Registering account...", {
      description: `Username: ${values.username}`,
      duration: 2000,
    });

    try {
      const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendURL}/auth/register/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
        credentials: "include",
      });

      if (response.ok) {
        setRegistrationEmail(values.email);
        setShowOtpForm(true);
        toast.success("Registration Successful!", {
          description: "Please check your email for the OTP code.",
        });
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        toast.error("Registration Failed", {
          description:
            errorData.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Connection Error", {
        description: "Unable to connect to the server. Please try again.",
      });
    }
  }

  // ✅ 3. แก้ไขฟังก์ชัน onOtpSubmit ทั้งหมด
  async function onOtpSubmit(values: z.infer<typeof otpFormSchema>) {
    if (!csrfToken) {
      toast.error("Security Error", {
        description: "Cannot submit form. Secure token is missing.",
      });
      return;
    }

    toast.info("Verifying OTP...", {
      description: `Code: ${values.otp}`,
      duration: 2000,
    });

    try {
      const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendURL}/auth/register/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          email: registrationEmail,
          otp: values.otp,
        }),
        credentials: "include",
      });

      if (response.ok) {
        console.log("OTP verification successful");

        toast.success("Account Verified!", {
          description:
            "Your account is verified. Redirecting to the homepage...",
        });

        // หน่วงเวลา 2 วินาทีเพื่อให้ผู้ใช้อ่านข้อความ แล้วค่อย redirect
        setTimeout(() => {
          router.push("/"); // พาไปยังหน้าหลัก
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error("OTP verification failed:", errorData);
        toast.error("Verification Failed", {
          description:
            errorData.message || "Invalid OTP code. Please try again.",
        });
      }
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Connection Error", {
        description: "Unable to connect to the server. Please try again.",
      });
    }
  }

  const handleBackToRegister = () => {
    setShowOtpForm(false);
    setRegistrationEmail("");
    registerForm.reset();
  };

  const handleGoogleLogin = () => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    window.location.href = `${backendURL}/auth/google`;
  };

  const OtpVerificationForm = () => (
    <div className="w-full max-w-sm space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="rounded-full p-2"
          onClick={handleBackToRegister}
        >
          <ArrowLeft
            size={24}
            className="h-6 w-6 text-gray-700 sm:h-8 sm:w-8"
          />
        </Button>
        <h1 className="flex-grow pr-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          Verify OTP
        </h1>
      </div>
      <p className="text-center text-gray-600">
        We have sent an OTP code to your email:{" "}
        <span className="font-semibold text-green-600">
          {registrationEmail}
        </span>
      </p>

      <Form {...otpForm}>
        <form
          onSubmit={otpForm.handleSubmit(onOtpSubmit)}
          className="space-y-4"
        >
          <FormField
            control={otpForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-700">
                  OTP Code
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter 5-digit code"
                    {...field}
                    className="h-11 rounded-md border-gray-300 text-center text-base tracking-widest focus:border-green-500 focus:ring-green-500 sm:h-12"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-12 w-full rounded-md bg-green-500 text-lg font-semibold text-white shadow-md transition-colors duration-200 hover:bg-green-600 sm:h-14"
          >
            Verify Account
          </Button>
        </form>
      </Form>
    </div>
  );

  const RegisterMainForm = () => (
    <div className="flex min-h-screen flex-col bg-white p-10 md:p-10">
      <div className="flex flex-grow items-start justify-center">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Create Account
            </h1>
          </div>

          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
              className="space-y-4"
            >
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Choose a username"
                        {...field}
                        className="h-11 rounded-md border-gray-300 text-base focus:border-green-500 focus:ring-green-500 sm:h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="h-11 rounded-md border-gray-300 text-base focus:border-green-500 focus:ring-green-500 sm:h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        {...field}
                        className="h-11 rounded-md border-gray-300 text-base focus:border-green-500 focus:ring-green-500 sm:h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                        className="h-11 rounded-md border-gray-300 text-base focus:border-green-500 focus:ring-green-500 sm:h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md py-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      {/* MODIFIED: Added whitespace-nowrap */}
                      <FormLabel className="text-sm font-normal whitespace-nowrap text-green-500">
                        I agree to the {""}
                        <a
                          href="/terms"
                          className="underline hover:text-green-600"
                        >
                          Terms of Service
                        </a>
                        and
                        <a
                          href="/privacy"
                          className="underline hover:text-green-600"
                        >
                          Privacy Policy
                        </a>
                        .
                      </FormLabel>
                      <FormMessage className="text-sm text-red-500" />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={!registerForm.formState.isValid}
                className="h-12 w-full rounded-md bg-green-500 text-lg font-semibold text-white shadow-md transition-colors duration-200 hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-400 sm:h-14"
              >
                Register
              </Button>
            </form>
          </Form>

          <div className="mt-6 flex items-center space-x-3">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <Button
            variant="outline"
            className="h-11 w-full rounded-md border-gray-300 text-base font-medium transition-colors duration-200 hover:bg-gray-50 sm:h-12 sm:text-lg"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Register with Google
          </Button>

          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-green-600 hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-white p-4 sm:p-6 md:p-10">
      <div className="flex flex-grow items-center justify-center">
        {showOtpForm ? <OtpVerificationForm /> : <RegisterMainForm />}
      </div>
    </div>
  );
}
