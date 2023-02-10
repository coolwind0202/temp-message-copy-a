const getEndpoint = (host, channelId) => {
  return `ws://${host}:3000/connect?channelId=${channelId}`;
}

const getHost = () => {
  const input = document.getElementById("host");
  return input.value;
}

const getChannelId = () => {
  const input = document.getElementById("channel-id");
  return input.value;
}

const writeOutput = (text) => {
  const target = document.getElementById("output");
  target.value += `${text}\n`;
}

const copy = (text) => {
  return navigator.clipboard.writeText(text);
}

const connect = () => {
  const endpoint = getEndpoint(getHost(), getChannelId());
  const ws = new WebSocket(endpoint);

  alert("接続を開始しました。以降、このページだけを見てください。");

  ws.onmessage = msg => {
    writeOutput(msg.data);
    copy(msg.data)
      .catch(e => {
        console.error(e);
        alert("メッセージのコピーに失敗しました。");
      });
  };
}