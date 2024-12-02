import { bot } from '../lib/handler.js';
import { serialize } from '../lib/serialize.js';
import { loadMessage } from '../lib/sql/store.js';
import { numtoId } from '../lib/utils.js';
import fs from 'fs';

// Path to the file that stores the AutoReact status
const configFilePath = './plugins/autoreact.json';

// Load the AutoReact status from the file
let autoReactStatus = false;
try {
  if (fs.existsSync(configFilePath)) {
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
    autoReactStatus = config.autoReactStatus;
  }
} catch (error) {
  console.error('Error loading AutoReact configuration:', error);
}

// Set of emojis for reactions
const emojiSet = ['😊', '😂', '❤️', '🔥', '👍', '😎', '🙌', '🎉', '💯', '🥳'];

// Helper function to save the AutoReact status to a file
const saveAutoReactStatus = () => {
  try {
    fs.writeFileSync(configFilePath, JSON.stringify({ autoReactStatus }), 'utf-8');
  } catch (error) {
    console.error('Error saving AutoReact configuration:', error);
  }
};

// Command to turn AutoReact ON
bot(
  {
    pattern: 'autoreact on',
    isPublic: true,
    desc: 'Enable auto reaction to every message with random emojis.',
  },
  async (message) => {
    autoReactStatus = true;
    saveAutoReactStatus(); // Save the status
    await message.sendReply('_AutoReact with emojis has been enabled!_');
  }
);

// Command to turn AutoReact OFF
bot(
  {
    pattern: 'autoreact off',
    isPublic: true,
    desc: 'Disable auto reaction to messages.',
  },
  async (message) => {
    autoReactStatus = false;
    saveAutoReactStatus(); // Save the status
    await message.sendReply('_AutoReact with emojis has been disabled!_');
  }
);

// Listener for incoming messages to auto react
bot(
  {
    on: 'chat-update',
  },
  async (message) => {
    if (autoReactStatus && message.text && !message.isCommand) {
      const randomEmoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];
      await message.react(randomEmoji);
    }
  }
);
