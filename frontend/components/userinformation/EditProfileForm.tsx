"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Upload, Trash2, Save, User, Lock } from "lucide-react";
import Link from "next/link";

const backendURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
const PROFILE_ENDPOINT = `${backendURL}/profile`;
const PASSWORD_ENDPOINT = `${backendURL}/password`;
const CSRF_ENDPOINT = `${backendURL}/csrf-token`;

export default function EditProfilePage() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // ✅ ดึง CSRF Token ตอน mount
  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch(CSRF_ENDPOINT, {
          method: "GET",
          credentials: "include", // สำคัญเพื่อส่ง cookie
        });
        const data = await res.json();
        setCsrfToken(data.csrfToken);
      } catch (err) {
        console.error("Failed to fetch CSRF token", err);
      }
    }
    fetchToken();
  }, []);

  function onUploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(String(ev.target?.result || ""));
    reader.readAsDataURL(file);
  }

  async function onSaveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!csrfToken) {
      alert("Missing CSRF token");
      return;
    }
    try {
      setSavingProfile(true);

      const form = new FormData();
      form.set("firstName", firstName);
      form.set("lastName", lastName);
      if (avatarFile) form.set("avatar", avatarFile);

      const res = await fetch(PROFILE_ENDPOINT, {
        method: "POST",
        body: form,
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to save profile");
      const data = await res.json();
      alert(data.message || "Profile saved!");
    } finally {
      setSavingProfile(false);
    }
  }

  async function onSavePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!csrfToken) {
      alert("Missing CSRF token");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Password confirmation does not match");
      return;
    }

    try {
      setSavingPassword(true);

      const res = await fetch(PASSWORD_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) throw new Error("Failed to update password");
      const data = await res.json();
      alert(data.message || "Password updated!");
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div className="to-muted/50 min-h-screen bg-gradient-to-b from-white">
      {/* Top bar */}
      <div className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full border-b backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Link
              href="/profile"
              className="text-foreground inline-flex items-center gap-2 font-medium hover:underline"
            >
              <User className="h-4 w-4" /> Profile
            </Link>
            <span>/</span>
            <span className="text-foreground">Edit profile</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="gap-2"
              form="profile-form"
              type="submit"
              disabled={savingProfile}
            >
              <Save className="h-4 w-4" />{" "}
              {savingProfile ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* PROFILE */}
          <TabsContent value="profile">
            <form
              id="profile-form"
              onSubmit={onSaveProfile}
              className="grid grid-cols-1 gap-6 lg:grid-cols-12"
            >
              <div className="space-y-6 lg:col-span-5">
                <Card className="border-dashed">
                  <CardHeader>
                    <CardTitle>Avatar</CardTitle>
                    <CardDescription>
                      Upload your profile photo.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Avatar className="ring-muted-foreground/20 h-20 w-20 ring-2">
                        {avatarPreview ? (
                          <AvatarImage src={avatarPreview} alt="avatar" />
                        ) : (
                          <AvatarImage src="/placeholder.svg" alt="avatar" />
                        )}
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="grid grid-cols-1 gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={onUploadAvatar}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4" /> Upload
                        </Button>
                        {avatarPreview && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setAvatarFile(null);
                              setAvatarPreview(null);
                              if (fileInputRef.current)
                                fileInputRef.current.value = "";
                            }}
                          >
                            <Trash2 className="h-4 w-4" /> Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6 lg:col-span-7">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal info</CardTitle>
                    <CardDescription>
                      Basic information about you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button type="submit" disabled={savingProfile}>
                      <Save className="h-4 w-4" /> Save profile
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </form>
          </TabsContent>

          {/* SECURITY */}
          <TabsContent value="security">
            <form onSubmit={onSavePassword}>
              <Card>
                <CardHeader>
                  <CardTitle>Change password</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm new password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button type="submit" disabled={savingPassword}>
                    <Lock className="h-4 w-4" />{" "}
                    {savingPassword ? "Updating..." : "Update password"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
