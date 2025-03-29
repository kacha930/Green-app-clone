// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
    contactList: [
        {
            id: 1,
            name: "Harry Kane",
            profilePic: "/profile/profilephoto.jpeg",
            lastText: "Hey Man",
            lastTextTime: "12:58 PM",
        },
        {
            id: 2,
            name: "Kulusevski",
            profilePic: "/profile/pp1.png",
            lastText: `what's going on bro`,
            lastTextTime: "12:45 PM",
        },
        {
            id: 3,
            name: "Bentacur",
            profilePic: "/profile/pp2.png",
            lastText: "Let's go out?",
            lastTextTime: "12:30 PM",
        },
        {
            id: 4,
            name: "Romero",
            profilePic: "/profile/pp3.jpeg",
            lastText: "No broo",
            lastTextTime: "12:00 PM",
        },
        {
            id: 5,
            name: "Son Heung-min",
            profilePic: "/profile/pp4.png",
            lastText: "On my way!",
            lastTextTime: "11:45 AM",
        },
        {
            id: 6,
            name: "Richarlison",
            profilePic: "/profile/pp5.png",
            lastText: "Can't wait for the match",
            lastTextTime: "11:30 AM",
        },
        {
            id: 7,
            name: "Dejan",
            profilePic: "/profile/pp6.png",
            lastText: "Hey, are we still on for tonight?",
            lastTextTime: "11:10 AM",
        },
        {
            id: 8,
            name: "Lloris",
            profilePic: "/profile/pp7.png",
            lastText: "Need to talk about training",
            lastTextTime: "10:45 AM",
        },
        {
            id: 9,
            name: "Lucas Moura",
            profilePic: "/profile/pp8.png",
            lastText: "Meet at the usual spot?",
            lastTextTime: "10:20 AM",
        },
        {
            id: 10,
            name: "Eric Dier",
            profilePic: "/profile/pp9.png",
            lastText: "Let's catch up soon",
            lastTextTime: "09:50 AM",
        },
    ],
    messagesList: [
        {
            id: 1,
            messageType: "TEXT",
            text: "Hello",
            senderID: 0,
            addedOn: "12:00 PM",
        },
        {
            id: 2,
            messageType: "TEXT",
            text: "What's up?",
            senderID: 1,
            addedOn: "12:01 PM",
        },
        {
            id: 3,
            messageType: "TEXT",
            text: "All good, What about you?",
            senderID: 0,
            addedOn: "12:02 PM",
        },
        {
            id: 4,
            messageType: "TEXT",
            text: "I'm good as well",
            senderID: 1,
            addedOn: "12:03 PM",
        },
        {
            id: 5,
            messageType: "TEXT",
            text: "Great 😁",
            senderID: 0,
            addedOn: "12:04 PM",
        },
        {
            id: 6,
            messageType: "TEXT",
            text: "Subscribed to my channel",
            senderID: 1,
            addedOn: "12:05 PM",
        },
        {
            id: 7,
            messageType: "TEXT",
            text: "Have you seen the new episode?",
            senderID: 0,
            addedOn: "12:10 PM",
        },
        {
            id: 8,
            messageType: "TEXT",
            text: "Yes, it was amazing!",
            senderID: 1,
            addedOn: "12:12 PM",
        },
        {
            id: 9,
            messageType: "TEXT",
            text: "Let's watch together next time!",
            senderID: 0,
            addedOn: "12:15 PM",
        },
        {
            id: 10,
            messageType: "TEXT",
            text: "For sure, I'll bring snacks!",
            senderID: 1,
            addedOn: "12:20 PM",
        },
        {
            id: 11,
            messageType: "TEXT",
            text: "When are you free?",
            senderID: 0,
            addedOn: "12:25 PM",
        },
        {
            id: 12,
            messageType: "TEXT",
            text: "How about this Friday?",
            senderID: 1,
            addedOn: "12:30 PM",
        },
        {
            id: 13,
            messageType: "TEXT",
            text: "Perfect! See you then.",
            senderID: 0,
            addedOn: "12:35 PM",
        },
    ],
    selectedContact: null,
    setSelectedContact: (contact) => set(() => ({ selectedContact: contact })),

    // Method to update the `contactList` state
    updateContactList: (newContactList) => set(() => ({ contactList: newContactList })),

    // Method to update the `messagesList` state
    updateMessagesList: (newMessagesList) => set(() => ({ messagesList: newMessagesList })),
}));

export default useStore;
