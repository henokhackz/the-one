import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';
import { projectId, dataset } from './src/sanity/env';

export default defineConfig({
  basePath: '/studio',
  name: 'fidel-portfolio-studio',
  title: 'Lantumo Birhanu — Portfolio CMS',
  projectId: projectId || 'k6ehfuul',
  dataset: dataset || 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
