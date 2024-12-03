import { bot } from '../lib/plugins.js';
import fs from 'fs';
import path from 'path';

// Path to the media folder
const mediaFolder = path.resolve('./media');

// Specify the image you want to send (e.g., 'logo.png')
const specificImagePath = path.join(mediaFolder, 'logo.jpg');

// Function to send the introduction with the specific image
const wasiSendRepoInfo = async (message) => {
  const response = `
🤖  *Bot Introduction:*
> Hello! I am Xstro, a friendly bot here to assist you with various tasks and keep you entertained.

*🔗 GitHub Repository:*
- View my source code: [Xstro GitHub Repo](https://github.com/AstroX11/Xstro)

**👨‍💻 Developers:**
- *Astro* from Negira (Lead Developer)
- *Mr. Wasi* from Pakistan (Co-Developer)

Feel free to explore the repo, suggest features, or contribute to the project!

> Powered by **Xstro MD** 💜
  `;

  try {
    if (fs.existsSync(specificImagePath)) {
      // If the image exists, send it along with the introduction
      await message.sendFile(specificImagePath, response);
      console.log('[wasiSendRepoInfo] Sent repo information with the image:', specificImagePath);
    } else {
      // If the image doesn't exist, just send the text
      await message.sendReply(response);
      console.log('[wasiSendRepoInfo] Image not found, sent repo information without an image.');
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
    desc: 'Sends bot introduction, GitHub repository link, and developer information along with a specific image.',
    type: 'utility',
  },
  async (message) => {
    await wasiSendRepoInfo(message); // Send the repo info with the image
  }
);
