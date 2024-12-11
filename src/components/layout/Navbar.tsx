import React from 'react';
import { SearchBar } from "../dashboard/search/SearchBar";
import { Logo } from "./navbar/Logo";
import { NotificationsMenu } from "./navbar/NotificationsMenu";
import { UserActions } from "./navbar/UserActions";

export const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        
        <div className="flex items-center gap-4">
          <div className="w-[300px]">
            <SearchBar />
          </div>
          <NotificationsMenu />
          <UserActions />
        </div>
      </div>
    </nav>
  );
};