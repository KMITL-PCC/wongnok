import { LogIn, Menu, Search, UserPlus } from "lucide-react";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
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

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border bg-background">
      <div className="flex items-center justify-between gap-8 px-8 py-4 mx-auto md:px-14">
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
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden">
            <Menu size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-5">
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
export default Header;

{
}
