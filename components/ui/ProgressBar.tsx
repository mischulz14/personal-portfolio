export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div
      className="bg-[#429585] fixed bottom-0 left-0 h-3"
      style={{ width: `${percentage}%`, transition: 'width 0.5s ease-out' }}
    />
  );
}
