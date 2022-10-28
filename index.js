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
   "color": "#c4fffe",
   "prefix": "t*",
   "name": "Taggy"
}
function command(base) {
   return cfg.prefix + base
}

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
   var argsl = data.msg.split(' ')
   argsl.shift();
   var args = argsl.join(' ')
   if (data.msg.startsWith(cfg.prefix)) {
      console.log(argsl)
      if (data.msg.startsWith(command("help"))) {
        if (args == '') {
          client.send("Taggy Night v1.2\nt*req ^request^ - Request anything\nt*help ^command^ $ - Show this.\nJosiah 2022, the red one, goes on both tbparty and rmtb, you know?\ncommands marked $ will not be able to be used with the command argument in the t*help.")
        } else {
          if (args == "req") {
             client.send("Usage:\nt*req ^request^\nWhat does it do, in developer?\nUses the FS package to make a line in a text file named requests.txt with the exact arguments.\nWhat does it do, in normal?\n Writes the arguments to a requests file.")
          } else {
             client.send("Not valid! Is this marked $ or in the t*help message?")
          }
        } 
      } else if (data.msg.startsWith(command("req"))) {
          fs.appendFile('requests.txt', args + "\n", err => {
             if (err) {
                client.send("Did you know that *" + err + "*?")
                return
             }
             client.send("Done!")
          })
        } else {
          client.send("Not valid! Is this in the t*help message?")
        }
   }
})
