const noop: any = () => {
};

function take(log: Function) {
  let name = log.name;
  if (log.bind) {
    return log.bind(console)
  } else {
    return function () {
      return (console as any)[name].apply(console, arguments)
    }
  }
}

export type mode = "dev" | "test" | "prod";
export let mode: mode = "dev" as mode;
export let log = mode === "prod" ? noop : take(console.log);
export let debug = mode === "prod" ? noop : take(console.debug);
export let warn = mode === "prod" ? noop : take(console.warn);
