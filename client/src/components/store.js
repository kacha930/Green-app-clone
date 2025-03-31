import { create } from 'zustand';
import { getTime } from '../logic/whatsapp';

const useStore = create((set) => ({
    contactList: [
        {
            id: 1,
            name: "Harry Kane",
            profilePic: "/profile/pp4.png",
            lastTextTime: getTime("12:58 PM"),
        },
        {
            id: 2,
            name: "Kulusevski",
            profilePic: "/profile/pp1.png",
            lastTextTime: getTime("12:45 PM"),
        },
        {
            id: 3,
            name: "Bentacur",
            profilePic: "/profile/pp2.png",
            lastTextTime: getTime("12:30 PM"),
        }, {
            id: 5,
            name: "Son Heung-min",
            profilePic: "/profile/pp5.png",
            lastTextTime: getTime("11:45 AM"),
        },
        {
            id: 6,
            name: "Richarlison",
            profilePic: "/profile/pp6.png",
            lastTextTime: getTime("11:30 AM"),
        },
        {
            id: 7,
            name: "Dejan",
            profilePic: "/profile/pp7.png",
            lastTextTime: getTime("11:10 AM"),
        }, {
            id: 8,
            name: "Lloris",
            profilePic: "/profile/pp8.png",
            lastTextTime: getTime("10:45 AM"),
        },
        {
            id: 9,
            name: "Lucas Moura",
            profilePic: "/profile/pp9.png",
            lastTextTime: getTime("10:20 AM"),
        },
        {
            id: 10,
            name: "Eric Dier",
            profilePic: "/profile/pp10.png",
            lastTextTime: getTime("09:50 AM"),
        },
        {
            id: 11,
            name: "Micky vv",
            profilePic: "/profile/pp11.png",
            lastTextTime: getTime("09:30 AM"),
        },
        {
            id: 12,
            name: "Gareth Bale",
            profilePic: "/profile/pp12.png",
            lastTextTime: getTime("09:15 AM"),
        },
        {
            id: 13,
            name: "Pape Matar",
            profilePic: "/profile/pp13.png",
            lastTextTime: getTime("09:00 AM"),
        },
        {
            id: 14,
            name: "Gonzalo",
            profilePic: "/profile/pp14.png",
            lastTextTime: getTime("08:50 AM"),
        },
        {
            id: 15,
            name: "Harry Winks",
            profilePic: "/profile/pp15.png",
            lastTextTime: getTime("08:30 AM"),
        },
        {
            id: 16,
            name: "Sergio Reguilón",
            profilePic: "/profile/pp16.png",
            lastTextTime: getTime("08:00 AM"),
        },
        {
            id: 17,
            name: "Tanguy Ndombele",
            profilePic: "/profile/pp17.png",
            lastTextTime: getTime("07:45 AM"),
        },
        {
            id: 18,
            name: "Giovani Lo Celso",
            profilePic: "/profile/pp18.png",
            lastTextTime: getTime("07:30 AM"),
        },
        {
            id: 19,
            name: "Steven Bergwijn",
            profilePic: "/profile/pp19.png",
            lastTextTime: getTime("07:10 AM"),
        },
        {
            id: 20,
            name: "Brian Gil",
            profilePic: "/profile/pp20.png",
            lastTextTime: getTime("07:00 AM"),
        },
    ],

        
    messages: {}, 

    selectedContact: null,

    setSelectedContact: (contact) => set((state) => {
        if (contact) {
            return {
                selectedContact: contact,
            };
        } else {
            return { selectedContact: null };
        }
    }),

    sendMessage: (contactName, newMessage) => set((state) => {
        if (!newMessage.trim()) return; 

        const newMsg = {
            sender: 'You',
            text: newMessage,
            time: getTime(new Date()),  
        };

        const updatedMessages = {
            ...state.messages,
            [contactName]: [...(state.messages[contactName] || []), newMsg]
        };

        return {
            messages: updatedMessages, 
        };
    }),
}));

export default useStore;
