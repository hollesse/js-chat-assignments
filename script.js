console.log("Hooray, my first line of JavaScript!");

const TYPE_USER = "user";
const TYPE_SYSTEM = "system";

const m1 = {textBody: "Alice joined the chat",
            sender: "", 
            type: TYPE_SYSTEM};

const m2 = {textBody: "Bob joined the chat",
            sender: "", 
            type: TYPE_SYSTEM};

const m3 = {textBody: "Hello Alice, how are you?",
            sender: "Bob", 
            type: TYPE_USER};

const m4 = {textBody: "Hi Bob, I'm fine. How are you?",
            sender: "Alice", 
            type: TYPE_USER};

sendMessage(m1);
sendMessage(m2);
sendMessage(m3);
sendMessage(m4);

function sendMessage({textBody, sender, type}){
    if(type === TYPE_USER){
        console.log(`${sender}: ${textBody}`)
    } else if(type == TYPE_SYSTEM) {
        console.log(`...${textBody}...`)
    }
}