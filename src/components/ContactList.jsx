import React from 'react';
import styled from 'styled-components';
import useStore from './store'; // Import Zustand store
import { getTime } from '../logic/whatsapp'; // Import getTime to format time

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 0.8;
`;

const ProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 15px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
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

const ContactListContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;  /* Make the contact list scrollable */
  max-height: calc(100vh - 150px);  /* Adjust based on header and search box height */
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f2f2f2;
  background: white;
  cursor: pointer;
  padding: 15px 12px;
`;

const ProfileIcon = styled(ProfileImage)`
  width: 38px;
  height: 38px;
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
    const setSelectedContact = useStore((state) => state.setSelectedContact); // Get method from Zustand store

    const handleContactClick = () => {
        setSelectedContact(userData); // Update the selected contact in Zustand store
    };

    return (
        <ContactItem onClick={handleContactClick}>
            <ProfileIcon src={userData.profilePic} />
            <ContactInfo>
                <ContactName>{userData.name}</ContactName>
                <MessageText>{userData.lastText}</MessageText>
            </ContactInfo>
            {/* Format lastTextTime using getTime function */}
            <MessageText>{getTime(userData.lastTextTime)}</MessageText>
        </ContactItem>
    );
};

const ContactList = () => {
    // Use the Zustand store to get the contactList
    const contactList = useStore((state) => state.contactList);

    return (
        <Container>
            <ProfileInfoDiv>
                <ProfileImage src="/profile/profilephoto.jpeg" />
            </ProfileInfoDiv>
            <SearchBox>
                <SearchContainer>
                    <SearchIcon src={"/search-icon.svg"} />
                    <SearchInput placeholder="Search or start new chat" />
                </SearchContainer>
            </SearchBox>
            <ContactListContainer>
                {contactList.map((userData) => (
                    <ContactComponent key={userData.id} userData={userData} />
                ))}
            </ContactListContainer>
        </Container>
    );
};

export default ContactList;
