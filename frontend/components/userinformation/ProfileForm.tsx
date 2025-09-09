"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const backendURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
const PROFILE_ENDPOINT = `${backendURL}/profile`;

const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load profile");
  return res.json();
};

const ProfileForm = () => {
  const { mutate } = useSWRConfig();
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useSWR(PROFILE_ENDPOINT, fetcher, {
    revalidateOnFocus: true,
  });

  // 👇 ถ้ามี ?updated=1 ให้ revalidate ทันที
  useEffect(() => {
    if (searchParams.get("updated") === "1") {
      mutate(PROFILE_ENDPOINT);
    }
  }, [searchParams, mutate]);

  // 👇 ฟังสัญญาณ BroadcastChannel จากหน้า Edit
  useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window))
      return;
    const ch = new BroadcastChannel("profile-updated");
    ch.onmessage = () => {
      mutate(PROFILE_ENDPOINT);
    };
    return () => ch.close();
  }, [mutate]);

  // เตรียมข้อมูลจาก backend
  const firstName = data?.firstName?.trim?.() || "";
  const lastName = data?.lastName?.trim?.() || "";
  const username = data?.username?.trim?.() || "";
  const email = data?.email || "unknown@example.com";
  const avatarUrl = data?.avatarUrl || "/user.png";

  const displayName =
    firstName || lastName
      ? `${firstName} ${lastName}`.trim()
      : username || "Unnamed User";

  return (
    <div className="to-muted/50 min-h-screen bg-gradient-to-b from-white">
      <Card className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-2xl border py-0 shadow-sm">
        <CardContent className="flex items-center gap-2">
          <div className="relative h-[120px] w-[120px]">
            <Image
              src={avatarUrl}
              alt="User"
              fill
              className="rounded-full object-cover"
              sizes="120px"
              // NOTE: ถ้า avatarUrl เป็นโดเมนภายนอก ต้องอนุญาตใน next.config.js (images.remotePatterns)
            />
          </div>

          <div className="min-w-0 flex-1">
            {isLoading ? (
              <>
                <p className="bg-muted h-4 w-48 animate-pulse rounded" />
                <p className="bg-muted mt-2 h-3 w-64 animate-pulse rounded" />
              </>
            ) : error ? (
              <>
                <p className="truncate text-lg font-semibold">Failed to load</p>
                <p className="text-sm text-red-500">Please refresh the page.</p>
              </>
            ) : (
              <>
                <p className="truncate text-lg font-semibold">{displayName}</p>

                {username && displayName !== username && (
                  <p className="text-muted-foreground truncate text-sm">
                    @{username}
                  </p>
                )}

                <p className="text-muted-foreground truncate text-sm">
                  Email : {email}
                </p>
              </>
            )}
          </div>

          <div className="ml-auto self-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/editprofile">Edit</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
