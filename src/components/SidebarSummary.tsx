import React from 'react';
import {
  COLOR_SCHEMES,
  DESIGN_STYLES,
  DIFFICULTY_LEVELS,
  INTERACTIVE_TYPES,
  SUBJECTS,
} from '../data/studioOptions';
import { PromptFormState } from '../types/promptConfig';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';

interface Props {
  state: PromptFormState;
  onGenerate: () => void;
  onJumpToBlock: (blockId: string) => void;
}

export const SidebarSummary: React.FC<Props> = ({
  state,
  onGenerate,
  onJumpToBlock,
}) => {
  const subjectName =
    state.subject === 'other'
      ? state.customSubject.trim() || 'Не вказано'
      : SUBJECTS.find((s) => s.id === state.subject)?.label ?? '';

  const blockAComplete =
    Boolean(state.topic.trim()) &&
    Boolean(state.learningGoal.trim()) &&
    Boolean(state.expectedOutcomes.trim()) &&
    (state.subject !== 'other' || Boolean(state.customSubject.trim()));

  const blockBComplete = state.interactiveTypes.length > 0;

  const selectedTypeLabels = state.interactiveTypes
    .map((id) => INTERACTIVE_TYPES.find((t) => t.id === id)?.label)
    .filter(Boolean);

  const difficultyLabel =
    DIFFICULTY_LEVELS.find((d) => d.id === state.difficulty)?.label ?? '';
  const styleLabel =
    DESIGN_STYLES.find((s) => s.id === state.designStyle)?.label ?? '';
  const colorLabel =
    COLOR_SCHEMES.find((c) => c.id === state.colorScheme)?.label ?? '';

  const navItems = [
    { id: 'block-a', label: 'А. Навчальні параметри', done: blockAComplete },
    { id: 'block-b', label: 'Б. Вид завдання', done: blockBComplete },
    { id: 'block-v', label: 'В. Ігрові механіки', done: state.mechanics.length > 0 },
    { id: 'block-g', label: 'Г. Складність', done: true },
    { id: 'block-d', label: 'Д. Оформлення', done: true },
    { id: 'block-e', label: 'Е. Функціонал', done: state.functionalRequirements.length > 0 },
    {
      id: 'block-zh',
      label: 'Ж. Матеріали',
      done: Boolean(state.material || state.manualMaterialNotes.trim()),
    },
  ];

  return (
    <aside className="lg:sticky lg:top-24 space-y-4">
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
          Навігація по конструктору
        </h2>
        <ul className="mt-3 space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onJumpToBlock(item.id)}
                className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <span className="truncate">{item.label}</span>
                {item.done ? (
                  <CheckCircle2
                    className="w-4 h-4 text-teal-600 shrink-0"
                    aria-label="Заповнено"
                  />
                ) : (
                  <Circle
                    className="w-4 h-4 text-slate-300 shrink-0"
                    aria-label="Не заповнено"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
          <h3 className="font-bold text-slate-900">Поточна конфігурація</h3>
          <dl className="space-y-1.5 text-slate-600">
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">Клас і предмет:</dt>
              <dd className="font-semibold text-slate-900 text-right tabular-nums">
                {state.grade} кл. · {subjectName}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">Формати:</dt>
              <dd className="font-semibold text-slate-900 text-right">
                {selectedTypeLabels.length > 0
                  ? selectedTypeLabels.slice(0, 2).join(', ') +
                    (selectedTypeLabels.length > 2
                      ? ` (+${selectedTypeLabels.length - 2})`
                      : '')
                  : 'Не обрано'}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">Механік / функцій:</dt>
              <dd className="font-semibold text-slate-900 text-right tabular-nums">
                {state.mechanics.length} / {state.functionalRequirements.length}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">Обсяг:</dt>
              <dd className="font-semibold text-slate-900 text-right tabular-nums">
                {state.taskCount} завдань · {difficultyLabel.replace(' рівень', '')}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">Стиль:</dt>
              <dd className="font-semibold text-slate-900 text-right truncate max-w-[160px]">
                {styleLabel}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">Палітра:</dt>
              <dd className="font-semibold text-slate-900 text-right truncate max-w-[160px]">
                {colorLabel}
              </dd>
            </div>
          </dl>
        </div>

        <button
          type="button"
          onClick={onGenerate}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[46px] text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-teal-600 to-violet-600 hover:brightness-105 rounded-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>СФОРМУВАТИ ПРОМТ</span>
        </button>

        {!blockAComplete && (
          <p className="mt-2.5 text-[11px] text-slate-500 text-center leading-snug">
            Для генерації заповніть обов’язкові поля в Блоці А та Блоці Б.
          </p>
        )}
      </div>
    </aside>
  );
};
