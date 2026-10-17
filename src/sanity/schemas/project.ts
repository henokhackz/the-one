export const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'geezNumeral',
      title: "Ge'ez Numeral (e.g. ፩, ፪, ፫)",
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    },
    {
      name: 'oneLineProblem',
      title: 'One-Line Problem Statement',
      type: 'string',
    },
    {
      name: 'roleType',
      title: 'Role Type',
      type: 'string',
      options: {
        list: [
          { title: 'Fullstack', value: 'Fullstack' },
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Backend', value: 'Backend' },
        ],
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Fullstack', value: 'Fullstack' },
          { title: 'AI & Systems', value: 'AI & Systems' },
          { title: 'Web & Cloud', value: 'Web & Cloud' },
        ],
      },
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    },
    {
      name: 'githubUrl',
      title: 'GitHub Repository URL',
      type: 'url',
    },
    {
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
    },
    {
      name: 'keyResult',
      title: 'Key Result / Metric Highlight',
      type: 'string',
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'frontendSplit',
      title: 'Frontend Architecture Deliverables',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'backendSplit',
      title: 'Backend Architecture Deliverables',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'caseStudy',
      title: 'In-Depth Case Study',
      type: 'object',
      fields: [
        {
          name: 'overview',
          title: 'Overview',
          type: 'text',
        },
        {
          name: 'problem',
          title: 'Problem Description',
          type: 'text',
        },
        {
          name: 'myRole',
          title: 'My Role & Responsibilities',
          type: 'string',
        },
        {
          name: 'timeline',
          title: 'Timeline',
          type: 'string',
        },
        {
          name: 'stack',
          title: 'Tech Stack (detailed)',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
        },
        {
          name: 'architectureHighlights',
          title: 'Architecture Highlights',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'keyDecisions',
          title: 'Key Architectural Decisions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Decision Title' },
                { name: 'description', type: 'text', title: 'Why & How' },
              ],
            },
          ],
        },
        {
          name: 'challenges',
          title: 'Challenges & Solutions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Challenge' },
                { name: 'solution', type: 'text', title: 'Engineered Solution' },
              ],
            },
          ],
        },
        {
          name: 'results',
          title: 'Key Results & Outcomes',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'metrics',
          title: 'Measurable Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string', title: 'Metric Label' },
                { name: 'value', type: 'string', title: 'Metric Value' },
              ],
            },
          ],
        },
        {
          name: 'screenshots',
          title: 'Case Study Screenshots & Architecture Diagrams',
          type: 'array',
          of: [
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                { name: 'alt', type: 'string', title: 'Alt Text' },
                { name: 'caption', type: 'string', title: 'Caption' },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'roleType',
      media: 'thumbnail',
    },
  },
};
