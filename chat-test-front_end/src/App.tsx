import { useEffect, useState } from 'react'
import './App.css'
import io, { Socket } from 'socket.io-client'
import MessageInput from './MessageInput'
import CreateChanInput from './CreateChanInput'
import JoinChanInput from './JoinChanInput'
import ToggleChanInput from './ToggleChanInput'
import Message from './Message'
import Channel from './Channel'

let activeChan: string = '';
let chans : Map<string, string[]> = new Map<string, string[]>()

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const [channels, setChannels] = useState<Map<string, string[]>>(new Map<string, string[]>());
  
  const send = (value: string) => {
    socket?.emit("msgToServer", {author: socket?.id, chan: activeChan, msg: value})
  }

  const createChan = (value: string) => {
    if (chans.get(value) !== undefined)
      return;
    socket?.emit("createChan", value)
  }

  const joinChan = (value: string) => {
    if (chans.get(value) !== undefined)
      return;
    socket?.emit("joinChan", value)
  }

  const toggleChan = (value: string) => {
    if (chans.get(value) !== undefined) {
      activeChan = value;
      setMessages(chans.get(activeChan) as string[]);
    }
  }

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);
  }, [setSocket])

  const messageListener = (data: {author: string, chan: string, msg: string}) => {
    let chanMessages : string[] = chans.get(data.chan) as string[];
    chans.set(data.chan, [...chanMessages, ...[data.author + ': ' + data.msg]]);
    
    setMessages(chans.get(activeChan) as string[]);
  }

  const createChanListener = (chan: string) => {
    activeChan = chan;
    chans.set(chan, [""]);
    setChannels(chans);
    setMessages(['']);
  }

  const joinChanListener = (chan: string) => {
    activeChan = chan;

    if (chans.get(chan) !== undefined) {
      setMessages(chans.get(chan) as string[]);
      return;
    }
    chans.set(chan, [""]);
    setChannels(chans);
    setMessages(['']);
  }

  useEffect(() => {
    socket?.on("msgToClient", messageListener);
    return () => {
      socket?.off("msgToClient", messageListener);
    }
  }, [messageListener])

  useEffect(() => {
    socket?.on("createdChan", createChanListener);
    return () => {
      socket?.off("createdChan", createChanListener);
    }
  }, [createChanListener])

  useEffect(() => {
    socket?.on("joinedChan", joinChanListener);
    return () => {
      socket?.off("joinedChan", joinChanListener);
    }
  }, [joinChanListener])

  return (
    <>
      {" "}
      <Channel channels = {channels}/>
      <ToggleChanInput toggleChan={toggleChan}/>
      <JoinChanInput joinChan={joinChan}/>
      <CreateChanInput createChan={createChan}/>
      <MessageInput send={send}/>
      <Message messages = {messages}/>
    </>
  )
}

export default App
