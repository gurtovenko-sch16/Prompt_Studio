import React from 'react';
import { DIFFICULTY_LEVELS } from '../../data/studioOptions';
import { DifficultyLevel, PromptFormState } from '../../types/promptConfig';
import { Check, Minus, Plus } from 'lucide-react';

interface Props {
  state: PromptFormState;
  onChange: <K extends keyof PromptFormState>(field: K, value: PromptFormState[K]) => void;
}

export const DifficultyBlock: React.FC<Props> = ({ state, onChange }) => {
  const quickTaskCounts = [5, 8, 10, 12, 15, 20];

  const adjustTaskCount = (delta: number) => {
    const next = Math.min(30, Math.max(3, state.taskCount + delta));
    onChange('taskCount', next);
  };

  return (
    <section
      id="block-g"
      className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 scroll-mt-24"
    >
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900">
          Блок Г. Складність та обсяг
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Налаштуйте когнітивний рівень, динаміку ускладнення та кількість завдань
        </p>
      </div>

      <div className="mt-5 space-y-6">
        {/* Рівень складності */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Базовий рівень складності
          </label>
          <div
            role="radiogroup"
            aria-label="Рівень складності"
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {DIFFICULTY_LEVELS.map((lvl) => {
              const active = state.difficulty === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onChange('difficulty', lvl.id as DifficultyLevel)}
                  className={`text-left p-4 rounded-xl border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    active
                      ? 'bg-blue-50/70 border-blue-600'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900">{lvl.label}</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        active ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                      }`}
                      aria-hidden="true"
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {lvl.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Кількість завдань */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <label htmlFor="task-count-range" className="text-sm font-semibold text-slate-900">
              Кількість завдань у застосунку
            </label>
            <span className="text-sm font-bold tabular-nums text-blue-700">
              {state.taskCount} завдань
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Зменшити кількість завдань"
                onClick={() => adjustTaskCount(-1)}
                className="w-10 h-10 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                id="task-count-range"
                type="range"
                min={3}
                max={30}
                value={state.taskCount}
                onChange={(e) => onChange('taskCount', Number(e.target.value))}
                className="w-40 sm:w-52 accent-blue-600 cursor-pointer"
              />
              <button
                type="button"
                aria-label="Збільшити кількість завдань"
                onClick={() => adjustTaskCount(1)}
                className="w-10 h-10 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {quickTaskCounts.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => onChange('taskCount', count)}
                  className={`px-3 py-1.5 min-h-[36px] text-xs font-semibold tabular-nums rounded-lg border cursor-pointer transition-colors ${
                    state.taskCount === count
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Перемикачі поступового ускладнення і повторної спроби */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            role="checkbox"
            aria-checked={state.progressiveDifficulty}
            onClick={() => onChange('progressiveDifficulty', !state.progressiveDifficulty)}
            className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer flex items-start gap-3 ${
              state.progressiveDifficulty
                ? 'bg-violet-50/60 border-violet-500'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <span
              className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                state.progressiveDifficulty
                  ? 'bg-violet-600 border-violet-600 text-white'
                  : 'bg-white border-slate-300 text-transparent'
              }`}
              aria-hidden="true"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span>
              <span className="block text-sm font-bold text-slate-900">
                Поступове ускладнення
              </span>
              <span className="block text-xs text-slate-500 mt-0.5">
                Плавний перехід від розігрівочних вправ до складніших задач
              </span>
            </span>
          </button>

          <button
            type="button"
            role="checkbox"
            aria-checked={state.allowRetryInDifficulty}
            onClick={() => onChange('allowRetryInDifficulty', !state.allowRetryInDifficulty)}
            className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer flex items-start gap-3 ${
              state.allowRetryInDifficulty
                ? 'bg-violet-50/60 border-violet-500'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <span
              className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                state.allowRetryInDifficulty
                  ? 'bg-violet-600 border-violet-600 text-white'
                  : 'bg-white border-slate-300 text-transparent'
              }`}
              aria-hidden="true"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span>
              <span className="block text-sm font-bold text-slate-900">
                Можливість повторної спроби
              </span>
              <span className="block text-xs text-slate-500 mt-0.5">
                Учень може виправити відповідь після підказки або перепройти завдання
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
