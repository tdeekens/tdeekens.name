import { z } from 'zod';
import { ASK_ABOUT_ME_CONFIG } from './config';
import type { AskRequestBody } from './shared-types';

const { maxMessages, maxCharsPerMessage } = ASK_ABOUT_ME_CONFIG.request;

const textPartSchema = z.object({
  type: z.literal('text'),
  text: z.string().min(1).max(maxCharsPerMessage),
});

const otherPartSchema = z.object({ type: z.string() }).loose();

const partSchema = z.union([textPartSchema, otherPartSchema]);

const uiMessageSchema = z
  .object({
    id: z.string().min(1).max(128),
    role: z.enum(['user', 'assistant']),
    parts: z.array(partSchema).min(1),
  })
  .loose();

export const askRequestSchema = z.object({
  messages: z
    .array(uiMessageSchema)
    .min(1)
    .max(maxMessages)
    .refine(
      (messages) => messages.some((m) => m.role === 'user'),
      'At least one user message is required',
    ),
});

export type AskRequestParsed = z.infer<typeof askRequestSchema>;

export const isAskRequestBody = (value: unknown): value is AskRequestBody =>
  askRequestSchema.safeParse(value).success;
