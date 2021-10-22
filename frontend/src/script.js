import {Chat} from './modules/chat.js'
import {MemberList} from './components/member-list.js'

const chat = new Chat();
chat.updateMessages()
setInterval(() => chat.updateMessages(), 500);
document.getElementById("messageForm").addEventListener("submit", (event) => {
    event.preventDefault();
    chat.sendUserMessage();
});