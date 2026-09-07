export type StreamEventType = 'follow' | 'raid' | 'sub' | 'reward' | 'manual';

export interface StreamEvent {
  type: StreamEventType;
  username?: string;
  viewers?: number;
  rewardTitle?: string;
}

export interface ChaosReaction {
  intensity: 'low' | 'medium' | 'high';
  line: string;
}

export type ReactionTemplates = Record<StreamEventType, string>;

export const defaultReactionTemplates: ReactionTemplates = {
  follow: 'Oh look, {username} finally found the fun channel.',
  sub: '{username} joined the chaos crew. Excellent choice.',
  raid: '{username} brought {viewers} troublemakers!',
  reward: '{username} spent points on {reward}. Worth it.',
  manual: 'Chaos check: systems unstable. Perfect.',
};

const intensityByEvent: Record<StreamEventType, ChaosReaction['intensity']> = {
  follow: 'low',
  sub: 'medium',
  raid: 'high',
  reward: 'medium',
  manual: 'medium',
};

const name = (username?: string) => username?.trim() || 'stranger';
const reward = (rewardTitle?: string) => rewardTitle?.trim() || 'something suspicious';

export function renderReactionTemplate(template: string, event: StreamEvent): string {
  return template
    .replaceAll('{username}', name(event.username))
    .replaceAll('{viewers}', String(event.viewers ?? 0))
    .replaceAll('{reward}', reward(event.rewardTitle));
}

export function createReaction(
  event: StreamEvent,
  templates: ReactionTemplates = defaultReactionTemplates,
): ChaosReaction {
  return {
    intensity: intensityByEvent[event.type],
    line: renderReactionTemplate(templates[event.type], event),
  };
}
