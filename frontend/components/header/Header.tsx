"use client";

import { LogIn, Menu, Search, UserPlus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const getUserInfo = async () => {
  try {
    const res = await fetch("http://localhost:3001/auth/me", {
      credentials: "include",
    });

    if (!res.ok) {
      console.log("User not authenticated, status:", res.status);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

const userLogout = async () => {
  try {
    await fetch("http://localhost:3001/auth/logout", {
      credentials: "include",
    });

    // if (!res.ok) {
    //   console.log("User not authenticated, status:", res.status);
    //   return null;
    // }
    console.log("User logged out");
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

const Header = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      console.log(userInfo);
      setUserInfo(userInfo);
    };
    fetchUserInfo();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border bg-background">
      <div className="flex items-center justify-between gap-8 px-8 py-4 mx-auto md:px-14">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="TasteTrail"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="hidden text-xl font-semibold md:block">
            TasteTrail
          </span>
        </Link>
        {/* Search */}
        <form className="relative flex-1 max-w-xl">
          <Search className="absolute -translate-y-1/2 top-1/2 left-2" />
          <Input
            type="text"
            placeholder="Search"
            name="search"
            className="max-w-5xl pl-10 border rounded-full border-border focus-visible:ring-0"
          />
        </form>
        {/* Auth action */}
        <div className="items-center hidden gap-2 md:flex">
          {userInfo ? (
            // Show user info when authenticated
            <div className="flex items-center gap-2">
              <span className="text-sm">สวัสดี, {userInfo.user?.username}</span>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  userLogout().then(() => {
                    setUserInfo(null);
                    router.push("/");
                  });
                }}
              >
                <LogIn size={20} />
                <span>ออกจากระบบ</span>
              </Button>
            </div>
          ) : (
            // Show login/register when not authenticated
            <>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/register" className="flex items-center gap-2">
                  <UserPlus size={20} />
                  <span>สมัครสมาชิก</span>
                </Link>
              </Button>

              <Button className="rounded-full" asChild>
                <Link href="/login" className="flex items-center gap-2">
                  <LogIn size={20} />
                  <span>เข้าสู่ระบบ</span>
                </Link>
              </Button>
            </>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden">
            <Menu size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-5">
            {userInfo ? (
              // Show user options when authenticated
              <>
                <DropdownMenuItem>
                  <span>สวัสดี, {userInfo.user?.username}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  onClick={() => {
                    userLogout().then(() => {
                      setUserInfo(null);
                      router.push("/");
                    });
                  }}
                >
                  <LogIn size={20} />
                  <span>ออกจากระบบ</span>
                </DropdownMenuItem>
              </>
            ) : (
              // Show login/register when not authenticated
              <>
                <DropdownMenuItem>
                  <Link href="/register" className="flex items-center gap-2">
                    <UserPlus size={20} />
                    <span>สมัครสมาชิก</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn size={20} />
                    <span>เข้าสู่ระบบ</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <Button onClick={() => getUserInfo().then(console.log)}>Test</Button> */}
      </div>
    </header>
  );
};
export default Header;

{
}
