import type { LucideIcon } from "lucide-react";
import Button from "./Buttons_And_Links/Button";
import Tag_Link from "./Buttons_And_Links/TagLink";
import { FadeUp } from "./Animate";

interface CatalogHeadingProps {
    Tagtitle: string;
    TagIcon: LucideIcon
    buttonTitle: string;
    HeadingTitle1: string;
    HeadingTitle2: string;
    hrefButton : string;
    hrefTag: string;
}



export default function CatalogHeading({ Tagtitle, buttonTitle, TagIcon , HeadingTitle1, HeadingTitle2, hrefButton, hrefTag}: CatalogHeadingProps) {
    return(
        <>
            <FadeUp>
                <Tag_Link title={Tagtitle} leftIcon={TagIcon} href={hrefTag} />
            </FadeUp>
            <FadeUp delay={0.1}>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-6">
                    <h2 className="mb-0! min-w-0!">{HeadingTitle1}<br />{HeadingTitle2}</h2>
                    <Button variant="btn2" title={buttonTitle} href={hrefButton}/>
                </div>
            </FadeUp>
        </>
    );
}