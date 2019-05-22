import React, { Component, useEffect, useState, useRef } from 'react';
import Message from './Message.js';
import Emote from './Emote.js';

const MessageBox = React.memo(
  ({ messages, emoteList, autoScroll, setAutoScroll }) => {
    const [maxScrollTop, setMaxScrollTop] = useState(null);
    const ref = useRef(null);

    const handleScroll = e => {
      const { scrollTop, scrollHeight } = e.target;

      if (scrollTop >= maxScrollTop) {
        setAutoScroll(true);
      } else {
        setAutoScroll(false);
      }
    };

    const scrollToBottom = () => {
      const messageBox = document.querySelector('.message-box');
      messageBox.scrollTop = messageBox.scrollHeight;
      setAutoScroll(true);
      setMaxScrollTop(messageBox.scrollTop);
    };

    useEffect(() => {
      if (autoScroll) {
        scrollToBottom();
      }
    });
    return (
      <>
        <div className='message-box' onScroll={handleScroll}>
          {messages.map(message => {
            let { text } = message;
            const { username } = message;
            let wordArr = text.split(' ');
            for (let i = wordArr.length - 1; i >= 0; i--) {
              if (emoteList[wordArr[i]]) {
                wordArr[i] = (
                  <Emote src={emoteList[wordArr[i]]} emoteName={wordArr[i]} />
                );
              } else {
                wordArr[i] = wordArr[i] + ' ';
              }
            }
            return <Message username={username} text={wordArr} />;
          })}
        </div>
        <div
          className={'bottom-text ' + (autoScroll ? '' : 'active')}
          onClick={scrollToBottom}
        >
          more messages below
        </div>
      </>
    );
  }
);

export default MessageBox;
