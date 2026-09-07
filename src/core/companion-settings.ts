import { defaultReactionTemplates, type ReactionTemplates } from './chaos-engine';

export const SETTINGS_STORAGE_KEY = 'jinx.exe.settings.v1';

export interface CompanionSettings {
  speechEnabled: boolean;
  templates: ReactionTemplates;
}

export function getDefaultCompanionSettings(): CompanionSettings {
  return {
    speechEnabled: false,
    templates: { ...defaultReactionTemplates },
  };
}

export function loadSettings(storage: Pick<Storage, 'getItem'>): CompanionSettings {
  const fallback = getDefaultCompanionSettings();

  try {
    const raw = storage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return fallback;

    const candidate = parsed as {
      speechEnabled?: unknown;
      templates?: unknown;
    };

    const templates =
      candidate.templates && typeof candidate.templates === 'object'
        ? (candidate.templates as Partial<ReactionTemplates>)
        : {};

    return {
      speechEnabled: candidate.speechEnabled === true,
      templates: { ...fallback.templates, ...templates },
    };
  } catch {
    return fallback;
  }
}

export function saveSettings(storage: Pick<Storage, 'setItem'>, settings: CompanionSettings): void {
  storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}
