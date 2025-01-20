import { cn } from '@/utils/cn';
import { Highlight } from '@mantine/core';

function HighlightField({ value, search, className }: { value: string; search: string; className?: string }) {
  return (
    <Highlight
      highlightStyles={(theme) => ({
        backgroundImage: theme.fn.linearGradient(45, theme.colors.green[9], theme.colors.green[9]),
        fontWeight: 700,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      })}
      className={cn(className)}
      highlight={search}
    >
      {value}
    </Highlight>
  );
}

export default HighlightField;
