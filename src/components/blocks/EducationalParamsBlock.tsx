import React from 'react';
import { GRADES, SUBJECTS } from '../../data/studioOptions';
import { GradeLevel, PromptFormState, SubjectId, ValidationErrors } from '../../types/promptConfig';
import { AlertCircle } from 'lucide-react';

interface Props {
  state: PromptFormState;
  errors: ValidationErrors;
  onChange: <K extends keyof PromptFormState>(field: K, value: PromptFormState[K]) => void;
}

export const EducationalParamsBlock: React.FC<Props> = ({ state, errors, onChange }) => {
  const selectedGradeObj = GRADES.find((g) => g.value === state.grade) ?? GRADES[5];

  return (
    <section
      id="block-a"
      className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 scroll-mt-24"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Блок А. Навчальні параметри
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Визначте вікову групу, предмет та методичну основу майбутнього інтерактиву
          </p>
        </div>
        <span className="text-xs font-medium text-slate-500">Обов’язковий блок</span>
      </div>

      <div className="mt-6 space-y-6">
        {/* Клас */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2.5">
            <label className="text-sm font-semibold text-slate-900">
              Клас (1–11)
            </label>
            <span className="text-xs font-medium text-teal-700">
              {selectedGradeObj.cycle}
            </span>
          </div>
          <div
            role="radiogroup"
            aria-label="Оберіть клас"
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2"
          >
            {GRADES.map((g) => {
              const active = state.grade === g.value;
              return (
                <button
                  key={g.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onChange('grade', g.value as GradeLevel)}
                  className={`min-h-[42px] px-2 py-2 rounded-lg text-sm font-bold tabular-nums border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    active
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-white'
                  }`}
                >
                  {g.value}
                </button>
              );
            })}
          </div>
        </div>

        {/* Предмет */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Навчальний предмет
          </label>
          <div
            role="radiogroup"
            aria-label="Оберіть предмет"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5"
          >
            {SUBJECTS.map((subj) => {
              const active = state.subject === subj.id;
              return (
                <button
                  key={subj.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onChange('subject', subj.id as SubjectId)}
                  className={`min-h-[44px] px-3.5 py-2.5 rounded-lg text-sm font-semibold text-left border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    active
                      ? 'bg-blue-50 text-blue-800 border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {subj.label}
                </button>
              );
            })}
          </div>

          {state.subject === 'other' && (
            <div className="mt-3">
              <label
                htmlFor="custom-subject-input"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Вкажіть назву предмета <span className="text-rose-600">*</span>
              </label>
              <input
                id="custom-subject-input"
                type="text"
                value={state.customSubject}
                onChange={(e) => onChange('customSubject', e.target.value)}
                placeholder="Наприклад: Географія, Фізика, Мистецтво або Зарубіжна література"
                className={`w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.customSubject ? 'border-rose-500' : 'border-slate-300'
                }`}
              />
              {errors.customSubject && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.customSubject}</span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Тема уроку */}
        <div>
          <label
            htmlFor="topic-input"
            className="block text-sm font-semibold text-slate-900 mb-1.5"
          >
            Тема уроку <span className="text-rose-600">*</span>
          </label>
          <input
            id="topic-input"
            type="text"
            value={state.topic}
            onChange={(e) => onChange('topic', e.target.value)}
            placeholder="Наприклад: Лінійні алгоритми та змінні в Python"
            className={`w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.topic ? 'border-rose-500' : 'border-slate-300'
            }`}
          />
          {errors.topic && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.topic}</span>
            </p>
          )}
        </div>

        {/* Навчальна мета */}
        <div>
          <label
            htmlFor="goal-input"
            className="block text-sm font-semibold text-slate-900 mb-1.5"
          >
            Навчальна мета <span className="text-rose-600">*</span>
          </label>
          <textarea
            id="goal-input"
            rows={2}
            value={state.learningGoal}
            onChange={(e) => onChange('learningGoal', e.target.value)}
            placeholder="Наприклад: Сформувати вміння оголошувати змінні, визначати типи даних і прогнозувати результат виконання простих виразів."
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed ${
              errors.learningGoal ? 'border-rose-500' : 'border-slate-300'
            }`}
          />
          {errors.learningGoal && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.learningGoal}</span>
            </p>
          )}
        </div>

        {/* Очікувані результати */}
        <div>
          <label
            htmlFor="outcomes-input"
            className="block text-sm font-semibold text-slate-900 mb-1.5"
          >
            Очікувані результати (за програмою НУШ) <span className="text-rose-600">*</span>
          </label>
          <textarea
            id="outcomes-input"
            rows={3}
            value={state.expectedOutcomes}
            onChange={(e) => onChange('expectedOutcomes', e.target.value)}
            placeholder="Наприклад: Учень/учениця розрізняє цілі, дробові та рядкові типи даних; знаходить помилки в іменах змінних; обчислює підсумкове значення змінної."
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed ${
              errors.expectedOutcomes ? 'border-rose-500' : 'border-slate-300'
            }`}
          />
          {errors.expectedOutcomes && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.expectedOutcomes}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
