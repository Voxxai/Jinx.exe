import { useState } from 'react';
import { StatusCard } from './components/StatusCard';
import { createReaction, type StreamEvent, type StreamEventType } from './core/chaos-engine';
import { loadSettings, saveSettings, type CompanionSettings } from './core/companion-settings';

const eventControls: Array<{ type: StreamEventType; label: string; hint: string }> = [
  { type: 'follow', label: 'FOLLOW', hint: 'New follower' },
  { type: 'sub', label: 'SUB', hint: 'Subscription' },
  { type: 'raid', label: 'RAID', hint: 'Incoming viewers' },
  { type: 'reward', label: 'REWARD', hint: 'Channel points' },
  { type: 'manual', label: 'CHAOS', hint: 'Manual line' },
];

interface ReactionHistoryItem {
  type: StreamEventType;
  line: string;
}

export function App() {
  const [settings, setSettings] = useState<CompanionSettings>(() =>
    loadSettings(window.localStorage),
  );
  const [message, setMessage] = useState('Waiting for something fun to happen...');
  const [username, setUsername] = useState('Voxxai');
  const [viewerCount, setViewerCount] = useState('42');
  const [rewardTitle, setRewardTitle] = useState('Hydrate');
  const [eventCount, setEventCount] = useState(0);
  const [history, setHistory] = useState<ReactionHistoryItem[]>([]);
  const [saved, setSaved] = useState(true);

  const speechSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

  const speak = (line: string) => {
    if (!settings.speechEnabled || !speechSupported) return;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(line));
  };

  const triggerReaction = (type: StreamEventType) => {
    const event: StreamEvent = {
      type,
      username: username.trim() || undefined,
    };

    if (type === 'raid') {
      event.viewers = Math.max(0, Number.parseInt(viewerCount, 10) || 0);
    }

    if (type === 'reward') {
      event.rewardTitle = rewardTitle.trim() || undefined;
    }

    const reaction = createReaction(event, settings.templates);
    setMessage(reaction.line);
    setEventCount((current) => current + 1);
    setHistory((current) => [{ type, line: reaction.line }, ...current].slice(0, 5));
    speak(reaction.line);
  };

  const updateTemplate = (type: StreamEventType, value: string) => {
    setSaved(false);
    setSettings((current) => ({
      ...current,
      templates: {
        ...current.templates,
        [type]: value,
      },
    }));
  };

  const persistSettings = (nextSettings: CompanionSettings = settings) => {
    saveSettings(window.localStorage, nextSettings);
    setSaved(true);
  };

  const toggleSpeech = () => {
    const nextSettings = {
      ...settings,
      speechEnabled: !settings.speechEnabled,
    };
    setSettings(nextSettings);
    persistSettings(nextSettings);
  };

  return (
    <main className="shell">
      <div className="noise" aria-hidden="true" />
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">V//</span>
          <div>
            <p>VOXXAI SYSTEMS</p>
            <h1>JINX.EXE</h1>
          </div>
        </div>
        <div className="connection">
          <i /> MANUAL BUS ONLINE
        </div>
      </header>

      <section className="hero">
        <div className="copy">
          <p className="eyebrow">STREAM COMPANION // MVP CONTROL SURFACE</p>
          <h2>
            PUSH THE
            <br />
            <em>BUTTON.</em>
          </h2>
          <p className="intro">
            Fire stream-style events manually, tune the reaction lines and let the same event model
            power Twitch and Stream Deck integrations later.
          </p>
          <button type="button" onClick={() => triggerReaction('manual')}>
            TRIGGER CHAOS <span>↗</span>
          </button>
        </div>

        <div className="reactor" aria-label="Chaos reactor visualization">
          <div className="orbit orbit--outer" />
          <div className="orbit orbit--inner" />
          <div className="reactor-core">J!</div>
          <div className="speech" aria-live="polite">
            {message}
          </div>
        </div>
      </section>

      <section className="console-grid" aria-label="Manual reaction console">
        <div className="console-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">EVENT INJECTOR</p>
              <h3>Quick triggers</h3>
            </div>
            <span>{eventCount} fired</span>
          </div>

          <div className="input-grid">
            <label>
              Username
              <input value={username} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <label>
              Raid viewers
              <input
                inputMode="numeric"
                min="0"
                type="number"
                value={viewerCount}
                onChange={(event) => setViewerCount(event.target.value)}
              />
            </label>
            <label>
              Reward title
              <input value={rewardTitle} onChange={(event) => setRewardTitle(event.target.value)} />
            </label>
          </div>

          <div className="trigger-grid">
            {eventControls.map((control) => (
              <button
                className={`trigger trigger--${control.type}`}
                key={control.type}
                type="button"
                onClick={() => triggerReaction(control.type)}
              >
                <strong>{control.label}</strong>
                <span>{control.hint}</span>
              </button>
            ))}
          </div>

          <div className="history">
            <p className="eyebrow">RECENT SIGNALS</p>
            {history.length === 0 ? (
              <p className="history-empty">Nothing exploded yet.</p>
            ) : (
              <ol>
                {history.map((item, index) => (
                  <li key={`${item.type}-${index}`}>
                    <span>{item.type}</span>
                    <p>{item.line}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        <div className="console-panel settings-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">REACTION PACK // LOCAL</p>
              <h3>Personality controls</h3>
            </div>
            <span className={saved ? 'saved' : 'unsaved'}>{saved ? 'SAVED' : 'UNSAVED'}</span>
          </div>

          <label className="toggle-row">
            <span>
              <strong>System voice</strong>
              <small>
                {speechSupported
                  ? 'Uses the voice available in your desktop webview.'
                  : 'Speech synthesis is unavailable on this system.'}
              </small>
            </span>
            <input
              checked={settings.speechEnabled}
              disabled={!speechSupported}
              type="checkbox"
              onChange={toggleSpeech}
            />
          </label>

          <div className="template-list">
            {eventControls.map((control) => (
              <label key={control.type}>
                {control.label} line
                <textarea
                  rows={2}
                  value={settings.templates[control.type]}
                  onChange={(event) => updateTemplate(control.type, event.target.value)}
                />
              </label>
            ))}
          </div>

          <p className="template-help">
            Placeholders: <code>{'{username}'}</code>, <code>{'{viewers}'}</code> and{' '}
            <code>{'{reward}'}</code>.
          </p>
          <button className="save-button" type="button" onClick={() => persistSettings()}>
            SAVE LOCAL SETTINGS
          </button>
        </div>
      </section>

      <section className="status-grid" aria-label="Integration status">
        <StatusCard label="MANUAL EVENT BUS" value="READY" accent />
        <StatusCard label="LOCAL SETTINGS" value={saved ? 'SYNCED' : 'DIRTY'} />
        <StatusCard
          label="SYSTEM VOICE"
          value={settings.speechEnabled && speechSupported ? 'ENABLED' : 'OFF'}
        />
        <StatusCard label="TWITCH EVENTSUB" value="NEXT PHASE" accent />
      </section>

      <footer>
        <span>UNOFFICIAL FAN PROJECT</span>
        <span>BUILT WITH MAYHEM BY VOXXAI</span>
      </footer>
    </main>
  );
}
