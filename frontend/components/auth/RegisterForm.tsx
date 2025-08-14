"use client"

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
import { toast } from "sonner" // สมมติว่า sonner มีให้ใช้งานสำหรับ toast notifications
import { ArrowLeft } from 'lucide-react' // สมมติว่า lucide-react มีให้ใช้งานสำหรับไอคอน

// คอมโพเนนต์ Google Icon (นำกลับมาใช้จากโค้ดที่คุณให้มา)
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.012,35.836,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

// กำหนด Schema สำหรับฟอร์มลงทะเบียนโดยใช้ Zod
const formSchema = z.object({
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
  message: "Passwords don't match.", // ข้อความแสดงข้อผิดพลาดถ้ารหัสผ่านไม่ตรงกัน
  path: ["confirmPassword"], // ข้อผิดพลาดนี้จะผูกกับฟิลด์ confirmPassword
});

export default function RegisterForm() {
  // เริ่มต้น react-hook-form ด้วย Zod resolver และค่าเริ่มต้น
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("ข้อมูลการลงทะเบียน:", values); // บันทึกข้อมูลฟอร์ม

    // แสดง Toast Notification เพื่อระบุว่ากำลังประมวลผล
    toast.info("Registering account...", {
      description: `Username: ${values.username}`,
      duration: 2000,
    });

    try {
      // URL Backend API สำหรับการลงทะเบียน
      // สำคัญ: แทนที่ 'http://localhost:8080/api/register' ด้วย Endpoint Backend จริงของคุณ
      const backendUrl = 'http://localhost:8080/api/register';

      const response = await fetch(backendUrl, {
        method: 'POST', // ใช้เมธอด POST สำหรับการลงทะเบียน
        headers: {
          'Content-Type': 'application/json',
        },
        // ส่ง username, email และ password ไปยัง Backend
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) { // ตรวจสอบว่าสถานะการตอบกลับเป็น OK (2xx) หรือไม่
        const data = await response.json(); // อ่านข้อมูล JSON จากการตอบกลับ
        console.log("Registration successful:", data);
        toast.success("Registration Successful!", {
          description: "Your account has been created. You can now log in.",
        });
        // เลือกที่จะเปลี่ยนเส้นทางไปยังหน้า Login หรือหน้าหลักหลังจากลงทะเบียนสำเร็จ
        // window.location.href = "/login";
      } else {
        const errorData = await response.json(); // อ่านข้อมูลข้อผิดพลาดจากการตอบกลับ
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

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 sm:p-6 md:p-10">
      {/* ส่วนของลูกศรย้อนกลับ */}
      <div className="w-full">
        <Button variant="ghost" className="rounded-full p-2">
          <ArrowLeft size={24} className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
        </Button>
      </div>

      {/* Container หลักของฟอร์ม */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6">

          {/* ส่วนหัว */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Create Account</h1>
          </div>

          {/* ฟอร์มลงทะเบียน */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* ฟิลด์ชื่อผู้ใช้ */}
              <FormField
                control={form.control}
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

              {/* ฟิลด์อีเมล */}
              <FormField
                control={form.control}
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

              {/* ฟิลด์รหัสผ่าน */}
              <FormField
                control={form.control}
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

              {/* ฟิลด์ยืนยันรหัสผ่าน */}
              <FormField
                control={form.control}
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

              {/* ปุ่มลงทะเบียน */}
              <Button
                type="submit"
                className="w-full h-12 sm:h-14 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition-colors duration-200"
              >
                Register
              </Button>
            </form>
          </Form>

          {/* เส้นคั่น "หรือ" */}
          <div className="flex items-center space-x-3 mt-6"> {/* เพิ่ม mt-6 เพื่อเพิ่มระยะห่างจากปุ่ม Register */}
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* ปุ่มลงทะเบียนด้วย Google */}
          <Button variant="outline" className="w-full h-11 sm:h-12 text-base sm:text-lg font-medium rounded-md border-gray-300 hover:bg-gray-50 transition-colors duration-200">
            <GoogleIcon />
            Register with Google
          </Button>

          {/* ลิงก์เข้าสู่ระบบ */}
          <div className="text-center text-sm mt-4">
            <p className="text-gray-600">Already have an account?{' '}
              <a href="#" className="font-semibold text-green-600 hover:underline">
                Login
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
