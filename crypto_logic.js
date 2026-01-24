function railEncrypt(text, key) {
  let rails = Array.from({ length: key }, () => "");
  let dir = 1, row = 0;
  for (let c of text) {
      rails[row] += c;
      if (row === 0) dir = 1;
      else if (row === key - 1) dir = -1;
      row += dir;
  }
  return rails.join("");
}

function railDecrypt(cipher, key) {
  let pattern = [];
  let dir = 1, row = 0;
  for (let i = 0; i < cipher.length; i++) {
      pattern.push(row);
      if (row === 0) dir = 1;
      else if (row === key - 1) dir = -1;
      row += dir;
  }

  let rails = Array(key).fill(0);
  pattern.forEach(r => rails[r]++);

  let pos = 0;
  let railArr = rails.map(r => cipher.slice(pos, pos += r).split(""));
  let result = "";
  pattern.forEach(r => result += railArr[r].shift());
  return result;
}

function otpEncrypt(text, key) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
      out += String.fromCharCode(
          text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
  }
  return btoa(out);
}

function otpDecrypt(cipher, key) {
  let text = atob(cipher);
  let out = "";
  for (let i = 0; i < text.length; i++) {
      out += String.fromCharCode(
          text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
  }
  return out;
}

function encrypt(msg, key, method) {
  if (method === "rail") return railEncrypt(msg, parseInt(key));
  if (method === "otp") return otpEncrypt(msg, key);
}

function decrypt(cipher, key, method) {
  if (method === "rail") return railDecrypt(cipher, parseInt(key));
  if (method === "otp") return otpDecrypt(cipher, key);
}
