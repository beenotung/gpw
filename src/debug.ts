const noop: any = () => {
};

export type mode = "dev" | "test" | "prod";
export let mode: mode = "dev" as mode;
export let log = mode === "prod" ? noop : console.log.bind(console);
export let debug = mode === "prod" ? noop : console.debug.bind(console);
export let warn = mode === "prod" ? noop : console.warn.bind(console);
