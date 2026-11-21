import JSZip from 'jszip';
import { UploadedMaterial } from '../types/promptConfig';

const MAX_EXTRACTED_CHARS = 8000;

function normalizeWhitespace(input: string): string {
  return input
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function extractDocxText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(buffer);
  const docXmlFile = zip.file('word/document.xml');
  if (!docXmlFile) {
    return '';
  }

  const xmlString = await docXmlFile.async('string');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

  const paragraphs = Array.from(xmlDoc.getElementsByTagName('w:p'));
  const lines: string[] = [];

  for (const p of paragraphs) {
    const textNodes = Array.from(p.getElementsByTagName('w:t'));
    const line = textNodes.map((node) => node.textContent ?? '').join('');
    if (line.trim()) {
      lines.push(line.trim());
    }
  }

  return normalizeWhitespace(lines.join('\n'));
}

export async function extractMaterialFromFile(file: File): Promise<UploadedMaterial> {
  const lowerName = file.name.toLowerCase();
  let fileType: 'pdf' | 'docx' | 'txt' = 'txt';

  if (lowerName.endsWith('.pdf')) {
    fileType = 'pdf';
  } else if (lowerName.endsWith('.docx')) {
    fileType = 'docx';
  } else if (lowerName.endsWith('.txt')) {
    fileType = 'txt';
  } else {
    throw new Error('Підтримуються лише файли форматів PDF, DOCX або TXT.');
  }

  if (fileType === 'txt') {
    const raw = await file.text();
    const cleaned = normalizeWhitespace(raw);
    const truncated = cleaned.length > MAX_EXTRACTED_CHARS;
    return {
      fileName: file.name,
      fileType,
      fileSizeBytes: file.size,
      extractedText: truncated ? cleaned.slice(0, MAX_EXTRACTED_CHARS) : cleaned,
      extractionNote: truncated
        ? `Текст скорочено до перших ${MAX_EXTRACTED_CHARS} символів для оптимального розміру промту.`
        : cleaned.length === 0
          ? 'Текстовий файл порожній. За потреби вставте ключові тези у поле нижче.'
          : undefined,
    };
  }

  if (fileType === 'docx') {
    try {
      const cleaned = await extractDocxText(file);
      const truncated = cleaned.length > MAX_EXTRACTED_CHARS;
      return {
        fileName: file.name,
        fileType,
        fileSizeBytes: file.size,
        extractedText: truncated ? cleaned.slice(0, MAX_EXTRACTED_CHARS) : cleaned,
        extractionNote: truncated
          ? `Витягнуто текст із DOCX (скорочено до ${MAX_EXTRACTED_CHARS} символів).`
          : cleaned.length > 0
            ? 'Текст успішно витягнуто з документа DOCX і буде додано до промту.'
            : 'У документі DOCX не знайдено текстових абзаців (можливо, файл містить лише зображення). Додайте ключові тези у поле нижче.',
      };
    } catch {
      return {
        fileName: file.name,
        fileType,
        fileSizeBytes: file.size,
        extractedText: '',
        extractionNote:
          'Файл DOCX прикріплено, але не вдалося автоматично розпізнати текст. Ви можете вставити ключові тези у поле нижче.',
      };
    }
  }

  // PDF file handling: attach reliably + inform teacher to paste key excerpt if needed
  return {
    fileName: file.name,
    fileType: 'pdf',
    fileSizeBytes: file.size,
    extractedText: '',
    extractionNote:
      'PDF-файл прикріплено до технічного завдання. Обов’язкову вимогу щодо опори на наданий матеріал уже додано до промту. За бажанням вставте ключові фрагменти або визначення з PDF у поле нижче, щоб ШІ одразу бачив точний зміст.',
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} МБ`;
}
