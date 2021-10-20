console.log("Hooray, my first line of JavaScript!");

const TYPE_USER = "user";
const TYPE_SYSTEM = "system";

const createMessage = (sender, text, type) => ({textBody: text, sender, type, render});

const messages = [createMessage("", "Alice joined the chat", TYPE_SYSTEM),
                  createMessage("", "Bob joined the chat", TYPE_SYSTEM),
                  createMessage("Bob", "Hello Alice, how are you?", TYPE_USER),
                  createMessage("Alice", "Hi Bob, I'm fine. How are you?", TYPE_USER),
                  createMessage("Bob", "I'm fine too.", TYPE_USER),
                ];

for (const message of messages) {
    sendMessage(message);            
}

messages.forEach(message => sendMessage(message));

const members = messages.filter(message => message.type === TYPE_USER).map(message => message.sender).reduce((previousValue, currentValue) => {
    if(!previousValue.includes(currentValue)){
        previousValue.push(currentValue);
    }
    return previousValue;
},[]);

console.log(members);

const numberOfWordsPerMember = messages.filter(message => message.type === TYPE_USER).reduce((previousValue, currentValue) => {
    if(previousValue[currentValue.sender]){
        previousValue[currentValue.sender] += currentValue.textBody.split(" ").length;
    } else {
        previousValue[currentValue.sender] = currentValue.textBody.split(" ").length;
    }
    return previousValue;
}, {});
console.log(numberOfWordsPerMember);


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