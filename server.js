const EventEmitter = require('events');

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
          this.emit('response', 'Unknown command (`help` to list commands)');
          break;
      }
    });
  }

  help(args) {
    this.emit('response', `Available Commands:
    create <parameter>
    read <parameter>
    update <parameter>
    delete <parameter>
    `);
  }

  create(args) {
    this.emit('response', `File created successfully => ${args.join(' ')}`);
  }

  read(args) { }

  update(args) { }

  delete(args) { }
}

module.exports = (client) => new Server(client);
