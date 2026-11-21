import React from 'react';
import { INTERACTIVE_TYPES } from '../../data/studioOptions';
import { InteractiveTypeId, ValidationErrors } from '../../types/promptConfig';
import { AlertCircle, Check } from 'lucide-react';

interface Props {
  selectedTypes: InteractiveTypeId[];
  error?: ValidationErrors['interactiveTypes'];
  onToggle: (id: InteractiveTypeId) => void;
}

export const InteractiveTypesBlock: React.FC<Props> = ({
  selectedTypes,
  error,
  onToggle,
}) => {
  return (
    <section
      id="block-b"
      className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 scroll-mt-24"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Блок Б. Вид інтерактивного завдання <span className="text-rose-600">*</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Оберіть один або поєднайте кілька форматів — промт адаптує структуру під кожен із них
          </p>
        </div>
        <span className="text-xs font-semibold tabular-nums text-blue-700">
          Обрано: {selectedTypes.length}
        </span>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-center gap-2 text-sm font-medium text-rose-700"
        >
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {INTERACTIVE_TYPES.map((item) => {
          const checked = selectedTypes.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              role="checkbox"
              aria-checked={checked}
              onClick={() => onToggle(item.id)}
              className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer flex items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                checked
                  ? 'bg-blue-50/70 border-blue-600'
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
                <span className="block text-sm font-bold text-slate-900 leading-snug">
                  {item.label}
                </span>
                <span className="block text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.hint}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
