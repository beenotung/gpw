import {version} from "./config";
import {log} from "./debug";
import QRCode from "typestub-qrcode";
import {MD5, SHA256} from "crypto-js";

log("version:", version);

/* skip when ran by travis-ci */
if (typeof document !== "undefined") {
const q = (x: string, parent: HTMLElement = document.body): HTMLElement => parent.querySelector(x);

const url = q("#url")             as HTMLInputElement;
const domain = q("#domain")       as HTMLInputElement;
const seed = q("#seed")           as HTMLInputElement;
const method = q("#method")       as HTMLSelectElement;
const length = q("#length")       as HTMLInputElement;
const gpw = q("#gpw")             as HTMLButtonElement;
const password = q("#password")   as HTMLInputElement;
const msg = q("#msg")             as HTMLSpanElement;
const btnToClip = q("#btnToClip") as HTMLButtonElement;
const genQRcode = q("#genQRcode") as HTMLButtonElement;
const qrcode = q("#qrcode")       as HTMLCanvasElement;

const default_length: { [method: string]: number } = {
  md5: 32
, sha256: 64
};

url.onchange = () => {
  let s = url.value
    .toLowerCase()
    .split("/")
    .filter(x => x.length)
    .filter(x => !x.includes(":"))
    [0]
    .split(".")
    .filter(x => ["www", "com", "hk", "org", "net", "io", "org"].indexOf(x) == -1)
    .join(".")
    .trim()
  ;
  function checkPrefix(prefix: string) {
    const pattern = prefix + ".";
    if (s.startsWith(pattern) && s.length > pattern.length) {
      s = s.substring(pattern.length);
    }
  }
  checkPrefix("mail");
  checkPrefix("app");
  checkPrefix("account");
  checkPrefix("accounts");
  checkPrefix("my");
  checkPrefix("login");
  checkPrefix("id");
  checkPrefix("auth0");
  domain.value = s;
};
method.onchange = () => {
  const m = localStorage["method"] = method.value;
  length.value = default_length[m].toString();
};
gpw.onclick = () => {
  const s = domain.value + seed.value + "\n";
  const m = method.value;
  const hash = m == "md5" ? MD5 : SHA256;
  let res = hash(s).toString();
  const len = (+length.value) || default_length[m];
  for (; res.length < len; res += hash(res + "\n").toString()) {  }
  res = res.slice(0, len);
  password.value = res;
};
btnToClip.onclick = () => {
  password.select();
  if (document.execCommand("copy")) {
    msg.textContent = "copied to clipboard\n";
    msg.style.color = "green";
  } else {
    msg.textContent = "copy to clipboard is not supported, please copy it manually\n";
    msg.style.color = "red";
  }
};
genQRcode.onclick = () => {
  QRCode.toCanvas(qrcode, password.value, err => {
    if (err) {
      msg.textContent = err;
      msg.style.color = "red";
    }
  });
};

/* init */
{
  const option = localStorage["method"] || "sha256";
  method.value = option;
  length.value = default_length[option].toString();
  q("#not_supported").remove();
  q("table").style.display = "";
}
}
