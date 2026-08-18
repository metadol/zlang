"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { lessons, units } from "@/db/schema";
import { getUnitColor } from "@/constants/unit-colors";
import { Unit } from "./unit";
import { UnitBanner } from "./unit-banner";

type UnitData = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
};

type Props = {
  units: UnitData[];
  activeLesson:
    | (typeof lessons.$inferSelect & { unit: typeof units.$inferSelect })
    | undefined;
  activeLessonPercentage: number;
};

export const UnitsFeed = ({
  units,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  const [activeUnitId, setActiveUnitId] = useState(units[0]?.id);
  const sectionRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const setSectionRef = useCallback(
    (id: number) => (el: HTMLDivElement | null) => {
      if (el) sectionRefs.current.set(id, el);
      else sectionRefs.current.delete(id);
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the topmost entry currently intersecting the trigger line
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const id = Number(visible[0].target.getAttribute("data-unit-id"));
          setActiveUnitId(id);
        }
      },
      {
        // trigger line just below the sticky banner
        rootMargin: "-120px 0px -70% 0px",
        threshold: 0,
      },
    );

    sectionRefs.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [units]);

  const activeUnit = units.find((u) => u.id === activeUnitId) ?? units[0];
  if (!activeUnit) {
    return null;
  }
  const activeColor = getUnitColor(activeUnit.order);

  return (
    <>
      <div className="sticky top-[40px] z-20 bg-background before:absolute before:-top-[40px] before:left-0 before:right-0 before:h-[40px] before:bg-background">
        <UnitBanner
          title={activeUnit.title}
          description={activeUnit.description}
          color={activeColor}
        />
      </div>

      {units.map((unit, index) => (
        <div
          key={unit.id}
          ref={setSectionRef(unit.id)}
          data-unit-id={unit.id}
          className="mb-10"
        >
          <Unit
            lessons={unit.lessons}
            reverse={index % 2 === 1}
            activeLesson={activeLesson}
            description={index === 0 ? undefined : unit.description}
            activeLessonPercentage={activeLessonPercentage}
            color={getUnitColor(unit.order)}
          />
        </div>
      ))}
    </>
  );
};
