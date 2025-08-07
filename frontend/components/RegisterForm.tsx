"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ArrowLeft } from 'lucide-react'

// คอมโพเนนต์ Google Icon
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.012,35.836,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

// กำหนด Schema สำหรับฟอร์มลงทะเบียนโดยใช้ Zod
const registerFormSchema = z.object({
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
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

// กำหนด Schema สำหรับฟอร์ม OTP
const otpFormSchema = z.object({
  otp: z.string().length(6, {
    message: "OTP must be exactly 6 digits.",
  }).regex(/^\d{6}$/, {
    message: "OTP must contain only digits.",
  }),
});

export default function RegisterForm() {
  // สร้าง state เพื่อจัดการการแสดงผลระหว่างฟอร์มลงทะเบียนและฟอร์ม OTP
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState("");

  // เริ่มต้น react-hook-form สำหรับฟอร์มลงทะเบียน
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // เริ่มต้น react-hook-form สำหรับฟอร์ม OTP
  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  // ฟังก์ชันสำหรับจัดการการส่งฟอร์มลงทะเบียน
  async function onRegisterSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log("ข้อมูลการลงทะเบียน:", values);

    toast.info("Registering account...", {
      description: `Username: ${values.username}`,
      duration: 2000,
    });

    try {
      // URL Backend API สำหรับการลงทะเบียนจริง
      const registerBackendUrl = 'http://localhost:8080/api/register';

      const response = await fetch(registerBackendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
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
          description: errorData.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("ข้อผิดพลาดในการเชื่อมต่อ:", error);
      toast.error("Connection Error", {
        description: "Unable to connect to the server. Please try again.",
      });
    }
  }

  // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม OTP
  async function onOtpSubmit(values: z.infer<typeof otpFormSchema>) {
    console.log("ข้อมูล OTP:", values);

    toast.info("Verifying OTP...", {
      description: `Code: ${values.otp}`,
      duration: 2000,
    });

    try {
      // URL Backend API สำหรับยืนยัน OTP จริง
      const otpBackendUrl = 'http://localhost:8080/api/verify-otp';

      const response = await fetch(otpBackendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registrationEmail,
          otp: values.otp,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("OTP verification successful:", data);
        toast.success("Account Verified!", {
          description: "Your account has been successfully verified. You can now log in.",
        });
        // เมื่อยืนยันสำเร็จ สามารถเปลี่ยนเส้นทางไปยังหน้า Login
        // window.location.href = "/login";
      } else {
        const errorData = await response.json();
        console.error("OTP verification failed:", errorData);
        toast.error("Verification Failed", {
          description: errorData.message || "Invalid OTP code. Please try again.",
        });
      }
    } catch (error) {
      console.error("ข้อผิดพลาดในการเชื่อมต่อ:", error);
      toast.error("Connection Error", {
          description: "Unable to connect to the server. Please try again.",
      });
    }
  }

  // ฟังก์ชันสำหรับย้อนกลับจากหน้า OTP ไปหน้าลงทะเบียน
  const handleBackToRegister = () => {
    setShowOtpForm(false);
    setRegistrationEmail("");
    registerForm.reset(); // รีเซ็ตค่าฟอร์มลงทะเบียน
  }

  // ฟอร์มสำหรับยืนยัน OTP
  const OtpVerificationForm = () => (
    <div className="w-full max-w-sm space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" className="rounded-full p-2" onClick={handleBackToRegister}>
          <ArrowLeft size={24} className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
        </Button>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex-grow text-center pr-12">Verify OTP</h1>
      </div>
      <p className="text-center text-gray-600">
        We have sent an OTP code to your email: <span className="font-semibold text-green-600">{registrationEmail}</span>
      </p>

      <Form {...otpForm}>
        <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
          <FormField
            control={otpForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">OTP Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter 6-digit code"
                    {...field}
                    className="h-11 sm:h-12 text-base rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 text-center tracking-widest"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-12 sm:h-14 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition-colors duration-200"
          >
            Verify Account
          </Button>
        </form>
      </Form>
    </div>
  );

  // ฟอร์มสำหรับลงทะเบียน
  const RegisterMainForm = () => (
    <div className="w-full max-w-sm space-y-6">
      <div className="w-full">
        <Button variant="ghost" className="rounded-full p-2">
          <ArrowLeft size={24} className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
        </Button>
      </div>
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Create Account</h1>
      </div>

      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
          <FormField
            control={registerForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Choose a username"
                    {...field}
                    className="h-11 sm:h-12 text-base rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="h-11 sm:h-12 text-base rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    {...field}
                    className="h-11 sm:h-12 text-base rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                    className="h-11 sm:h-12 text-base rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 sm:h-14 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition-colors duration-200"
          >
            Register
          </Button>
        </form>
      </Form>

      <div className="flex items-center space-x-3 mt-6">
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <Button variant="outline" className="w-full h-11 sm:h-12 text-base sm:text-lg font-medium rounded-md border-gray-300 hover:bg-gray-50 transition-colors duration-200">
        <GoogleIcon />
        Register with Google
      </Button>

      <div className="text-center text-sm mt-4">
        <p className="text-gray-600">Already have an account?{' '}
          <a href="#" className="font-semibold text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 sm:p-6 md:p-10">
      <div className="flex-grow flex items-center justify-center">
        {showOtpForm ? <OtpVerificationForm /> : <RegisterMainForm />}
      </div>
    </div>
  );
}
