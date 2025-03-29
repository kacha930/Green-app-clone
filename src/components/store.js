import { create } from 'zustand';
import { getTime } from '../logic/whatsapp'; // Import getTime for time formatting

const useStore = create((set) => ({
    contactList: [
        {
            id: 1,
            name: "Harry Kane",
            profilePic: "/profile/profilephoto.jpeg",
            lastText: "Hey Man",
            lastTextTime: getTime("12:58 PM"), // Format the time using getTime
        },
        {
            id: 2,
            name: "Kulusevski",
            profilePic: "/profile/pp1.png",
            lastText: `what's going on bro`,
            lastTextTime: getTime("12:45 PM"), // Format the time using getTime
        },
        {
            id: 3,
            name: "Bentacur",
            profilePic: "/profile/pp2.png",
            lastText: "Let's go out?",
            lastTextTime: getTime("12:30 PM"), // Format the time using getTime
        },
        {
            id: 4,
            name: "Romero",
            profilePic: "/profile/pp3.jpeg",
            lastText: "No broo",
            lastTextTime: getTime("12:00 PM"), // Format the time using getTime
        },
        {
            id: 5,
            name: "Son Heung-min",
            profilePic: "/profile/pp4.png",
            lastText: "On my way!",
            lastTextTime: getTime("11:45 AM"), // Format the time using getTime
        },
        {
            id: 6,
            name: "Richarlison",
            profilePic: "/profile/pp5.png",
            lastText: "Can't wait for the match",
            lastTextTime: getTime("11:30 AM"), // Format the time using getTime
        },
        {
            id: 7,
            name: "Dejan",
            profilePic: "/profile/pp6.png",
            lastText: "Hey, are we still on for tonight?",
            lastTextTime: getTime("11:10 AM"), // Format the time using getTime
        },
        {
            id: 8,
            name: "Lloris",
            profilePic: "/profile/pp7.png",
            lastText: "Need to talk about training",
            lastTextTime: getTime("10:45 AM"), // Format the time using getTime
        },
        {
            id: 9,
            name: "Lucas Moura",
            profilePic: "/profile/pp8.png",
            lastText: "Meet at the usual spot?",
            lastTextTime: getTime("10:20 AM"), // Format the time using getTime
        },
        {
            id: 10,
            name: "Eric Dier",
            profilePic: "/profile/pp9.png",
            lastText: "Let's catch up soon",
            lastTextTime: getTime("09:50 AM"), // Format the time using getTime
        },
    ],
    messagesList: [
        {
            id: 1,
            messageType: "TEXT",
            text: "Hello",
            senderID: 0,
            addedOn: getTime("12:00 PM"), // Format the time using getTime
        },
        {
            id: 2,
            messageType: "TEXT",
            text: "What's up?",
            senderID: 1,
            addedOn: getTime("12:01 PM"), // Format the time using getTime
        },
        {
            id: 3,
            messageType: "TEXT",
            text: "All good, What about you?",
            senderID: 0,
            addedOn: getTime("12:02 PM"), // Format the time using getTime
        },
        {
            id: 4,
            messageType: "TEXT",
            text: "I'm good as well",
            senderID: 1,
            addedOn: getTime("12:03 PM"), // Format the time using getTime
        },
        {
            id: 5,
            messageType: "TEXT",
            text: "Great 😁",
            senderID: 0,
            addedOn: getTime("12:04 PM"), // Format the time using getTime
        },
        {
            id: 6,
            messageType: "TEXT",
            text: "Subscribed to my channel",
            senderID: 1,
            addedOn: getTime("12:05 PM"), // Format the time using getTime
        },
        {
            id: 7,
            messageType: "TEXT",
            text: "Have you seen the new episode?",
            senderID: 0,
            addedOn: getTime("12:10 PM"), // Format the time using getTime
        },
        {
            id: 8,
            messageType: "TEXT",
            text: "Yes, it was amazing!",
            senderID: 1,
            addedOn: getTime("12:12 PM"), // Format the time using getTime
        },
        {
            id: 9,
            messageType: "TEXT",
            text: "Let's watch together next time!",
            senderID: 0,
            addedOn: getTime("12:15 PM"), // Format the time using getTime
        },
        {
            id: 10,
            messageType: "TEXT",
            text: "For sure, I'll bring snacks!",
            senderID: 1,
            addedOn: getTime("12:20 PM"), // Format the time using getTime
        },
        {
            id: 11,
            messageType: "TEXT",
            text: "When are you free?",
            senderID: 0,
            addedOn: getTime("12:25 PM"), // Format the time using getTime
        },
        {
            id: 12,
            messageType: "TEXT",
            text: "How about this Friday?",
            senderID: 1,
            addedOn: getTime("12:30 PM"), // Format the time using getTime
        },
        {
            id: 13,
            messageType: "TEXT",
            text: "Perfect! See you then.",
            senderID: 0,
            addedOn: getTime("12:35 PM"), // Format the time using getTime
        },
    ],
    selectedContact: null,
    setSelectedContact: (contact) => set(() => ({ selectedContact: contact })),

    // Method to update the `contactList` state
    updateContactList: (newContactList) => {
        // Apply `getTime` for formatting the times in the new contact list
        const formattedContacts = newContactList.map((contact) => ({
            ...contact,
            lastTextTime: getTime(contact.lastTextTime), // Format the lastTextTime
        }));
        set(() => ({ contactList: formattedContacts }));
    },

    // Method to update the `messagesList` state
    updateMessagesList: (newMessagesList) => {
        // Apply `getTime` for formatting the times in the new messages list
        const formattedMessages = newMessagesList.map((message) => ({
            ...message,
            addedOn: getTime(message.addedOn), // Format the addedOn time
        }));
        set(() => ({ messagesList: formattedMessages }));
    },
}));

export default useStore;
