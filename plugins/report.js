import { bot } from '../lib/plugins.js';
import { isAdmin } from '../lib/utils.js';

const developerNumber = '923192173398'; // Replace with the developer's WhatsApp number

bot(
  {
    pattern: 'report (.*)', // Matches 'report' followed by the message
    isPublic: true, // Public command
    desc: 'Send bug or feedback report to the developer.',
    type: 'utility',
  },
  async (message, match) => {
    // If no report message is provided
    if (!match) {
      return message.sendReply('_Please provide a message to report._');
    }

    const userMessage = match.trim(); // Get the user's message
    const user = message.sender; // Get the user's number
    const userName = message.pushName || 'Unknown User'; // Get the user's name, if available

    const reportMessage = `
    🚨 **New Report Received** 🚨
    
    **Reported By:** ${userName} (wa.me/${user})
    **Message:** ${userMessage}

    Please take a look and fix the issue dear devs. 🙏
    `;

    try {
      // Send the report message to the developer's WhatsApp number
      await message.client.sendMessage(developerNumber, reportMessage);
      console.log('[Report] Sent report to developer:', developerNumber);

      // Confirm to the user that their report was sent
      await message.sendReply('_Your report has been sent to the developer. Thank you for your feedback!_');
    } catch (error) {
      console.error('[Report] Failed to send the report:', error);
      await message.sendReply('_An error occurred while sending the report._');
    }
  }
);
