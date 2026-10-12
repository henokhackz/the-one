export type Locale = "en" | "am";

export interface Translations {
  nav: {
    work: string;
    about: string;
    blog: string;
    contact: string;
    brandSubtitle: string;
    commandHint: string;
  };
  hero: {
    badge: string;
    name: string;
    role: string;
    bio: string;
    viewWork: string;
    connect: string;
    downloadCv: string;
    scroll: string;
    statusRole: string;
    location: string;
  };
  selectedWork: {
    stamp: string;
    tag: string;
    title: string;
    viewArchive: string;
    liveSite: string;
    sourceCode: string;
    caseStudy: string;
    exploreCaseStudy: string;
  };
  workPage: {
    stamp: string;
    tag: string;
    title: string;
    description: string;
    categoryLabel: string;
    allCategories: string;
    aiCategory: string;
    fullstackCategory: string;
    caseStudyBtn: string;
  };
  aboutPage: {
    stamp: string;
    tag: string;
    title: string;
    resumeBtn: string;
    contactBtn: string;
    bioLead: string;
    bioP1: string;
    bioP2: string;
    bioP3: string;
    skillsTitle: string;
    skillsSubtitle: string;
    timelineTitle: string;
    timelineSubtitle: string;
  };
  aboutTeaser: {
    stamp: string;
    tag: string;
    heading: string;
    description: string;
    readStory: string;
    p1Title: string;
    p1Desc: string;
    p1Tag: string;
    p2Title: string;
    p2Desc: string;
    p2Tag: string;
    p3Title: string;
    p3Desc: string;
    p3Btn: string;
  };
  homeCta: {
    stamp: string;
    tag: string;
    heading: string;
    description: string;
    button: string;
    telegram: string;
  };
  blogPage: {
    stamp: string;
    tag: string;
    title: string;
    description: string;
    readArticle: string;
    backBtn: string;
  };
  contactPage: {
    stamp: string;
    tag: string;
    title: string;
    description: string;
    formTitle: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successDesc: string;
    anotherBtn: string;
    channelsTitle: string;
    locationLabel: string;
    locationValue: string;
    emailValue: string;
  };
  footer: {
    stamp: string;
    name: string;
    bio: string;
    indexTitle: string;
    channelsTitle: string;
    quote: string;
    quoteSub: string;
    backToTop: string;
    copyright: string;
    location: string;
  };
  notFound: {
    stamp: string;
    error: string;
    title: string;
    description: string;
    homeBtn: string;
    workBtn: string;
  };
  commandPalette: {
    placeholder: string;
    home: string;
    work: string;
    about: string;
    blogs: string;
    contact: string;
    switchTheme: string;
    copyEmail: string;
    copied: string;
    openGithub: string;
    openTelegram: string;
    downloadCv: string;
    switchLocale: string;
    navigation: string;
    projects: string;
    actions: string;
    noResults: string;
    hintNav: string;
    hintSelect: string;
    hintClose: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      work: "WORK",
      about: "ABOUT",
      blog: "BLOG",
      contact: "CONTACT",
      brandSubtitle: "CREATIVE ENGINEERING",
      commandHint: "⌘K",
    },
    hero: {
      badge: "Available for Fullstack & Frontend Roles",
      name: "Lantumo Birhanu",
      role: "Fullstack Developer & Creative Three.js Engineer",
      bio: "Crafting distinctive, performance-first web applications and interactive 3D systems. Bridging Ethiopian cultural identity with modern React, Next.js, and TypeScript architectures.",
      viewWork: "View Selected Work",
      connect: "Let's Connect",
      downloadCv: "Download CV",
      scroll: "Scroll",
      statusRole: "IDEEZA THREE.JS ENGR",
      location: "ADDIS ABABA, ET",
    },
    selectedWork: {
      stamp: "01",
      tag: "SELECTED PROJECTS",
      title: "Featured Engineering",
      viewArchive: "View Archive (04 Projects)",
      liveSite: "Live Site",
      sourceCode: "Source Code",
      caseStudy: "Read Case Study →",
      exploreCaseStudy: "Explore Full Case Study",
    },
    workPage: {
      stamp: "01",
      tag: "PORTFOLIO ARCHIVE",
      title: "Selected Work",
      description: "A curated index of production web applications, AI-integrated platforms, and systems architecture. Each project reflects a balance of performance, type safety, and craftsmanship.",
      categoryLabel: "CATEGORY:",
      allCategories: "All",
      aiCategory: "AI & Systems",
      fullstackCategory: "Fullstack",
      caseStudyBtn: "Case Study",
    },
    aboutPage: {
      stamp: "BIO",
      tag: "BIOGRAPHY & BACKGROUND",
      title: "Story & Timeline",
      resumeBtn: "Download Official Resume (PDF)",
      contactBtn: "Get in Touch",
      bioLead: "Fullstack developer with a passion for creative 3D web systems and performant engineering.",
      bioP1: "Based in Addis Ababa, Ethiopia, I build web experiences where speed, accessibility, and cultural craftsmanship meet. My work spans from writing custom GLSL shaders and instanced Three.js geometries to architecting scalable Node.js/PostgreSQL backends.",
      bioP2: "Currently engineering 3D web applications at Ideeza, I focus on keeping heavy 3D interfaces running at 60fps on consumer devices without sacrificing visual richness.",
      bioP3: "I value type safety, explicit boundaries, and building software that feels handcrafted rather than generated from templates.",
      skillsTitle: "Technical Capabilities",
      skillsSubtitle: "Grouped by engineering domain and proficiency",
      timelineTitle: "Professional Experience",
      timelineSubtitle: "Career progression and key roles",
    },
    aboutTeaser: {
      stamp: "02",
      tag: "PHILOSOPHY & BACKGROUND",
      heading: "Code as craft, grounded in heritage.",
      description: "I am a fullstack and Three.js creative developer based in Addis Ababa, Ethiopia. Engineering interactive 3D systems at Ideeza, I treat code with intentionality: every line purposeful, every byte weighed, and built to endure.",
      readStory: "Read full story & timeline",
      p1Title: "Performance-First 3D",
      p1Desc: "Specialized in Three.js, React Three Fiber, and shader optimization. 60fps renders achieved through instancing, GPU tier detection, and zero bloat.",
      p1Tag: "01 / WEBGL MASTERY",
      p2Title: "Fullstack Rigor",
      p2Desc: "Next.js App Router, TypeScript, PostgreSQL, and Prisma. Relational schema modeling with idempotent workflows and fast Server Components.",
      p2Tag: "02 / PRODUCTION ARCHITECTURE",
      p3Title: "Ready to collaborate?",
      p3Desc: "Looking for a creative frontend or fullstack engineer who delivers on speed, precision, and aesthetics? Let's build together.",
      p3Btn: "Initiate Contact",
    },
    homeCta: {
      stamp: "MSG",
      tag: "START A CONVERSATION",
      heading: "Have a project in mind, or looking to hire?",
      description: "I am actively interviewing for fullstack, frontend, and creative engineering opportunities. Whether you need scalable Next.js architectures, fluid 3D experiences, or high-speed web apps, let's talk.",
      button: "Initiate Contact",
      telegram: "Telegram @lyzon1",
    },
    blogPage: {
      stamp: "DOC",
      tag: "WRITING & ARCHITECTURE",
      title: "Articles & Notes",
      description: "Technical reflections on WebGL performance, React architecture, algorithmic systems, and Ethiopian digital identity.",
      readArticle: "Read Article",
      backBtn: "Back to Articles",
    },
    contactPage: {
      stamp: "MSG",
      tag: "GET IN TOUCH",
      title: "Initiate Contact",
      description: "Interested in hiring me for a fullstack or frontend engineering role? Or building a high-speed 3D web experience together? Send a note or reach out through direct channels.",
      formTitle: "Send a Message",
      nameLabel: "Your Name",
      emailLabel: "Email Address",
      subjectLabel: "Subject / Topic",
      messageLabel: "Your Message",
      submitBtn: "Send Message",
      submittingBtn: "Transmitting...",
      successTitle: "Message Sent Successfully",
      successDesc: "Thank you for reaching out! I will review your message and reply promptly.",
      anotherBtn: "Send Another Message",
      channelsTitle: "Direct Channels",
      locationLabel: "Location",
      locationValue: "Addis Ababa, Ethiopia (UTC+3)",
      emailValue: "hbirhanu.dev@gmail.com",
    },
    footer: {
      stamp: "L",
      name: "Lantumo Birhanu",
      bio: "Fullstack developer and Three.js creative engineer crafting performance-first digital systems grounded in Ethiopian heritage.",
      indexTitle: "Index",
      channelsTitle: "Channels",
      quote: "Knowledge without craft is like a shadow without substance.",
      quoteSub: "Ancient Ethiopian Proverb",
      backToTop: "Back to Top",
      copyright: "Lantumo Birhanu. All rights reserved.",
      location: "Addis Ababa, ET",
    },
    notFound: {
      stamp: "404",
      error: "ERROR 404",
      title: "Page Not Found",
      description: "The manuscript page you are seeking has either moved, was transcribed under another reference, or does not exist.",
      homeBtn: "Return to Home",
      workBtn: "Browse Selected Work",
    },
    commandPalette: {
      placeholder: "Type a command, project, or destination...",
      home: "Go to Home",
      work: "Go to Selected Work",
      about: "Go to Story & Timeline",
      blogs: "Go to Articles & Notes",
      contact: "Go to Contact",
      switchTheme: "Switch Theme Mode",
      copyEmail: "Copy Email (hbirhanu.dev@gmail.com)",
      copied: "Copied to clipboard!",
      openGithub: "Open GitHub Profile (@lyzon1)",
      openTelegram: "Message on Telegram (@lyzon1)",
      downloadCv: "Download Resume / CV (PDF)",
      switchLocale: "ቋንቋ ወደ አማርኛ ቀይር (Switch to Amharic)",
      navigation: "Navigation",
      projects: "Projects",
      actions: "Actions",
      noResults: "No results found for",
      hintNav: "↑↓ Navigate",
      hintSelect: "↵ Select",
      hintClose: "ESC Close",
    },
  },
  am: {
    nav: {
      work: "ሥራዎች",
      about: "ስለ እኔ",
      blog: "ጽሑፎች",
      contact: "አድራሻ",
      brandSubtitle: "የሶፍትዌር መሃንዲስ",
      commandHint: "⌘K",
    },
    hero: {
      badge: "ለሥራ ዝግጁ ነኝ (Fullstack & Frontend)",
      name: "ላንቱሞ ብርሃኑ",
      role: "ፉልስታክ ሶፍትዌር እና Three.js 3D መሃንዲስ",
      bio: "ፈጣን እና ጥራት ያላቸውን ዘመናዊ የድር መተግበሪያዎች እና የ3D ቴክኖሎጂዎችን እገነባለሁ። የኢትዮጵያን ባህላዊ ማንነት ከዘመናዊ Next.js፣ React እና TypeScript ጋር በማጣመር።",
      viewWork: "የተመረጡ ሥራዎች",
      connect: "ያግኙኝ",
      downloadCv: "ሲቪ አውርድ",
      scroll: "ወደ ታች ይሸብልሉ",
      statusRole: "የIDEEZA 3D መሃንዲስ",
      location: "አዲስ አበባ፣ ኢትዮጵያ",
    },
    selectedWork: {
      stamp: "፩",
      tag: "የተመረጡ ሥራዎች",
      title: "ልዩ የቴክኖሎጂ ሥራዎች",
      viewArchive: "ሁሉንም ሥራዎች ይመልከቱ (04)",
      liveSite: "የቀጥታ ገጽ",
      sourceCode: "ምንጭ ኮድ",
      caseStudy: "ዝርዝር ጥናት ይመልከቱ →",
      exploreCaseStudy: "ሙሉውን ጥናት ይመልከቱ",
    },
    workPage: {
      stamp: "፩",
      tag: "የሥራዎች ማህደር",
      title: "የተመረጡ ሥራዎች",
      description: "በምርት ላይ የሚገኙ የዌብ አፕሊኬሽኖች፣ AI ሲስተሞች እና የሶፍትዌር አርክቴክቸር ስብስቦች። እያንዳንዱ ፕሮጀክት በፍጥነት፣ በደህንነት እና በጥራት የተገነባ ነው።",
      categoryLabel: "ምድብ:",
      allCategories: "ሁሉም",
      aiCategory: "አርቴፊሻል ኢንተለጀንስ",
      fullstackCategory: "ፉልስታክ",
      caseStudyBtn: "ሙሉ ጥናት",
    },
    aboutPage: {
      stamp: "ስለ",
      tag: "የግል ታሪክ እና ሙያ",
      title: "ታሪኬ እና የሥራ ጉዞዬ",
      resumeBtn: "ሲቪ አውርድ (PDF)",
      contactBtn: "መልዕክት ይላኩ",
      bioLead: "የፈጠራ 3D ዌብ ሲስተሞች እና የፉልስታክ ሶፍትዌር መሃንዲስ።",
      bioP1: "በአዲስ አበባ፣ ኢትዮጵያ የምኖር ሲሆን፤ ፈጣን፣ ጥራት ያለው እና የሀገር ባህልን ያካተተ ቴክኖሎጂ እገነባለሁ። ሥራዬ ከGLSL ሼደርስ እና Three.js እስከ ትላልቅ የNode.js እና PostgreSQL ዳታቤዝ አርክቴክቸር ድረስ ይዘልቃል።",
      bioP2: "በአሁኑ ወቅት በIdeeza ውስጥ የ3D ዌብ ሲስተሞችን እገነባለሁ፤ ዋና ትኩረቴም የ3D ገጾች በሁሉም ስልኮች እና ኮምፒውተሮች ላይ በ60fps ፍጥነት እንዲሰሩ ማድረግ ነው።",
      bioP3: "ጠንካራ የኮድ ጥራት፣ ግልጽነት እና በቅንጦት የተሰሩ እውነተኛ የቴክኖሎጂ ውጤቶችን አከብራለሁ።",
      skillsTitle: "የሙያ ክህሎቶች",
      skillsSubtitle: "በቴክኖሎጂ መስክ እና ደረጃ የተከፋፈሉ",
      timelineTitle: "የሥራ ልምድ",
      timelineSubtitle: "የስራ ታሪክ እና ኃላፊነቶች",
    },
    aboutTeaser: {
      stamp: "፪",
      tag: "ፍልስፍና እና ማንነት",
      heading: "ኮዲንግ እንደ ጥበብ፣ በባህል የዳበረ።",
      description: "በአዲስ አበባ የምኖር የፉልስታክ እና Three.js 3D መሃንዲስ ነኝ። በIdeeza ውስጥ የምሰራ ሲሆን፤ ኮድን ልክ እንደ ብራና ጽሑፍ በጥንቃቄ እና ለትውልድ በሚተርፍ መልኩ እቀርጻለሁ።",
      readStory: "ሙሉ ታሪኬን ያንብቡ",
      p1Title: "ፈጣን 3D ቴክኖሎጂ",
      p1Desc: "በThree.js፣ React Three Fiber እና በሼደር ማሻሻያ የበለጸገ። በሁሉም መሳሪያዎች ላይ በ60fps ፍጥነት የሚሰራ።",
      p1Tag: "፩ / የ3D ክህሎት",
      p2Title: "የተሟላ ፉልስታክ አርክቴክቸር",
      p2Desc: "Next.js App Router፣ TypeScript፣ PostgreSQL እና Prisma። ጥንቃቄ የተሞላበት ዳታቤዝ እና አስተማማኝ አሰራር።",
      p2Tag: "፪ / የሲስተም አርክቴክቸር",
      p3Title: "አብረን እንሥራ?",
      p3Desc: "ጥራት፣ ፍጥነት እና ውበት ያለው የሶፍትዌር መሃንዲስ ይፈልጋሉ? አብረን እንገንባ።",
      p3Btn: "ያግኙኝ",
    },
    homeCta: {
      stamp: "መልዕክት",
      tag: "ውይይት ይጀምሩ",
      heading: "ፕሮጀክት አለዎት? አብረን እንሥራ!",
      description: "ለፉልስታክ፣ ፍሮንትኤንድ እና ለፈጠራ 3D ኢንጂነሪንግ ሥራዎች ዝግጁ ነኝ። አዲስ ፕሮጀክት ለመገንባት ወይም ለቡድንዎ አስተማማኝ መሃንዲስ ከፈለጉ ያነጋግሩኝ።",
      button: "መልዕክት ይላኩ",
      telegram: "ቴሌግራም @lyzon1",
    },
    blogPage: {
      stamp: "ጽሑፍ",
      tag: "የቴክኖሎጂ ጽሑፎች",
      title: "ጽሑፎች እና ማስታወሻዎች",
      description: "ስለ WebGL ፍጥነት፣ React አርክቴክቸር፣ አልጎሪዝሞች እና የኢትዮጵያ ዲጂታል ማንነት የተጻፉ ትንታኔዎች።",
      readArticle: "ሙሉውን ያንብቡ",
      backBtn: "ወደ ጽሑፎች ተመለስ",
    },
    contactPage: {
      stamp: "አድራሻ",
      tag: "ያግኙኝ",
      title: "መልዕክት ይላኩ",
      description: "ለሶፍትዌር ኢንጂነሪንግ ስራ ልትቀጥሩኝ ትፈልጋላችሁ? ወይስ ፈጣን 3D ዌብሳይት አብረን እንገንባ? መልዕክት ይላኩ ወይም በቀጥታ አድራሻዬ ያግኙኝ።",
      formTitle: "መልዕክት መላኪያ",
      nameLabel: "ሙሉ ስም",
      emailLabel: "የኢሜይል አድራሻ",
      subjectLabel: "ርዕስ",
      messageLabel: "የመልዕክቱ ይዘት",
      submitBtn: "መልዕክት ላክ",
      submittingBtn: "በመላክ ላይ...",
      successTitle: "መልዕክትዎ በሚገባ ደርሷል",
      successDesc: "መልዕክትዎን ስላደረሱን እናመሰግናለን! በተቻለ ፍጥነት ምላሽ እሰጣለሁ።",
      anotherBtn: "ተጨማሪ መልዕክት ላክ",
      channelsTitle: "ቀጥታ አድራሻዎች",
      locationLabel: "አድራሻ",
      locationValue: "አዲስ አበባ፣ ኢትዮጵያ (UTC+3)",
      emailValue: "hbirhanu.dev@gmail.com",
    },
    footer: {
      stamp: "ላ",
      name: "ላንቱሞ ብርሃኑ",
      bio: "ፈጣን እና አስተማማኝ የሆኑ የቴክኖሎጂ ሲስተሞችን ከኢትዮጵያ ማንነት ጋር በማጣመር የሚገነባ የሶፍትዌር መሃንዲስ።",
      indexTitle: "ማውጫ",
      channelsTitle: "አድራሻዎች",
      quote: "«ዕውቀት የሌለው ሰው እንደ ጥላ ያለ ፍሬ ነው»",
      quoteSub: "የኢትዮጵያ ጥንታዊ አባባል",
      backToTop: "ወደ ላይ ተመለስ",
      copyright: "ላንቱሞ ብርሃኑ። መብቱ በሕግ የተጠበቀ ነው።",
      location: "አዲስ አበባ፣ ኢትዮጵያ",
    },
    notFound: {
      stamp: "፬፻፬",
      error: "ስህተት 404",
      title: "ገጹ አልተገኘም",
      description: "የፈለጉት የድረ-ገጽ ክፍል ተዛውሯል ወይም አልተገኘም።",
      homeBtn: "ወደ ዋና ገጽ ይመለሱ",
      workBtn: "ሥራዎችን ይመልከቱ",
    },
    commandPalette: {
      placeholder: "የት መሄድ ይፈልጋሉ? ይፈልጉ...",
      home: "ወደ ዋና ገጽ ሂድ",
      work: "ወደ ተመረጡ ሥራዎች ሂድ",
      about: "ወደ ታሪኬ እና ልምዴ ሂድ",
      blogs: "ወደ ቴክኖሎጂ ጽሑፎች ሂድ",
      contact: "ወደ አድራሻ ገጽ ሂድ",
      switchTheme: "የገጹን ገጽታ ቀይር (ብርሃን / ጨለማ)",
      copyEmail: "ኢሜይል ቅዳ (hbirhanu.dev@gmail.com)",
      copied: "ኢሜይሉ ተቀድቷል!",
      openGithub: "GitHub ክፈት (@lyzon1)",
      openTelegram: "በTelegram መልዕክት ላክ (@lyzon1)",
      downloadCv: "የሙያ ሲቪ አውርድ (PDF)",
      switchLocale: "Switch Language to English (ወደ እንግሊዝኛ)",
      navigation: "አቅጣጫዎች",
      projects: "ፕሮጀክቶች",
      actions: "ተግባራት",
      noResults: "ምንም ውጤት አልተገኘም ለ:",
      hintNav: "↑↓ ምረጥ",
      hintSelect: "↵ ግባ",
      hintClose: "ESC ዝጋ",
    },
  },
};
