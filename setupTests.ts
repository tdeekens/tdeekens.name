import {
  ReadableStream,
  TransformStream,
  WritableStream,
} from 'node:stream/web';
import { TextDecoder, TextEncoder } from 'node:util';
// The /jest-globals entry point extends the `expect` imported from
// @jest/globals rather than a global one, and carries the matcher type
// augmentation with it. Because this file is TypeScript and covered by
// tsconfig, that augmentation applies to every test.
import '@testing-library/jest-dom/jest-globals';

const globals = globalThis as unknown as Record<string, unknown>;

// jsdom ships neither web streams nor the text encoding globals, but
// @ai-sdk/react pulls in an SSE parser and a websocket helper that reach for
// both at module load. Node already has these, so this is a no-op under the
// node test environment.
globals.ReadableStream ??= ReadableStream;
globals.TransformStream ??= TransformStream;
globals.WritableStream ??= WritableStream;
globals.TextDecoder ??= TextDecoder;
globals.TextEncoder ??= TextEncoder;

// jsdom implements neither of these. Both are only used for presentation
// (autofocus on wide viewports, scrolling to a streaming answer), so stubs
// that report "narrow viewport" and do nothing are enough.
if (typeof window !== 'undefined') {
  window.matchMedia ??= (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
  Element.prototype.scrollIntoView ??= () => {};
}
