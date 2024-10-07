export function formatTime(date: Date) {
  return `${date.toLocaleTimeString("default", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export function formatDate(date: Date) {
  return `${date.toLocaleString("default", {
    day: "numeric",
    month: "short",
  })}${
    date.getFullYear() !== new Date().getFullYear()
      ? ` ${date.getFullYear()}`
      : ""
  }`;
}

export function formatDateTime(date: Date) {
  return `${formatDate(date)}, ${formatTime(date)}`;
}
