'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Database,
  Key,
  Globe,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  FolderGit2,
  FileText,
  Briefcase,
  Layers,
} from 'lucide-react';
import { isSanityConfigured, projectId, dataset } from '@/sanity/env';

// Dynamically import StudioComponent
const StudioComponent = dynamic(() => import('./StudioComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-stone-950 text-stone-200">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
        <p className="text-sm font-mono tracking-wider text-stone-400">Loading Sanity Studio...</p>
      </div>
    </div>
  ),
});

export default function StudioPage() {
  const [configured, setConfigured] = useState(() => isSanityConfigured());

  useEffect(() => {
    setConfigured(isSanityConfigured());
  }, []);

  // When Sanity is configured, load the embedded Studio
  if (configured) {
    return <StudioComponent />;
  }

  // Graceful setup guide when Sanity project ID is not yet connected
  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 selection:bg-amber-500/20 selection:text-amber-300">
      {/* Background ambient mesh */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-16">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono font-bold text-lg">
              S
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-100 flex items-center gap-2">
                Sanity CMS Studio Setup
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Ready to Connect
                </span>
              </h1>
              <p className="text-xs text-stone-400 font-mono">
                Lantumo Birhanu — Portfolio Content Management
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="text-xs text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1 font-mono"
          >
            ← Back to Portfolio
          </Link>
        </div>

        {/* Hero Notice */}
        <div className="mt-8 p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-stone-100">
                Your Studio is 1 Step Away from Going Live
              </h2>
              <p className="text-sm text-stone-400 mt-1 leading-relaxed">
                All Sanity schemas (<strong>Projects</strong>, <strong>Blogs</strong>, <strong>Skills</strong>, <strong>Experience</strong>, <strong>Resume</strong>) and API fetching pipelines are fully wired into your portfolio. To activate the embedded Studio and connect your live cloud database, enter your Sanity Project ID in <code className="text-amber-300 font-mono bg-stone-950 px-1.5 py-0.5 rounded">.env</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Configuration Checklist */}
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-mono text-stone-400 uppercase tracking-wider">
            Quick 3-Step Configuration
          </h3>

          {/* Step 1 */}
          <div className="p-5 rounded-xl bg-stone-900/50 border border-stone-850 hover:border-stone-700 transition-all">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-stone-200">
                    Get your Project ID from Sanity Manage
                  </h4>
                  <a
                    href="https://www.sanity.io/manage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-mono"
                  >
                    sanity.io/manage <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  Log in to your Sanity dashboard. Click on your project (or click <em>Create project</em>). Under the project title, copy your <strong>Project ID</strong> (e.g. <code className="text-stone-300 font-mono">abc123xyz</code>).
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-xl bg-stone-900/50 border border-stone-850 hover:border-stone-700 transition-all">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-stone-200">
                  Add the Project ID to your <code className="text-amber-300 font-mono">.env</code> file
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  Open your portfolio root directory and add or update this line in your <code className="text-stone-300 font-mono">.env</code> file:
                </p>
                <div className="mt-2.5 p-3 rounded-lg bg-stone-950 border border-stone-800 font-mono text-xs text-amber-300 flex items-center justify-between">
                  <span>NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id_here</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-xl bg-stone-900/50 border border-stone-850 hover:border-stone-700 transition-all">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-stone-200">
                    Authorize Localhost in CORS Origins
                  </h4>
                  <a
                    href="https://www.sanity.io/manage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-mono"
                  >
                    API Settings <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  In your Sanity Project dashboard, navigate to <strong>API &rarr; CORS Origins &rarr; Add CORS origin</strong>. Enter:
                </p>
                <div className="mt-2.5 p-3 rounded-lg bg-stone-950 border border-stone-800 font-mono text-xs text-stone-300 space-y-1">
                  <div>Origin: <span className="text-amber-300">http://localhost:3000</span></div>
                  <div>Credentials: <span className="text-emerald-400">Allow credentials (checked)</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Schemas Overview */}
        <div className="mt-10">
          <h3 className="text-sm font-mono text-stone-400 uppercase tracking-wider mb-4">
            Content Collections Ready in Studio
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                icon: FolderGit2,
                title: 'Projects & Case Studies',
                desc: 'Architecture, screenshots, metrics, live links, and full case studies.',
              },
              {
                icon: FileText,
                title: 'Technical Blog',
                desc: 'WebGL, system architecture, reading time, and rich text essays.',
              },
              {
                icon: Layers,
                title: 'Skills Matrix',
                desc: 'Frontend, backend, systems, and linked project tags.',
              },
              {
                icon: Briefcase,
                title: 'Work Experience',
                desc: 'Ideeza Three.js work, freelance track record, and company logos.',
              },
              {
                icon: Database,
                title: 'Resume / CV',
                desc: 'Direct PDF upload with automated CDN download delivery.',
              },
              {
                icon: Globe,
                title: 'Global CDN Delivery',
                desc: 'Sanity asset pipeline with automatic WebP/AVIF compression.',
              },
            ].map((col, idx) => {
              const Icon = col.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/80 hover:border-amber-500/30 transition-all"
                >
                  <Icon className="w-4 h-4 text-amber-400 mb-2" />
                  <h4 className="text-xs font-semibold text-stone-200">{col.title}</h4>
                  <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">{col.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-400 font-mono">
            Current Status:{' '}
            <span className="text-amber-400 font-semibold">
              Fallback data active (Portfolio remains 100% operational)
            </span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs tracking-wider transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload Studio Once Configured
          </button>
        </div>
      </div>
    </div>
  );
}
