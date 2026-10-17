export const skillCategorySchema = {
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Title (e.g. Frontend Engineering)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'iconName',
      title: 'Icon Identifier (Code2, Server, Layers, Cpu)',
      type: 'string',
      options: {
        list: [
          { title: 'Code2 (Frontend)', value: 'Code2' },
          { title: 'Server (Backend)', value: 'Server' },
          { title: 'Layers (Fullstack)', value: 'Layers' },
          { title: 'Cpu (Systems / Three.js)', value: 'Cpu' },
        ],
      },
      initialValue: 'Code2',
    },
    {
      name: 'description',
      title: 'Category Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'skills',
      title: 'Skills List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Skill Name (e.g. React 19 & Next.js App Router)',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'level',
              title: 'Proficiency Tag (e.g. Senior, Production, Specialist, Verified, Advanced)',
              type: 'string',
              initialValue: 'Production',
            },
            {
              name: 'projectIds',
              title: 'Connected Project IDs/Slugs (for interactive skill highlighting)',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'level',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
};
