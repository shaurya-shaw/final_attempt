import { raceOption } from "@/app/store/raceTrackStore";

export function calculateSurvivalChance({
  sacrificeCount,
  spinScore,
  moneySpent,
  timeSpent,
  selectedAttempt,
  raceName,
}: {
  sacrificeCount: number;
  spinScore: number;
  moneySpent: number;
  timeSpent: number; // hours
  selectedAttempt: number;
  raceName: raceOption;
}): number {
  // 1. Base
  let chance = 50;

  // 2. Spin events (Resilience)
  chance += spinScore;

  // 3. Sacrifices (diminishing returns)
  const sacrificeBonus = Math.min(sacrificeCount * 2.1, 16);
  chance += sacrificeBonus;

  // 4. Money (logarithmic)
  const moneyBonus = Math.min(Math.log10(moneySpent / 1000 + 1) * 5.5, 11);
  chance += moneyBonus;

  // 5. Time invested
  const timeBonus = Math.min(timeSpent / 90, 14);
  chance -= timeBonus;

  // 6. Attempt penalty
  if (selectedAttempt == 1) chance -= 4;
  if (selectedAttempt === 2) chance -= 7;
  if (selectedAttempt >= 3) chance -= 14;

  // 7. Race difficulty penalty
  const racePenalty: Record<string, number> = {
    UPSC: -20,
    JEE: -15,
    NEET: -14,
    Banking: -9,
    SSC: -8,
    Railway: -6,
  };

  chance += racePenalty[raceName ?? ""] ?? -10;

  // 8. Clamp (never 0 or 100)
  return Math.round(Math.max(4, Math.min(96, chance)));
}
