import {
  ReadableStream,
  TransformStream,
  WritableStream,
} from 'node:stream/web';
import { TextDecoder, TextEncoder } from 'node:util';

// Extends Vitest's `expect` with the DOM matchers and their types.
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Testing Library only auto-unmounts when test globals are enabled.
afterEach(() => cleanup());

// SAFETY: only used to fill in missing globals by name below; every key it
// touches is checked with `??=` and assigned a Node built-in of the right type.
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

// After every user-event step Testing Library awaits a `setTimeout(0)` and
// only advances it under fake timers when it finds a `jest` global. Without
// this shim, tests using `vi.useFakeTimers()` hang on the first interaction.
globals.jest ??= {
  advanceTimersByTime: (ms: number) => vi.advanceTimersByTime(ms),
};

// jsdom lacks the modal dialog API; mimic the open/close/close-event bits.
function showModalStub(this: HTMLDialogElement) {
  this.setAttribute('open', '');
}
function closeStub(this: HTMLDialogElement) {
  this.removeAttribute('open');
  this.dispatchEvent(new Event('close'));
}

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
  HTMLDialogElement.prototype.showModal ??= showModalStub;
  HTMLDialogElement.prototype.close ??= closeStub;
}
