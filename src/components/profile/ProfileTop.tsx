// // "use client";
// // import { useSession } from "next-auth/react";
// // import React from "react";

// // const ProfileTop = () => {
// //   const session = useSession();
// //   if (!session) return null;
// //   console.log("session", session);
// //   return (
// //     <div className="bg-white p-2 shadow-xl pl-7 rounded-2xl w-full">
// //       <div>{session.data?.user?.name}</div>
// //       <div></div>
// //     </div>
// //   );
// // };

// // export default ProfileTop;

// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useTheme } from "next-themes";
// import { Bell, LogOut, Moon, Settings, Sun, User } from "lucide-react";
// import { useState } from "react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// const ProfileTop = () => {
//   const { data: session, status } = useSession();
//   const { theme, setTheme } = useTheme();
//   const [notifications, setNotifications] = useState(0);

//   if (status === "loading") {
//     return (
//       <div className="bg-primary-tint/20 p-3 px-9 shadow-sm rounded-lg w-full animate-pulse">
//         <div className="h-10 flex justify-end">
//           <div className="w-10 h-10 rounded-full bg-primary-tint/40"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!session) return null;

//   // Extract user initials for avatar fallback
//   const getInitials = (name: any) => {
//     if (!name) return "U";
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   const handleThemeToggle = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   const handleSignOut = () => {
//     signOut();
//   };

//   const clearNotifications = () => {
//     setNotifications(0);
//   };

//   return (
//     <div className="bg-primary-tint/10 p-3 shadow-sm rounded-lg w-full flex justify-between items-center">
//       {/* Left side - Dashboard title */}
//       <div className="font-semibold text-lg">Dashboard</div>

//       {/* Right side - Actions and Profile */}
//       <div className="flex items-center space-x-4">
//         {/* Theme Toggle */}
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="rounded-full w-9 h-9 p-0"
//                 onClick={handleThemeToggle}
//               >
//                 {theme === "dark" ? (
//                   <Sun className="h-5 w-5" />
//                 ) : (
//                   <Moon className="h-5 w-5" />
//                 )}
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>
//               <p>{theme === "dark" ? "Light mode" : "Dark mode"}</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>

//         {/* Notifications */}
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="rounded-full w-9 h-9 p-0 relative"
//                 onClick={clearNotifications}
//               >
//                 <Bell className="h-5 w-5" />
//                 {notifications > 0 && (
//                   <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
//                     {notifications}
//                   </Badge>
//                 )}
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>
//               <p>
//                 {notifications > 0
//                   ? `${notifications} notifications`
//                   : "No notifications"}
//               </p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>

//         {/* Profile Dropdown */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="ghost"
//               className="rounded-full h-10 pl-1 pr-3 flex items-center gap-2"
//             >
//               <Avatar className="h-8 w-8">
//                 <AvatarImage
//                   src={session.user?.image || ""}
//                   alt={session.user?.name || "User"}
//                 />
//                 <AvatarFallback className="bg-primary/10">
//                   {getInitials(session.user?.name)}
//                 </AvatarFallback>
//               </Avatar>
//               <span className="font-medium text-sm hidden sm:inline">
//                 {session.user?.name}
//               </span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="w-56">
//             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="cursor-pointer">
//               <User className="mr-2 h-4 w-4" />
//               <span>Profile</span>
//             </DropdownMenuItem>
//             <DropdownMenuItem className="cursor-pointer">
//               <Settings className="mr-2 h-4 w-4" />
//               <span>Settings</span>
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem
//               className="cursor-pointer"
//               onClick={handleSignOut}
//             >
//               <LogOut className="mr-2 h-4 w-4" />
//               <span>Log out</span>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   );
// };

// export default ProfileTop;

"use client";

import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Bell, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProfileTop = () => {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState<number>(0);

  if (status === "loading") {
    return (
      <div className="bg-primary-tint/20 p-3 px-9 shadow-sm rounded-lg w-full animate-pulse">
        <div className="h-10 flex justify-end">
          <div className="w-10 h-10 rounded-full bg-primary-tint/40"></div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // Extract user initials for avatar fallback
  const getInitials = (name: string | null | undefined): string => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleThemeToggle = (): void => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignOut = (): void => {
    signOut();
  };

  const clearNotifications = (): void => {
    setNotifications(0);
  };

  return (
    <div className="bg-primary-tint/10 p-3 shadow-sm rounded-lg w-full flex justify-between items-center">
      {/* Left side - Dashboard title */}
      <div className="font-semibold text-lg">Dashboard</div>

      {/* Right side - Actions and Profile */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-9 h-9 p-0"
                onClick={handleThemeToggle}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{theme === "dark" ? "Light mode" : "Dark mode"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Notifications */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-9 h-9 p-0 relative"
                onClick={clearNotifications}
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {notifications > 0
                  ? `${notifications} notifications`
                  : "No notifications"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full h-10 pl-1 pr-3 flex items-center gap-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session.user?.image || ""}
                  alt={session.user?.name || "User"}
                />
                <AvatarFallback className="bg-primary/10">
                  {getInitials(session.user?.name)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm hidden sm:inline">
                {session.user?.name}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProfileTop;
