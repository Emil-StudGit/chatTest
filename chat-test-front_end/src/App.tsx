import { useEffect, useState } from 'react'
import './App.css'
import io, { Socket } from 'socket.io-client'
import Error from './Error'
import MessageInput from './MessageInput'
import CreateChanInput from './CreateChanInput'
import JoinChanInput from './JoinChanInput'
import ToggleChanInput from './ToggleChanInput'
import Message from './Message'
import Chat from './Chat'

let activeChan: string = '';
let chans : Map<string, string[]> = new Map<string, string[]>()

function App() {
/*  const [socket, setSocket] = useState<Socket>();
  const [publicChanList, setPublicChan] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [errorToShow, setErrorToShow] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  
  const send = (value: string) => {
    setErrorToShow(false);
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

  const errorListener = (error : string) => {
    setErrorToShow(true);
    setError(error);
  }

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
  }

  useEffect(() => {
    socket?.on("error", errorListener);
    return () => {
      socket?.off("error", errorListener);
    }
  }, [errorListener])

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
      <Error isShown={errorToShow} error={error} close={setErrorToShow}/>
      <ToggleChanInput toggleChan={toggleChan} chans={chans}/>
      <JoinChanInput joinChan={joinChan} publicChans={publicChanList}/>
      <CreateChanInput createChan={createChan}/>
      <MessageInput send={send}/>
      <Message messages = {messages}/>
    </>
  )
*/
  return (
    <>
      {" "}
      <Chat/>
    </>
  )
}

export default App
