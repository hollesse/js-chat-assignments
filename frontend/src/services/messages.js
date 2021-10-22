import { Message, UserMessage } from './../modules/messages.js'

export async function getMessages(){
    const response = await fetch("/api/messages", {method: "get"})
    const responseJson = await response.json();
    return responseJson.map(json => Message.fromJSON(json));
}

export function extractMembers(messages){
    return messages.filter(message => message instanceof UserMessage)
        .map(message => message.sender)
        .reduce((previousValue, currentValue) => {
            if(!previousValue.includes(currentValue)){
                previousValue.push(currentValue);
            }
            return previousValue;
        },[]);
}