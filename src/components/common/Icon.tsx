import type { LucideIcon, LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  icon: LucideIcon;
  title?: string;
}

export default function Icon({ icon: LucideIconComponent, title, ...props }: IconProps) {
  return (
    <LucideIconComponent {...props}>
      {title ? <title>{title}</title> : null}
    </LucideIconComponent>
  );
}
