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

const PANEL_WIDTH = 5;
const PANEL_HEIGHT = 3.5;
const GALLERY_RADIUS = 8.7;
const DRAG_SPEED = 0.005;
const WHEEL_SPEED = 0.0015;
const MOMENTUM_LIMIT = 0.85;
const SNAP_DELAY = 140;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizeIndex(index: number, total: number) {
  return ((index % total) + total) % total;
}

function ProjectPanel({ project, angle }: { project: Project; angle: number }) {
  const texture = useLoader(TextureLoader, project.image);

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

  return (
    <group rotation-y={angle}>
      <mesh position={[0, 0, -GALLERY_RADIUS]}>
        <planeGeometry args={[PANEL_WIDTH, PANEL_HEIGHT]} />
        <meshBasicMaterial
          map={texture}
          side={DoubleSide}
          toneMapped={false}
          transparent
        />
      </mesh>
    </group>
  );
}

function ProjectGalleryScene({
  projects,
  targetRotationRef,
  rootRef,
  onActiveChange,
}: {
  projects: Project[];
  targetRotationRef: MutableRefObject<number>;
  rootRef: MutableRefObject<Group>;
  onActiveChange: (index: number) => void;
}) {
  const lastActiveRef = useRef(0);
  const step = (Math.PI * 2) / projects.length;

  useFrame((_, delta) => {
    if (rootRef.current) {
      const settle = 1 - Math.exp(-delta * 6);
      rootRef.current.rotation.y = MathUtils.lerp(
        rootRef.current.rotation.y,
        targetRotationRef.current,
        settle,
      );
      const idx =
        ((Math.round(-rootRef.current.rotation.y / step) % projects.length) +
          projects.length) %
        projects.length;
      if (idx !== lastActiveRef.current) {
        lastActiveRef.current = idx;
        onActiveChange(idx);
      }
    }
  });

  return (
    <group ref={rootRef}>
      {projects.map((project, i) => (
        <ProjectPanel
          key={project.id}
          project={project}
          angle={(Math.PI * 2 * i) / projects.length}
        />
      ))}
    </group>
  );
}

export function Projects() {
  const projects = useMemo(() => allProjects, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const projectCount = projects.length;
  const step = (Math.PI * 2) / projectCount;
  const targetRotationRef = useRef(0);
  const rootRef = useRef<Group>(null);
  const dragStateRef = useRef<DragState>({
    pointerId: null,
    isDragging: false,
    lastX: 0,
    velocity: 0,
  });
  const snapTimerRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
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
    targetRotationRef.current =
      Math.round((targetRotationRef.current + momentum) / step) * step;
  }, [step]);

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
      const next = targetRotationRef.current + direction * step;
      targetRotationRef.current = next;
      const nextIndex = normalizeIndex(Math.round(-next / step), projectCount);
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    },
    [clearSnapTimer, step, projectCount],
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
    const deltaRotation = -deltaX * DRAG_SPEED;

    targetRotationRef.current += deltaRotation;
    drag.velocity = drag.velocity * 0.7 + deltaRotation * 0.3;
    drag.lastX = event.clientX;

    const nextIndex = normalizeIndex(
      Math.round(-targetRotationRef.current / step),
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
    const deltaRotation = delta * WHEEL_SPEED;
    targetRotationRef.current += deltaRotation;
    dragStateRef.current.velocity =
      dragStateRef.current.velocity * 0.72 + deltaRotation * 0.28;

    const nextIndex = normalizeIndex(
      Math.round(-targetRotationRef.current / step),
      projectCount,
    );
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    scheduleSnap();
  };

  return (
    <section id="projects" className="relative text-foreground">
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
          <div
            className="relative h-[360px]  md:h-[420px] lg:h-[470px]"
            aria-label="Interactive 3D project gallery"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
            onWheel={handleWheel}
          >
            <Canvas
              camera={{ position: [0, 0, 0.01], fov: 35, near: 0.1, far: 100 }}
              dpr={[1, 1.6]}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <ProjectGalleryScene
                  projects={projects}
                  targetRotationRef={targetRotationRef}
                  rootRef={rootRef}
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
