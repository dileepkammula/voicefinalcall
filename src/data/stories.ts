import { Story } from '../types';

export const defaultStories: Story[] = [
  {
    id: 1,
    title: "Verbal Harassment on Public Transit",
    content: "I was riding the subway home from work around 7 PM when a man started making inappropriate comments about my appearance. When I ignored him, he became more aggressive and started following me. Other passengers noticed but no one intervened. I got off at the next stop and waited for the next train. This happens too often on this route.",
    type: "Verbal Harassment",
    location: "Downtown Metro Station",
    date: "2024-01-15",
    severity: "medium",
    likes: 23,
    tags: ["public-transit", "evening", "downtown"],
    comments: [
      {
        id: 1,
        content: "I'm so sorry this happened to you. I've experienced similar situations on that same line. We need better security presence during rush hours.",
        date: "2024-01-15",
        likes: 12,
        isSupport: true
      },
      {
        id: 2,
        content: "Thank you for sharing this. It helps knowing I'm not alone. I've started carrying a personal alarm after similar incidents.",
        date: "2024-01-16",
        likes: 8,
        isSupport: true
      },
      {
        id: 3,
        content: "This is exactly why I avoid that station after 6 PM. The transit authority needs to address this pattern.",
        date: "2024-01-16",
        likes: 15,
        isSupport: true
      }
    ]
  },
  {
    id: 2,
    title: "Workplace Sexual Harassment",
    content: "My supervisor has been making unwelcome advances for months. It started with inappropriate comments about my clothes, then escalated to unwanted touching during meetings. When I tried to address it, I was told I was 'overreacting' and that he was just being 'friendly'. I'm afraid to report it formally because he has influence in the company.",
    type: "Sexual Harassment",
    location: "Corporate Office District",
    date: "2024-01-12",
    severity: "high",
    likes: 45,
    tags: ["workplace", "supervisor", "corporate"],
    comments: [
      {
        id: 4,
        content: "Please document everything - dates, times, witnesses. You have rights and there are legal protections. Consider contacting HR or an employment lawyer.",
        date: "2024-01-12",
        likes: 28,
        isSupport: true
      },
      {
        id: 5,
        content: "I went through something similar. The EEOC has resources that helped me. You're not alone and this is NOT your fault.",
        date: "2024-01-13",
        likes: 22,
        isSupport: true
      },
      {
        id: 6,
        content: "Your company has a legal obligation to provide a safe workplace. If HR doesn't help, there are external agencies that will.",
        date: "2024-01-13",
        likes: 19,
        isSupport: true
      }
    ]
  },
  {
    id: 3,
    title: "Street Harassment While Jogging",
    content: "I was out for my morning run in the park when a group of men started catcalling and making sexual comments. When I ignored them, they began following me on their bikes, getting closer and making more explicit remarks. I had to change my route and run toward a busy area to lose them. I love running but I'm scared to go alone now.",
    type: "Verbal Harassment",
    location: "Riverside Park",
    date: "2024-01-10",
    severity: "medium",
    likes: 31,
    tags: ["park", "morning", "exercise", "following"],
    comments: [
      {
        id: 7,
        content: "This is so frustrating! We should be able to exercise safely. Have you considered joining a running group? There's safety in numbers.",
        date: "2024-01-10",
        likes: 18,
        isSupport: true
      },
      {
        id: 8,
        content: "I run with a whistle and pepper spray now. It's sad that we have to take these precautions, but it gives me confidence.",
        date: "2024-01-11",
        likes: 14,
        isSupport: true
      },
      {
        id: 9,
        content: "There's a women's running group that meets at 7 AM on weekends at the park entrance. You're welcome to join us!",
        date: "2024-01-11",
        likes: 25,
        isSupport: true
      }
    ]
  },
  {
    id: 4,
    title: "Online Harassment and Doxxing",
    content: "After posting about women's rights on social media, I started receiving threatening messages. Someone found my personal information and posted my address online with encouraging others to 'teach me a lesson'. I've had to temporarily stay elsewhere and am considering deleting all my social media accounts.",
    type: "Cyberbullying",
    location: "Online/Social Media",
    date: "2024-01-08",
    severity: "high",
    likes: 67,
    tags: ["online", "doxxing", "threats", "social-media"],
    comments: [
      {
        id: 10,
        content: "Please report this to the platform and consider contacting law enforcement. Doxxing is illegal in many places. Document everything.",
        date: "2024-01-08",
        likes: 35,
        isSupport: true
      },
      {
        id: 11,
        content: "I'm so sorry you're going through this. There are organizations that specialize in helping with online harassment. Don't let them silence you.",
        date: "2024-01-09",
        likes: 29,
        isSupport: true
      },
      {
        id: 12,
        content: "Consider reaching out to the Cyber Civil Rights Initiative - they have resources specifically for this type of harassment.",
        date: "2024-01-09",
        likes: 22,
        isSupport: true
      }
    ]
  },
  {
    id: 5,
    title: "Stalking by Ex-Partner",
    content: "My ex-boyfriend has been following me for weeks since our breakup. He shows up at my workplace, follows me home, and sends dozens of texts daily despite me blocking him. He's created fake social media accounts to contact me. I'm scared and don't know what to do. Friends say I should 'just ignore him' but it's getting worse.",
    type: "Stalking",
    location: "Various Locations",
    date: "2024-01-05",
    severity: "high",
    likes: 89,
    tags: ["stalking", "ex-partner", "workplace", "escalating"],
    comments: [
      {
        id: 13,
        content: "This is serious and dangerous. Please contact the police and consider getting a restraining order. Document everything - photos, screenshots, times, locations.",
        date: "2024-01-05",
        likes: 52,
        isSupport: true
      },
      {
        id: 14,
        content: "I went through this exact situation. The National Domestic Violence Hotline helped me create a safety plan. Please reach out to them: 1-800-799-7233",
        date: "2024-01-06",
        likes: 41,
        isSupport: true
      },
      {
        id: 15,
        content: "Your friends are wrong - this is NOT something to ignore. Stalking often escalates. Please prioritize your safety and get professional help.",
        date: "2024-01-06",
        likes: 38,
        isSupport: true
      }
    ]
  },
  {
    id: 6,
    title: "Discrimination at University",
    content: "As one of the few women in my engineering program, I face constant microaggressions from classmates and even some professors. Comments about how I 'probably got in because of diversity quotas' or that I should 'find a boyfriend to help with the hard classes' are regular occurrences. Group projects are especially difficult as male classmates often dismiss my ideas.",
    type: "Discrimination",
    location: "University Campus",
    date: "2024-01-03",
    severity: "medium",
    likes: 76,
    tags: ["university", "stem", "microaggressions", "academic"],
    comments: [
      {
        id: 16,
        content: "I'm in a similar program and face the same issues. Have you connected with the Women in Engineering group on campus? They've been incredibly supportive.",
        date: "2024-01-03",
        likes: 34,
        isSupport: true
      },
      {
        id: 17,
        content: "Document these incidents and consider reporting to the Title IX office. You deserve an equal education environment.",
        date: "2024-01-04",
        likes: 28,
        isSupport: true
      },
      {
        id: 18,
        content: "Your ideas and presence in STEM are valuable. Don't let them make you doubt yourself. There are mentorship programs that can help too.",
        date: "2024-01-04",
        likes: 31,
        isSupport: true
      }
    ]
  }
];