import type { Localized, Project } from './content';

type EvidenceSource = {
  title: Localized;
  caption: Localized;
  sourceUrl: string;
  sourceLabel: Localized;
};

export type ImageEvidence = EvidenceSource & {
  kind: 'image';
  src: string;
  alt: Localized;
  width: number;
  height: number;
};

export type CodeEvidence = EvidenceSource & {
  kind: 'code';
  language: 'python';
  code: string;
  attributionUrl: string;
};

export type ProjectEvidence = ImageEvidence | CodeEvidence;

export const projectEvidence: Partial<Record<Project['slug'], ProjectEvidence[]>> = {
  'wadi-jeddah-jobs': [
    {
      kind: 'image',
      title: { en: 'The live opportunities board', ar: 'واجهة الفرص المنشورة' },
      caption: {
        en: 'The actual public Wadi Jeddah Jobs board, showing its Arabic listings and opportunity filters. My contribution included developing the listings front end.',
        ar: 'واجهة وادي جدة للوظائف الفعلية والمتاحة للجمهور، وتعرض الفرص بالعربية وخيارات تصفيتها. شملت مساهمتي تطوير واجهة استعراض الفرص.',
      },
      src: '/projects/jobs-board-desktop.png',
      alt: {
        en: 'Actual Arabic Wadi Jeddah Jobs board with opportunity filters and five public job and internship cards',
        ar: 'واجهة منصة وادي جدة للوظائف بالعربية مع خيارات تصفية الفرص وخمس بطاقات وظائف وتدريب منشورة',
      },
      width: 1440,
      height: 1100,
      sourceUrl: 'https://jobs.wjihub.com/board',
      sourceLabel: { en: 'Explore the live opportunities', ar: 'استكشاف الفرص المنشورة' },
    },
    {
      kind: 'image',
      title: { en: 'From listing to opportunity details', ar: 'من استعراض الفرص إلى تفاصيلها' },
      caption: {
        en: 'An actual public PARKINZI internship detail page, with its description, opportunity information and application entry point. My contribution included developing the opportunity detail front end.',
        ar: 'صفحة فعلية لتفاصيل فرصة تدريب منشورة لدى PARKINZI، تضم وصف الفرصة ومعلوماتها وزر التقديم. شملت مساهمتي تطوير واجهات تفاصيل الفرص.',
      },
      src: '/projects/jobs-detail-desktop.png',
      alt: {
        en: 'Actual Wadi Jeddah Jobs detail page for PARKINZI’s data analysis and growth strategies internship',
        ar: 'صفحة تفاصيل فرصة تدريب تحليل البيانات واستراتيجيات النمو لدى PARKINZI على منصة وادي جدة للوظائف',
      },
      width: 1440,
      height: 1100,
      sourceUrl: 'https://jobs.wjihub.com/positions/635db442-a3c0-41f1-8b75-87d056bf1476',
      sourceLabel: { en: 'View this public opportunity', ar: 'عرض هذه الفرصة المنشورة' },
    },
  ],
  dclean: [
    {
      kind: 'image',
      title: { en: 'The actual application', ar: 'التطبيق الفعلي' },
      caption: {
        en: 'DClean’s Streamlit dashboard with the fictional public demo dataset. The interface belongs to the team project; my contribution focused on validation and rejected records.',
        ar: 'واجهة DClean المبنية باستخدام Streamlit، مع بيانات العرض التجريبي الوهمية المنشورة. الواجهة جزء من المشروع الجماعي، وتركزت مساهمتي على التحقق والسجلات المرفوضة.',
      },
      src: '/projects/dclean-dashboard.png',
      alt: {
        en: 'Actual DClean dashboard showing the demo CSV upload, data preview counts and schema strategy options',
        ar: 'واجهة DClean الفعلية تعرض رفع ملف CSV تجريبي وعدد الصفوف والأعمدة وخيارات استراتيجية مخطط البيانات',
      },
      width: 1600,
      height: 725,
      sourceUrl: 'https://github.com/razan-adil/DClean#application-preview',
      sourceLabel: { en: 'View the public project preview', ar: 'عرض صور المشروع المنشورة' },
    },
    {
      kind: 'image',
      title: { en: 'A rejected record, explained', ar: 'سجل مرفوض مع توضيح السبب' },
      caption: {
        en: 'The public demo’s quarantine worksheet records the source row and rejection reasons for an incomplete fictional record. This shows the validation and rejection handling I contributed.',
        ar: 'يسجل جدول العزل في العرض التجريبي رقم صف المصدر وأسباب رفض سجل وهمي غير مكتمل. يوضح ذلك مسار التحقق ومعالجة السجلات المرفوضة الذي شاركت في تطويره.',
      },
      src: '/projects/dclean-validation.png',
      alt: {
        en: 'DClean quarantine worksheet showing a fictional record rejected for a missing required name and identifier',
        ar: 'جدول السجلات المعزولة في DClean، ويعرض رفض سجل وهمي لغياب الاسم والمعرّف المطلوبين',
      },
      width: 1599,
      height: 849,
      sourceUrl: 'https://github.com/razan-adil/DClean#rejected-records-and-validation-reasons',
      sourceLabel: { en: 'View the validation evidence', ar: 'عرض مثال التحقق المنشور' },
    },
  ],
  'road-accident-severity': [
    {
      kind: 'code',
      title: { en: 'My preprocessing in the source', ar: 'المعالجة المسبقة في الشفرة الأصلية' },
      caption: {
        en: 'An exact excerpt from the university team project’s preprocessing phase, credited to Razan Adil. It scales features and creates a stratified 70/30 training and test split. The same phase also handles missing values and categorical encoding.',
        ar: 'مقتطف مطابق للشفرة المنشورة من مرحلة المعالجة المسبقة في المشروع الجامعي الجماعي، والمنسوبة إلى رزان عادل. يطبق تحجيم الخصائص وتقسيمًا طبقيًا بنسبة ٧٠٪ للتدريب و٣٠٪ للاختبار. وتشمل المرحلة أيضًا معالجة القيم المفقودة وترميز المتغيرات الفئوية.',
      },
      language: 'python',
      code: `# Split the data into features (X) and target (y)
X = df.drop('Accident_severity', axis=1)  # Drop the target column
y = df['Accident_severity']  # Target column (Accident severity)

from sklearn.preprocessing import StandardScaler

# Create a scaler
scaler = StandardScaler()

# Apply scaling to the features
X_scaled = scaler.fit_transform(X)
print("Scaled features:", X_scaled[:3])

from sklearn.model_selection import train_test_split

# Split the data into training and testing sets (70% train, 30% test)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.30, random_state=42, stratify=y)
print("Training set size:", X_train.shape)
print("Testing set size:", X_test.shape)`,
      sourceUrl: 'https://github.com/razan-adil/road-accident-severity-ml/blob/12f7c675604e1561ef9abcd083059d2db8c5ae7d/aml_project.py#L84-L102',
      sourceLabel: { en: 'Read the original source', ar: 'قراءة الشفرة الأصلية' },
      attributionUrl: 'https://github.com/razan-adil/road-accident-severity-ml/blob/12f7c675604e1561ef9abcd083059d2db8c5ae7d/aml_project.py#L58-L64',
    },
  ],
};
