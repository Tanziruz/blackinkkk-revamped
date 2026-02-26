//To be used in the Product Details Page

import Button from "./Button"
import type { LucideIcon } from "lucide-react"

interface TagLinkProps {
    title: string;
    leftIcon?: LucideIcon;
    href: string;
}


export default function Tag_Link({ title, leftIcon: LeftIcon, href }: TagLinkProps) {
  return (
    <div>
        <Button title={title} variant="tag-link" leftIcon={LeftIcon ? <LeftIcon size={14}  /> : undefined} href={href} />
    </div>
  )
}

