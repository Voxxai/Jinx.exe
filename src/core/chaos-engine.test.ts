import { describe, expect, it } from 'vitest';
import {
  createReaction,
  defaultReactionTemplates,
  renderReactionTemplate,
  type ReactionTemplates,
} from './chaos-engine';

describe('createReaction', () => {
  it('personalizes a follow reaction', () => {
    expect(createReaction({ type: 'follow', username: 'Voxxai' })).toEqual({
      intensity: 'low',
      line: 'Oh look, Voxxai finally found the fun channel.',
    });
  });

  it('renders raid viewer counts', () => {
    expect(createReaction({ type: 'raid', username: 'Powder', viewers: 42 })).toEqual({
      intensity: 'high',
      line: 'Powder brought 42 troublemakers!',
    });
  });

  it('renders reward metadata', () => {
    expect(
      createReaction({ type: 'reward', username: 'Fishbones', rewardTitle: 'Hydrate' }),
    ).toEqual({
      intensity: 'medium',
      line: 'Fishbones spent points on Hydrate. Worth it.',
    });
  });

  it('uses safe fallback values when metadata is missing', () => {
    expect(renderReactionTemplate('{username}/{viewers}/{reward}', { type: 'manual' })).toBe(
      'stranger/0/something suspicious',
    );
  });

  it('supports custom templates without changing event semantics', () => {
    const templates: ReactionTemplates = {
      ...defaultReactionTemplates,
      sub: 'Welcome, {username}.',
    };

    expect(createReaction({ type: 'sub', username: '  Vi  ' }, templates)).toEqual({
      intensity: 'medium',
      line: 'Welcome, Vi.',
    });
  });

  it('creates a manual reaction', () => {
    expect(createReaction({ type: 'manual' })).toEqual({
      intensity: 'medium',
      line: 'Chaos check: systems unstable. Perfect.',
    });
  });
});
