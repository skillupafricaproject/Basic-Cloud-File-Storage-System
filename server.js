const EventEmitter = require('events');
const readFile = require('./controllers/readFile');
const deleteFile = require('./controllers/deleteFile');

class Server extends EventEmitter {
  constructor(client) {
    super();
    process.nextTick(() => {
      this.emit('response', 'Type a command (`help` to list commands)');
    });
    client.on('command', (command, args) => {
      switch (command) {
        case 'help':
        case 'create':
        case 'read':
        case 'update':
        case 'delete':
          this[command](args);
          break;

        default:
          this.emit('response', `Unknown command ('help' to list commands) => ${command} ${args}`);
          break;
      }
    });
  }

  help(args) {
    this.emit('response', `Available Commands:
    create <username> <content>
    read <fileID> <username>
    update <fileID> <username>
    delete <fileID> <username>
    `);
  }

  create(args) {
    this.emit('response', `File created successfully => ${args.join(' ')}`);
  }

  read(args) {
    console.log(args);
    this.emit('response', JSON.stringify(readFile(args[0], args[1])));
  }

  update(args) { }

  delete(args) {
    console.log(args);
    this.emit('response', JSON.stringify(deleteFile(args[0], args[1])));
  }
}

module.exports = (client) => new Server(client);
