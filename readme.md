# Student Survival Simulator 🎮

A brutally honest 3-minute interactive experience that turns the chaos of being a student in India into a survival game. Face exam delays, paper leaks, server crashes, and countless random events that test not your knowledge—but your luck.

This isn't a typical educational game. It's a reflection of the system every aspirant knows too well.

## 🔗 Demo

**Live Demo:**

https://github.com/user-attachments/assets/443245e5-ac33-442d-87f1-f95c332906a9

> Play through the simulation, face random events, and see if you survive the Indian student experience.

## ✨ Features

### 🎯 Choose Your Race Track

Select from 6 competitive exam paths, each with unique attributes:

- **UPSC** — Still reading...
- **JEE** — Sleep is optional
- **NEET** — One more attempt?
- **Railway** — Platform changed
- **SSC** — Waiting continues
- **Banking** — Balance: Insufficient
  Each track is rated on **Competition**, **Investment**, **Patience**, and **Uncertainty**.

### 🎲 Dynamic Event System

Spin the wheel to face one of 8 random exam events:

- Easy Paper (+8%)
- Normal Day (+5%)
- Centre Changed (-5%)
- Technical Error (-8%)
- Exam Postponed (-12%)
- Cutoff Increased (-15%)
- Server Crash (-18%)
- Paper Leak (-25%)

### 📊 Survival Score Calculator

Your final survival chance is calculated based on:

- Race track difficulty (UPSC: -20%, Railway: -6%)
- Attempt number (1st: -4%, Lost count: -14%)
- Time invested (logarithmic penalty)
- Money spent (logarithmic bonus, capped)
- Sacrifices made (diminishing returns)
- Random event outcomes
  The algorithm ensures no one gets 0% or 100%—just like the real system.

### 🎭 Immersive UI/UX

- **Animated landing scene** with a 3D room environment, rotating news headlines, rain effects, lightning flashes, and dust particles
- **Interactive race track cards** with glowing borders and attribute bars
- **Draggable attempt cards** with torn-paper aesthetics
- **Sacrifice checklist** where each selection visually "tears away" a piece of your life
- **Smooth page transitions** and micro-interactions throughout

### 📤 Shareable Results

Generate a custom social share card with:

- Your survival percentage
- Chosen exam path and mascot
- Event outcome and impact
- Personal verdict quote

## 🎮 How It Works

1. **Landing Page** — Set the mood with an animated room scene showing a student's reality
2. **Select Race Track** — Choose your exam path (UPSC, JEE, NEET, etc.)
3. **Choose Attempt** — Select which attempt this is (1st, 2nd, 3rd, 4th, or "lost count")
4. **Set the Stakes** — Use sliders to set time spent (0-10 years) and money spent (₹0-1M+)
5. **Mark Your Sacrifices** — Check off what you gave up: friends, family, festivals, sleep, hobbies, mental peace
6. **Spin the Event Wheel** — Face a random exam event that affects your survival score
7. **View Survival Report** — See your final survival chance with a personalized verdict
   The experience takes 3 minutes and leaves you with a shareable report card.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + GSAP
- **State Management:** Zustand
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📂 Project Architecture

```
app/
├── page.tsx                    # Landing page
├── select/page.tsx             # Race track selection
├── attempt/page.tsx            # Attempt number selection
├── spent/page.tsx              # Time/money investment sliders
├── sacrifice/page.tsx          # Sacrifice checklist
├── spin/page.tsx               # Event wheel spinner
├── survival_Report/page.tsx    # Final report & results
├── components/
│   ├── heroSection/            # Landing page components
│   ├── race-track/             # Race track cards & selection
│   ├── choose-attempt/         # Draggable attempt cards
│   ├── spent-slider/           # Investment slider component
│   ├── sacrifice/              # Sacrifice card components
│   ├── spin-wheel/             # Event wheel & result card
│   └── ui/                     # Reusable UI components
├── store/                      # Zustand state stores
│   ├── raceTrackStore.ts       # Selected race & mascot
│   ├── attemptStore.ts         # Attempt number
│   ├── spentStore.ts           # Time & money spent
│   ├── sacrificeStore.ts       # Sacrifice count
│   └── spinStore.ts            # Event outcome & score
├── data/
│   ├── raceTracks.ts           # Race track definitions & attributes
│   └── events.ts               # Exam event data
└── lib/
    ├── survivalScoreCalculator.ts  # Core scoring algorithm
    └── survivalShareCard.ts        # Canvas-based share card generator
```

### State Management Flow

The app uses **Zustand** for lightweight, type-safe global state:

```typescript
User Selection → Zustand Store → Survival Calculator → Final Report
```

Each decision point (race, attempt, spent, sacrifice, spin) updates its respective store. The final report page aggregates all stores to calculate the survival percentage.

## 🧮 Scoring System

The survival chance starts at **50%** and is modified by:

Factor

Impact

**Random Event**

-25% to +8%

**Sacrifices**

+2.1% each (capped at +16%)

**Money Spent**

Logarithmic bonus (capped at +11%)

**Time Spent**

Linear penalty up to -14%

**Attempt Number**

-4% (1st) to -14% (lost count)

**Race Difficulty**

-6% (Railway) to -20% (UPSC)

Final score is clamped between **4% and 96%**.

The algorithm is designed to reflect reality: hard work matters, but luck matters more.

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/shaurya-shaw/student-survival-simulator.git
cd student-survival-simulator

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000/) to start the simulation.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎨 Design Philosophy

This project was built with a specific design intent:

- **Aesthetic over functionality** — The UI is intentionally dramatic and atmospheric
- **Honest storytelling** — Every piece of copy reflects real student experiences
- **Emotional resonance** — Animations and interactions are designed to evoke the weight of these decisions
- **No gamification** — This isn't a game you "win." It's an experience you survive.

## 🧪 Key Implementation Details

### Survival Score Calculator

The core algorithm uses weighted factors with diminishing returns and logarithmic scaling to prevent min-maxing. No combination of inputs guarantees success or failure—just like the real system.

### Event Wheel Mechanics

The wheel uses normalized angle calculations to ensure fair randomness. Each spin includes 5-8 full rotations before landing on a segment, with easing curves for realistic physics.

### Share Card Generation

Results are rendered to a canvas element and exported as a 1080x1350 PNG. The card includes the user's mascot, stats, verdict quote, and is optimized for Instagram/Twitter sharing.

### Animation Strategy

Landing page uses GSAP for complex timeline-based animations (lightning, rain streaks), while page transitions and micro-interactions use Framer Motion for declarative animation logic.

## 👤 Author

Built by Shaurya Kumar Shaw

## 📝 License

This project is open source and available under the [MIT License](https://license/).

---

**Disclaimer:** This is a fictional interactive experience built to reflect the struggles of competitive exam aspirants in India. It is not affiliated with any educational board, examination body, or institution. All scenarios and outcomes are simulated and for entertainment purposes only.

---

_"The system didn't test your knowledge. It tested your luck."_
