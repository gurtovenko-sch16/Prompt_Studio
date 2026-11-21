import React from 'react';
import { FUNCTIONAL_REQUIREMENTS } from '../../data/studioOptions';
import { FunctionalRequirementId } from '../../types/promptConfig';
import { Check } from 'lucide-react';

interface Props {
  selectedRequirements: FunctionalRequirementId[];
  onToggle: (id: FunctionalRequirementId) => void;
  onSelectAll: (ids: FunctionalRequirementId[]) => void;
}

export const FunctionalReqsBlock: React.FC<Props> = ({
  selectedRequirements,
  onToggle,
  onSelectAll,
}) => {
  const allSelected = selectedRequirements.length === FUNCTIONAL_REQUIREMENTS.length;

  return (
    <section
      id="block-e"
      className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 scroll-mt-24"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Блок Е. Функціональні вимоги
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Позначте технічні та педагогічні можливості, які має реалізувати ШІ у готовому вебзастосунку
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="font-semibold tabular-nums text-blue-700">
            Обрано: {selectedRequirements.length} з {FUNCTIONAL_REQUIREMENTS.length}
          </span>
          <span aria-hidden="true" className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() =>
              onSelectAll(allSelected ? [] : FUNCTIONAL_REQUIREMENTS.map((r) => r.id))
            }
            className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer whitespace-nowrap"
          >
            {allSelected ? 'Зняти все' : 'Позначити всі'}
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {FUNCTIONAL_REQUIREMENTS.map((req) => {
          const checked = selectedRequirements.includes(req.id);
          return (
            <button
              key={req.id}
              type="button"
              role="checkbox"
              aria-checked={checked}
              onClick={() => onToggle(req.id)}
              className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer flex items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                checked
                  ? 'bg-blue-50/60 border-blue-600'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <span
                className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  checked
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-slate-300 text-transparent'
                }`}
                aria-hidden="true"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-slate-900">
                  {req.label}
                </span>
                <span className="block text-xs text-slate-500 mt-0.5 leading-snug">
                  {req.detail}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
