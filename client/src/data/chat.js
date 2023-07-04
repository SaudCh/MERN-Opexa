const chats = [
    {
        name: "John Doe",
        id: 'bac213',
        lastMessage: "Hello!",
        time: "10:30 AM",
        lastOnline: "Just Now",
        messages: [
            {
                id: generateRandomId(),
                message: "Hello!",
                time: "10:30 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "How are you?",
                time: "10:35 AM",
                senderId: 2
            },
            // Additional messages
            {
                id: generateRandomId(),
                message: "I'm good. What about you?",
                time: "10:40 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "I'm doing well, thanks!",
                time: "10:45 AM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "That's great to hear!",
                time: "10:50 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "By the way, did you finish the report?",
                time: "10:55 AM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "Yes, I completed it yesterday.",
                time: "11:00 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "Awesome! Let's meet later to discuss it.",
                time: "11:05 AM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "Sure, let's meet at 2 PM.",
                time: "11:10 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "Sounds good! See you then.",
                time: "11:15 AM",
                senderId: 2
            }
        ]
    },
    {
        name: "Jane Smith",
        id: 'sqohw1',
        lastMessage: "Hi!",
        time: "11:00 AM",
        lastOnline: "One Hour Ago",
        messages: [
            {
                id: generateRandomId(),
                message: "Hi!",
                time: "11:00 AM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "I'm doing well, thank you!",
                time: "11:05 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "What are your plans for the weekend?",
                time: "11:10 AM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "I'm thinking of going hiking. How about you?",
                time: "11:15 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "I might visit some art galleries.",
                time: "11:20 AM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "That sounds interesting! Have a great time.",
                time: "11:25 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "Thank you! Enjoy your hike!",
                time: "11:30 AM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "I will. Take care!",
                time: "11:35 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "You too!",
                time: "11:40 AM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "See you on Monday!",
                time: "11:45 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "Definitely! Have a great weekend!",
                time: "11:50 AM",
                senderId: 2
            }
        ]
    },
    {
        name: "Alice Brown",
        id: 'sqohsa1',
        lastMessage: "Hey there!",
        time: "2:15 PM",
        lastOnline: "Now Online",
        messages: [
            {
                id: generateRandomId(),
                message: "Hey!",
                time: "2:15 PM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "How have you been?",
                time: "2:20 PM",
                senderId: 2
            },
            // Additional messages
            {
                id: generateRandomId(),
                message: "I've been great! How about you?",
                time: "2:25 PM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "I've been busy with work, but otherwise doing well.",
                time: "2:30 PM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "That's good to hear. Any exciting plans for the weekend?",
                time: "2:35 PM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "Not really. Just planning to relax and catch up on some reading.",
                time: "2:40 PM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "Sounds nice! Enjoy your weekend.",
                time: "2:45 PM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "Thanks! You too.",
                time: "2:50 PM",
                senderId: 1
            }
        ]
    },
    {
        name: "Bob Johnson",
        id: 'swwmakjl',
        lastMessage: "Good morning!",
        time: "9:45 AM",
        lastOnline: "Yesterday",
        messages: [
            {
                id: generateRandomId(),
                message: "Good morning!",
                time: "9:45 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "How's your day going?",
                time: "9:50 AM",
                senderId: 2
            },
            // Additional messages
            {
                id: generateRandomId(),
                message: "It's going well so far. How about yours?",
                time: "9:55 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "Pretty busy, but nothing I can't handle.",
                time: "10:00 AM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "That's good to hear. Any exciting plans for the day?",
                time: "10:05 AM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "Not really. Just work and some errands.",
                time: "10:10 AM",
                senderId: 1
            },
            {
                id: generateRandomId(),
                message: "Well, I hope your day goes smoothly. Take care!",
                time: "10:15 AM",
                senderId: 2
            },
            {
                id: generateRandomId(),
                message: "Thank you! You too.",
                time: "10:20 AM",
                senderId: 1
            },

        ]
    },

];


function generateRandomId() {
    const idLength = 10;
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
    }
    return id;
}

export default chats;