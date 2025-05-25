import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import ProfileTop from "@/components/profile/ProfileTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mayur Wellness",
  description: "Mayur Wellness, campsite",
  icons: {
    icon: "/last-logo.png",
  },
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:grid p-2 sm:p-4 grid-cols-4 gap-3 min-h-screen">
      <div className="border-r-2 pr-3  bg-white">
        <ProfileSidebar />
      </div>
      <div className="col-span-3 pb-20 space-y-3 ">
        <div className="rounded-2xl ">
          <ProfileTop />
        </div>
        <div className="  rounded-2xl ">{children}</div>
      </div>
    </div>
  );
}
