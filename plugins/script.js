import { bot } from '../lib/plugins.js';
import fs from 'fs';
import path from 'path';

// Path to the media folder
const mediaFolder = path.resolve('./media');

// Function to get a random image file from the media folder
const xstroGetRandomImage = () => {
  try {
    const files = fs.readdirSync(mediaFolder);
    const imageFiles = files.filter((file) => /\.(png|jpg|jpeg|gif)$/i.test(file));
    if (imageFiles.length === 0) return null;
    return path.join(mediaFolder, imageFiles[Math.floor(Math.random() * imageFiles.length)]);
  } catch (error) {
    console.error('[xstroGetRandomImage] Error reading media folder:', error);
    return null;
  }
};

// Function to send the introduction with an optional image
const wasiSendRepoInfo = async (message, imagePath) => {
  const response = `
🤖  *Bot Introduction:*
> Hello! I am xstrofriendly bot here to assist you with various tasks and keep you entertained.

*🔗 GitHub Repository:*
- View my source code:https://github.com/AstroX11/Xstro.git
**👨‍💻 Developers:**
- *Astro* from Negira (Lead Developer)
- *Mr. Wasi* from Pakistan (Co-Developer)

Feel free to explore the repo, suggest features, or contribute to the project!

  `;

  try {
    if (imagePath) {
      await message.sendFile(imagePath, response);
      console.log('[wasiSendRepoInfo] Sent repo information with an image:', imagePath);
    } else {
      await message.sendReply(response);
      console.log('[wasiSendRepoInfo] Sent repo information without an image.');
    }
  } catch (error) {
    console.error('[wasiSendRepoInfo] Failed to send repo information:', error);
    await message.sendReply('_An error occurred while sending the repo information._');
  }
};

bot(
  {
    pattern: 'sc',
    isPublic: true,
    desc: 'Sends bot introduction, social links, GitHub repository link, and developer information along with a random image.',
    type: 'utility',
  },
  async (message) => {
    const randomImage = xstroGetRandomImage();
    await wasiSendRepoInfo(message, randomImage);
  }
);
