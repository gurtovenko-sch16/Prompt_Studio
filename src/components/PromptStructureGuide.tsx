import React from 'react';

const PROMPT_SECTIONS = [
  '01. Роль ШІ та педагогічна рамка',
  '02. Опис цільової аудиторії (вік і цикл НУШ)',
  '03. Навчальна тема та педагогічна мета',
  '04. Очікувані результати навчання',
  '05. Сюжет та ігрова концепція',
  '06. Детальна структура завдань під обрані формати',
  '07. Механіка взаємодії (таймер, рівні, команди, D&D)',
  '08. Правила нарахування балів',
  '09. Алгоритм перевірки відповідей і нормалізація',
  '10. Система підказок та формувальний фідбек',
  '11. Вимоги до дизайну, палітри та доступності',
  '12. Технічні вимоги HTML5 / CSS3 / JavaScript',
  '13. Критерії тестування готового застосунку',
];

export const PromptStructureGuide: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6">
      <section
        id="prompt-structure"
        className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 scroll-mt-24"
      >
        <div className="max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Структура готового промту
          </h2>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
            На відміну від коротких запитів, сервіс формує повноцінну архітектурну специфікацію з 13 обов’язкових розділів (та 14-го розділу при завантаженні матеріалів уроку).
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5 text-sm text-slate-700">
          {PROMPT_SECTIONS.map((item) => (
            <div
              key={item}
              className="py-2 border-b border-slate-100 font-medium tabular-nums"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section
        id="nush-guide"
        className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 scroll-mt-24"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Методичні принципи НУШ у конструкторі
        </h2>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 leading-relaxed">
          <div>
            <h3 className="font-bold text-slate-900 mb-1.5">
              Вікова відповідність
            </h3>
            <p>
              Вибір класу (1–11) автоматично змінює рекомендації щодо розміру елементів інтерфейсу, обсягу тексту на екрані та стилю звернення до учнів.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1.5">
              Формувальне оцінювання
            </h3>
            <p>
              Підказки після помилок, повторні спроби та рекомендації для повторення перетворюють помилку на точку навчання, а не покарання.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1.5">
              Академічна точність
            </h3>
            <p>
              Завантаження власного параграфа чи конспекту гарантує дотримання термінології підручника та відсутність вигаданих фактів.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
