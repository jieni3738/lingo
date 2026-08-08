import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";

type Props = {
  children: React.ReactNode;
};

const MainLayout =({
  children,
}: Props) => {
  return(
    <>
    <MobileHeader />
    <Sidebar className="hidden lg:flex"/>
    <main className="pl-64 h-full pt-12 lg:pt-0">
      <div className="h-full">
        {children}
      </div> 
    </main>
    </>
  )
};
 
export default MainLayout