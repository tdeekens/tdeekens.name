/**
 * @jest-environment node
 */
import { describe, expect, it } from '@jest/globals';
import { streamText } from 'ai';
import { MockLanguageModelV4, simulateReadableStream } from 'ai/test';
import { buildSystemMessages } from './system-prompt';
import type { CvContext } from './context';

// @ai-sdk/provider is only a transitive dependency, so derive the stream part
// type from the mock rather than importing it and pinning a second version.
type StreamPart =
  Awaited<
    ReturnType<MockLanguageModelV4['doStream']>
  >['stream'] extends ReadableStream<infer Part>
    ? Part
    : never;

const context: CvContext = {
  combinedMarkdown: '# Curriculum vitae\n\nTobias works at commercetools.',
  approxTokens: 12,
  builtAt: 0,
};

const chunks: StreamPart[] = [
  { type: 'text-start', id: '0' },
  { type: 'text-delta', id: '0', delta: 'He does.' },
  { type: 'text-end', id: '0' },
  {
    type: 'finish',
    finishReason: { unified: 'stop' as const, raw: 'end_turn' },
    usage: {
      inputTokens: { total: 10, noCache: 4, cacheRead: 6, cacheWrite: 0 },
      outputTokens: { total: 3, text: 3, reasoning: 0 },
    },
  },
];

const createModel = () =>
  new MockLanguageModelV4({
    doStream: async () => ({ stream: simulateReadableStream({ chunks }) }),
  });

describe('buildSystemMessages', () => {
  it('marks the context message as cacheable for anthropic', () => {
    const [rules, ctx] = buildSystemMessages(context);

    expect(rules.providerOptions).toBeUndefined();
    expect(ctx.providerOptions).toEqual({
      anthropic: { cacheControl: { type: 'ephemeral' } },
    });
    expect(ctx.content).toContain(context.combinedMarkdown);
  });

  // Regression guard for the AI SDK v7 upgrade. v7 rejects system messages
  // passed inside `messages`, and that break typechecks cleanly, so only a
  // runtime test catches it. See the last case for how it surfaces.
  it('is accepted by streamText as instructions', async () => {
    const model = createModel();

    const result = streamText({
      model,
      instructions: buildSystemMessages(context),
      messages: [
        { role: 'user', content: 'Does Tobias work at commercetools?' },
      ],
    });

    await expect(result.text).resolves.toBe('He does.');
  });

  // Guards the other v7 move: cached input tokens are no longer top-level on
  // usage, they sit under inputTokenDetails. The route logs this field.
  it('reports cached input tokens under inputTokenDetails', async () => {
    const model = createModel();

    const result = streamText({
      model,
      instructions: buildSystemMessages(context),
      messages: [{ role: 'user', content: 'Where does he work?' }],
    });
    const usage = await result.usage;

    expect(usage.inputTokenDetails.cacheReadTokens).toBe(6);
    expect(usage.inputTokens).toBe(10);
    expect(usage.outputTokens).toBe(3);
  });

  it('reaches the provider as system prompt content', async () => {
    const model = createModel();

    const result = streamText({
      model,
      instructions: buildSystemMessages(context),
      messages: [{ role: 'user', content: 'Where does he work?' }],
    });
    await result.consumeStream();

    const prompt = model.doStreamCalls[0].prompt;
    const systemMessages = prompt.filter((m) => m.role === 'system');

    expect(systemMessages).toHaveLength(2);
    expect(systemMessages[1].providerOptions).toEqual({
      anthropic: { cacheControl: { type: 'ephemeral' } },
    });
  });

  // Documents why `instructions` is not just a stylistic preference. v7
  // routes this misuse into the stream's error channel rather than throwing
  // at the call site, so in production every request would have returned the
  // generic fallback message while only onError saw the cause.
  it('rejects system messages passed inside messages', async () => {
    const model = createModel();
    const errors: unknown[] = [];

    const result = streamText({
      model,
      messages: [
        ...buildSystemMessages(context),
        { role: 'user', content: 'Where does he work?' },
      ],
      onError: ({ error }) => {
        errors.push(error);
      },
    });
    await result.consumeStream();

    expect(errors).toHaveLength(1);
    expect((errors[0] as Error).message).toMatch(
      /system messages are not allowed/i,
    );
  });
});
