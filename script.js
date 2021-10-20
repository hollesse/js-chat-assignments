console.log("Hooray, my first line of JavaScript!");

const TYPE_USER = "user";
const TYPE_SYSTEM = "system";

const createMessage = (sender, text, type) => ({textBody: text, sender, type, render});

const m1 = createMessage("", "Alice joined the chat", TYPE_SYSTEM);
const m2 = createMessage("", "Bob joined the chat", TYPE_SYSTEM);
const m3 = createMessage("Bob", "Hello Alice, how are you?", TYPE_USER);
const m4 = createMessage("Alice", "Hi Bob, I'm fine. How are you?", TYPE_USER);

sendMessage(m1);
sendMessage(m2);
sendMessage(m3);
sendMessage(m4);

function sendMessage(message){
    console.log(message);
    if(message.render){
        console.log(message.render());
    }
}

function render(){
    if(this.type === TYPE_USER){
        return `${this.sender}: ${this.textBody}`;
    } else if(this.type == TYPE_SYSTEM) {
        return `...${this.textBody}...`;
    }
}