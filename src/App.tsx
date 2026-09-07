import { useState } from 'react';
import { StatusCard } from './components/StatusCard';
import { createReaction, type StreamEventType } from './core/chaos-engine';

const demoEvents: StreamEventType[] = ['follow', 'sub', 'raid', 'manual'];

export function App() {
  const [message, setMessage] = useState('Waiting for something fun to happen...');
  const [eventIndex, setEventIndex] = useState(0);

  const triggerChaos = () => {
    const type = demoEvents[eventIndex % demoEvents.length];
    const reaction = createReaction({ type, username: 'Voxxai', viewers: 42 });
    setMessage(reaction.line);
    setEventIndex((current) => current + 1);
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
          <i /> CHAOS ONLINE
        </div>
      </header>

      <section className="hero">
        <div className="copy">
          <p className="eyebrow">STREAM COMPANION // ALPHA 0.1</p>
          <h2>
            MAKE SOME
            <br />
            <em>NOISE.</em>
          </h2>
          <p className="intro">
            A reactive desktop companion built for Twitch events, music, OBS and whatever chaos
            comes next.
          </p>
          <button type="button" onClick={triggerChaos}>
            TRIGGER CHAOS <span>↗</span>
          </button>
        </div>

        <div className="reactor" aria-label="Chaos reactor visualization">
          <div className="orbit orbit--outer" />
          <div className="orbit orbit--inner" />
          <div className="reactor-core">J!</div>
          <div className="speech">{message}</div>
        </div>
      </section>

      <section className="status-grid" aria-label="Integration status">
        <StatusCard label="TWITCH EVENTSUB" value="PLANNED" accent />
        <StatusCard label="OBS WEBSOCKET" value="PLANNED" />
        <StatusCard label="SPOTIFY PULSE" value="PLANNED" />
        <StatusCard label="CHAOS LEVEL" value={`${Math.min(99, 13 + eventIndex * 17)}%`} accent />
      </section>

      <footer>
        <span>UNOFFICIAL FAN PROJECT</span>
        <span>BUILT WITH MAYHEM BY VOXXAI</span>
      </footer>
    </main>
  );
}
