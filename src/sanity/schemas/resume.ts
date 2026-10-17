export const resumeSchema = {
  name: 'resume',
  title: 'Resume / CV',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Lantumo Birhanu - Official Resume (PDF)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'headline',
      title: 'Headline (e.g. Fullstack & Creative Three.js Engineer)',
      type: 'string',
    },
    {
      name: 'resumeFile',
      title: 'Resume PDF Upload',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Upload your latest resume PDF here. The download buttons across the portfolio will dynamically link to this file.',
    },
    {
      name: 'externalPdfUrl',
      title: 'External PDF Fallback URL (Optional)',
      type: 'url',
      description: 'Alternative hosted PDF link (e.g. Google Drive, Dropbox) if not uploading directly.',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated Date (e.g. October 2024)',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Executive Summary',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'lastUpdated',
    },
  },
};
