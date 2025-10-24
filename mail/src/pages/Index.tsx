import { useState } from "react";
import { InboxHeader } from "@/components/InboxHeader";
import { EmailListItem } from "@/components/EmailListItem";
import { EmailDetail } from "@/components/EmailDetail";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Email {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  badge?: string;
  fullContent: React.ReactNode;
  senderEmail: string;
  attachment?: {
    name: string;
    size: string;
  };
}

const emails: Email[] = [
  {
    id: 1,
    sender: "Reporter",
    subject: "Daily Afternoon 14.08 Report",
    preview: "Hi there, here's your daily digest...",
    date: "Dzisiaj, 14:08",
    badge: "Dzisiaj",
    senderEmail: "reporter@bot.com",
    attachment: {
      name: "Daily Report - 14.08 Afternoon.pdf",
      size: "1.1 MB",
    },
    fullContent: (
      <>
        <p>Hi there,</p>
        <p>
          Here's your daily report digest. We've gathered the latest updates and
          insights for you.
        </p>
        <p>
          <strong>Today's highlights:</strong>
        </p>
        <ul>
          <li>
            <strong>New Feature Launch:</strong> We've successfully launched the
            new analytics dashboard.
          </li>
          <li>
            <strong>Performance Metrics:</strong> Overall user engagement is up by
            15%.
          </li>
          <li>
            <strong>Top Articles:</strong> Discover the most read articles of the
            day.
          </li>
        </ul>
        <p>For a detailed breakdown, please see the attached PDF report.</p>
        <p>You can also view the full interactive report online:</p>
        <p>
          <a href="#" className="text-primary hover:underline">
            View Full Report
          </a>
        </p>
        <p>
          This is a summary of our latest newsletter. We cover the most important
          trends in technology, providing you with concise and informative content
          to stay ahead.
        </p>
      </>
    ),
  },
  {
    id: 2,
    sender: "Reporter",
    subject: "Daily Morning 14.08 Report",
    preview: "Hi there, here's your daily digest...",
    date: "Dzisiaj",
    badge: "Dzisiaj",
    senderEmail: "reporter@bot.com",
    attachment: {
      name: "Daily Report - 14.08 Morning.pdf",
      size: "945 KB",
    },
    fullContent: (
      <>
        <p>Good morning,</p>
        <p>Here's your morning digest with the latest updates.</p>
        <p>
          <strong>Today's highlights:</strong>
        </p>
        <ul>
          <li>
            <strong>Market Update:</strong> Tech stocks showing positive momentum.
          </li>
          <li>
            <strong>Team Achievements:</strong> Q3 targets exceeded by 12%.
          </li>
          <li>
            <strong>New Partnership:</strong> Collaboration agreement signed.
          </li>
        </ul>
        <p><strong>PDF Report Contents:</strong></p>
        <p><strong>Most Important:</strong></p>
        <ul>
          <li>Critical security patch deployed successfully</li>
          <li>Major client renewal confirmed</li>
        </ul>
        <p><strong>Important:</strong></p>
        <ul>
          <li>New feature rollout scheduled for next week</li>
          <li>Team expansion approved</li>
        </ul>
        <p><strong>Medium Priority:</strong></p>
        <ul>
          <li>Documentation updates in progress</li>
          <li>Office renovation plans reviewed</li>
        </ul>
        <p><strong>Low Priority:</strong></p>
        <ul>
          <li>Minor UI improvements suggested</li>
          <li>Social media calendar updated</li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    sender: "Reporter",
    subject: "Daily Afternoon 13.08 Report",
    preview: "Hi there, here's your daily digest...",
    date: "Wczoraj",
    badge: "Wczoraj",
    senderEmail: "reporter@bot.com",
    attachment: {
      name: "Daily Report - 13.08 Afternoon.pdf",
      size: "1.2 MB",
    },
    fullContent: (
      <>
        <p>Hi there,</p>
        <p>Your afternoon report from yesterday.</p>
        <p>
          <strong>Today's highlights:</strong>
        </p>
        <ul>
          <li>
            <strong>Product Launch:</strong> Beta testing exceeds expectations.
          </li>
          <li>
            <strong>Customer Satisfaction:</strong> NPS score reached 85.
          </li>
          <li>
            <strong>Revenue Growth:</strong> 18% increase over last month.
          </li>
        </ul>
        <p><strong>PDF Report Contents:</strong></p>
        <p><strong>Most Important:</strong></p>
        <ul>
          <li>Q3 financial results finalized</li>
          <li>Board meeting scheduled for strategic planning</li>
        </ul>
        <p><strong>Important:</strong></p>
        <ul>
          <li>Customer feedback analysis completed</li>
          <li>New hiring positions opened</li>
        </ul>
        <p><strong>Medium Priority:</strong></p>
        <ul>
          <li>Marketing campaign metrics reviewed</li>
          <li>Infrastructure upgrade proposals</li>
        </ul>
        <p><strong>Low Priority:</strong></p>
        <ul>
          <li>Team building event planning</li>
          <li>Office supplies inventory check</li>
        </ul>
      </>
    ),
  },
  {
    id: 4,
    sender: "Reporter",
    subject: "Daily Morning 13.08 Report",
    preview: "Hi there, here's your daily digest...",
    date: "Wczoraj",
    badge: "Wczoraj",
    senderEmail: "reporter@bot.com",
    attachment: {
      name: "Daily Report - 13.08 Morning.pdf",
      size: "890 KB",
    },
    fullContent: (
      <>
        <p>Good morning,</p>
        <p>Your morning digest from yesterday.</p>
        <p>
          <strong>Today's highlights:</strong>
        </p>
        <ul>
          <li>
            <strong>System Performance:</strong> 99.9% uptime maintained.
          </li>
          <li>
            <strong>User Growth:</strong> 2,500 new signups this week.
          </li>
          <li>
            <strong>Feature Adoption:</strong> Mobile app downloads up 45%.
          </li>
        </ul>
        <p><strong>PDF Report Contents:</strong></p>
        <p><strong>Most Important:</strong></p>
        <ul>
          <li>Emergency protocol review completed</li>
          <li>Key stakeholder meeting outcomes</li>
        </ul>
        <p><strong>Important:</strong></p>
        <ul>
          <li>Database optimization scheduled</li>
          <li>Training sessions for new tools</li>
        </ul>
        <p><strong>Medium Priority:</strong></p>
        <ul>
          <li>Website analytics deep dive</li>
          <li>Vendor contract renewals</li>
        </ul>
        <p><strong>Low Priority:</strong></p>
        <ul>
          <li>Newsletter template updates</li>
          <li>Archive cleanup tasks</li>
        </ul>
      </>
    ),
  },
  {
    id: 5,
    sender: "Reporter",
    subject: "Daily Afternoon 12.08 Report",
    preview: "Hi there, here's your daily digest...",
    date: "12.08",
    senderEmail: "reporter@bot.com",
    attachment: {
      name: "Daily Report - 12.08 Afternoon.pdf",
      size: "1.3 MB",
    },
    fullContent: (
      <>
        <p>Hi there,</p>
        <p>Your report from August 12th.</p>
        <p>
          <strong>Today's highlights:</strong>
        </p>
        <ul>
          <li>
            <strong>Innovation Project:</strong> Prototype successfully tested.
          </li>
          <li>
            <strong>Compliance Update:</strong> All certifications renewed.
          </li>
          <li>
            <strong>Team Milestone:</strong> 1000th customer support ticket resolved.
          </li>
        </ul>
        <p><strong>PDF Report Contents:</strong></p>
        <p><strong>Most Important:</strong></p>
        <ul>
          <li>Cybersecurity audit passed</li>
          <li>Strategic partnership negotiations advanced</li>
        </ul>
        <p><strong>Important:</strong></p>
        <ul>
          <li>API rate limits increased</li>
          <li>Employee satisfaction survey results</li>
        </ul>
        <p><strong>Medium Priority:</strong></p>
        <ul>
          <li>Blog content calendar finalized</li>
          <li>Server maintenance window planned</li>
        </ul>
        <p><strong>Low Priority:</strong></p>
        <ul>
          <li>Color scheme adjustments proposed</li>
          <li>Meeting room booking system update</li>
        </ul>
      </>
    ),
  },
  {
    id: 6,
    sender: "Reporter",
    subject: "Daily Morning 12.08 Report",
    preview: "Hi there, here's your daily digest...",
    date: "12.08",
    senderEmail: "reporter@bot.com",
    attachment: {
      name: "Daily Report - 12.08 Morning.pdf",
      size: "1.0 MB",
    },
    fullContent: (
      <>
        <p>Good morning,</p>
        <p>Your morning report from August 12th.</p>
        <p>
          <strong>Today's highlights:</strong>
        </p>
        <ul>
          <li>
            <strong>Code Quality:</strong> Test coverage increased to 92%.
          </li>
          <li>
            <strong>Support Metrics:</strong> Average response time reduced by 30%.
          </li>
          <li>
            <strong>Cost Savings:</strong> Infrastructure optimization saved 20K.
          </li>
        </ul>
        <p><strong>PDF Report Contents:</strong></p>
        <p><strong>Most Important:</strong></p>
        <ul>
          <li>Product roadmap Q4 priorities defined</li>
          <li>Critical bug fixes deployed</li>
        </ul>
        <p><strong>Important:</strong></p>
        <ul>
          <li>User onboarding flow improvements</li>
          <li>Competitor analysis completed</li>
        </ul>
        <p><strong>Medium Priority:</strong></p>
        <ul>
          <li>Knowledge base articles updated</li>
          <li>Cross-team sync meeting notes</li>
        </ul>
        <p><strong>Low Priority:</strong></p>
        <ul>
          <li>Icon library refresh suggestions</li>
          <li>Desk assignment changes</li>
        </ul>
      </>
    ),
  },
  {
    id: 7,
    sender: "Reporter",
    subject: "Daily Afternoon 11.08 Report",
    preview: "Hi there, here's your daily digest...",
    date: "11.08",
    senderEmail: "reporter@bot.com",
    attachment: {
      name: "Daily Report - 11.08 Afternoon.pdf",
      size: "1.1 MB",
    },
    fullContent: (
      <>
        <p>Hi there,</p>
        <p>Your afternoon report from August 11th.</p>
        <p>
          <strong>Today's highlights:</strong>
        </p>
        <ul>
          <li>
            <strong>Sales Achievement:</strong> Monthly target reached 5 days early.
          </li>
          <li>
            <strong>Platform Stability:</strong> Zero downtime for 30 days.
          </li>
          <li>
            <strong>Content Success:</strong> Viral social media post reached 100K views.
          </li>
        </ul>
        <p><strong>PDF Report Contents:</strong></p>
        <p><strong>Most Important:</strong></p>
        <ul>
          <li>Annual budget planning finalized</li>
          <li>Leadership team alignment session</li>
        </ul>
        <p><strong>Important:</strong></p>
        <ul>
          <li>Mobile app performance optimization</li>
          <li>Customer retention strategies reviewed</li>
        </ul>
        <p><strong>Medium Priority:</strong></p>
        <ul>
          <li>Internal tools upgrade evaluation</li>
          <li>Team skill development workshops</li>
        </ul>
        <p><strong>Low Priority:</strong></p>
        <ul>
          <li>Company swag reorder</li>
          <li>Parking lot reassignments</li>
        </ul>
      </>
    ),
  },
  {
    id: 8,
    sender: "Reporter",
    subject: "Daily Morning 11.08 Report",
    preview: "Hi there, here's your daily digest...",
    date: "11.08",
    senderEmail: "reporter@bot.com",
    attachment: {
      name: "Daily Report - 11.08 Morning.pdf",
      size: "980 KB",
    },
    fullContent: (
      <>
        <p>Good morning,</p>
        <p>Your morning report from August 11th.</p>
        <p>
          <strong>Today's highlights:</strong>
        </p>
        <ul>
          <li>
            <strong>Development Speed:</strong> Sprint velocity up 25%.
          </li>
          <li>
            <strong>Quality Assurance:</strong> Bug detection rate improved.
          </li>
          <li>
            <strong>Integration Success:</strong> Third-party API connections stable.
          </li>
        </ul>
        <p><strong>PDF Report Contents:</strong></p>
        <p><strong>Most Important:</strong></p>
        <ul>
          <li>Data privacy compliance verification</li>
          <li>Executive summary presentation prepared</li>
        </ul>
        <p><strong>Important:</strong></p>
        <ul>
          <li>Email campaign performance metrics</li>
          <li>Resource allocation adjustments</li>
        </ul>
        <p><strong>Medium Priority:</strong></p>
        <ul>
          <li>UI/UX feedback compilation</li>
          <li>Quarterly OKR review preparation</li>
        </ul>
        <p><strong>Low Priority:</strong></p>
        <ul>
          <li>Break room amenities survey</li>
          <li>File naming convention standardization</li>
        </ul>
      </>
    ),
  },
];

const Index = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email>(emails[0]);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background">
      <InboxHeader />

      <div className="flex-1 flex overflow-hidden">
        {/* Email List Sidebar */}
        <aside
          className={`${
            showSidebar ? "block" : "hidden"
          } lg:block w-full lg:w-80 border-r border-border bg-[hsl(var(--inbox-sidebar-bg))] overflow-y-auto`}
        >
          <div className="sticky top-0 bg-[hsl(var(--inbox-sidebar-bg))] z-10 px-4 py-3 border-b border-border flex items-center justify-between lg:hidden">
            <h2 className="font-medium text-foreground">Inbox</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSidebar(false)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {emails.map((email) => (
            <EmailListItem
              key={email.id}
              sender={email.sender}
              subject={email.subject}
              preview={email.preview}
              date={email.date}
              badge={email.badge}
              isSelected={selectedEmail.id === email.id}
              onClick={() => {
                setSelectedEmail(email);
                setShowSidebar(false);
              }}
            />
          ))}

          <div className="p-4 text-center text-sm text-muted-foreground border-t border-border">
            Ubiegły tydzień
          </div>
        </aside>

        {/* Email Detail */}
        <main className="flex-1 overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSidebar(true)}
            className="lg:hidden m-4"
          >
            <Menu className="w-5 h-5 mr-2" />
            Show emails
          </Button>

          <EmailDetail
            subject={selectedEmail.subject}
            sender={selectedEmail.sender}
            senderEmail={selectedEmail.senderEmail}
            recipient="You"
            recipientEmail="you@example.com"
            date={selectedEmail.date}
            content={selectedEmail.fullContent}
            attachment={selectedEmail.attachment}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
