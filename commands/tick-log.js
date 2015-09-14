export default log

import Entry from '../entry'
import prompt from 'prompt'

function log (yargs) {
  let argv = yargs
  .usage('tick log')
  .option('date', {
    alias: 'd',
    describe: 'date for tick'
  })
  .option('message', {
    alias: 'm',
    describe: 'entry message. E.g. 8am-12pm fixing bugs #tickbin'
  })
  .help('h')
  .alias('h', 'help')
  .argv

  const {message, date} = argv
  if (!message) {
    prompt.start()
    prompt.get('message', function(err, res) {
      if (!err) createEntry(res.message, {date}) 
    })
  } else {
    createEntry(message, {date}) 
  }
}

function createEntry (message, opts = {}) {
  let entry = new Entry(message, opts)

  console.log(entry.toJSON())
}