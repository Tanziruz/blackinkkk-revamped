//To be used in the Product Details Page

import Button from "./Button"

interface TagLinkProps {
    title: string;
}


export default function Tag_Link({ title }: TagLinkProps) {
  return (
    <div>
        <Button title={title} variant="tag-link" className="tag-link"></Button>
    </div>
  )
}

