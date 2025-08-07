import { LogIn, Menu, Search, UserPlus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border">
      <div className="mx-auto flex items-center justify-between gap-8 px-8 py-4 md:px-14">
        {/* Logo */}
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
        <div className="relative hidden max-w-xl flex-1 md:flex">
          <Search className="absolute top-1/2 left-2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search"
            className="max-w-5xl rounded-full border pl-10 focus-visible:ring-0"
          />
        </div>

        {/* Auth action */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" className="rounded-full">
            <Link href="/register" className="flex items-center gap-2">
              <UserPlus size={20} />
              <span>สมัครสมาชิก</span>
            </Link>
          </Button>

          <Button className="rounded-full">
            <Link href="/login" className="flex items-center gap-2">
              <LogIn size={20} />
              <span>เข้าสู่ระบบ</span>
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Menu />
        </div>
      </div>
    </header>
  );
};
export default Header;

{
}
