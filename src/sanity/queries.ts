import { groq } from 'next-sanity';

// ============================================================================
// 1. PROJECTS QUERIES
// ============================================================================
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    "id": coalesce(id, _id),
    "slug": slug.current,
    title,
    geezNumeral,
    subtitle,
    summary,
    oneLineProblem,
    roleType,
    category,
    featured,
    order,
    keyResult,
    githubUrl,
    liveUrl,
    technologies,
    frontendSplit,
    backendSplit,
    "thumbnail": coalesce(thumbnail.asset->url, thumbnail, ""),
    caseStudy {
      overview,
      problem,
      myRole,
      timeline,
      stack,
      architectureHighlights,
      keyDecisions[] {
        title,
        description
      },
      challenges[] {
        title,
        solution
      },
      results,
      metrics[] {
        label,
        value
      },
      screenshots[] {
        "src": coalesce(asset->url, src, ""),
        alt,
        caption
      }
    }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && (slug.current == $slug || id == $slug)][0] {
    _id,
    "id": coalesce(id, _id),
    "slug": slug.current,
    title,
    geezNumeral,
    subtitle,
    summary,
    oneLineProblem,
    roleType,
    category,
    featured,
    order,
    keyResult,
    githubUrl,
    liveUrl,
    technologies,
    frontendSplit,
    backendSplit,
    "thumbnail": coalesce(thumbnail.asset->url, thumbnail, ""),
    caseStudy {
      overview,
      problem,
      myRole,
      timeline,
      stack,
      architectureHighlights,
      keyDecisions[] {
        title,
        description
      },
      challenges[] {
        title,
        solution
      },
      results,
      metrics[] {
        label,
        value
      },
      screenshots[] {
        "src": coalesce(asset->url, src, ""),
        alt,
        caption
      }
    }
  }
`;

// ============================================================================
// 2. BLOG POSTS QUERIES
// ============================================================================
export const blogsQuery = groq`
  *[_type == "blogPost"] | order(order asc, _createdAt desc) {
    _id,
    "id": coalesce(id, _id),
    "slug": slug.current,
    title,
    subtitle,
    geezNumeral,
    date,
    readingTime,
    category,
    summary,
    "coverImage": coalesce(coverImage.asset->url, coverImage, ""),
    content,
    order
  }
`;

export const blogBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    "id": coalesce(id, _id),
    "slug": slug.current,
    title,
    subtitle,
    geezNumeral,
    date,
    readingTime,
    category,
    summary,
    "coverImage": coalesce(coverImage.asset->url, coverImage, ""),
    content,
    order
  }
`;

// ============================================================================
// 3. SKILLS MATRIX QUERIES
// ============================================================================
export const skillCategoriesQuery = groq`
  *[_type == "skillCategory"] | order(order asc, _createdAt asc) {
    _id,
    title,
    iconName,
    description,
    order,
    skills[] {
      name,
      level,
      projectIds
    }
  }
`;

// ============================================================================
// 4. WORK EXPERIENCE QUERIES
// ============================================================================
export const experiencesQuery = groq`
  *[_type == "experience"] | order(order asc, _createdAt asc) {
    _id,
    "id": coalesce(_id, company),
    role,
    company,
    "logo": coalesce(logo.asset->url, logo, null),
    date,
    duration,
    location,
    type,
    accent,
    featured,
    order,
    description,
    highlights,
    technologies
  }
`;

// ============================================================================
// 5. RESUME / CV QUERY
// ============================================================================
export const resumeQuery = groq`
  *[_type == "resume"][0] {
    _id,
    title,
    headline,
    "fileUrl": coalesce(resumeFile.asset->url, externalPdfUrl, ""),
    externalPdfUrl,
    lastUpdated,
    summary
  }
`;
