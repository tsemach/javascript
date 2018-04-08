
const config = require('./recorder_broker_config');
const Recorder = require('../../src/recorder/recorder');

recorder = new Recorder(config);

recorder.addTaskListener("work.tasks.queue");
recorder.addEventListener("work.events.queue");
recorder.record(true);
