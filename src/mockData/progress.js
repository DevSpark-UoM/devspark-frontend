// src/mockData/progress.js

export const FAQ_DATA = [
    { question: "What are the school hours?", answer: "School Hours: 8:00 AM to 4:00 PM, Monday to Friday." },
    { question: "How do I contact the teacher?", answer: "Contact Teacher: You can use the 'Messaging' tab in the sidebar to chat directly." },
    { question: "Is there a sibling discount?", answer: "Sibling Discount: Yes, we offer a 10% discount for the second child." },
    { question: "How to pay?", answer: "Payment Due: Tuition is due on the 1st of every month. You can pay via the 'Payments' tab." },
    { question: "Report absence", answer: "You can report an absence by messaging the teacher." },
    { question: "Update profile", answer: "You can update your profile from the Settings menu in the bottom left." }
];

export const INITIAL_MESSAGE = {
    id: 1,
    sender: 'bot',
    text: "Hi Sarah! 👋 I'm the Sprouty assistant. I can help you navigate the app. What can I do for you today?",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isInitial: true
};

export const SCHEDULE_DATA = [
    {
        id: 1,
        time: "08:30 AM - 09:00 AM",
        title: "Morning Arrival",
        desc: "Greeting parents and students",
        icon: "🏫",
        colorType: "blue"
    },
    {
        id: 2,
        time: "09:00 AM - 09:30 AM",
        title: "Breakfast",
        desc: "Oatmeal and fresh fruits",
        icon: "🥞",
        colorType: "orange"
    },
    {
        id: 3,
        time: "09:30 AM - 10:00 AM",
        title: "Morning Circle",
        desc: "Singing songs and weather check",
        icon: "🧸",
        colorType: "blue"
    },
    {
        id: 4,
        time: "10:00 AM - 10:45 AM",
        title: "Story Time",
        desc: 'Reading: "The Very Hungry Caterpillar"',
        icon: "📘",
        colorType: "blue"
    },
    {
        id: 5,
        time: "11:30 AM - 12:15 PM",
        title: "Lunch Time",
        desc: "Menu: Turkey sandwiches & apple slices",
        icon: "🍕",
        colorType: "orange"
    },
    {
        id: 7,
        time: "02:30 PM - 03:00 PM",
        title: "Afternoon Snack",
        desc: "Crackers and cheese",
        icon: "🍎",
        colorType: "orange"
    },
    {
        id: 8,
        time: "03:00 PM - 03:45 PM",
        title: "Free Play",
        desc: "Indoor and outdoor activities",
        icon: "🎨",
        colorType: "blue"
    },
    {
        id: 9,
        time: "03:45 PM - 04:00 PM",
        title: "Parent Pick-up",
        desc: "Packing bags and goodbyes",
        icon: "👋",
        colorType: "blue"
    }
];

export const LOGS_DATA = [
    { id: 18, studentName: "Mia T.", time: "11:00 AM", timestamp: new Date().setHours(11, 0, 0, 0), tag: "ACTIVITY", actionText: "Outdoor Play: Playing with bubbles", icon: "🎨", iconColor: "#10B981" },
    { id: 17, studentName: "Lucas H.", time: "10:55 AM", timestamp: new Date().setHours(10, 55, 0, 0), tag: "ACTIVITY", actionText: "Story Time: Reading The Very Hungry Caterpillar", icon: "🎨", iconColor: "#10B981" },
    { id: 16, studentName: "Sophia C.", time: "10:50 AM", timestamp: new Date().setHours(10, 50, 0, 0), tag: "ACTIVITY", actionText: "Art: Finger painting session", icon: "🎨", iconColor: "#10B981" },
    { id: 15, studentName: "Jackson W.", time: "10:45 AM", timestamp: new Date().setHours(10, 45, 0, 0), tag: "ACTIVITY", actionText: "Music Time: Singing songs", icon: "🎨", iconColor: "#10B981" },
    { id: 14, studentName: "Aiden K.", time: "10:42 AM", timestamp: new Date().setHours(10, 42, 0, 0), tag: "ACTIVITY", actionText: "Free Play: Building with blocks", icon: "🎨", iconColor: "#10B981" },
    { id: 13, studentName: "Isabella G.", time: "10:40 AM", timestamp: new Date().setHours(10, 40, 0, 0), tag: "MEALS", actionText: "Lunch: Chicken pasta with steamed broccoli", icon: "🍴", iconColor: "#F97316" },
    { id: 12, studentName: "Ethan P.", time: "10:35 AM", timestamp: new Date().setHours(10, 35, 0, 0), tag: "MEALS", actionText: "PM Snack: Sliced apples and crackers", icon: "🍴", iconColor: "#F97316" },
    { id: 11, studentName: "Chloe M.", time: "10:32 AM", timestamp: new Date().setHours(10, 32, 0, 0), tag: "MEALS", actionText: "Lunch: Veggie wrap with fruits", icon: "🍴", iconColor: "#F97316" },
    { id: 10, studentName: "Noah R.", time: "10:31 AM", timestamp: new Date().setHours(10, 31, 0, 0), tag: "MEALS", actionText: "PM Snack: Yogurt and berries", icon: "🍴", iconColor: "#F97316" },
    { id: 1, studentName: "Leo M.", time: "10:30 AM", timestamp: new Date().setHours(10, 30, 0, 0), tag: "MEALS", actionText: "Finished 1 bottle (6oz)", icon: "🍴", iconColor: "#F97316" },
    { id: 2, studentName: "Maya S.", time: "10:15 AM", timestamp: new Date().setHours(10, 15, 0, 0), tag: "ACTIVITY", actionText: "Painted with triangles", icon: "🎨", iconColor: "#10B981" },
    { id: 6, studentName: "Olivia H.", time: "09:15 AM", timestamp: new Date().setHours(9, 15, 0, 0), tag: "MEALS", actionText: "Ate all her apple slices", icon: "🍴", iconColor: "#F97316" },
    { id: 7, studentName: "Elijah K.", time: "09:00 AM", timestamp: new Date().setHours(9, 0, 0, 0), tag: "ACTIVITY", actionText: "Built a tall block tower", icon: "🎨", iconColor: "#10B981" },
    { id: 9, studentName: "Jameson D.", time: "08:30 AM", timestamp: new Date().setHours(8, 30, 0, 0), tag: "MEALS", actionText: "Refused morning snack", icon: "🍴", iconColor: "#F97316" }
];

export const childrenData = {
    "C1": { name: "Leo Jenkins", attendance: 10, activities: 25, mood: "Happy", meals: "95%", engagement: [12, 19, 15, 17, 14] },
    "C2": { name: "Mia Jenkins", attendance: 12, activities: 18, mood: "Curious", meals: "88%", engagement: [8, 12, 10, 11, 9] }
};

export const adminChildrenData = {
    "A1": { name: "Leo Jenkins", attendance: 18, totalDays: 25, activities: 45, mood: "Happy", meals: "95%", engagement: [12, 19, 15, 17, 14, 0, 0] },
    "A2": { name: "Mia Jenkins", attendance: 22, totalDays: 25, activities: 50, mood: "Curious", meals: "100%", engagement: [14, 15, 12, 16, 15, 0, 0] },
    "A3": { name: "Windnie Jenkins", attendance: 20, totalDays: 25, activities: 38, mood: "Calm", meals: "90%", engagement: [10, 11, 14, 12, 10, 0, 0] },
    "A4": { name: "Omar Khan", attendance: 25, totalDays: 25, activities: 60, mood: "Energetic", meals: "100%", engagement: [16, 18, 17, 19, 16, 0, 0] },
    "A5": { name: "Leo Khan", attendance: 15, totalDays: 25, activities: 30, mood: "Reserved", meals: "85%", engagement: [8, 9, 11, 10, 8, 0, 0] },
    "A6": { name: "Emma Smith", attendance: 24, totalDays: 25, activities: 55, mood: "Joyful", meals: "98%", engagement: [15, 14, 16, 15, 17, 0, 0] },
    "A7": { name: "Noah Brown", attendance: 19, totalDays: 25, activities: 42, mood: "Focused", meals: "92%", engagement: [13, 12, 14, 13, 15, 0, 0] }
};
