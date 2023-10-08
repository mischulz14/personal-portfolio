export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div
      className="bg-[#429585] fixed bottom-0 left-0  h-2 z-[9999999]"
      style={{ width: `${percentage}%`, transition: 'width 0.5s ease-in' }}
    />
  );
}
