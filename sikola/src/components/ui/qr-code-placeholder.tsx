/**
 * Placeholder visual QR Code — dekoratif saja, BUKAN QR Code
 * sungguhan yang bisa di-scan (belum ada integrasi generator/backend,
 * lihat TECH_DEBT.md). Polanya dibuat deterministik dari `seed` (bukan
 * Math.random()) supaya render server & client selalu identik.
 */
export interface QrCodePlaceholderProps {
  seed?: string;
  size?: number;
}

function seededPattern(seed: string, cells: number): boolean[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const pattern: boolean[] = [];
  for (let i = 0; i < cells * cells; i++) {
    hash = (hash * 1103515245 + 12345) >>> 0;
    pattern.push((hash >> 16) % 3 !== 0);
  }
  return pattern;
}

export function QrCodePlaceholder({
  seed = "sikola-qr",
  size = 200,
}: QrCodePlaceholderProps) {
  const gridSize = 9;
  const cell = size / gridSize;
  const pattern = seededPattern(seed, gridSize);
  const isFinderCell = (row: number, col: number) =>
    (row < 3 && col < 3) ||
    (row < 3 && col >= gridSize - 3) ||
    (row >= gridSize - 3 && col < 3);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Placeholder QR Code sesi absensi"
      className="rounded-2xl bg-white p-2"
    >
      {Array.from({ length: gridSize }).map((_, row) =>
        Array.from({ length: gridSize }).map((_, col) => {
          if (isFinderCell(row, col)) return null;
          const filled = pattern[row * gridSize + col];
          if (!filled) return null;
          return (
            <rect
              key={`${row}-${col}`}
              x={col * cell}
              y={row * cell}
              width={cell}
              height={cell}
              className="fill-primary-dark"
            />
          );
        })
      )}
      {[
        [0, 0],
        [0, gridSize - 3],
        [gridSize - 3, 0],
      ].map(([r, c]) => (
        <g key={`${r}-${c}`}>
          <rect
            x={c * cell}
            y={r * cell}
            width={cell * 3}
            height={cell * 3}
            className="fill-primary-dark"
          />
          <rect
            x={c * cell + cell * 0.6}
            y={r * cell + cell * 0.6}
            width={cell * 1.8}
            height={cell * 1.8}
            className="fill-white"
          />
          <rect
            x={c * cell + cell * 1.1}
            y={r * cell + cell * 1.1}
            width={cell * 0.8}
            height={cell * 0.8}
            className="fill-primary-dark"
          />
        </g>
      ))}
    </svg>
  );
}
