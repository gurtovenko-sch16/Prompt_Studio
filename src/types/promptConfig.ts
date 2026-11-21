export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type SubjectId =
  | 'informatics'
  | 'math'
  | 'ukrainian'
  | 'english'
  | 'history'
  | 'science'
  | 'other';

export type InteractiveTypeId =
  | 'trainer'
  | 'webquest'
  | 'quiz'
  | 'detective'
  | 'drag_and_drop'
  | 'who_am_i'
  | 'true_false'
  | 'interactive_test'
  | 'escape_room'
  | 'simulation'
  | 'matching'
  | 'sequencing'
  | 'lab'
  | 'fillword';

export type GameMechanicId =
  | 'multiple_choice'
  | 'drag_objects'
  | 'text_input'
  | 'puzzle_assembly'
  | 'sorting'
  | 'matching_pairs'
  | 'level_unlock'
  | 'rewards_system'
  | 'team_play'
  | 'timer'
  | 'score_counter';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type DesignStyleId =
  | 'stem'
  | 'space'
  | 'detective_agency'
  | 'minecraft'
  | 'brawl_stars'
  | 'fantasy'
  | 'ukrainian_ethno'
  | 'minimalist'
  | 'cartoon'
  | 'custom';

export type ColorSchemeId =
  | 'edu_blue_teal'
  | 'cosmic_violet'
  | 'emerald_nature'
  | 'warm_ethno'
  | 'graphite_contrast'
  | 'pastel_primary';

export type FunctionalRequirementId =
  | 'auto_check'
  | 'hints_after_errors'
  | 'retry_attempts'
  | 'points_scoring'
  | 'progress_bar'
  | 'summary_stats'
  | 'revision_recommendations'
  | 'sound_effects'
  | 'responsive_design'
  | 'save_results';

export interface UploadedMaterial {
  fileName: string;
  fileType: 'pdf' | 'docx' | 'txt';
  fileSizeBytes: number;
  extractedText: string;
  extractionNote?: string;
}

export interface PromptFormState {
  // Блок А. Навчальні параметри
  grade: GradeLevel;
  subject: SubjectId;
  customSubject: string;
  topic: string;
  learningGoal: string;
  expectedOutcomes: string;

  // Блок Б. Вид інтерактивного завдання
  interactiveTypes: InteractiveTypeId[];

  // Блок В. Ігрові механіки
  mechanics: GameMechanicId[];

  // Блок Г. Складність
  difficulty: DifficultyLevel;
  progressiveDifficulty: boolean;
  taskCount: number;
  allowRetryInDifficulty: boolean;

  // Блок Д. Оформлення
  designStyle: DesignStyleId;
  colorScheme: ColorSchemeId;
  customDesignIdea: string;

  // Блок Е. Функціональні вимоги
  functionalRequirements: FunctionalRequirementId[];

  // Блок Ж. Додаткові матеріали
  material: UploadedMaterial | null;
  manualMaterialNotes: string;
}

export interface ValidationErrors {
  customSubject?: string;
  topic?: string;
  learningGoal?: string;
  expectedOutcomes?: string;
  interactiveTypes?: string;
}
