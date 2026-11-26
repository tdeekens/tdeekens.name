type Level = 'debug' | 'info' | 'warn' | 'error';

export type LogFields = Record<string, unknown>;

export type Log = Record<
  Level,
  (fields: LogFields, message: string) => void
> & {
  child: (fields: LogFields) => Log;
};

const serialize = (value: unknown) =>
  value instanceof Error
    ? { name: value.name, message: value.message, stack: value.stack }
    : value;

/** Structured JSON lines on stdout, readable in the host's log viewer. */
export const createLog = (base: LogFields = {}): Log => {
  const write = (level: Level) => (fields: LogFields, message: string) => {
    const entry: Record<string, unknown> = {
      level,
      time: new Date().toISOString(),
      service: 'tdeekens-name',
      ...base,
      msg: message,
    };
    for (const [key, value] of Object.entries(fields)) {
      entry[key] = serialize(value);
    }
    const line = JSON.stringify(entry);
    if (level === 'error') {
      console.error(line);
    } else if (level === 'warn') {
      console.warn(line);
    } else {
      console.log(line);
    }
  };
  return {
    debug: write('debug'),
    info: write('info'),
    warn: write('warn'),
    error: write('error'),
    child: (fields) => createLog({ ...base, ...fields }),
  };
};
