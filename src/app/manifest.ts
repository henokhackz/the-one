import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lantumo Birhanu — Fullstack & Creative Three.js Engineer',
    short_name: 'Lantumo Birhanu',
    description: 'Distinctive, high-performance creative developer portfolio of Lantumo Birhanu.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0c0a09',
    theme_color: '#0c0a09',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
