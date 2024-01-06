//


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
const fs = require('fs')
const io = require("socket.io-client");
// VM was also here but we don't need to run isolations lol
const cfg = {
  "name": "Goobly",
  "prefix": "g!",
  "color": "#4AAA45"
}
function command(base) {
   return cfg.prefix + base
}

const client = io("http://www.windows93.net:8081", {
  path: '/socket.io',
  transportOptions: {
    polling: {
      extraHeaders: {
        "Origin": "http://www.windows93.net",
        "Referer": "http://www.windows93.net/trollbox/index.php"
      }
    }
  }
})

client.on('connect', function(data) {
  client.emit('user joined', cfg.name + "[" + cfg.prefix + "]", cfg.color)
  client.send("hello")
})

client.on('message', function(data) {
   var argsl = data.msg.split(' ')
   argsl.shift();
   var args = argsl.join(' ')
   if (data.msg.includes("goober")) {
         client.send("goober indeed")
   }
    if (data.msg.startsWith(command("help"))) {
        client.send(`
            This is goobly.
            * goober *: goober indeed. 
        `)
    }
})
