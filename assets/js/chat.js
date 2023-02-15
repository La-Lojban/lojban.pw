document.addEventListener("DOMContentLoaded", function () {
  var socket1Chat_connected;
  var socket1Chat = io("wss://jbotcan.org:9091", {
    transports: ["polling", "websocket"],
  });
  
  socket1Chat.on("connect", function () {
    console.log(socket1Chat);
    socket1Chat_connected = true;
  });
  
  socket1Chat.on("connect_error", function () {
    console.log("1chat connection error");
  });

  function trimSocketChunk(text) {
    return text.replace(/[\n\r]+$/gims, " ").replace(/<br *\/?>/gims, " ");
  }

  socket1Chat.on("sentFrom", function (data) {
    if (!socket1Chat_connected) return;
    var i = data.data;
    
    var msg = {
      d: trimSocketChunk(i.chunk),
      s: i.channelId,
      w: i.author,
    };

    var velsku = document.getElementById("velsku_sebenji");
    if (velsku) velsku.innerHTML = "<span class=\"velsku_pamei\">" + msg.w + ": " + msg.d + "</span>";
  });

  socket1Chat.on("history", function (data) {
    if (!socket1Chat_connected) return;
    var i = data.slice(-1)[0];
    if (!i) return;
    var msg = {
      d: trimSocketChunk(i.chunk),
      s: i.channelId,
      w: i.author,
    };
    var velsku = document.getElementById("velsku_sebenji");
    if (velsku) velsku.innerHTML = "<span class=\"velsku_pamei\">" + msg.w + ": " + msg.d + "</span>";
  });
});
