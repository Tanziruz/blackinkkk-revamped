
interface Text_LinkProps {
    title: string;
}


const Text_Link = ({ title }: Text_LinkProps) => {
  return (
    <div>
        <p className="t20 text-center hover:text-black-80">{title}</p>
    </div>
  )
}

export default Text_Link
