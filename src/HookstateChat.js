import ChatBox from 'react-custom-chat';
import '@hookstate/devtools';
import { useState } from '@hookstate/core';
import store from './store';


const FirstPerson = () => {
  const { firstPersonMessageList, secondPersonMessageList } = useState(store);

  const handleSendMessage = newMessage => {
    firstPersonMessageList.merge([{text: newMessage, person: 'primary'}])
    setTimeout(() => {
      secondPersonMessageList.merge([{text: newMessage, person: 'secondary'}])
    }, 500)
  }

  return (
    <ChatBox
      messageList={firstPersonMessageList.get()}
      onSendMessage={handleSendMessage} // do something with newMessage
      settings={{
        position: 'left',
        navColor: 'green',
        navText: 'Mycroft'
      }}
    />
  )
}

const SecondPerson = () => {
    const { firstPersonMessageList, secondPersonMessageList } = useState(store);

    const handleSendMessage = newMessage => {
        secondPersonMessageList.merge([{text: newMessage, person: 'primary'}])
        setTimeout(() => {
            firstPersonMessageList.merge([{text: newMessage, person: 'secondary'}])
        }, 500)
      }

    return (
      <ChatBox
        messageList={secondPersonMessageList.get()}
        onSendMessage={handleSendMessage}
        settings={{
          position: 'right',
          navColor: 'blue',
          navText: 'Cortana'
        }}
      />
    )
  }

const HookstateChat = () => {
    return (
        <>
            <FirstPerson />
            <SecondPerson />
        </>
    )
}

export default HookstateChat;

