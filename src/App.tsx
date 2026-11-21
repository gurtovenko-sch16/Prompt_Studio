import React, { useState } from 'react';
import { INITIAL_FORM_STATE, TeacherPreset } from './data/studioOptions';
import {
  FunctionalRequirementId,
  GameMechanicId,
  InteractiveTypeId,
  PromptFormState,
  ValidationErrors,
} from './types/promptConfig';
import { generateMasterPrompt } from './utils/promptGenerator';
import { Header } from './components/Header';
import { HeroIntro } from './components/HeroIntro';
import { EducationalParamsBlock } from './components/blocks/EducationalParamsBlock';
import { InteractiveTypesBlock } from './components/blocks/InteractiveTypesBlock';
import { MechanicsBlock } from './components/blocks/MechanicsBlock';
import { DifficultyBlock } from './components/blocks/DifficultyBlock';
import { DesignBlock } from './components/blocks/DesignBlock';
import { FunctionalReqsBlock } from './components/blocks/FunctionalReqsBlock';
import { MaterialsBlock } from './components/blocks/MaterialsBlock';
import { SidebarSummary } from './components/SidebarSummary';
import { PromptStructureGuide } from './components/PromptStructureGuide';
import { ResultScreen } from './components/ResultScreen';
import { AlertCircle, Sparkles } from 'lucide-react';

function toggleArrayItem<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export default function App() {
  const [formState, setFormState] = useState<PromptFormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const [screen, setScreen] = useState<'builder' | 'result'>('builder');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [editablePrompt, setEditablePrompt] = useState<string>('');

  const updateField = <K extends keyof PromptFormState>(
    field: K,
    value: PromptFormState[K]
  ) => {
    setActivePresetId(null);
    setFormState((prev) => ({ ...prev, [field]: value }));

    if (field === 'topic' && errors.topic) {
      setErrors((prev) => ({ ...prev, topic: undefined }));
    }
    if (field === 'learningGoal' && errors.learningGoal) {
      setErrors((prev) => ({ ...prev, learningGoal: undefined }));
    }
    if (field === 'expectedOutcomes' && errors.expectedOutcomes) {
      setErrors((prev) => ({ ...prev, expectedOutcomes: undefined }));
    }
    if (field === 'customSubject' && errors.customSubject) {
      setErrors((prev) => ({ ...prev, customSubject: undefined }));
    }
    if (field === 'subject' && value !== 'other' && errors.customSubject) {
      setErrors((prev) => ({ ...prev, customSubject: undefined }));
    }
  };

  const handleToggleInteractiveType = (id: InteractiveTypeId) => {
    setActivePresetId(null);
    setFormState((prev) => {
      const next = toggleArrayItem(prev.interactiveTypes, id);
      if (next.length > 0 && errors.interactiveTypes) {
        setErrors((e) => ({ ...e, interactiveTypes: undefined }));
      }
      return { ...prev, interactiveTypes: next };
    });
  };

  const handleToggleMechanic = (id: GameMechanicId) => {
    setActivePresetId(null);
    setFormState((prev) => ({
      ...prev,
      mechanics: toggleArrayItem(prev.mechanics, id),
    }));
  };

  const handleToggleRequirement = (id: FunctionalRequirementId) => {
    setActivePresetId(null);
    setFormState((prev) => ({
      ...prev,
      functionalRequirements: toggleArrayItem(prev.functionalRequirements, id),
    }));
  };

  const validateForm = (state: PromptFormState): ValidationErrors => {
    const nextErrors: ValidationErrors = {};

    if (state.subject === 'other' && !state.customSubject.trim()) {
      nextErrors.customSubject = 'Вкажіть назву навчального предмета.';
    }
    if (!state.topic.trim()) {
      nextErrors.topic = 'Введіть тему уроку (обов’язкове поле).';
    }
    if (!state.learningGoal.trim()) {
      nextErrors.learningGoal = 'Сформулюйте навчальну мету уроку.';
    }
    if (!state.expectedOutcomes.trim()) {
      nextErrors.expectedOutcomes = 'Зазначте очікувані результати навчання.';
    }
    if (state.interactiveTypes.length === 0) {
      nextErrors.interactiveTypes =
        'Оберіть принаймні один вид інтерактивного завдання.';
    }

    return nextErrors;
  };

  const scrollToElement = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGeneratePrompt = () => {
    const validationErrors = validateForm(formState);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      if (
        validationErrors.customSubject ||
        validationErrors.topic ||
        validationErrors.learningGoal ||
        validationErrors.expectedOutcomes
      ) {
        scrollToElement('block-a');
      } else if (validationErrors.interactiveTypes) {
        scrollToElement('block-b');
      }
      return;
    }

    const masterPrompt = generateMasterPrompt(formState);
    setGeneratedPrompt(masterPrompt);
    setEditablePrompt(masterPrompt);
    setScreen('result');
  };

  const handleApplyPreset = (preset: TeacherPreset) => {
    setFormState({ ...preset.state });
    setErrors({});
    setActivePresetId(preset.id);
    scrollToElement('block-a');
  };

  const handleResetForm = () => {
    setFormState(INITIAL_FORM_STATE);
    setErrors({});
    setActivePresetId(null);
  };

  const handleCreateNewPrompt = () => {
    handleResetForm();
    setGeneratedPrompt('');
    setEditablePrompt('');
    setScreen('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (screen === 'result') {
      setScreen('builder');
      window.setTimeout(() => scrollToElement(sectionId), 60);
    } else {
      scrollToElement(sectionId);
    }
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <Header
        activeScreen={screen}
        onNavigateSection={handleNavigateSection}
        onPrimaryAction={
          screen === 'builder'
            ? handleGeneratePrompt
            : () => {
                setScreen('builder');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
        }
      />

      <main className="flex-1">
        {screen === 'builder' ? (
          <>
            <HeroIntro
              onApplyPreset={handleApplyPreset}
              onResetForm={handleResetForm}
              activePresetId={activePresetId}
            />

            <div
              id="builder-form"
              className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 scroll-mt-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <EducationalParamsBlock
                    state={formState}
                    errors={errors}
                    onChange={updateField}
                  />

                  <InteractiveTypesBlock
                    selectedTypes={formState.interactiveTypes}
                    error={errors.interactiveTypes}
                    onToggle={handleToggleInteractiveType}
                  />

                  <MechanicsBlock
                    selectedMechanics={formState.mechanics}
                    onToggle={handleToggleMechanic}
                    onSelectPresetMechanics={(ids) => updateField('mechanics', ids)}
                  />

                  <DifficultyBlock state={formState} onChange={updateField} />

                  <DesignBlock state={formState} onChange={updateField} />

                  <FunctionalReqsBlock
                    selectedRequirements={formState.functionalRequirements}
                    onToggle={handleToggleRequirement}
                    onSelectAll={(ids) => updateField('functionalRequirements', ids)}
                  />

                  <MaterialsBlock
                    material={formState.material}
                    manualMaterialNotes={formState.manualMaterialNotes}
                    onMaterialChange={(mat) => updateField('material', mat)}
                    onManualNotesChange={(notes) =>
                      updateField('manualMaterialNotes', notes)
                    }
                  />

                  {/* Повідомлення про незаповнені обов'язкові поля + фінальна кнопка */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
                    {errorCount > 0 && (
                      <div
                        role="alert"
                        className="mb-4 p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-sm font-medium text-rose-800"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>
                          Перевірте форму: потрібно заповнити обов’язкові поля ({errorCount}).
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-base font-bold text-slate-900">
                          Готові отримати детальний промт?
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Система об’єднає всі вибрані параметри у структуроване технічне завдання для ШІ.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleGeneratePrompt}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-teal-600 to-violet-600 hover:brightness-105 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                      >
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        <span>СФОРМУВАТИ ПРОМТ</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <SidebarSummary
                    state={formState}
                    onGenerate={handleGeneratePrompt}
                    onJumpToBlock={scrollToElement}
                  />
                </div>
              </div>
            </div>

            <PromptStructureGuide />
          </>
        ) : (
          <ResultScreen
            promptText={editablePrompt}
            originalGeneratedPrompt={generatedPrompt}
            formState={formState}
            onPromptChange={setEditablePrompt}
            onRestoreOriginalPrompt={() => setEditablePrompt(generatedPrompt)}
            onEditParameters={() => {
              setScreen('builder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCreateNew={handleCreateNewPrompt}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>IT-Prompt Studio · Конструктор промтів для інтерактивної освіти НУШ</p>
          <p>Працює локально у браузері без реєстрації</p>
        </div>
      </footer>
    </div>
  );
}
