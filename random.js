export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function uuid() {
  let _rnds = new Array(16);
  let _rng = function () {
    for (let i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }
    return _rnds;
  };
  // Maps for number <-> hex string conversion
  let _byteToHex = [];

  for (let i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  }
  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    let i = offset || 0;
    let bth = _byteToHex;

    return bth[buf[i++]] + bth[buf[i++]] +
      bth[buf[i++]] + bth[buf[i++]] + '-' +
      bth[buf[i++]] + bth[buf[i++]] + '-' +
      bth[buf[i++]] + bth[buf[i++]] + '-' +
      bth[buf[i++]] + bth[buf[i++]] + '-' +
      bth[buf[i++]] + bth[buf[i++]] +
      bth[buf[i++]] + bth[buf[i++]] +
      bth[buf[i++]] + bth[buf[i]];
  }

  let rnds = _rng();
  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;
  return unparse(rnds);
};
