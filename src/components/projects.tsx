"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  DoubleSide,
  Group,
  MathUtils,
  MeshBasicMaterial,
  SRGBColorSpace,
  TextureLoader,
} from "three";
import { allProjects } from "@/lib/dummy-data";
import { Github, ExternalLink } from "lucide-react";

type Project = (typeof allProjects)[number];

type DragState = {
  pointerId: number | null;
  isDragging: boolean;
  lastX: number;
  velocity: number;
};

const PANEL_WIDTH = 6.8;
const PANEL_HEIGHT = 4.5;
const PANEL_SPACING = 9.5;
const DRAG_SPEED = 0.0044;
const WHEEL_SPEED = 0.001;
const MOMENTUM_LIMIT = 0.85;
const SNAP_DELAY = 120;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function normalizeIndex(index: number, total: number) {
  return ((index % total) + total) % total;
}

function getWrappedDistance(index: number, progress: number, total: number) {
  let distance = index - progress;
  distance = ((distance + total / 2 + total * 1000) % total) - total / 2;
  return distance;
}

function ProjectPanel({
  project,
  index,
  progressRef,
  total,
}: {
  project: Project;
  index: number;
  progressRef: MutableRefObject<number>;
  total: number;
}) {
  const texture = useLoader(TextureLoader, project.image);
  const panelRef = useRef<Group>(null);
  const imageRef = useRef<MeshBasicMaterial>(null);

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    const planeAspect = PANEL_WIDTH / PANEL_HEIGHT;
    const image = texture.image as { width: number; height: number };
    const imageAspect = image.width / image.height;
    let repeatX = 1;
    let repeatY = 1;
    let offsetX = 0;
    let offsetY = 0;
    if (imageAspect > planeAspect) {
      repeatX = planeAspect / imageAspect;
      offsetX = (1 - repeatX) / 2;
    } else {
      repeatY = imageAspect / planeAspect;
      offsetY = (1 - repeatY) / 2;
    }
    texture.repeat.set(repeatX, repeatY);
    texture.offset.set(offsetX, offsetY);
    texture.needsUpdate = true;
  }, [texture]);

  useFrame((_, delta) => {
    const distance = getWrappedDistance(index, progressRef.current, total);
    const clampedDistance = clamp(distance, -4, 4);
    const absDistance = Math.abs(clampedDistance);
    const frontness = clamp(1 - absDistance / 4, 0, 1);
    const visibleMask = 1 - smoothstep(1, 1.6, absDistance);
    const settle = 1 - Math.exp(-delta * 14);

    if (panelRef.current) {
      const targetX = clampedDistance * PANEL_SPACING;
      const targetY = -absDistance * 0.04;
      const targetZ = -absDistance * 0.3;
      const targetScale = 1.4;
      panelRef.current.position.x = MathUtils.lerp(
        panelRef.current.position.x,
        targetX,
        settle,
      );
      panelRef.current.scale.x = MathUtils.lerp(
        panelRef.current.scale.x,
        targetScale,
        settle,
      );
      panelRef.current.scale.y = MathUtils.lerp(
        panelRef.current.scale.y,
        targetScale,
        settle,
      );
      panelRef.current.scale.z = MathUtils.lerp(
        panelRef.current.scale.z,
        targetScale,
        settle,
      );
      panelRef.current.position.y = MathUtils.lerp(
        panelRef.current.position.y,
        targetY,
        settle,
      );
      panelRef.current.position.z = MathUtils.lerp(
        panelRef.current.position.z,
        targetZ,
        settle,
      );
      panelRef.current.rotation.y = MathUtils.lerp(
        panelRef.current.rotation.y,
        -clampedDistance * 0.06,
        settle,
      );
      panelRef.current.rotation.z = MathUtils.lerp(
        panelRef.current.rotation.z,
        0,
        settle,
      );
      panelRef.current.visible = visibleMask > 0.01;
    }

    if (imageRef.current) {
      imageRef.current.opacity = visibleMask;
    }
  });

  return (
    <group ref={panelRef}>
      <mesh>
        <planeGeometry args={[PANEL_WIDTH, PANEL_HEIGHT]} />
        <meshBasicMaterial
          ref={imageRef}
          map={texture}
          side={DoubleSide}
          transparent
          opacity={1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function ProjectGalleryScene({
  projects,
  progressRef,
  targetProgressRef,
  dragStateRef,
  onActiveChange,
}: {
  projects: Project[];
  progressRef: MutableRefObject<number>;
  targetProgressRef: MutableRefObject<number>;
  dragStateRef: MutableRefObject<DragState>;
  onActiveChange: (index: number) => void;
}) {
  const lastActiveRef = useRef(0);

  useFrame((_, delta) => {
    if (!dragStateRef.current.isDragging) {
      const settle = 1 - Math.exp(-delta * 8);
      progressRef.current = MathUtils.lerp(
        progressRef.current,
        targetProgressRef.current,
        settle,
      );
    } else {
      progressRef.current = targetProgressRef.current;
    }

    const nextIndex = normalizeIndex(
      Math.round(progressRef.current),
      projects.length,
    );
    if (nextIndex !== lastActiveRef.current) {
      lastActiveRef.current = nextIndex;
      onActiveChange(nextIndex);
    }
  });

  return (
    <>
      <color attach="background" args={["#1e40af"]} />
      <ambientLight intensity={2.2} />
      <group position={[0, -0.05, 0]}>
        {projects.map((project, index) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={index}
            progressRef={progressRef}
            total={projects.length}
          />
        ))}
      </group>
    </>
  );
}

export function Projects() {
  const projects = useMemo(() => allProjects, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const dragStateRef = useRef<DragState>({
    pointerId: null,
    isDragging: false,
    lastX: 0,
    velocity: 0,
  });
  const snapTimerRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const projectCount = projects.length;
  const activeProject = projects[activeIndex] ?? projects[0];

  const clearSnapTimer = useCallback(() => {
    if (snapTimerRef.current !== null) {
      window.clearTimeout(snapTimerRef.current);
      snapTimerRef.current = null;
    }
  }, []);

  const snapToNearest = useCallback(() => {
    const drag = dragStateRef.current;
    const momentum = clamp(
      drag.velocity * 0.16,
      -MOMENTUM_LIMIT,
      MOMENTUM_LIMIT,
    );
    targetProgressRef.current = Math.round(
      targetProgressRef.current + momentum,
    );
  }, []);

  const scheduleSnap = useCallback(() => {
    clearSnapTimer();
    snapTimerRef.current = window.setTimeout(() => {
      snapToNearest();
      snapTimerRef.current = null;
    }, SNAP_DELAY);
  }, [clearSnapTimer, snapToNearest]);

  const move = useCallback(
    (direction: -1 | 1) => {
      clearSnapTimer();
      const nextProgress = Math.round(targetProgressRef.current) + direction;
      targetProgressRef.current = nextProgress;
      progressRef.current = MathUtils.lerp(
        progressRef.current,
        nextProgress,
        0.35,
      );
      const nextIndex = normalizeIndex(nextProgress, projectCount);
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    },
    [clearSnapTimer, projectCount],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearSnapTimer();
    };
  }, [clearSnapTimer, move]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    drag.pointerId = event.pointerId;
    drag.isDragging = true;
    drag.lastX = event.clientX;
    drag.velocity = 0;
    setIsDragging(true);
    clearSnapTimer();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag.isDragging || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.lastX;
    const deltaProgress = -deltaX * DRAG_SPEED;

    targetProgressRef.current += deltaProgress;
    drag.velocity = drag.velocity * 0.7 + deltaProgress * 0.3;
    drag.lastX = event.clientX;

    const nextIndex = normalizeIndex(
      Math.round(targetProgressRef.current),
      projectCount,
    );
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  };

  const endPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag.isDragging || drag.pointerId !== event.pointerId) return;

    drag.isDragging = false;
    drag.pointerId = null;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    scheduleSnap();
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    clearSnapTimer();

    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
    const deltaProgress = delta * WHEEL_SPEED;
    targetProgressRef.current += deltaProgress;
    dragStateRef.current.velocity =
      dragStateRef.current.velocity * 0.72 + deltaProgress * 0.28;

    const nextIndex = normalizeIndex(
      Math.round(targetProgressRef.current),
      projectCount,
    );
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    scheduleSnap();
  };

  return (
    <section id="projects" className="relative   text-foreground">
      <div className="relative mx-auto w-full max-w-[1920px]">
        <div className="mx-auto max-w-[1500px] px-5 pt-16 md:px-10 md:pt-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Selected Work
          </span>
          <h2 className="mt-2 font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em] font-bold uppercase">
            Projects
          </h2>
        </div>

        <div
          className="relative mt-8"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
        >
          {/* Left fade mask */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[12%] bg-gradient-to-r from-[#070707] to-transparent" />
          {/* Right fade mask */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[12%] bg-gradient-to-l from-[#070707] to-transparent" />

          <div
            className="relative h-[360px] overflow-hidden bg-[#1e40af] md:h-[420px] lg:h-[470px]"
            aria-label="Interactive 3D project gallery"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
            onWheel={handleWheel}
          >
            <Canvas
              camera={{ position: [0, 0.1, 6], fov: 50, near: 0.1, far: 100 }}
              dpr={[1, 1.6]}
              gl={{ antialias: true, alpha: false }}
            >
              <Suspense fallback={null}>
                <ProjectGalleryScene
                  projects={projects}
                  progressRef={progressRef}
                  targetProgressRef={targetProgressRef}
                  dragStateRef={dragStateRef}
                  onActiveChange={(index) => {
                    activeIndexRef.current = index;
                    setActiveIndex(index);
                  }}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* ── Project info panel ── */}
        <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
          {/* Counter + Links row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(projectCount).padStart(2, "0")}
            </p>

            {/* ─── GitHub & Live links ─── */}
            <div className="flex items-center gap-3">
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 border border-border bg-foreground/[0.03] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted transition-all duration-200 hover:border-border hover:bg-foreground/[0.07] hover:text-foreground"
                >
                  <Github className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
                  GitHub
                </a>
              )}
              {activeProject.live && (
                <a
                  href={activeProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 border border-accent/30 bg-accent/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent transition-all duration-200 hover:border-accent hover:bg-accent/20"
                >
                  <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  Live Site
                </a>
              )}
            </div>
          </div>

          {/* Title + description + meta grid */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:gap-12 lg:grid-cols-[1.6fr_1fr]">
            {/* Left: title + description */}
            <div>
              <h3 className="text-2xl font-bold leading-tight tracking-[-0.01em] text-foreground md:text-4xl">
                {activeProject.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                {activeProject.description}
              </p>
            </div>

            {/* Right: tech tags + meta */}
            <div className="flex flex-col gap-6">
              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="border border-border bg-background px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Status + Role */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-border bg-foreground/[0.03] px-4 py-3">
                  <p className="text-[9px] uppercase tracking-[0.24em] text-muted">
                    Status
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {activeProject.status}
                  </p>
                </div>
                <div className="border border-border bg-foreground/[0.03] px-4 py-3">
                  <p className="text-[9px] uppercase tracking-[0.24em] text-muted">
                    Role
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground line-clamp-2">
                    {activeProject.caseStudy.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
