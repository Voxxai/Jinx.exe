interface StatusCardProps {
  label: string;
  value: string;
  accent?: boolean;
}

export function StatusCard({ label, value, accent = false }: StatusCardProps) {
  return (
    <article className={`status-card${accent ? ' status-card--accent' : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
