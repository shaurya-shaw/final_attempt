type ShareCardInput = {
  chance: number;
  examName: string;
  eventLabel: string;
  eventEffect: number;
  quote: string;
  status: string;
  mascotSrc?: string;
  attemptLabel?: string;
  sacrificeCount?: number;
  moneyLabel?: string;
  timeLabel?: string;
};

const WIDTH = 1080;
const HEIGHT = 1350;

function drawCenteredText(
  context: CanvasRenderingContext2D,
  text: string,
  y: number,
  font: string,
  color: string,
) {
  context.font = font;
  context.fillStyle = color;
  context.textAlign = "center";
  context.textBaseline = "alphabetic";
  context.fillText(text, WIDTH / 2, y);
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
      return;
    }
    line = candidate;
  });

  if (line) lines.push(line);
  return lines;
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

function drawMascot(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  centerY: number,
) {
  const maxSize = 240;
  const scale = Math.min(
    maxSize / image.naturalWidth,
    maxSize / image.naturalHeight,
  );
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;

  context.drawImage(
    image,
    (WIDTH - width) / 2,
    centerY - height / 2,
    width,
    height,
  );
}

export async function createSurvivalShareCard(input: ShareCardInput) {
  await document.fonts?.ready;

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Share image canvas is unavailable.");

  // Background
  context.fillStyle = "#050505";
  context.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtle stars
  for (let i = 0; i < 60; i++) {
    const x = (i * 137 + 61) % WIDTH;
    const y = (i * 251 + 97) % HEIGHT;
    const opacity = 0.08 + ((i * 17) % 16) / 100;
    context.fillStyle = `rgba(255,255,255,${opacity})`;
    context.fillRect(x, y, 2, 2);
  }

  // Header
  drawCenteredText(
    context,
    "SURVIVAL REPORT",
    92,
    "500 22px Inter, Arial, sans-serif",
    "rgba(255,255,255,0.4)",
  );

  // Mascot
  if (input.mascotSrc) {
    try {
      const mascot = await loadImage(input.mascotSrc);
      drawMascot(context, mascot, 250);
    } catch {
      // Card remains usable without mascot
    }
  }

  // Big percentage
  drawCenteredText(
    context,
    `${input.chance}%`,
    470,
    "700 160px Inter, Arial, sans-serif",
    "#F43F5E",
  );

  drawCenteredText(
    context,
    "SURVIVAL CHANCE",
    520,
    "500 20px Inter, Arial, sans-serif",
    "rgba(255,255,255,0.4)",
  );

  // Status
  context.font = "700 48px Inter, Arial, sans-serif";
  const statusLines = wrapText(context, input.status.toUpperCase(), 860);
  statusLines.forEach((line, i) => {
    drawCenteredText(
      context,
      line,
      600 + i * 56,
      "700 48px Inter, Arial, sans-serif",
      "#FFFFFF",
    );
  });

  const afterStatus = 600 + (statusLines.length - 1) * 56;

  // Exam + attempt
  const contextLine = input.attemptLabel
    ? `${input.examName.toUpperCase()}  •  ${input.attemptLabel.toUpperCase()}`
    : input.examName.toUpperCase();

  drawCenteredText(
    context,
    contextLine,
    afterStatus + 56,
    "500 24px Inter, Arial, sans-serif",
    "rgba(255,255,255,0.55)",
  );

  // Defining Event
  const eventColor =
    input.eventEffect > 0
      ? "#34D399"
      : input.eventEffect < 0
        ? "#FB7185"
        : "rgba(255,255,255,0.7)";

  const eventBlockY = afterStatus + 110;

  drawCenteredText(
    context,
    "DEFINING EVENT",
    eventBlockY,
    "500 16px Inter, Arial, sans-serif",
    "rgba(255,255,255,0.4)",
  );

  drawCenteredText(
    context,
    input.eventLabel,
    eventBlockY + 48,
    "600 34px Inter, Arial, sans-serif",
    "#FFFFFF",
  );

  const resilienceText =
    input.eventEffect > 0
      ? `Resilience  +${input.eventEffect}`
      : `Resilience  ${input.eventEffect}`;

  drawCenteredText(
    context,
    resilienceText,
    eventBlockY + 92,
    "600 24px Inter, Arial, sans-serif",
    eventColor,
  );

  const afterEvent = eventBlockY + 92;

  // Divider
  context.strokeStyle = "rgba(255,255,255,0.12)";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(WIDTH / 2 - 40, afterEvent + 40);
  context.lineTo(WIDTH / 2 + 40, afterEvent + 40);
  context.stroke();

  // Stats
  const hasStats =
    input.sacrificeCount !== undefined ||
    input.moneyLabel !== undefined ||
    input.timeLabel !== undefined;

  let statsBottom = afterEvent + 40;

  if (hasStats) {
    const stats = [
      {
        label: "SACRIFICES",
        value: input.sacrificeCount?.toString() ?? "—",
      },
      {
        label: "SPENT",
        value: input.moneyLabel ?? "—",
      },
      {
        label: "TIME",
        value: input.timeLabel ?? "—",
      },
    ];

    const colWidth = 280;
    const startX = (WIDTH - colWidth * 3) / 2;
    const statsY = afterEvent + 100;

    stats.forEach((stat, i) => {
      const cx = startX + colWidth * i + colWidth / 2;

      context.textAlign = "center";

      context.font = "700 36px Inter, Arial, sans-serif";
      context.fillStyle = "#FFFFFF";
      context.fillText(stat.value, cx, statsY);

      context.font = "500 16px Inter, Arial, sans-serif";
      context.fillStyle = "rgba(255,255,255,0.4)";
      context.fillText(stat.label, cx, statsY + 34);
    });

    statsBottom = statsY + 34;
  }

  // Quote
  context.font = "italic 400 28px Inter, Arial, sans-serif";
  const quoteLines = wrapText(context, `“${input.quote}”`, 820);
  const quoteStartY = Math.min(Math.max(statsBottom + 70, 1100), HEIGHT - 120);

  quoteLines.forEach((line, i) => {
    drawCenteredText(
      context,
      line,
      quoteStartY + i * 40,
      "italic 400 28px Inter, Arial, sans-serif",
      "rgba(255,255,255,0.5)",
    );
  });

  // Footer
  drawCenteredText(
    context,
    "CAN YOU SURVIVE AS A STUDENT IN INDIA?",
    HEIGHT - 48,
    "500 16px Inter, Arial, sans-serif",
    "rgba(255,255,255,0.3)",
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Could not create the share image."));
    }, "image/png");
  });
}

export function downloadShareCard(imageBlob: Blob) {
  const url = URL.createObjectURL(imageBlob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "student-survival-report.png";
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
