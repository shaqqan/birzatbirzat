import { Group, Text, UnstyledButton } from "@mantine/core";
import classes from "./Section.module.css";

export interface SectionProps {
  title: string;
  onViewAll?: () => void;
  viewAllText?: string;
  children: React.ReactNode;
}

export function Section({
  title,
  onViewAll,
  viewAllText = "Все",
  children,
}: SectionProps) {
  return (
    <div className={classes.root}>
      <Group justify="space-between" className={classes.header}>
        <Text className={classes.title}>{title}</Text>
        {onViewAll && (
          <UnstyledButton className={classes.viewAll} onClick={onViewAll}>
            {viewAllText}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </UnstyledButton>
        )}
      </Group>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
