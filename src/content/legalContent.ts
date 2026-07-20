export interface LegalSection {
  title: string
  paragraphs: string[]
}

export const privacySections: LegalSection[] = [
  {
    title: 'Introduction',
    paragraphs: [
      'NEXUS Robotics ("NEXUS", "we", "us") operates the NEXUS website, NEXUS Cloud, NEXUS Studio, and related developer and sponsor services. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use our platform.',
      'By creating an account or using NEXUS services, you agree to the practices described in this policy. If you do not agree, please do not use our services.',
    ],
  },
  {
    title: 'Information We Collect',
    paragraphs: [
      'Account information: name, email address, organization affiliation, and authentication credentials managed through Supabase Auth.',
      'Usage data: portal visits, download events, SDK validation runs, marketplace interactions, and feature usage analytics stored in NEXUS Cloud.',
      'Support data: messages submitted through contact forms, support tickets, beta feedback, and bug reports.',
      'Technical data: browser type, device identifiers, IP address, and session metadata collected for security and performance monitoring.',
    ],
  },
  {
    title: 'How We Use Information',
    paragraphs: [
      'Provide and maintain NEXUS Cloud, Studio, SDK, and marketplace services.',
      'Authenticate users, enforce role-based access, and protect platform security.',
      'Improve documentation, developer experience, and product reliability through aggregated analytics.',
      'Communicate release notes, beta invitations, sponsor updates, and service announcements.',
      'Process billing, subscriptions, and marketplace revenue share where applicable.',
    ],
  },
  {
    title: 'Data Sharing',
    paragraphs: [
      'We do not sell personal information. We share data only with infrastructure providers (hosting, authentication, payment processing) under contractual obligations, with your organization administrators when you belong to a team, and when required by law or to protect the safety of users and robots deployed through the platform.',
    ],
  },
  {
    title: 'Your Controls',
    paragraphs: [
      'Access and update profile information in Account Settings.',
      'Request data export or deletion through support or your organization administrator.',
      'Opt out of non-essential communications via notification preferences where available.',
      'Enterprise customers may request custom data processing agreements through our partnerships team.',
    ],
  },
  {
    title: 'Security & Retention',
    paragraphs: [
      'We encrypt data in transit, hash credentials, maintain audit logs for administrative actions, and apply role-based access controls across portals.',
      'We retain account and usage data while your account is active and for a reasonable period afterward to meet legal, billing, and security obligations.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'Privacy questions: use the Contact page or email privacy@nexus.local. Last updated: July 2026.',
    ],
  },
]

export const termsSections: LegalSection[] = [
  {
    title: 'Agreement',
    paragraphs: [
      'These Terms of Service ("Terms") govern access to NEXUS Cloud, NEXUS Studio, the NEXUS SDK, the NEXUS Marketplace, and the nexus-website production gateway.',
      'By using NEXUS services you agree to these Terms and our Privacy Policy. If you use NEXUS on behalf of an organization, you represent that you have authority to bind that organization.',
    ],
  },
  {
    title: 'Acceptable Use',
    paragraphs: [
      'You may use NEXUS to design, simulate, publish, and operate robotics software in compliance with applicable laws and safety requirements.',
      'You may not upload malicious code, circumvent authentication, scrape services beyond documented APIs, deploy behaviors that endanger people or property, or publish marketplace content that infringes third-party intellectual property.',
      'Marketplace publishers must accurately declare licenses, robot compatibility, sensor requirements, and safety classifications for behavior packages.',
    ],
  },
  {
    title: 'Accounts & Access',
    paragraphs: [
      'You are responsible for safeguarding credentials and API keys associated with your account.',
      'NEXUS provides role-based portals for developers, sponsors, investors, and platform administrators. Access is granted according to your assigned role and may be revoked for policy violations.',
    ],
  },
  {
    title: 'Subscriptions & Billing',
    paragraphs: [
      'Paid plans, sponsor tiers, and marketplace revenue share are billed according to the pricing displayed at checkout or in your sponsor agreement.',
      'Subscriptions renew automatically unless cancelled. Refunds follow the policy stated at purchase or in enterprise agreements.',
      'NEXUS may change pricing with reasonable notice. Continued use after a price change constitutes acceptance.',
    ],
  },
  {
    title: 'Intellectual Property',
    paragraphs: [
      'NEXUS retains ownership of the platform, design system, documentation, and official SDK tooling.',
      'You retain ownership of behaviors, applications, and content you create. By publishing to the Marketplace you grant NEXUS a license to distribute, display, and operate your packages through platform services.',
      'Open-source components included in NEXUS are subject to their respective licenses documented in product release notes.',
    ],
  },
  {
    title: 'Beta & Atlas Alpha Software',
    paragraphs: [
      'Beta, alpha, and preview releases are provided "as is" without warranties of fitness for production robotics deployment.',
      'Atlas Alpha software is intended for simulation, engineering validation, and controlled testing — not unsupervised physical operation without additional safety review.',
    ],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'To the maximum extent permitted by law, NEXUS is not liable for indirect, incidental, or consequential damages arising from use of the platform, including robot hardware operation decisions made by users.',
      'Our total liability for any claim is limited to fees paid to NEXUS in the twelve months preceding the claim.',
    ],
  },
  {
    title: 'Changes & Contact',
    paragraphs: [
      'We may update these Terms. Material changes will be announced through the website or email. Continued use after changes constitutes acceptance.',
      'Legal inquiries: Contact page or legal@nexus.local. Last updated: July 2026.',
    ],
  },
]
