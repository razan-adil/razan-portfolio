export type Locale = 'en' | 'ar';

export type Category = 'All' | 'UI/UX' | 'Development' | 'AI' | 'Data';

export type Localized = { en: string; ar: string };

export type Project = {
  slug: string;
  title: Localized;
  shortTitle: string;
  category: Category[];
  discipline: Localized;
  summary: Localized;
  context: Localized;
  role: Localized;
  contributions: Localized[];
  tools: string[];
  collaboration: Localized;
  status: Localized;
  accent: string;
  visual: 'jobs' | 'wajeeh' | 'leadership' | 'dashboard' | 'dclean' | 'road';
  image?: string;
  imageAlt?: Localized;
  mediaNote: Localized;
  links: { label: Localized; url: string }[];
};

export const profile = {
  name: { en: 'Razan Adil Alghamdi', ar: 'رزان عادل الغامدي' },
  shortName: { en: 'Razan Alghamdi', ar: 'رزان الغامدي' },
  location: { en: 'Jeddah, Saudi Arabia', ar: 'جدة، المملكة العربية السعودية' },
  about: {
    en: 'I’m a final-year Data Science student at the University of Jeddah, working part-time in the Technology Department at Wadi Jeddah Innovation Center. My work brings together data analysis, workflow automation and AI agents with interface design and front-end development.',
    ar: 'أنا طالبة علوم بيانات في سنتي الأخيرة بجامعة جدة، وأعمل بدوام جزئي في قسم التقنية بمركز وادي جدة للابتكار. يجمع عملي بين تحليل البيانات، وأتمتة إجراءات العمل، ووكلاء الذكاء الاصطناعي، إلى جانب تصميم الواجهات وتطويرها.',
  },
  email: 'razanadil7890@gmail.com',
  phone: '+966502882129',
  github: 'https://github.com/razan-adil',
  linkedin: 'https://www.linkedin.com/in/razan-adil-79639b298',
  whatsapp: 'https://wa.me/966502882129',
  x: 'https://x.com/razanalghamdiii',
};

export const filters: Category[] = ['All', 'UI/UX', 'Development', 'AI', 'Data'];

export const projects: Project[] = [
  {
    slug: 'wadi-jeddah-jobs',
    title: { en: 'Wadi Jeddah Jobs Platform', ar: 'منصة وادي جدة للوظائف' },
    shortTitle: 'Wadi Jeddah Jobs',
    category: ['Development'],
    discipline: { en: 'Front-end & database', ar: 'تطوير الواجهات وقاعدة البيانات' },
    summary: {
      en: 'A platform for discovering opportunities and managing applications, with dedicated user and admin dashboards.',
      ar: 'منصة لاستعراض الفرص وتفاصيلها، مع لوحات تحكم مخصصة للمستخدمين والإدارة.',
    },
    context: {
      en: 'For Wadi Jeddah’s jobs platform, I developed the front-end experiences for browsing opportunities, viewing their details and using the user and admin dashboards. My contribution also included the backend database.',
      ar: 'طوّرت واجهات منصة وادي جدة للوظائف، بما يشمل استعراض الفرص وصفحات تفاصيلها ولوحات تحكم المستخدم والإدارة، إلى جانب العمل على قاعدة البيانات في الخلفية.',
    },
    role: { en: 'Front-end & database development', ar: 'تطوير الواجهات وقاعدة البيانات' },
    contributions: [
      { en: 'Developed the opportunities listing interface.', ar: 'طوّرت واجهة استعراض الفرص.' },
      { en: 'Built the opportunity detail pages.', ar: 'بنيت صفحات تفاصيل الفرص.' },
      { en: 'Developed the user and admin dashboards.', ar: 'طوّرت لوحات تحكم المستخدم والإدارة.' },
      { en: 'Worked on the backend database supporting the platform.', ar: 'عملت على قاعدة البيانات الداعمة للمنصة.' },
    ],
    tools: [],
    collaboration: { en: 'My contribution focused on front-end development and the database.', ar: 'تركّزت مساهمتي على تطوير الواجهات وقاعدة البيانات.' },
    status: { en: 'Live platform', ar: 'منصة متاحة' },
    accent: '#bbbdd6',
    visual: 'jobs',
    mediaNote: { en: 'Editorial project cover. Explore the actual platform through the link.', ar: 'غلاف بصري للمشروع. يمكن استكشاف المنصة الفعلية عبر الرابط.' },
    links: [{ label: { en: 'Visit the platform', ar: 'زيارة المنصة' }, url: 'https://jobs.wjihub.com/board' }],
  },
  {
    slug: 'wajeeh',
    title: { en: 'Wajeeh AI Agent', ar: 'وجيه — وكيل ذكاء اصطناعي' },
    shortTitle: 'Wajeeh',
    category: ['AI'],
    discipline: { en: 'Arabic AI agent', ar: 'وكيل ذكاء اصطناعي عربي' },
    summary: {
      en: 'An Arabic-speaking AI agent built around Wadi Jeddah’s services, with a defined personality and a prepared reference database.',
      ar: 'وكيل ذكاء اصطناعي يتحدث العربية للتعريف بخدمات وادي جدة، بشخصية محددة وقاعدة معلومات مرجعية.',
    },
    context: {
      en: 'I built Wajeeh to communicate information about Wadi Jeddah’s services in Arabic. The work covered preparing its reference database and shaping how the agent understands its role and responds.',
      ar: 'بنيت «وجيه» لتقديم معلومات عن خدمات وادي جدة باللغة العربية. شمل العمل إعداد قاعدة المعلومات المرجعية وتحديد دور الوكيل وأسلوب تواصله واستجاباته.',
    },
    role: { en: 'Agent setup, knowledge & conversation design', ar: 'بناء الوكيل وإعداد معرفته وأسلوب حواره' },
    contributions: [
      { en: 'Prepared the reference database for Wadi Jeddah’s services.', ar: 'جهّزت قاعدة المعلومات المرجعية لخدمات وادي جدة.' },
      { en: 'Wrote the instructions defining the agent’s role and responses.', ar: 'كتبت التعليمات التي تحدد دور الوكيل وطريقة استجابته.' },
      { en: 'Defined its personality and Arabic tone of voice.', ar: 'حددت شخصية الوكيل ونبرة حديثه باللغة العربية.' },
      { en: 'Configured the model settings for the agent.', ar: 'ضبطت إعدادات النموذج المستخدم في الوكيل.' },
    ],
    tools: [],
    collaboration: { en: 'A team initiative for Wadi Jeddah. My scope covered this Arabic agent’s setup, knowledge and conversation design.', ar: 'مبادرة جماعية لوادي جدة. شمل دوري بناء هذا الوكيل العربي ومعرفته وتصميم حواره.' },
    status: { en: 'AI agent', ar: 'وكيل ذكاء اصطناعي' },
    accent: '#bad1b5',
    visual: 'wajeeh',
    mediaNote: { en: 'Editorial cover, not a screenshot of the agent.', ar: 'غلاف بصري للمشروع، وليس صورة من واجهة الوكيل.' },
    links: [],
  },
  {
    slug: 'founders-leadership',
    title: { en: 'Founders Leadership Assessment', ar: 'تقييم النمط القيادي للمؤسسين' },
    shortTitle: 'Founders Leadership',
    category: ['UI/UX'],
    discipline: { en: 'Arabic UI/UX redesign', ar: 'إعادة تصميم تجربة وواجهة عربية' },
    summary: {
      en: 'A redesigned Arabic assessment journey that gives personalized results a clearer place in the experience.',
      ar: 'إعادة تصميم رحلة تقييم عربية، مع إبراز التقرير الشخصي في تجربة النتائج.',
    },
    context: {
      en: 'I redesigned the start, question and result screens of a founders’ leadership assessment. The results experience puts the personalized report first, alongside the assessment’s six leadership archetypes.',
      ar: 'أعدت تصميم شاشات البداية والأسئلة والنتائج في تقييم الأنماط القيادية للمؤسسين. أعطيت التقرير الشخصي أولوية في عرض النتائج، مع وجود الأنماط القيادية الستة ضمن التقييم.',
    },
    role: { en: 'UI/UX redesign', ar: 'إعادة تصميم الواجهة وتجربة المستخدم' },
    contributions: [
      { en: 'Redesigned the Arabic start screen and entry into the assessment.', ar: 'أعدت تصميم شاشة البداية العربية والدخول إلى التقييم.' },
      { en: 'Redesigned the question screens and their visual hierarchy.', ar: 'أعدت تصميم شاشات الأسئلة وتسلسل عناصرها البصري.' },
      { en: 'Added animated progress to the assessment journey.', ar: 'أضفت مؤشر تقدم متحركًا خلال رحلة التقييم.' },
      { en: 'Reworked the results screen to prioritize the personalized report.', ar: 'أعدت تنظيم شاشة النتائج لإبراز التقرير الشخصي أولًا.' },
    ],
    tools: [],
    collaboration: { en: 'My contribution is the Arabic UI/UX redesign.', ar: 'مساهمتي هي إعادة تصميم الواجهة وتجربة المستخدم بالعربية.' },
    status: { en: 'UI/UX redesign', ar: 'إعادة تصميم' },
    accent: '#d3a17e',
    visual: 'leadership',
    mediaNote: {
      en: 'Editorial project cover. The linked website is the original product, not my redesign.',
      ar: 'غلاف بصري للمشروع. الرابط يقود إلى المنتج الأصلي، وليس إلى النسخة التي أعدت تصميمها.',
    },
    links: [{ label: { en: 'View the original product', ar: 'عرض المنتج الأصلي' }, url: 'https://leadership.wjihub.com/' }],
  },
  {
    slug: 'wadi-jeddah-dashboard',
    title: { en: 'Wadi Jeddah Dashboard', ar: 'لوحة بيانات وادي جدة' },
    shortTitle: 'Wadi Jeddah Dashboard',
    category: ['Data'],
    discipline: { en: 'Data visualization & workflow automation', ar: 'تصوّر البيانات وأتمتة إجراءات العمل' },
    summary: {
      en: 'A Power BI dashboard connected to the team’s shared master database, with registration routing workflows.',
      ar: 'لوحة Power BI متصلة بقاعدة البيانات الرئيسية المشتركة للفريق، مع مسارات آلية لتوجيه التسجيلات.',
    },
    context: {
      en: 'I built a Power BI dashboard around the team’s shared master database. I also built and tested workflows that route registrations through the relevant paths.',
      ar: 'بنيت لوحة Power BI اعتمادًا على قاعدة البيانات الرئيسية المشتركة للفريق. وعملت أيضًا على بناء واختبار إجراءات توجّه التسجيلات إلى المسارات المناسبة.',
    },
    role: { en: 'Dashboard development & workflow automation', ar: 'بناء لوحة البيانات وأتمتة الإجراءات' },
    contributions: [
      { en: 'Built the dashboard in Power BI.', ar: 'بنيت لوحة البيانات باستخدام Power BI.' },
      { en: 'Connected it to the team’s shared master database.', ar: 'ربطت اللوحة بقاعدة البيانات الرئيسية المشتركة للفريق.' },
      { en: 'Built registration routing workflows.', ar: 'أنشأت إجراءات آلية لتوجيه التسجيلات.' },
      { en: 'Tested the registration routing paths.', ar: 'اختبرت مسارات توجيه التسجيلات.' },
    ],
    tools: ['Power BI'],
    collaboration: { en: 'Built around a shared team database.', ar: 'عمل يعتمد على قاعدة بيانات مشتركة للفريق.' },
    status: { en: 'Dashboard & workflows', ar: 'لوحة بيانات وإجراءات آلية' },
    accent: '#a9bec4',
    visual: 'dashboard',
    mediaNote: { en: 'Editorial project cover. Internal dashboard screenshots are not displayed.', ar: 'غلاف بصري للمشروع. لا تُعرض صور من لوحة البيانات الداخلية.' },
    links: [],
  },
  {
    slug: 'dclean',
    title: { en: 'DClean', ar: 'DClean — تنظيف البيانات' },
    shortTitle: 'DClean',
    category: ['Data'],
    discipline: { en: 'Data quality & validation', ar: 'جودة البيانات والتحقق منها' },
    summary: {
      en: 'A team data-cleaning project. My contribution focused on validation rules and traceable rejected records.',
      ar: 'مشروع جماعي لتنظيف البيانات، ركزت فيه على قواعد التحقق وتتبع السجلات المرفوضة.',
    },
    context: {
      en: 'In the DClean team project, I worked on validation rules for missing and invalid values. Rejected records are isolated with a logged reason, making the outcome of each check traceable.',
      ar: 'عملت ضمن فريق DClean على قواعد التحقق من القيم المفقودة وغير الصالحة. تُعزل السجلات المرفوضة مع تسجيل سبب الرفض، لتسهيل تتبع نتيجة التحقق.',
    },
    role: { en: 'Validation rules & rejection handling', ar: 'قواعد التحقق ومعالجة السجلات المرفوضة' },
    contributions: [
      { en: 'Developed rules to validate data values.', ar: 'طوّرت قواعد للتحقق من صحة قيم البيانات.' },
      { en: 'Handled missing and invalid values in the validation flow.', ar: 'عالجت القيم المفقودة وغير الصالحة ضمن مسار التحقق.' },
      { en: 'Isolated rejected records for review.', ar: 'عزلت السجلات المرفوضة لمراجعتها.' },
      { en: 'Logged the reason for each rejection.', ar: 'سجلت سبب رفض كل سجل.' },
    ],
    tools: ['Python', 'Streamlit', 'pandas', 'YAML', 'SQLite'],
    collaboration: { en: 'Team project; my role focused on validation and rejection handling.', ar: 'مشروع جماعي؛ ركز دوري على التحقق ومعالجة السجلات المرفوضة.' },
    status: { en: 'Team project', ar: 'مشروع جماعي' },
    accent: '#b7c6a9',
    visual: 'dclean',
    image: '/projects/dclean-dashboard.png',
    imageAlt: { en: 'Actual DClean dashboard using fictional demonstration data', ar: 'واجهة DClean الفعلية باستخدام بيانات العرض التجريبي' },
    mediaNote: { en: 'Actual DClean project interface.', ar: 'واجهة فعلية من مشروع DClean.' },
    links: [{ label: { en: 'View on GitHub', ar: 'عرض المشروع على GitHub' }, url: 'https://github.com/razan-adil/DClean' }],
  },
  {
    slug: 'road-accident-severity',
    title: { en: 'Road Accident Severity Classification', ar: 'تصنيف شدة الحوادث المرورية' },
    shortTitle: 'Road Accident Severity',
    category: ['Data', 'AI'],
    discipline: { en: 'Machine learning · data preprocessing', ar: 'تعلّم الآلة · المعالجة المسبقة للبيانات' },
    summary: {
      en: 'A university team project on accident severity classification, with my work focused on preparing the data for modeling.',
      ar: 'مشروع جامعي جماعي لتصنيف شدة الحوادث، ركزت فيه على تجهيز البيانات للنمذجة.',
    },
    context: {
      en: 'For this university machine-learning project, I handled the preprocessing stage: missing values, encoding, scaling and a stratified train/test split.',
      ar: 'توليت مرحلة المعالجة المسبقة للبيانات في هذا المشروع الجامعي لتعلّم الآلة، بما يشمل القيم المفقودة والترميز والتحجيم وتقسيم بيانات التدريب والاختبار بأسلوب طبقي.',
    },
    role: { en: 'Data preprocessing', ar: 'المعالجة المسبقة للبيانات' },
    contributions: [
      { en: 'Handled missing values before modeling.', ar: 'عالجت القيم المفقودة قبل النمذجة.' },
      { en: 'Encoded categorical variables.', ar: 'رمّزت المتغيرات الفئوية.' },
      { en: 'Scaled the data as part of preprocessing.', ar: 'طبّقت تحجيم البيانات ضمن المعالجة المسبقة.' },
      { en: 'Prepared a stratified split for training and test data.', ar: 'أعددت تقسيمًا طبقيًا لبيانات التدريب والاختبار.' },
    ],
    tools: ['Python', 'pandas', 'scikit-learn'],
    collaboration: { en: 'University team project; my contribution was data preprocessing.', ar: 'مشروع جامعي جماعي؛ كانت مساهمتي المعالجة المسبقة للبيانات.' },
    status: { en: 'University team project', ar: 'مشروع جامعي جماعي' },
    accent: '#b1b5cf',
    visual: 'road',
    mediaNote: { en: 'Editorial project cover. The public source repository is linked below.', ar: 'غلاف بصري للمشروع. مستودع المشروع العام متاح عبر الرابط.' },
    links: [{ label: { en: 'View on GitHub', ar: 'عرض المشروع على GitHub' }, url: 'https://github.com/razan-adil/road-accident-severity-ml' }],
  },
];

export const beyond: { title: Localized; type: Localized; description: Localized }[] = [
  {
    title: { en: 'EcoMatels', ar: 'EcoMatels' },
    type: { en: 'Team leadership · Future Minerals Leaders 2025', ar: 'قيادة فريق · قادة مستقبل المعادن 2025' },
    description: { en: 'Led the EcoMatels team in Future Minerals Leaders 2025.', ar: 'قدت فريق EcoMatels ضمن قادة مستقبل المعادن 2025.' },
  },
  {
    title: { en: 'Al-Balad', ar: 'البلد' },
    type: { en: 'University team project', ar: 'مشروع جامعي جماعي' },
    description: {
      en: 'Contributed to collecting and classifying images of doors and decorative details in Al-Balad.',
      ar: 'شاركت في جمع وتصنيف صور الأبواب والتفاصيل الزخرفية في البلد.',
    },
  },
  {
    title: { en: 'Try the Contract Before You Sign', ar: 'جرّب العقد قبل توقّعه' },
    type: { en: 'Hackathon proposal · with Reeman Mohammad', ar: 'مقترح هاكاثون · مع ريمان محمد' },
    description: {
      en: 'A proposal exploring how a contract’s notice period affects renewal and cost, developed with Reeman Mohammad.',
      ar: 'مقترح طوّرته مع ريمان محمد لاستكشاف أثر مدة الإشعار في العقد على التجديد والتكلفة.',
    },
  },
];
