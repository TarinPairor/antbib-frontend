export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDateTime(date: string) {
  // take in something like "2021-10-10T00:00:00.000Z"
  // and return something like "10 Jan 2021, 12:00:00"
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return d.toLocaleDateString("en-GB", options);
}

export function textWithEllipsis(
  text: string | undefined,
  maxLength: number = 15
) {
  if (!text) return;
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
