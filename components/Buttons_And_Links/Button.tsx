type ButtonVariant = "btn1" | "btn2" | "btn3" | "btn4" | "tag-link";

interface ButtonProps {
  title: string;
  variant: ButtonVariant;
  id?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const Button = ({ title, variant, id, leftIcon, rightIcon, className }: ButtonProps) => {
  return (
    <button id={id} className={`${variant} btn-anim ${className ?? ""}`.trim()}>
      {leftIcon}
      <span className="btn-label">
        <div className="btn-label-primary">{title}</div>
        <div className="btn-label-secondary">{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
