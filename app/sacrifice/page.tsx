import SacrificeCard from "@/components/sacrifice/sacrificeCard";
import SacrificeButton from "./button";

export default function SacrificesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-1">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Sacrifices
        </h1>
        <p className="text-zinc-400 mb-10 text-lg">
          What are you ready to give up?
        </p>

        <div className="space-y-3">
          <SacrificeCard
            label="Friends"
            description="Late night talks, weekend plans, and random hangouts slowly disappear."
          />
          <SacrificeCard
            label="Family Time"
            description="Missed festivals, birthdays, and the feeling of home."
          />
          <SacrificeCard
            label="Festivals"
            description="Diwali, Holi, Eid — celebrated through a phone screen."
          />
          <SacrificeCard
            label="Sleep"
            description="2 AM becomes normal. 6 hours feels like a luxury."
          />
          <SacrificeCard
            label="Hobbies"
            description="Guitar, drawing, cricket — all put on indefinite hold."
          />
          <SacrificeCard
            label="Mental Peace"
            description="Constant low-level anxiety becomes background noise."
          />
        </div>
        <SacrificeButton />
      </div>
    </div>
  );
}
