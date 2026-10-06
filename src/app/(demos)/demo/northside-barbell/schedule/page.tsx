import { buildMetadata } from "@/lib/metadata";
import { schedule, scheduleDays } from "../data";

export const metadata = buildMetadata({
  title: "Schedule — Northside Barbell (EDUS demo)",
  description:
    "The full weekly timetable with live capacity for every slot. A demonstration build by EDUS Media.",
  path: "/demo/northside-barbell/schedule/",
});

export default function SchedulePage() {
  const totalSlots = schedule.length;
  const openSlots = schedule.filter((slot) => slot.booked < slot.capacity).length;

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 pb-28 sm:px-8">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent">
        {openSlots} of {totalSlots} slots have space
      </p>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,9vw,7rem)] uppercase leading-[0.84] tracking-[-0.045em]">
        THE WEEK
      </h1>
      <p className="mt-8 max-w-[52ch] border-t-2 border-ink pt-7 leading-relaxed text-ink-muted">
        Book through the app or just turn up &mdash; if a class has space, you are in. Open Gym never
        needs booking. Capacity bars show how full each slot is right now.
      </p>

      {/* One flat table per day. Deliberately not an accordion: members are
          checking this one-handed, mid-session, and should not have to tap
          twice to see a time. */}
      <div className="mt-14 space-y-14">
        {scheduleDays.map((day) => {
          const slots = schedule.filter((slot) => slot.day === day);

          return (
            <section key={day} aria-labelledby={`day-${day}`}>
              <h2
                id={`day-${day}`}
                className="border-b-2 border-ink pb-3 font-display text-2xl uppercase tracking-[-0.025em] sm:text-3xl"
              >
                {day}
                <span className="ml-4 font-mono text-[0.625rem] tracking-[0.16em] text-ink-faint">
                  {slots.length} {slots.length === 1 ? "session" : "sessions"}
                </span>
              </h2>

              <ul>
                {slots.map((slot) => {
                  const remaining = slot.capacity - slot.booked;
                  const isFull = remaining <= 0;
                  const fillPercent = Math.round((slot.booked / slot.capacity) * 100);

                  return (
                    <li
                      key={`${day}-${slot.time}-${slot.name}`}
                      className="grid grid-cols-2 items-center gap-x-4 gap-y-3 border-b border-line py-5 lg:grid-cols-12"
                    >
                      <span className="font-display text-[clamp(1.5rem,3.6vw,2.5rem)] leading-none tracking-[-0.04em] lg:col-span-2">
                        {slot.time}
                      </span>

                      <span className="text-right text-base font-medium lg:col-span-3 lg:text-left lg:text-lg">
                        {slot.name}
                      </span>

                      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-muted lg:col-span-2">
                        {slot.coach === "—" ? "Unstaffed" : `Coach ${slot.coach}`}
                      </span>

                      {/* Level uses a border treatment, never colour alone. */}
                      <span
                        className={
                          slot.level === "Advanced"
                            ? "justify-self-end border-2 border-accent px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-accent lg:col-span-2 lg:justify-self-start"
                            : "justify-self-end border border-line px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-ink-muted lg:col-span-2 lg:justify-self-start"
                        }
                      >
                        {slot.level}
                      </span>

                      <div className="col-span-2 lg:col-span-3 lg:flex lg:items-center lg:justify-end lg:gap-4">
                        <div
                          className="h-2 w-full border border-line lg:w-24"
                          role="img"
                          aria-label={`${slot.booked} of ${slot.capacity} places taken`}
                        >
                          <div
                            className={isFull ? "h-full bg-ink-faint" : "h-full bg-accent"}
                            style={{ width: `${fillPercent}%` }}
                          />
                        </div>
                        <span className="mt-2 block shrink-0 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-ink-muted lg:mt-0 lg:w-24 lg:text-right">
                          {isFull ? "Full" : `${remaining} left`}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-16 border-2 border-ink p-7 sm:p-9">
        <h2 className="font-display text-2xl uppercase tracking-[-0.02em]">Before your first class</h2>
        <ul className="mt-7 space-y-3.5 text-sm leading-relaxed text-ink-muted">
          <li>
            <strong className="font-semibold text-ink">Arrive ten minutes early.</strong> The coach
            will walk you round and ask what you have lifted before. Honest answers get you better
            coaching.
          </li>
          <li>
            <strong className="font-semibold text-ink">Flat shoes or lifting shoes.</strong> Running
            shoes are compressible and will make squatting worse, not safer.
          </li>
          <li>
            <strong className="font-semibold text-ink">We provide chalk, belts and straps.</strong>{" "}
            Bring water and a towel. Nothing else is required.
          </li>
          <li>
            <strong className="font-semibold text-ink">Beginner Barbell runs Saturdays at
            09:30.</strong> If you have never held a barbell, start there rather than at 05:30.
          </li>
        </ul>
      </div>
    </div>
  );
}
