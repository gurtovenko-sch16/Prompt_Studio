import React from 'react';
import { COLOR_SCHEMES, DESIGN_STYLES } from '../../data/studioOptions';
import { ColorSchemeId, DesignStyleId, PromptFormState } from '../../types/promptConfig';

interface Props {
  state: PromptFormState;
  onChange: <K extends keyof PromptFormState>(field: K, value: PromptFormState[K]) => void;
}

export const DesignBlock: React.FC<Props> = ({ state, onChange }) => {
  return (
    <section
      id="block-d"
      className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 scroll-mt-24"
    >
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900">
          Блок Д. Оформлення та атмосфера
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Оберіть візуальну стилістику, кольорову гаму та за потреби опишіть власну сюжетну ідею
        </p>
      </div>

      <div className="mt-5 space-y-6">
        {/* Стиль оформлення */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Візуальний та сюжетний стиль
          </label>
          <div
            role="radiogroup"
            aria-label="Стиль оформлення"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
          >
            {DESIGN_STYLES.map((style) => {
              const active = state.designStyle === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onChange('designStyle', style.id as DesignStyleId)}
                  className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
                    active
                      ? 'bg-violet-50/70 border-violet-600'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <span className="block text-sm font-bold text-slate-900">
                    {style.label}
                  </span>
                  <span className="block text-xs text-slate-500 mt-1 leading-snug">
                    {style.mood}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Кольорова гама */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2.5">
            Кольорова гама
          </label>
          <div
            role="radiogroup"
            aria-label="Кольорова гама"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {COLOR_SCHEMES.map((scheme) => {
              const active = state.colorScheme === scheme.id;
              return (
                <button
                  key={scheme.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onChange('colorScheme', scheme.id as ColorSchemeId)}
                  className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    active
                      ? 'bg-blue-50/70 border-blue-600'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="block text-sm font-bold text-slate-900">
                      {scheme.label}
                    </span>
                    <span className="block text-xs text-slate-500 mt-0.5 leading-snug">
                      {scheme.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0" aria-hidden="true">
                    {scheme.swatches.map((hex) => (
                      <span
                        key={hex}
                        className="w-5 h-5 rounded-md border border-slate-300/80"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Власна ідея оформлення */}
        <div>
          <label
            htmlFor="custom-design-idea"
            className="block text-sm font-semibold text-slate-900 mb-1.5"
          >
            Власна ідея оформлення або сюжету{' '}
            <span className="text-xs font-normal text-slate-500">(необов’язково)</span>
          </label>
          <textarea
            id="custom-design-idea"
            rows={2}
            value={state.customDesignIdea}
            onChange={(e) => onChange('customDesignIdea', e.target.value)}
            placeholder="Наприклад: Оформлення у вигляді пульта керування дроном або мандрівки містами України з відкриттям карток пам’яток."
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-violet-600 leading-relaxed"
          />
        </div>
      </div>
    </section>
  );
};
