//To be used in the Product Details Page

import Button from "./Button"
import type { LucideIcon } from "lucide-react"

interface TagLinkProps {
    title: string;
    leftIcon?: LucideIcon;
}


export default function Tag_Link({ title, leftIcon: LeftIcon }: TagLinkProps) {
  return (
    <div>
        <Button title={title} variant="tag-link" className="tag-link" leftIcon={LeftIcon ? <LeftIcon /> : undefined}></Button>
    </div>
  )
}

