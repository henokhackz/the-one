export const experienceSchema = {
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    {
      name: 'role',
      title: 'Job Role / Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    },
    {
      name: 'date',
      title: 'Date Range (e.g. Nov 2025 – Present)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration (e.g. Current, 6 mos)',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location (e.g. Remote · Israel, Addis Ababa)',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: ['Contract', 'Freelance', 'Full-time', 'Part-time'],
      },
      initialValue: 'Contract',
    },
    {
      name: 'accent',
      title: 'Accent Hex Color (e.g. #f59e0b)',
      type: 'string',
      initialValue: '#f59e0b',
    },
    {
      name: 'featured',
      title: 'Featured Experience',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order (lowest first)',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'description',
      title: 'Role Description & Context',
      type: 'text',
      rows: 4,
    },
    {
      name: 'highlights',
      title: 'Key Accomplishments / Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
  ],
  preview: {
    select: {
      title: 'role',
      subtitle: 'company',
      media: 'logo',
    },
  },
};
