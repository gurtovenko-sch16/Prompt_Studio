import React, { useRef, useState } from 'react';
import { UploadedMaterial } from '../../types/promptConfig';
import { extractMaterialFromFile, formatFileSize } from '../../utils/fileExtractor';
import { FileText, Upload, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  material: UploadedMaterial | null;
  manualMaterialNotes: string;
  onMaterialChange: (material: UploadedMaterial | null) => void;
  onManualNotesChange: (notes: string) => void;
}

export const MaterialsBlock: React.FC<Props> = ({
  material,
  manualMaterialNotes,
  onMaterialChange,
  onManualNotesChange,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploadError(null);
    setIsReading(true);
    try {
      const parsed = await extractMaterialFromFile(file);
      onMaterialChange(parsed);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : 'Не вдалося обробити файл. Спробуйте інший файл.'
      );
    } finally {
      setIsReading(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const hasAnyMaterial = Boolean(material || manualMaterialNotes.trim());

  return (
    <section
      id="block-zh"
      className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 scroll-mt-24"
    >
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900">
          Блок Ж. Додаткові матеріали
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Завантажте параграф підручника або конспект (PDF, DOCX або TXT), щоб ШІ будував завдання строго за вашим матеріалом
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          onChange={(e) => void handleFile(e.target.files?.[0])}
          className="sr-only"
          id="material-file-input"
        />

        {!material ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              void handleFile(e.dataTransfer.files?.[0]);
            }}
            className={`rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
              isDragging
                ? 'border-blue-600 bg-blue-50/70'
                : 'border-slate-300 bg-slate-50/60 hover:border-blue-400'
            }`}
          >
            <div className="mx-auto w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 mb-3">
              <Upload className="w-5 h-5" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {isReading
                ? 'Обробляємо навчальний файл...'
                : 'Перетягніть файл сюди або оберіть з комп’ютера'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Підтримувані формати: PDF, DOCX, TXT
            </p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isReading}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-sm font-semibold text-blue-700 bg-white border border-blue-300 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            >
              Обрати файл
            </button>
          </div>
        ) : (
          <div className="rounded-xl border border-teal-300 bg-teal-50/50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {material.fileName}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5 tabular-nums">
                    {material.fileType.toUpperCase()} · {formatFileSize(material.fileSizeBytes)}
                    {material.extractedText
                      ? ` · Витягнуто ${material.extractedText.length} символів`
                      : ''}
                  </p>
                  {material.extractionNote && (
                    <p className="text-xs text-teal-800 mt-1.5 leading-relaxed">
                      {material.extractionNote}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onMaterialChange(null)}
                aria-label="Видалити завантажений файл"
                className="p-2 min-h-[36px] min-w-[36px] rounded-lg text-slate-500 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {uploadError && (
          <div
            role="alert"
            className="p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs font-medium text-rose-700"
          >
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{uploadError}</span>
          </div>
        )}

        <div>
          <label
            htmlFor="manual-material-notes"
            className="block text-sm font-semibold text-slate-900 mb-1.5"
          >
            Ключові тези, терміни або фрагмент підручника{' '}
            <span className="text-xs font-normal text-slate-500">(необов’язково)</span>
          </label>
          <textarea
            id="manual-material-notes"
            rows={3}
            value={manualMaterialNotes}
            onChange={(e) => onManualNotesChange(e.target.value)}
            placeholder="Можете вставити сюди визначення, правила чи опорний конспект з уроку, яких ШІ має суворо дотримуватись."
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 leading-relaxed"
          />
        </div>

        {hasAnyMaterial && (
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-semibold text-slate-900">
                До промту автоматично буде додано вимогу:
              </span>{' '}
              «Використовуй наданий навчальний матеріал як основне джерело змісту. Не додавай фактів, які суперечать підручнику. Зберігай термінологію, рівень складності та навчальну послідовність матеріалу».
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
