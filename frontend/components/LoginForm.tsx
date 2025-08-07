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
import { toast } from "sonner"
import { ArrowLeft } from 'lucide-react' 

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.012,35.836,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.", 
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.", 
  }),
})

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  // ทำให้ onSubmit เป็น async function
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Login data:", values) // 
    
    // แสดง Toast Notification ขณะกำลังประมวลผล
    toast.info("Verifying data...", { // 
      description: `Username: ${values.username}`, // 
      duration: 2000, 
    });

    try {
      // URL Backend API สำหรับ Login 
      const backendUrl = 'http://localhost:8080/api/login'; 

      const response = await fetch(backendUrl, {
        method: 'POST', // ใช้ method POST สำหรับการ Login
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(values), // แปลง Object values ให้เป็น JSON string
      });

      if (response.ok) { // ตรวจสอบว่า Response มีสถานะเป็น OK (2xx) หรือไม่
        const data = await response.json(); // อ่านข้อมูล JSON จาก Response
        console.log("Login successful:", data); 
        toast.success("Login Successful!", { 
          description: "Welcome back!", 
        });
        
      } else {
        const errorData = await response.json(); 
        console.error("Login failed:", errorData); 
        toast.error("Login Failed", { 
          description: errorData.message || "Invalid username or password. Please try again.", 
        });
      }
    } catch (error) {
      console.error("Connection error:", error); 
      toast.error("Connection Error", { 
        description: "Unable to connect to the server. Please try again.", 
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white p-10 md:p-10">
      {/* ส่วนของลูกศรย้อนกลับ */}
      <div className="w-full">
        <Button variant="ghost">
          <ArrowLeft size={32} className="w-8 h-8" />
        </Button>
      </div>

      {/* Container หลักของฟอร์ม */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6">
          
          {/* ส่วนหัว */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black">Welcome</h1> 
            <p className="text-green-600">to your account</p> 
          </div>

          {/* ปุ่ม Login with Google */}
          <Button variant="outline" className="w-full h-12 text-base">
            <GoogleIcon />
            Login with Google 
          </Button>

          {/* เส้นคั่น "or" */}
          <div className="flex items-center space-x-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500 text-sm">or</span> 
            <hr className="flex-grow border-gray-300" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* ฟิลด์ Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} className="h-12 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ฟิลด์ Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} className="h-12 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ปุ่ม Login */}
              <Button type="submit" className="w-full h-12 text-lg font-semibold bg-green-500 hover:bg-green-500 text-white">
                Login 
              </Button>
            </form>
          </Form>

          {/* ลิงก์ Register และ Forget password */}
          <div className="flex justify-between text-sm">
            <a href="#" className="font-semibold text-black hover:underline">
              Register 
            </a>
            <a href="#" className="font-semibold text-black hover:underline">
              Forget password 
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
