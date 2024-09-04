import { Highlight } from '@mantine/core';

function HighlightField({ value, search }: { value: string; search: string }) {
  return (
    <Highlight
      highlightStyles={(theme) => ({
        backgroundImage: theme.fn.linearGradient(45, theme.colors.green[8], theme.colors.green[9]),
        fontWeight: 700,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      })}
      className="mb-2 font-bold"
      highlight={search}
    >
      {value}
    </Highlight>
  );
}

export default HighlightField;
