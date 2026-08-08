import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

type Props = {
  title: string
}

export const Header = ({ title }: Props) => {
  return (
    <div className="sticky top-0 bg-white pb-3 lg:pt-7 lg:-mt-7 flex items-center justify-between border-b-2 mb-5 text-netrual-400 lg:z-50">
      <Link href="/courses">
        <Button variant ="ghost" size="sm">
          <ArrowLeft className="h-5 w-5 stroke-5"/>
        </Button>
      </Link>
      <h1 className="font-bold text-lg">
        {title}
      </h1>
      <div />
    </div>
  )
}