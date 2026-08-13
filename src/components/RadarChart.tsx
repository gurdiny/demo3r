import React from 'react';

interface RadarChartProps {
  scores: {
    precio: number;
    diasMercado: number;
    fotos: number;
    anuncio: number;
    competencia: number;
    difusion: number;
  };
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores }) => {
  const width = 340;
  const height = 280;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 85;

  const axes = [
    { label: "Precio vs Comps", val: scores.precio },
    { label: "Días Mercado", val: scores.diasMercado },
    { label: "Fotos (IA)", val: scores.fotos },
    { label: "Anuncio", val: scores.anuncio },
    { label: "Competencia", val: scores.competencia },
    { label: "Difusión", val: scores.difusion },
  ];

  const angleStep = (Math.PI * 2) / axes.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return { x, y };
  };

  const points = axes.map((axis, i) => getCoordinates(axis.val, i));
  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  // Grid levels
  const levels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <svg className="w-full max-w-[340px] h-auto overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        {/* Background Grid Circles / Polygons */}
        {levels.map((level, idx) => {
          const levelPoints = axes.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = level * radius;
            return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
          }).join(' ');
          return (
            <polygon
              key={idx}
              points={levelPoints}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth={idx === levels.length - 1 ? "1.5" : "1"}
              strokeDasharray={idx < levels.length - 1 ? "2,2" : undefined}
            />
          );
        })}

        {/* Axes lines */}
        {axes.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x2 = centerX + radius * Math.cos(angle);
          const y2 = centerY + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={x2}
              y2={y2}
              stroke="#CBD5E1"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Polygon */}
        <polygon
          points={polygonPoints}
          fill="rgba(18, 179, 164, 0.25)"
          stroke="#12B3A4"
          strokeWidth="2.5"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4.5"
            fill="#122A49"
            stroke="#12B3A4"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {axes.map((axis, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = radius + 24;
          const lx = centerX + labelRadius * Math.cos(angle);
          const ly = centerY + labelRadius * Math.sin(angle);
          let textAnchor = "middle";
          if (Math.abs(lx - centerX) > 15) {
            textAnchor = lx > centerX ? "start" : "end";
          }
          return (
            <text
              key={i}
              x={lx}
              y={ly + 4}
              textAnchor={textAnchor}
              className="text-[10px] font-bold fill-slate-700 uppercase tracking-tight"
            >
              {axis.label} ({axis.val})
            </text>
          );
        })}
      </svg>
    </div>
  );
};
