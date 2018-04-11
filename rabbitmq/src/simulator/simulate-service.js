
class SimulateService  {
    constructor() {
        this.messages = {tasks: new Map(), events: new Map()};

        this.messages.tasks['a'] = 'a';
        console.log(this.messages.tasks['a']);
    }

    addTasksMessage(what, message) {
        this.messages.tasks.set(what, message);
    }

    addEventsMessage(what, message) {
        this.messages.events.set(what, message);
    }

    sendTasks() {

    }
}
s = new SimulateService();

s.addTasksMessage('a', 'task message');
console.log(s.messages.tasks.get('a'));


