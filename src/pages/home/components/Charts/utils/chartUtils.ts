export interface TooltipItem {
  seriesName: string;
  color: string;
  value: [number | string, number, string?];
}

export const universalTooltipFormatter = (
  params: unknown,
  eventSeriesName: string = "Events"
): string => {
  const items = Array.isArray(params)
    ? (params as TooltipItem[])
    : [params as TooltipItem];

  if (!items || items.length === 0 || !items[0].value) return "";

  const date = new Date(items[0].value[0]).toLocaleString("uk-UA", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  let html = `<div style="font-weight: 600; margin-bottom: 6px; color: #374151; font-size: 13px;">${date}</div>`;

  items.forEach((item) => {
    const isEvent = item.seriesName === eventSeriesName;

    if (isEvent && item.value[2]) {
      const eventTime = new Date(item.value[0]).toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
      });

      html += `
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f3f4f6;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="display:inline-block; border-radius:2px; width:3px; height:12px; background-color:${item.color};"></span>
            <b style="color: #EF4444; font-size: 11px; text-transform: uppercase;">Подія (${eventTime}):</b>
          </div>
          <div style="padding-left: 9px; margin-top: 2px; color: #4B5563; font-size: 12px; white-space: normal; max-width: 220px;">
            ${item.value[2]}
          </div>
        </div>`;
    } else if (!isEvent) {
      const val =
        typeof item.value[1] === "number"
          ? item.value[1].toFixed(2)
          : item.value[1];

      html += `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-top: 4px;">
          <span style="font-size: 12px; color: #4B5563;">
            <span style="display:inline-block; margin-right:6px; border-radius:50%; width:8px; height:8px; background-color:${item.color};"></span>
            ${item.seriesName}
          </span>
          <b style="color: #111827; font-size: 12px;">${val}</b>
        </div>`;
    }
  });

  return html;
};
