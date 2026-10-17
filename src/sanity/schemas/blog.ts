export const blogSchema = {
  name: 'blogPost',
  title: 'Blog Post',
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'geezNumeral',
      title: "Ge'ez Numeral (e.g. ፩, ፪, ፫)",
      type: 'string',
    },
    {
      name: 'date',
      title: 'Publication Date Display (e.g. October 2024)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'readingTime',
      title: 'Reading Time (e.g. 5 min read)',
      type: 'string',
      initialValue: '5 min read',
    },
    {
      name: 'category',
      title: 'Category (e.g. WebGL & Performance, Architecture)',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Summary / Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
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
      name: 'content',
      title: 'Article Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Add paragraphs or sections for the technical essay.',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
};
