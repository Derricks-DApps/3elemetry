var blessed = require('blessed');
const figlet = require('figlet');
var screen = blessed.screen();

figlet.text('3lemetry', {
    font: '3-D', // Choose a Figlet font
    fontSize: 20,
}, function(err, data) {
    if (err) {
        console.log('Error:', err);
        return;
    }
    const left = Math.floor((screen.width - data.split('\n')[0].length) / 2);
    // Create a text element for the header
    const header = blessed.text({
        parent: screen,
        top: 1,
        left: left,
        width: '100%',
        content: data, // Set Figlet text as content
        style: {
            fg: 'white',          // Set text color to white
            bg: '',           // Set background color to blue
            bold: false,           // Make the text bold
            underline: false,      // Underline the text
        },
    });
});

// Create a box for other content
var box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '20%',
    content: '{bold}Click when ready to go to Frame@http://localhost:3010/{/bold}',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'magenta',
      border: {
        fg: '#ffffff'
      },
      hover: {
        bg: 'green'
      }
    }
});

box.on('click', function(data) {
    box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
    screen.render();
});

// Append our box to the screen.
screen.append(box);

// Create the form
var form = blessed.form({
  parent: screen,
  keys: true,
  left: 'center',
  top: '70%', // Adjust the vertical position
  width: 30,
  height: 4,
  bg: 'green',
  content: 'Submit or cancel?'
});

// Add buttons to the form
var submit = blessed.button({
  parent: form,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 10,
  top: 2,
  shrink: true,
  name: 'submit',
  content: 'submit',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

var cancel = blessed.button({
  parent: form,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 20,
  top: 2,
  shrink: true,
  name: 'cancel',
  content: 'cancel',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

// Handle form events
submit.on('press', function() {
  form.submit();
});

cancel.on('press', function() {
  form.reset();
});

form.on('submit', function(data) {
  form.setContent('Submitted.');
  screen.render();
});

form.on('reset', function(data) {
  form.setContent('Canceled.');
  screen.render();
});

// Handle exit key events
screen.key(['C-c', 'q'], function(ch, key) {
    process.exit(0);
});

// Render the screen
screen.render();
