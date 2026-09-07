export type StreamEventType = 'follow' | 'raid' | 'sub' | 'manual';

export interface StreamEvent {
  type: StreamEventType;
  username?: string;
  viewers?: number;
}

export interface ChaosReaction {
  intensity: 'low' | 'medium' | 'high';
  line: string;
}

const name = (username?: string) => username?.trim() || 'stranger';

export function createReaction(event: StreamEvent): ChaosReaction {
  switch (event.type) {
    case 'follow':
      return {
        intensity: 'low',
        line: `Oh look, ${name(event.username)} finally found the fun channel.`,
      };
    case 'sub':
      return {
        intensity: 'medium',
        line: `${name(event.username)} joined the chaos crew. Excellent choice.`,
      };
    case 'raid':
      return {
        intensity: 'high',
        line: `${name(event.username)} brought ${event.viewers ?? 0} troublemakers!`,
      };
    case 'manual':
      return { intensity: 'medium', line: 'Chaos check: systems unstable. Perfect.' };
  }
}
