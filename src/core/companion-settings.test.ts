import { describe, expect, it } from 'vitest';
import {
  SETTINGS_STORAGE_KEY,
  getDefaultCompanionSettings,
  loadSettings,
  saveSettings,
} from './companion-settings';

function createStorage(initialValue: string | null = null) {
  let value = initialValue;

  return {
    getItem: (key: string) => (key === SETTINGS_STORAGE_KEY ? value : null),
    setItem: (key: string, nextValue: string) => {
      if (key === SETTINGS_STORAGE_KEY) value = nextValue;
    },
    value: () => value,
  };
}

describe('companion settings', () => {
  it('returns defaults when no settings were stored', () => {
    const storage = createStorage();

    expect(loadSettings(storage)).toEqual(getDefaultCompanionSettings());
  });

  it('loads persisted speech and template overrides while keeping defaults', () => {
    const storage = createStorage(
      JSON.stringify({
        speechEnabled: true,
        templates: { follow: 'Yo {username}!' },
      }),
    );

    const settings = loadSettings(storage);

    expect(settings.speechEnabled).toBe(true);
    expect(settings.templates.follow).toBe('Yo {username}!');
    expect(settings.templates.raid).toBe('{username} brought {viewers} troublemakers!');
  });

  it('falls back safely for invalid JSON', () => {
    const storage = createStorage('{ definitely-not-json');

    expect(loadSettings(storage)).toEqual(getDefaultCompanionSettings());
  });

  it('falls back safely for non-object persisted data', () => {
    const storage = createStorage(JSON.stringify('broken'));

    expect(loadSettings(storage)).toEqual(getDefaultCompanionSettings());
  });

  it('ignores malformed template containers and falsey speech values', () => {
    const storage = createStorage(
      JSON.stringify({
        speechEnabled: 'yes',
        templates: 'not-an-object',
      }),
    );

    expect(loadSettings(storage)).toEqual(getDefaultCompanionSettings());
  });

  it('saves settings under the versioned key', () => {
    const storage = createStorage();
    const settings = getDefaultCompanionSettings();
    settings.speechEnabled = true;

    saveSettings(storage, settings);

    expect(storage.value()).toBe(JSON.stringify(settings));
  });
});
