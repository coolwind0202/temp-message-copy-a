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
  target.value = text;
}

const copy = (text) => {
  const output = document.getElementById("output");
  output.focus();
  output.select();
  document.execCommand("copy");

  /*
    navigator.clipboardを使用した場合は、ページにフォーカスし、かつコピーが発生後に再度フォーカスしている場合のみコピー可能。
    この場合、スマートフォンでのコピーは成功しなかった。

    document.execCommandを使用した場合、ユーザーの画面クリックなどの動作から5秒以内にコピーが行われた場合のみコピー可能。
    この場合、スマートフォンでのコピーに成功した。
  */
}

const connect = () => {
  const endpoint = getEndpoint(getHost(), getChannelId());
  const ws = new WebSocket(endpoint);

  alert("接続を開始しました。以降、");

  ws.onmessage = msg => {
    writeOutput(msg.data);
    copy(msg.data)
      .catch(e => {
        console.error(e);
        alert("メッセージのコピーに失敗しました。");
      });
  };
}