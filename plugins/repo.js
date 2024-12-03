import { bot } from '../lib/plugins.js';

bot(
  {
    pattern: 'repo',
    isPublic: true,
    desc: 'Sends bot introduction, social links, GitHub repository link, and developer information.',
    type: 'utility',
  },
  async (message) => {
    const response = `
**🤖 Bot Introduction:**
Hello! I am xstro multidevice friendly bot here to assist you with various tasks and keep you entertained.

**🔗 GitHub Repository:**
- View my source code: https://github.com/AstroX11/Xstro

**👨‍💻 Developers:**
- **Astro** from Negira (Lead Developer)
- **Mr. Wasi** from Pakistan (Co-Developer)

Feel free to explore the repo, suggest features, or contribute to the project!

> powered by xstro md
    `;

    try {
      await message.sendReply(response);
      console.log('[Repo] Repo information sent successfully.');
    } catch (error) {
      console.error('[Repo] Failed to send repo information:', error);
    }
  }
);
