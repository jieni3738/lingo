import { InfinityIcon, X } from "lucide-react";
import Image from "next/image"
import { Progress } from "@/components/ui/progress";

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
}

export const Header = ({
  hearts,
  percentage,
  hasActiveSubscription,
}: Props) => {
  return(
    <header className="lg:pt-12.5 pt-5 px-10 flex gap-x-7 items-cnter justify-between max-w-285 mx-auto w-full">
      <X 
        onClick={()=>{}}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage}/>
      <div className="text-rose-500 flex items-center font-bold">
        <Image 
          src="/hearts.svg"
          height={28}
          width={28}
          alt="Heat"
          className="mr-2"
        />
        {hasActiveSubscription
          ? <InfinityIcon className="h-6 w-6 stroke-3" />
          : hearts
        }
      </div>
    </header>
  )
}