class Message {
    constructor(textBody) {
        this.textBody = textBody;
    }

    render() {
        return `${this.sender}: ${this.textBody}`; 
    }
}

class UserMessage extends Message {
    constructor(sender, textBody) {
        super(textBody);
        this.sender = sender;
    }

    render() {
        return `${this.sender}: ${this.textBody}`;
    }
}

class SystemMessage extends Message {
    constructor(textBody) {
        super(textBody);
    }

    render() {
        return `...${this.textBody}...`;
    }
}

class Chat {
    constructor() {
        this.messages = [];
    }

    sendMessage(message) {
        this.messages.push(message);
        console.log(message);
        if(message.render){
            console.log(message.render());
        }
    }

    members() {
        return this.messages.filter(message => message instanceof UserMessage).map(message => message.sender).reduce((previousValue, currentValue) => {
            if(!previousValue.includes(currentValue)){
                previousValue.push(currentValue);
            }
            return previousValue;
        },[]);
    }

    wordsPerMember() {
        return this.messages.filter(message => message instanceof UserMessage).reduce((previousValue, currentValue) => {
            if(previousValue[currentValue.sender]){
                previousValue[currentValue.sender] += currentValue.textBody.split(" ").length;
            } else {
                previousValue[currentValue.sender] = currentValue.textBody.split(" ").length;
            }
            return previousValue;
        }, {});
    }
}

const chat = new Chat();
const initialMessages = [new SystemMessage("Alice joined the chat"),
                  new SystemMessage("Bob joined the chat"),
                  new UserMessage("Bob", "Hello Alice, how are you?"),
                  new UserMessage("Alice", "Hi Bob, I'm fine. How are you?"),
                  new UserMessage("Bob", "I'm fine too."),
                ];

initialMessages.forEach(message => chat.sendMessage(message));

console.log(chat.members());
console.log(chat.wordsPerMember());