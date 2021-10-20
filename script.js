function Message(textBody) {
    this.textBody = textBody;
}

Message.prototype.render = function(){console.log(this.textBody);}

function UserMessage(sender, textBody) {
    Message.call(this, textBody);
    this.sender = sender;
}

UserMessage.prototype = Object.create(Message.prototype);
UserMessage.prototype.constructor = UserMessage;
UserMessage.prototype.render = function(){console.log(`${this.sender}: ${this.textBody}`)}

function SystemMessage(textBody) {
    Message.call(this, textBody);
}

SystemMessage.prototype = Object.create(Message.prototype);
SystemMessage.prototype.constructor = SystemMessage;
SystemMessage.prototype.render = function(){console.log(`...${this.textBody}...`)}

const messages = [new SystemMessage("Alice joined the chat"),
                  new SystemMessage("Bob joined the chat"),
                  new UserMessage("Bob", "Hello Alice, how are you?"),
                  new UserMessage("Alice", "Hi Bob, I'm fine. How are you?"),
                  new UserMessage("Bob", "I'm fine too."),
                ];

for (const message of messages) {
    sendMessage(message);            
}

messages.forEach(message => sendMessage(message));

const members = messages.filter(message => message instanceof UserMessage).map(message => message.sender).reduce((previousValue, currentValue) => {
    if(!previousValue.includes(currentValue)){
        previousValue.push(currentValue);
    }
    return previousValue;
},[]);

console.log(members);

const numberOfWordsPerMember = messages.filter(message => message instanceof UserMessage).reduce((previousValue, currentValue) => {
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