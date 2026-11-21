import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  activeScreen: 'builder' | 'result';
  onNavigateSection: (sectionId: string) => void;
  onPrimaryAction: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigateSection,
  onPrimaryAction,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('top');
          }}
          className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
        >
          <span
            className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 via-teal-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold"
            aria-hidden="true"
          >
            IT
          </span>
          <span>IT-Prompt Studio</span>
        </a>

        <nav
          aria-label="Основна навігація"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() => onNavigateSection('builder-form')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            Конструктор
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('templates')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            Шаблони
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('prompt-structure')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            Структура промту
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('nush-guide')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            Методика НУШ
          </button>
        </nav>

        <div className="flex items-center shrink-0">
          {activeScreen === 'builder' ? (
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Сформувати промт</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>До параметрів</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
