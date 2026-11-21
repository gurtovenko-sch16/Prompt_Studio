import React, { useEffect, useState } from 'react';
import { PromptFormState } from '../types/promptConfig';
import { INTERACTIVE_TYPES, SUBJECTS } from '../data/studioOptions';
import {
  Check,
  Copy,
  Download,
  Pencil,
  PlusCircle,
  RotateCcw,
} from 'lucide-react';

interface ResultScreenProps {
  promptText: string;
  originalGeneratedPrompt: string;
  formState: PromptFormState;
  onPromptChange: (newValue: string) => void;
  onRestoreOriginalPrompt: () => void;
  onEditParameters: () => void;
  onCreateNew: () => void;
}

function buildSafeFileName(state: PromptFormState): string {
  const subjectName =
    state.subject === 'other'
      ? state.customSubject.trim() || 'predmet'
      : SUBJECTS.find((s) => s.id === state.subject)?.label ?? 'predmet';

  const cleanTopic = state.topic
    .trim()
    .slice(0, 40)
    .replace(/[\\/:*?"<>|]+/g, '')
    .replace(/\s+/g, '_');

  const cleanSubject = subjectName.replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, '_');
  return `prompt_${cleanSubject}_${state.grade}klas_${cleanTopic || 'zavdannya'}.txt`;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  promptText,
  originalGeneratedPrompt,
  formState,
  onPromptChange,
  onRestoreOriginalPrompt,
  onEditParameters,
  onCreateNew,
}) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 3500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    setCopyError(null);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(promptText);
      } else {
        const helper = document.createElement('textarea');
        helper.value = promptText;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        document.body.removeChild(helper);
      }
      setCopied(true);
    } catch {
      setCopyError(
        'Не вдалося автоматично скопіювати. Виділіть текст у полі нижче та натисніть Ctrl+C.'
      );
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([promptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = buildSafeFileName(formState);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const subjectLabel =
    formState.subject === 'other'
      ? formState.customSubject.trim() || 'Інший предмет'
      : SUBJECTS.find((s) => s.id === formState.subject)?.label ?? '';

  const typeLabels = formState.interactiveTypes
    .map((id) => INTERACTIVE_TYPES.find((t) => t.id === id)?.label)
    .filter(Boolean)
    .join(', ');

  const isEditedManually = promptText !== originalGeneratedPrompt;
  const charCount = promptText.length;
  const wordCount = promptText.trim() ? promptText.trim().split(/\s+/).length : 0;

  return (
    <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8">
        {/* Заголовок екрана результату */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-teal-700 mb-2">
              <span>{formState.grade} клас</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{subjectLabel}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{typeLabels}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Твій промт готовий!
            </h1>
            <p className="text-sm text-slate-600 mt-1.5">
              Перегляньте або за потреби відредагуйте текст нижче, а потім скопіюйте чи завантажте файл TXT.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onEditParameters}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Pencil className="w-4 h-4" aria-hidden="true" />
              <span>Редагувати параметри</span>
            </button>

            <button
              type="button"
              onClick={onCreateNew}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" aria-hidden="true" />
              <span>Створити новий промт</span>
            </button>
          </div>
        </div>

        {/* Панель дій з промтом */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => void handleCopy()}
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Скопійовано!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Копіювати промт</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] text-sm font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Завантажити TXT</span>
            </button>

            {isEditedManually && (
              <button
                type="button"
                onClick={onRestoreOriginalPrompt}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Відновити згенерований текст</span>
              </button>
            )}
          </div>

          <div className="text-xs font-medium text-slate-500 tabular-nums">
            <span>{wordCount} слів</span>
            <span aria-hidden="true" className="mx-2 text-slate-300">·</span>
            <span>{charCount} символів</span>
          </div>
        </div>

        {/* Повідомлення про успішне копіювання */}
        {copied && (
          <div
            role="status"
            aria-live="polite"
            className="mt-4 p-3.5 rounded-lg bg-teal-50 border border-teal-300 flex items-center gap-2.5 text-sm font-semibold text-teal-900"
          >
            <Check className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
            <span>
              Промт успішно скопійовано в буфер обміну! Тепер вставте його в обраний ШІ-інструмент.
            </span>
          </div>
        )}

        {copyError && (
          <div
            role="alert"
            className="mt-4 p-3.5 rounded-lg bg-amber-50 border border-amber-300 text-sm font-medium text-amber-900"
          >
            {copyError}
          </div>
        )}

        {/* Велике редаговане текстове поле з повним промтом */}
        <div className="mt-4">
          <label htmlFor="generated-prompt-textarea" className="sr-only">
            Згенерований промт
          </label>
          <textarea
            id="generated-prompt-textarea"
            value={promptText}
            onChange={(e) => onPromptChange(e.target.value)}
            rows={24}
            spellCheck={false}
            className="w-full p-4 sm:p-5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-slate-900 font-mono-code text-[13px] sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y min-h-[460px]"
          />
        </div>
      </div>
    </section>
  );
};
