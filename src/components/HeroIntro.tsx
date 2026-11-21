import React from 'react';
import { TEACHER_PRESETS, TeacherPreset } from '../data/studioOptions';
import { ArrowUpRight, RotateCcw } from 'lucide-react';

interface HeroIntroProps {
  onApplyPreset: (preset: TeacherPreset) => void;
  onResetForm: () => void;
  activePresetId: string | null;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  onApplyPreset,
  onResetForm,
  activePresetId,
}) => {
  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-teal-700 mb-3">
              <span>Платформа для вчителів НУШ</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Без реєстрації</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Експорт у TXT</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance leading-[1.15]">
              Конструктор професійних промтів для інтерактивних навчальних завдань
            </h1>

            <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Заповніть параметри уроку — і{' '}
              <span className="font-semibold text-slate-800">IT-Prompt Studio</span>{' '}
              автоматично сформує детальне методико-технічне завдання для штучного інтелекту,
              готове для створення вебквестів, тренажерів, симуляцій та ігор.
            </p>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3">
              Як працює конструктор
            </h2>
            <ol className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="tabular-nums font-bold text-blue-600 shrink-0">01.</span>
                <span>Вкажіть клас, предмет, тему та очікувані результати НУШ.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="tabular-nums font-bold text-teal-600 shrink-0">02.</span>
                <span>Оберіть формат інтерактиву, ігрові механіки, складність і стиль.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="tabular-nums font-bold text-violet-600 shrink-0">03.</span>
                <span>Отримайте готовий структурований промт, відредагуйте чи завантажте TXT.</span>
              </li>
            </ol>
          </div>
        </div>

        <div id="templates" className="mt-8 pt-6 border-t border-slate-200/80">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Швидкі шаблони для прикладу
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Натисніть на будь-який сценарій, щоб автоматично заповнити форму і переглянути результат
              </p>
            </div>
            <button
              type="button"
              onClick={onResetForm}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Очистити форму</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TEACHER_PRESETS.map((preset) => {
              const isActive = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onApplyPreset(preset)}
                  className={`group text-left p-3.5 rounded-xl border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? 'bg-blue-50/80 border-blue-500 text-slate-900'
                      : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900 leading-snug">
                      {preset.title}
                    </span>
                    <ArrowUpRight
                      className={`w-4 h-4 shrink-0 mt-0.5 transition-transform ${
                        isActive
                          ? 'text-blue-600'
                          : 'text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500 leading-snug">
                    {preset.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
