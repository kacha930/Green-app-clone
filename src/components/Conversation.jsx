import React, { useState } from 'react';
import styled from 'styled-components';
import useStore from './store'; // Import Zustand store

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 2;
  background: #f6f7f8;
`;

const ConversationHeader = styled.div`
  display: flex;
  padding: 15px;
  background: #ededed;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContactName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const LastSeen = styled.span`
  font-size: 14px;
  color: grey;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #e5ddd6;
  padding: 15px;
  overflow-y: scroll;
  padding-bottom: 60px;  // To add space for the chatbox
`;

const MessageDiv = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isYours ? 'flex-end' : 'flex-start')};
  margin: 10px 0;
`;

const Message = styled.div`
  background: ${(props) => (props.isYours ? "#daf8cb" : "white")};
  max-width: 50%;
  color: #303030;
  padding: 8px 10px;
  font-size: 16px;
  border-radius: 7px;
  word-wrap: break-word;
  line-height: 1.4;
`;

const ChatBox = styled.div`
  display: flex;
  background: #ffffff;
  padding: 10px;
  align-items: center;
  border-top: 1px solid #ddd;
`;

const EmojiImage = styled.img`
  width: 30px;
  height: 28px;
  opacity: 0.4;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-left: 10px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  background-color: #f0f0f0;
  margin-left: 8px;
  font-size: 16px;
  outline: none;
`;

const SendButton = styled.button`
  background: #0084ff;
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  border: none;
  margin-left: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #0073e6;
  }
`;

const Conversation = () => {
    const selectedContact = useStore((state) => state.selectedContact); // Get selected contact from Zustand store
    const messagesList = useStore((state) => state.messagesList); // Fetch messages from Zustand store
    const updateMessagesList = useStore((state) => state.updateMessagesList); // Update messages list

    const [newMessage, setNewMessage] = useState("");

    // Function to handle sending a message
    const sendMessage = () => {
        if (newMessage.trim() !== "") {
            const message = {
                sender: 'You',
                text: newMessage,
                time: new Date().toLocaleTimeString(),
            };
            const updatedMessages = [...messagesList, message];
            updateMessagesList(updatedMessages); // Update the messages list with the new message
            setNewMessage(""); // Clear the input field
        }
    };

    if (!selectedContact) {
        return <Container>Please select a contact to start a conversation.</Container>;
    }

    return (
        <Container>
            <ConversationHeader>
                <ProfileImage src={selectedContact.profilePic} />
                <HeaderText>
                    <ContactName>{selectedContact.name}</ContactName>
                    <LastSeen>Last seen: {selectedContact.lastTextTime}</LastSeen>
                </HeaderText>
            </ConversationHeader>
            <MessageContainer>
                {messagesList.map((msg, index) => (
                    <MessageDiv key={index} isYours={msg.sender === 'You'}>
                        <Message isYours={msg.sender === 'You'}>
                            <strong>{msg.sender}: </strong>{msg.text}
                            <br />
                            <span>{msg.time}</span>
                        </Message>
                    </MessageDiv>
                ))}
            </MessageContainer>
            <ChatBox>
                <InputContainer>
                    <EmojiImage src={"/data.svg"} />
                    <SearchInput
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                </InputContainer>
                <SendButton onClick={sendMessage}>Send</SendButton>
            </ChatBox>
        </Container>
    );
};

export default Conversation;
