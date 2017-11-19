import {q} from "@beenotung/tslib/dom";
import {version} from "./config";
import {log} from "./debug";
import QRCode from "typestub-qrcode";
import {MD5, SHA256} from "crypto-js";

log("version:", version);

const url = q("#url")             as HTMLInputElement;
const domain = q("#domain")       as HTMLInputElement;
const seed = q("#seed")           as HTMLInputElement;
const method = q("#method")       as HTMLSelectElement;
const gpw = q('#gpw')             as HTMLButtonElement;
const password = q("#password")   as HTMLInputElement;
const msg = q('#msg')             as HTMLSpanElement;
const btnToClip = q('#btnToClip') as HTMLButtonElement;
const genQRcode = q('#genQRcode') as HTMLButtonElement;
const qrcode = q('#qrcode')       as HTMLCanvasElement;

url.onchange = () => {
  domain.value = url.value
    .toLowerCase()
    .split('/')
    .filter(x => x.length)
    .filter(x => !x.includes(':'))
    [0]
    .split('.')
    .filter(x => ["www", "com", "hk", "org", "net", "io", "org"].indexOf(x) == -1)
    .join('.')
  ;
};
method.onchange = () => {
  localStorage['method'] = method.value;
};
gpw.onclick = () => {
  let s = domain.value + seed.value + "\n";
  let hash = method.value == "md5" ? MD5 : SHA256;
  password.value = hash(s).toString();
};
btnToClip.onclick = () => {
  password.select();
  if (document.execCommand("copy")) {
    msg.textContent = 'copied to clipboard\n';
    msg.style.color = 'green';
  } else {
    msg.textContent = 'copy to clipboard is not supported, please copy it manually\n';
    msg.style.color = 'red';
  }
};
genQRcode.onclick = () => {
  QRCode.toCanvas(qrcode, password.value, err => {
    if (err) {
      msg.textContent = err;
      msg.style.color = 'red';
    }
  })
};

{
  let option = localStorage['method'];
  if (option) {
    method.value = option;
  }
}
