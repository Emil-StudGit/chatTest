import { useEffect, useState } from 'react'
import './App.css'
import io, { Socket } from 'socket.io-client'
import MessageInput from './MessageInput'
import CreateChanInput from './CreateChanInput'
import JoinChanInput from './JoinChanInput'
import ToggleChanInput from './ToggleChanInput'
import Message from './Message'

let activeChan: string = '';
let chans : Map<string, string[]> = new Map<string, string[]>()

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [publicChanList, setPublicChan] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  
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
  
  const refreshList = () => {
    socket?.emit("getListOfChan");
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
    setMessages(['']);
  }

  const joinChanListener = (chan: string) => {
    activeChan = chan;

    if (chans.get(chan) !== undefined) {
      setMessages(chans.get(chan) as string[]);
      return;
    }
    chans.set(chan, [""]);
    setMessages(['']);
  }

  const refreshListListener = (chans: string[]) => {
    setPublicChan(chans);
    socket?.emit('check', publicChanList)
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

  useEffect(() => {
    socket?.on("listOfChan", refreshListListener);
    return () => {
      socket?.off("listOfChan", refreshListListener);
    }
  }, [refreshListListener])


  return (
    <>
      {" "}
      <ToggleChanInput toggleChan={toggleChan} chans={chans}/>
      <JoinChanInput joinChan={joinChan} publicChans={publicChanList}/>
      <CreateChanInput createChan={createChan}/>
      <MessageInput send={send}/>
      <Message messages = {messages}/>
    </>
  )
}

export default App
