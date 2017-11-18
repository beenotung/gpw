import {q} from "@beenotung/tslib";
import {version} from "./config";
import {log} from "./debug";

log("version:", version);

let input = q('input[type=file]') as HTMLInputElement;
input.onchange = ev => {
  log("files:", input.files);
};
