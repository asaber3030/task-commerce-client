import React from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <div className='px-6 max-w-screen-2xl mx-auto py-20 h-screen'>{children}</div>;
}
