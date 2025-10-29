export type EmailCategory = 'important' | 'promotions' | 'social' | 'spam';

export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  body: string;
  timestamp: Date;
  category: EmailCategory;
  read: boolean;
  starred: boolean;
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
}

export const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'Sarah Johnson',
    senderEmail: 'sarah.johnson@company.com',
    subject: 'Q4 Project Review Meeting',
    snippet: 'Hi team, I wanted to schedule our Q4 review meeting for next week...',
    body: `Hi team,

I wanted to schedule our Q4 review meeting for next week. We need to discuss the project outcomes, key achievements, and areas for improvement.

Please confirm your availability for Tuesday at 2 PM.

Best regards,
Sarah`,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: 'important',
    read: false,
    starred: true,
    attachments: [
      { name: 'Q4_Report.pdf', size: '2.3 MB', type: 'pdf' }
    ]
  },
  {
    id: '2',
    sender: 'LinkedIn',
    senderEmail: 'notifications@linkedin.com',
    subject: 'You appeared in 12 searches this week',
    snippet: 'Your profile is getting noticed! People are searching for professionals like you...',
    body: `Hi there,

Your profile is getting noticed! People are searching for professionals with your skills and experience.

Keep your profile updated to increase your visibility.

Best,
LinkedIn Team`,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    category: 'social',
    read: true,
    starred: false
  },
  {
    id: '3',
    sender: 'Amazon',
    senderEmail: 'deals@amazon.com',
    subject: '🎉 Black Friday Deals - Up to 70% Off!',
    snippet: 'Limited time offer! Don\'t miss out on our biggest sale of the year...',
    body: `Black Friday is here!

Shop now and save up to 70% on thousands of items across all categories.

Limited time only. Shop now!`,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    category: 'promotions',
    read: false,
    starred: false
  },
  {
    id: '4',
    sender: 'Michael Chen',
    senderEmail: 'michael.chen@client.com',
    subject: 'URGENT: Contract Review Required',
    snippet: 'We need your approval on the updated contract terms by end of day...',
    body: `Hi,

We need your approval on the updated contract terms by end of day. Please review the attached document and let me know if you have any concerns.

This is time-sensitive, so please prioritize.

Thanks,
Michael`,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    category: 'important',
    read: false,
    starred: true,
    attachments: [
      { name: 'Contract_v2.docx', size: '856 KB', type: 'docx' }
    ]
  },
  {
    id: '5',
    sender: 'Spam Bot',
    senderEmail: 'noreply@suspicious-site.xyz',
    subject: 'You\'ve won $1,000,000! Claim now!!!',
    snippet: 'Congratulations! Click here to claim your prize...',
    body: `CONGRATULATIONS!!!

You have been selected as our lucky winner! Click the link below to claim your $1,000,000 prize now!

[SUSPICIOUS LINK]

Act fast! This offer expires soon!`,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    category: 'spam',
    read: false,
    starred: false
  },
  {
    id: '6',
    sender: 'GitHub',
    senderEmail: 'notifications@github.com',
    subject: 'Pull Request Review Required',
    snippet: '@johndoe requested your review on PR #234...',
    body: `Hi,

@johndoe has requested your review on pull request #234 in the main repository.

Title: Add new authentication flow
Description: Implementation of OAuth 2.0 authentication

Please review when you have a chance.

GitHub Team`,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    category: 'important',
    read: true,
    starred: false
  },
  {
    id: '7',
    sender: 'Facebook',
    senderEmail: 'notification@facebook.com',
    subject: 'You have 5 new friend requests',
    snippet: 'People you may know are trying to connect with you...',
    body: `Hi,

You have 5 new friend requests waiting for your response.

Check them out and connect with people you know.

Facebook`,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    category: 'social',
    read: true,
    starred: false
  },
  {
    id: '8',
    sender: 'Spotify',
    senderEmail: 'premium@spotify.com',
    subject: 'Get 3 months Premium for $9.99',
    snippet: 'Special offer just for you! Enjoy ad-free music...',
    body: `Hey music lover,

We have a special offer just for you! Get 3 months of Spotify Premium for only $9.99.

✓ Ad-free music
✓ Offline listening
✓ High quality audio

Upgrade now!`,
    timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000),
    category: 'promotions',
    read: false,
    starred: false
  }
];
