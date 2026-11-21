import React from 'react';
import { GAME_MECHANICS } from '../../data/studioOptions';
import { GameMechanicId } from '../../types/promptConfig';
import { Check } from 'lucide-react';

interface Props {
  selectedMechanics: GameMechanicId[];
  onToggle: (id: GameMechanicId) => void;
  onSelectPresetMechanics: (ids: GameMechanicId[]) => void;
}

export const MechanicsBlock: React.FC<Props> = ({
  selectedMechanics,
  onToggle,
  onSelectPresetMechanics,
}) => {
  const allSelected = selectedMechanics.length === GAME_MECHANICS.length;

  return (
    <section
      id="block-v"
      className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 scroll-mt-24"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Блок В. Ігрові механіки
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Визначте способи взаємодії учня з завданнями та елементи гейміфікації
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="font-semibold tabular-nums text-teal-700">
            Обрано: {selectedMechanics.length}
          </span>
          <span aria-hidden="true" className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() =>
              onSelectPresetMechanics(allSelected ? [] : GAME_MECHANICS.map((m) => m.id))
            }
            className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer whitespace-nowrap"
          >
            {allSelected ? 'Зняти все' : 'Обрати всі'}
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {GAME_MECHANICS.map((mech) => {
          const checked = selectedMechanics.includes(mech.id);
          return (
            <button
              key={mech.id}
              type="button"
              role="checkbox"
              aria-checked={checked}
              onClick={() => onToggle(mech.id)}
              className={`text-left p-3 rounded-xl border transition-colors cursor-pointer flex items-start gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                checked
                  ? 'bg-teal-50/70 border-teal-600'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <span
                className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  checked
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'bg-white border-slate-300 text-transparent'
                }`}
                aria-hidden="true"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-slate-900 leading-snug">
                  {mech.label}
                </span>
                <span className="block text-xs text-slate-500 mt-0.5 leading-snug">
                  {mech.summary}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
