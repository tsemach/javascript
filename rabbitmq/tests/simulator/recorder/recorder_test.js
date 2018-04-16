
const config = require('./recorder_broker_config');
const Recorder = require('../../../src/recorder/recorder');

recorder = new Recorder(config);

recorder.addTaskListener("recorder.tasks.queue");
recorder.addEventListener("recorder.events.queue");

recorder.record(true);
