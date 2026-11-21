import {
  ColorSchemeId,
  DesignStyleId,
  DifficultyLevel,
  FunctionalRequirementId,
  GameMechanicId,
  GradeLevel,
  InteractiveTypeId,
  PromptFormState,
  SubjectId,
} from '../types/promptConfig';

export const GRADES: { value: GradeLevel; label: string; cycle: string }[] = [
  { value: 1, label: '1 клас', cycle: 'Початкова школа · 6–7 років' },
  { value: 2, label: '2 клас', cycle: 'Початкова школа · 7–8 років' },
  { value: 3, label: '3 клас', cycle: 'Початкова школа · 8–9 років' },
  { value: 4, label: '4 клас', cycle: 'Початкова школа · 9–10 років' },
  { value: 5, label: '5 клас', cycle: 'НУШ (адаптаційний цикл) · 10–11 років' },
  { value: 6, label: '6 клас', cycle: 'НУШ (адаптаційний цикл) · 11–12 років' },
  { value: 7, label: '7 клас', cycle: 'Базова середня школа · 12–13 років' },
  { value: 8, label: '8 клас', cycle: 'Базова середня школа · 13–14 років' },
  { value: 9, label: '9 клас', cycle: 'Базова середня школа · 14–15 років' },
  { value: 10, label: '10 клас', cycle: 'Профільна школа · 15–16 років' },
  { value: 11, label: '11 клас', cycle: 'Профільна школа · 16–17 років' },
];

export const SUBJECTS: { id: SubjectId; label: string }[] = [
  { id: 'informatics', label: 'Інформатика' },
  { id: 'math', label: 'Математика' },
  { id: 'ukrainian', label: 'Українська мова' },
  { id: 'english', label: 'Англійська мова' },
  { id: 'history', label: 'Історія' },
  { id: 'science', label: 'Природничі науки' },
  { id: 'other', label: 'Інше' },
];

export const INTERACTIVE_TYPES: {
  id: InteractiveTypeId;
  label: string;
  hint: string;
}[] = [
  {
    id: 'trainer',
    label: 'Навчальний тренажер',
    hint: 'Покрокове відпрацювання навичок, підказки та робота над помилками',
  },
  {
    id: 'webquest',
    label: 'Вебквест',
    hint: 'Сюжетні місії, переходи між етапами та фінальна винагорода',
  },
  {
    id: 'quiz',
    label: 'Вікторина',
    hint: 'Динамічні раунди запитань із миттєвим фідбеком і серіями',
  },
  {
    id: 'detective',
    label: 'Детективна гра',
    hint: 'Розслідування справи, збір доказів та спростування хибних версій',
  },
  {
    id: 'drag_and_drop',
    label: 'Drag-and-Drop симуляція',
    hint: 'Перетягування об’єктів у цільові зони з перевіркою правил',
  },
  {
    id: 'who_am_i',
    label: 'Гра «Хто я?»',
    hint: 'Відгадування поняття чи персони через покрокові підказки',
  },
  {
    id: 'true_false',
    label: '«Правда / Хиба»',
    hint: 'Перевірка тверджень із поясненням та спростуванням міфів',
  },
  {
    id: 'interactive_test',
    label: 'Інтерактивний тест',
    hint: 'Комбінована перевірка знань із навігацією та шкалою оцінювання',
  },
  {
    id: 'escape_room',
    label: 'Escape Room',
    hint: 'Кімната з кодовими замками, де ключі дають навчальні задачі',
  },
  {
    id: 'simulation',
    label: 'Навчальна симуляція',
    hint: 'Модель процесу з регулюванням параметрів і спостереженням змін',
  },
  {
    id: 'matching',
    label: 'Гра на відповідність',
    hint: 'Поєднання пар термін–визначення, формула–приклад або подія–дата',
  },
  {
    id: 'sequencing',
    label: 'Складання послідовності',
    hint: 'Відновлення правильного алгоритму, хронології або етапів процесу',
  },
  {
    id: 'lab',
    label: 'Інтерактивна лабораторія',
    hint: 'Віртуальні досліди, інструменти, журнал спостережень і висновки',
  },
  {
    id: 'fillword',
    label: 'Філворд',
    hint: 'Пошук зашифрованих термінів у літерній сітці з підказками та визначеннями',
  },
];

export const GAME_MECHANICS: {
  id: GameMechanicId;
  label: string;
  summary: string;
}[] = [
  { id: 'multiple_choice', label: 'Вибір відповіді', summary: 'Одиночний або множинний вибір серед варіантів' },
  { id: 'drag_objects', label: 'Перетягування об’єктів', summary: 'Drag-and-Drop та клік-переміщення для мобільних' },
  { id: 'text_input', label: 'Введення тексту', summary: 'Власна коротка відповідь, слово, число або код' },
  { id: 'puzzle_assembly', label: 'Складання пазлів', summary: 'Збирання цілісної схеми, фрагментів або коду з частин' },
  { id: 'sorting', label: 'Сортування', summary: 'Розподіл об’єктів за категоріями чи кошиками' },
  { id: 'matching_pairs', label: 'Встановлення відповідностей', summary: 'З’єднання логічних пар між лівою та правою панелями' },
  { id: 'level_unlock', label: 'Відкриття рівнів', summary: 'Поступове розблокування наступних локацій або етапів' },
  { id: 'rewards_system', label: 'Система нагород', summary: 'Медалі, бейджі досягнень, звання або віртуальні ключі' },
  { id: 'team_play', label: 'Командна гра', summary: 'Режим змагання двох або кількох команд на одному екрані' },
  { id: 'timer', label: 'Таймер', summary: 'Облік часу на раунд або на всю місію з можливістю паузи' },
  { id: 'score_counter', label: 'Підрахунок балів', summary: 'Нарахування очок, комбо-множники та фінальний підсумок' },
];

export const DIFFICULTY_LEVELS: {
  id: DifficultyLevel;
  label: string;
  description: string;
}[] = [
  {
    id: 'beginner',
    label: 'Початковий рівень',
    description: 'Базове впізнавання понять, чіткі візуальні опори, м’які підказки',
  },
  {
    id: 'intermediate',
    label: 'Середній рівень',
    description: 'Застосування знань у типових навчальних ситуаціях, аналіз та порівняння',
  },
  {
    id: 'advanced',
    label: 'Високий рівень',
    description: 'Нестандартні проблемні задачі, синтез кількох тем та аргументація',
  },
];

export const DESIGN_STYLES: {
  id: DesignStyleId;
  label: string;
  mood: string;
}[] = [
  { id: 'stem', label: 'STEM', mood: 'Інженерна точність, схеми, лабораторні панелі' },
  { id: 'space', label: 'Космічна пригода', mood: 'Бортовий комп’ютер, орбітальні місії, навігація' },
  { id: 'detective_agency', label: 'Детективна агенція', mood: 'Досьє, архів справ, картки доказів, лупа' },
  { id: 'minecraft', label: 'Minecraft', mood: 'Піксельна геометрія, блоки, верстак та інвентар' },
  { id: 'brawl_stars', label: 'Brawl Stars', mood: 'Динамічні арени, картки героїв, трофеї й ранги' },
  { id: 'fantasy', label: 'Фантастичний світ', mood: 'Мапа пригод, артефакти, магічні кристали' },
  { id: 'ukrainian_ethno', label: 'Український етностиль', mood: 'Сучасна стилізація орнаментів, культурні мотиви' },
  { id: 'minimalist', label: 'Мінімалістичний', mood: 'Чистий простір, максимум фокусу на змісті завдань' },
  { id: 'cartoon', label: 'Мультяшний', mood: 'Доброзичливі ілюстровані форми, м’яка геометрія' },
  { id: 'custom', label: 'Власний стиль', mood: 'Унікальна концепція за вашим текстовим описом' },
];

export const COLOR_SCHEMES: {
  id: ColorSchemeId;
  label: string;
  description: string;
  swatches: [string, string, string, string];
}[] = [
  {
    id: 'edu_blue_teal',
    label: 'Освітня синьо-бірюзова',
    description: 'Світлий фон, насичений синій та бірюзовий акценти',
    swatches: ['#F8FAFC', '#2563EB', '#0D9488', '#7C3AED'],
  },
  {
    id: 'cosmic_violet',
    label: 'Глибока космічна фіолетова',
    description: 'Темно-синій космос, індиго, фіолетовий та бірюзовий неон',
    swatches: ['#0F172A', '#6366F1', '#8B5CF6', '#06B6D4'],
  },
  {
    id: 'emerald_nature',
    label: 'Природна смарагдова',
    description: 'Спокійна м’ятно-світла палітра зі смарагдовим і небесним',
    swatches: ['#F0FDF4', '#059669', '#0284C7', '#D97706'],
  },
  {
    id: 'warm_ethno',
    label: 'Українська сонячно-лазурова',
    description: 'Тепле полотно, кобальтовий синій, сонячний золотий і теракот',
    swatches: ['#FFFBEB', '#1D4ED8', '#EAB308', '#DC2626'],
  },
  {
    id: 'graphite_contrast',
    label: 'Контрастна інженерна',
    description: 'Чіткий графіт, біла сітка, електричний блакитний і бурштин',
    swatches: ['#FFFFFF', '#1E293B', '#0284C7', '#F59E0B'],
  },
  {
    id: 'pastel_primary',
    label: 'Дружня пастельна',
    description: 'М’які теплі відтінки для молодших класів без перевтоми очей',
    swatches: ['#FDF8F6', '#3B82F6', '#14B8A6', '#A855F7'],
  },
];

export const FUNCTIONAL_REQUIREMENTS: {
  id: FunctionalRequirementId;
  label: string;
  detail: string;
}[] = [
  { id: 'auto_check', label: 'Автоматична перевірка', detail: 'Миттєва або поетапна валідація відповідей учня' },
  { id: 'hints_after_errors', label: 'Підказки після помилок', detail: 'Навчальний супровід при хибній відповіді' },
  { id: 'retry_attempts', label: 'Повторні спроби', detail: 'Можливість виправити помилку або пройти заново' },
  { id: 'points_scoring', label: 'Нарахування балів', detail: 'Прозора шкала оцінювання результатів' },
  { id: 'progress_bar', label: 'Відображення прогресу', detail: 'Шкала проходження та лічильник виконаних кроків' },
  { id: 'summary_stats', label: 'Підсумкова статистика', detail: 'Фінальний екран із точністю, балами та часом' },
  { id: 'revision_recommendations', label: 'Рекомендації для повторення', detail: 'Персональні поради щодо тем із помилками' },
  { id: 'sound_effects', label: 'Звукові ефекти', detail: 'М’які звуки успіху й помилки з кнопкою вимкнення' },
  { id: 'responsive_design', label: 'Адаптивний дизайн', detail: 'Коректна робота на ПК, планшетах і смартфонах' },
  { id: 'save_results', label: 'Збереження результатів', detail: 'Фіксація прогресу в браузері (localStorage)' },
];

export const INITIAL_FORM_STATE: PromptFormState = {
  grade: 6,
  subject: 'informatics',
  customSubject: '',
  topic: '',
  learningGoal: '',
  expectedOutcomes: '',
  interactiveTypes: ['trainer'],
  mechanics: ['multiple_choice', 'score_counter'],
  difficulty: 'intermediate',
  progressiveDifficulty: true,
  taskCount: 10,
  allowRetryInDifficulty: true,
  designStyle: 'stem',
  colorScheme: 'edu_blue_teal',
  customDesignIdea: '',
  functionalRequirements: [
    'auto_check',
    'hints_after_errors',
    'retry_attempts',
    'points_scoring',
    'progress_bar',
    'summary_stats',
    'responsive_design',
  ],
  material: null,
  manualMaterialNotes: '',
};

export interface TeacherPreset {
  id: string;
  title: string;
  subtitle: string;
  state: PromptFormState;
}

export const TEACHER_PRESETS: TeacherPreset[] = [
  {
    id: 'informatics-6',
    title: 'Алгоритми з розгалуженням',
    subtitle: 'Інформатика · 6 клас · Вебквест + Складання послідовності',
    state: {
      grade: 6,
      subject: 'informatics',
      customSubject: '',
      topic: 'Алгоритми з розгалуженням та вкладеними умовами',
      learningGoal:
        'Сформувати вміння розпізнавати повне й неповне розгалуження, визначати результат виконання умовних конструкцій та складати прості алгоритми для життєвих задач.',
      expectedOutcomes:
        'Учень/учениця розрізняє повну і неповну форми розгалуження; передбачає результат виконання алгоритму при різних вхідних даних; впорядковує команди в правильну алгоритмічну послідовність.',
      interactiveTypes: ['webquest', 'sequencing'],
      mechanics: ['drag_objects', 'level_unlock', 'rewards_system', 'score_counter'],
      difficulty: 'intermediate',
      progressiveDifficulty: true,
      taskCount: 10,
      allowRetryInDifficulty: true,
      designStyle: 'space',
      colorScheme: 'cosmic_violet',
      customDesignIdea:
        'Сюжет космічної експедиції: учні керують навігаційним модулем корабля, обираючи правильні гілки умов, щоб обійти астероїдне поле.',
      functionalRequirements: [
        'auto_check',
        'hints_after_errors',
        'retry_attempts',
        'points_scoring',
        'progress_bar',
        'summary_stats',
        'revision_recommendations',
        'responsive_design',
      ],
      material: null,
      manualMaterialNotes: '',
    },
  },
  {
    id: 'math-4',
    title: 'Звичайні дроби та порівняння',
    subtitle: 'Математика · 4 клас · Drag-and-Drop симуляція + Тренажер',
    state: {
      grade: 4,
      subject: 'math',
      customSubject: '',
      topic: 'Поняття дробу. Порівняння дробів з однаковими знаменниками',
      learningGoal:
        'Навчити учнів співвідносити візуальну частку фігури із записом дробу, порівнювати дроби з однаковими знаменниками та розв’язувати практичні задачі.',
      expectedOutcomes:
        'Учень/учениця читає і записує прості дроби; знаходить відповідну частину цілого; правильно порівнює два дроби з однаковими знаменниками.',
      interactiveTypes: ['drag_and_drop', 'trainer'],
      mechanics: ['drag_objects', 'sorting', 'rewards_system', 'score_counter'],
      difficulty: 'beginner',
      progressiveDifficulty: true,
      taskCount: 8,
      allowRetryInDifficulty: true,
      designStyle: 'cartoon',
      colorScheme: 'pastel_primary',
      customDesignIdea:
        'Учні допомагають у затишній пекарні ділити пироги та піцу на рівні шматочки й складати замовлення клієнтам.',
      functionalRequirements: [
        'auto_check',
        'hints_after_errors',
        'retry_attempts',
        'points_scoring',
        'progress_bar',
        'summary_stats',
        'sound_effects',
        'responsive_design',
      ],
      material: null,
      manualMaterialNotes: '',
    },
  },
  {
    id: 'history-8',
    title: 'Козацька держава Богдана Хмельницького',
    subtitle: 'Історія · 8 клас · Детективна гра + Хронологія',
    state: {
      grade: 8,
      subject: 'history',
      customSubject: '',
      topic: 'Національно-визвольна війна українського народу середини XVII століття',
      learningGoal:
        'Систематизувати знання про ключові битви, міжнародні угоди та устрій Гетьманщини, розвивати вміння працювати з історичними фактами та хронологією.',
      expectedOutcomes:
        'Учень/учениця визначає послідовність головних битв 1648–1654 років; розпізнає історичних діячів за фактами; аналізує умови Зборівського та Білоцерківського договорів.',
      interactiveTypes: ['detective', 'matching', 'sequencing'],
      mechanics: ['matching_pairs', 'text_input', 'level_unlock', 'score_counter'],
      difficulty: 'intermediate',
      progressiveDifficulty: true,
      taskCount: 12,
      allowRetryInDifficulty: true,
      designStyle: 'ukrainian_ethno',
      colorScheme: 'warm_ethno',
      customDesignIdea:
        'Архів канцелярії Війська Запорозького: учень відновлює втрачені сторінки літопису та перевіряє достовірність історичних свідчень.',
      functionalRequirements: [
        'auto_check',
        'hints_after_errors',
        'retry_attempts',
        'points_scoring',
        'progress_bar',
        'summary_stats',
        'revision_recommendations',
        'responsive_design',
        'save_results',
      ],
      material: null,
      manualMaterialNotes: '',
    },
  },
  {
    id: 'science-5',
    title: 'Колообіг води та стани речовини',
    subtitle: 'Природничі науки · 5 клас · Лабораторія + Правда / Хиба',
    state: {
      grade: 5,
      subject: 'science',
      customSubject: '',
      topic: 'Три агрегатні стани води та колообіг води в природі',
      learningGoal:
        'Сформувати розуміння переходів води між твердим, рідким і газоподібним станами під впливом температури та пояснити етапи природного колообігу.',
      expectedOutcomes:
        'Учень/учениця пояснює процеси випаровування, конденсації, замерзання й танення; встановлює причинно-наслідкові зв’язки в колообігу води; відрізняє наукові факти від поширених помилкових уявлень.',
      interactiveTypes: ['lab', 'true_false'],
      mechanics: ['multiple_choice', 'drag_objects', 'progress_bar' as never, 'score_counter'].filter(
        (m): m is GameMechanicId =>
          ['multiple_choice', 'drag_objects', 'score_counter'].includes(m)
      ),
      difficulty: 'beginner',
      progressiveDifficulty: true,
      taskCount: 10,
      allowRetryInDifficulty: true,
      designStyle: 'stem',
      colorScheme: 'edu_blue_teal',
      customDesignIdea:
        'Інтерактивна метеостанція з регулятором температури, де краплина води змінює стан і проходить шлях від океану до хмар і гірських річок.',
      functionalRequirements: [
        'auto_check',
        'hints_after_errors',
        'retry_attempts',
        'points_scoring',
        'progress_bar',
        'summary_stats',
        'responsive_design',
      ],
      material: null,
      manualMaterialNotes: '',
    },
  },
];
