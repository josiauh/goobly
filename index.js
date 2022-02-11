function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}
function lz(m, t = 2, x = "0") { x = x.repeat(t); return (x + m).slice(-t) }
function tocsp(sec) {
 var d = ~~(sec / 86400);
 var h = ~~(sec / 3600) % 24;
 var m = ~~(sec / 60) % 60;
 var s = ~~(sec % 60);
 var res = lz(s) + "";
 res = lz(m) + ":" + res;
 if (h) {
  res = lz(h) + ":" + res;
  if (d) {
   res = d + "d " + res;
  }
 }
 return res;
}
const os = require("os")
// FS was here, but I don't need it.
const io = require("socket.io-client");
// VM was also here but we don't need to run isolations
const cfg = JSON.parse(require('./cfg.json'));

const tagt = '<style/confuse=node/html=parser/amogus>\n/* This is Taggy\'s Tags. */ nomsg { color: transparent; }\n matrix { color: green; background-color: black; }  '

const client = io("https://rmtrollbox.eu-gb.mybluemix.net/", {
  "force new": true
})

client.on('connect', function(data) {
  client.emit('user joined', cfg.name + "[" + cfg.prefix + "]", cfg.color)
  client.send("Taggy, Manager for Tags and The Box!")
  client.send("Now Managing the tags.")
  client.send(tagt);
  client.send("Tags managed! So far we have:\nnomsg\nmatrix.");
})

client.on('message', function(data) {
   if (data.msg.startsWith(cfg.prefix)) {
      client.send("Hold my Code! The commands are not ready yet! Slow down!")
   }
})
