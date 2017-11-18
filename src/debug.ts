import {noop} from "@beenotung/tslib";

export type mode = "dev" | "test" | "prod";
export let mode: mode = "dev" as mode;
export let log = mode === "prod" ? noop : console.log;
export let debug = mode === "prod" ? noop : console.debug;
export let warn = mode === "prod" ? noop : console.warn;
