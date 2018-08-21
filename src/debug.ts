const noop: any = () => {
};

/* tslint:disable:ban-types */
function take(log: Function) {
  /* tslint:enable:ban-types */
  const name = log.name;
  if (!log) {
    // in case console.debug or console.warn is not supported by old version of env
    log = console.log;
  }
  if (log.bind) {
    return log.bind(console);
  } else {
    return function () {
      return (console as any)[name].apply(console, arguments);
    };
  }
}

export type mode = "dev" | "test" | "prod";
export let mode: mode = "dev" as mode;
export let log = mode === "prod" ? noop : take(console.log);
export let debug = mode === "prod" ? noop : take(console.debug);
export let warn = mode === "prod" ? noop : take(console.warn);
