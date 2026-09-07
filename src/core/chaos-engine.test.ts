import { describe, expect, it } from 'vitest';
import { createReaction } from './chaos-engine';

describe('createReaction', () => {
  it('personalizes a follow reaction', () => {
    expect(createReaction({ type: 'follow', username: 'Voxxai' })).toEqual({
      intensity: 'low',
      line: 'Oh look, Voxxai finally found the fun channel.',
    });
  });

  it('includes the raid size', () => {
    expect(createReaction({ type: 'raid', username: 'PowPow', viewers: 42 }).line).toContain(
      '42 troublemakers',
    );
  });

  it('uses a safe fallback for blank usernames', () => {
    expect(createReaction({ type: 'sub', username: ' ' }).line).toContain('stranger');
  });

  it('creates a manual chaos reaction', () => {
    expect(createReaction({ type: 'manual' })).toEqual({
      intensity: 'medium',
      line: 'Chaos check: systems unstable. Perfect.',
    });
  });
});
