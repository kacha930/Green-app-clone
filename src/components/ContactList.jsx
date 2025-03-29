import React, { useState } from 'react';
import styled from 'styled-components';
import useStore from './store';
import { getTime } from '../logic/whatsapp';
import { AiOutlineMessage } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 0.8;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h2`
  font-size: 24px;
  color: #333;
`;

const SearchBox = styled.div`
  display: flex;
  background: #f6f6f6;
  padding: 10px;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 16px;
  width: 100%;
  padding: 20px 0;
`;

const SearchIcon = styled.img`
  width: 28px;
  height: 28px;
  padding-left: 10px;
`;

export const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  padding-left: 15px;
  font-size: 17px;
  margin-left: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #f0f0f0;
  color: #000;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #ddd;
  }
`;

const ContactListContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  max-height: calc(100vh - 150px);
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f2f2f2;
  background: white;
  cursor: pointer;
  padding: 15px 12px;
`;

const ProfileIcon = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;

const ContactName = styled.span`
  width: 100%;
  font-size: 16px;
  color: black;
`;

const MessageText = styled.span`
  width: 20%;
  font-size: 14px;
  margin-top: 3px;
  color: rgba(0, 0, 0, 0.8);
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 19px;
`;

const ContactComponent = (props) => {
    const { userData } = props;
    const setSelectedContact = useStore((state) => state.setSelectedContact);

    const handleContactClick = () => {
        setSelectedContact(userData);
    };

    return (
        <ContactItem onClick={handleContactClick}>
            <ProfileIcon src={userData.profilePic} />
            <ContactInfo>
                <ContactName>{userData.name}</ContactName>
                <MessageText>{userData.lastText}</MessageText>
            </ContactInfo>
            <MessageText>{getTime(userData.lastTextTime)}</MessageText>
        </ContactItem>
    );
};

const ContactList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showUnread, setShowUnread] = useState(false);
    const contactList = useStore((state) => state.contactList);

    const filteredContacts = contactList.filter((userData) =>
        userData.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const unreadContacts = filteredContacts.filter(userData => userData.isUnread);

    const handleNewChatClick = () => {
        const userConfirmed = window.confirm("You are about to create a new chat. Do you want to proceed?");
        if (userConfirmed) {
            alert("New chat has been created!");
        }
    };

    return (
        <Container>
            <Header>
                <HeaderTitle>Chats</HeaderTitle>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <AiOutlineMessage size={24} style={{ cursor: 'pointer' }} onClick={handleNewChatClick} />
                    <GiHamburgerMenu size={24} style={{ cursor: 'pointer' }} />
                </div>
            </Header>
            <SearchBox>
                <SearchContainer>
                    <SearchIcon src={"/search-icon.svg"} />
                    <SearchInput
                        placeholder="Search or start new chat"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </SearchContainer>
            </SearchBox>

            <ButtonContainer>
                <Button onClick={() => setShowUnread(false)}>All Messages</Button>
                <Button onClick={() => setShowUnread(true)}>Unread Messages</Button>
            </ButtonContainer>

            <ContactListContainer>
                {showUnread
                    ? unreadContacts.length > 0
                        ? unreadContacts.map((userData) => (
                            <ContactComponent key={userData.id} userData={userData} />
                        ))
                        : <p>No unread messages</p>
                    : filteredContacts.length > 0
                        ? filteredContacts.map((userData) => (
                            <ContactComponent key={userData.id} userData={userData} />
                        ))
                        : <p>No contacts found</p>
                }
            </ContactListContainer>
        </Container>
    );
};

export default ContactList;
