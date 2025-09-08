import Image from "next/image";
import React from "react";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CreateShopForm = () => {
  return (
    <Card className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-2xl border py-0 shadow-sm">
      <CardContent className="flex items-center gap-2">
        <div className="relative h-[120px] w-[120px]">
          <Image
            src="/user.png"
            alt="User"
            fill
            className="object-cover"
            sizes="120px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold">นาย ก LทพZa</p>
          <p className="text-muted-foreground text-sm">
            Email : asdasff@gmail.com
          </p>
        </div>
        <CardAction className="ml-auto flex gap-2 self-center">
          <dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </DialogTrigger>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </dialog>
        </CardAction>
      </CardContent>
    </Card>
  );
};

export default CreateShopForm;
