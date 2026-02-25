

import Link from "next/link";
interface FooterLinkProps {
  title: string;
  href?: string;
}

export default function Footer_Link({ title, href = "/"}: FooterLinkProps) {
  return <>
  <Link href={href}>
  <p className='t16 text-white-60 text-center animation hover:text-white'>{title}</p>
  </Link>
  </>;
}
