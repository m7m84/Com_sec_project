const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789";
const m = chars.length;

function modInverse(a, m) {
  a = a % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return -1;
}

function encrypt() {
  const text = document.getElementById("inputText").value.toUpperCase();
  const a = parseInt(document.getElementById("keyA").value);
  const b = parseInt(document.getElementById("keyB").value);

  let result = "";

  for (let char of text) {
    let index = chars.indexOf(char);
    if (index !== -1) {
      let enc = (a * index + b) % m;
      result += chars[enc];
    } else {
      result += char;
    }
  }

  document.getElementById("outputText").value = result;
}

function decrypt() {
  const text = document.getElementById("inputText").value.toUpperCase();
  const a = parseInt(document.getElementById("keyA").value);
  const b = parseInt(document.getElementById("keyB").value);

  const a_inv = modInverse(a, m);
  if (a_inv === -1) {
    alert("Key 'a' has no modular inverse. Choose another.");
    return;
  }

  let result = "";

  for (let char of text) {
    let index = chars.indexOf(char);
    if (index !== -1) {
      let dec = (a_inv * (index - b + m)) % m;
      result += chars[dec];
    } else {
      result += char;
    }
  }

  document.getElementById("outputText").value = result;
}