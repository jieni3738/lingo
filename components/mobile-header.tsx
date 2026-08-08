import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-12 flex items-center bg-green-500 border-b flexed topp-0 w-full z-50">
      <MobileSidebar /> 
    </nav>
  );
}