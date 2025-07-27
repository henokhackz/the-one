type BlogImage = {
    id: number
    image: string
    publicId: string
  }
  
  type BlogPost = {
    id: number
    slug: string
    title: string
    content: string
    images?: BlogImage[]
    author: string
    category: string
    tags: string[]
    type: 'tutorial' | 'opinion' | 'guide'
    readingTime: string
    updatedAt: string
    createdAt: string
    isFeatured: boolean
    published: boolean
  }
  