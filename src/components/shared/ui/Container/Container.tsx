import classes from "./Container.module.css";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={`${classes.container} ${className || ""}`}>{children}</div>;
}
