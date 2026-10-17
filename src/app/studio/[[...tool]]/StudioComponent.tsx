'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioComponent() {
  const Studio = NextStudio as any;
  return (
    <div className="fixed inset-0 z-50 bg-background text-foreground">
      <Studio config={config} />
    </div>
  );
}
