export default function spinPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#06080c] p-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-[#1e3a8a] drop-shadow-sm md:text-4xl">
          SPIN THE WHEEL
        </h1>
        <p className="text-center text-lg text-neutral-400 md:text-xl dark:text-neutral-800">
          Spin the wheel to determine your next attempt. Good luck!
        </p>
        <div className="relative flex h-[300px] w-[300px] items-center justify-center rounded-full border-8 border-[#1e3a8a] bg-gradient-to-b from-[#1e3a8a]/20 to-[#1e3a8a]/10 shadow-lg shadow-[#1e3a8a]/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[250px] w-[250px] rounded-full border-4 border-[#1e3a8a] bg-gradient-to-b from-[#1e3a8a]/30 to-[#1e3a8a]/10 shadow-inner shadow-[#1e3a8a]/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
