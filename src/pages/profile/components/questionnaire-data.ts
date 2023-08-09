interface Question {
  initialValue: string | number | string[] | number[];
  label: string;
  /**
   * For slider
   */
  max: number | null;
  /**
   * For slider
   */
  min: number | null;
  options: string[] | null;
  type: 'textarea' | 'checklist' | 'radiolist' | 'slider';
}

const data: Question[] = [
  {
    label: 'Tell us a bit about your life',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: 'What are you excited about the most in your life right now?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label:
      "What's your co-living vibe? How would your housemates describe you?",
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: 'How do you like to spend your free time?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label:
      'What drives you to find a new home? What are you looking for in there, ideally?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label:
      'Are you comfortable with a alcohol / substances use in common areas / extracurriculars-friendly household?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label:
      '[Just for fun] Which species of bird do you most closely identify with and why?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label:
      'What is your COVID risk profile? Are you vaccinated & boosted? What safety requirements/preferences do you have of your housemates?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label:
      'Any allergies, accessibility issues, or other physical things that your housemates need to know how to accommodate?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: 'Is there anything else you would like us to know about you?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: "Any creative projects or cool things you're building?",
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label:
      'In your free time, what are things you would feel called to do to to help out around the house?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label:
      'What sort of events or activities specifically would you be excited to host, or even participate in?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: 'Describe a bit about your past experience living with housemates.',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label:
      "[Just for fun] Imagine we have made contact with aliens from outer space. You are part of the Earth diplomatic party sent to meet them. It's discovered that there will be alien offspring at the meeting along with the adults. You are chosen to bring a gift for the offspring. What do you bring, and why?",
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label:
      "Can you describe a social conflict you've faced in a past home or community and how you dealt with it?",
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: 'On a scale of 1 through 10, how messy is your room right now?',
    type: 'slider',
    initialValue: 1,
    options: null,
    min: 1,
    max: 10,
  },
  {
    label: 'What interests you about communal living?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: 'What are the characteristics of your ideal community?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: "[Just for fun] What's the last thing that made you laugh out loud?",
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: 'What standard questions would you ask every host?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: 'What would you like not to have at the community?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label:
      'Love languages are great and whatever, but what is your hate language? -Theft -Sabotage -Shunning -Words of Degredation -Violence',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: 'How much do you typically like to socialize with your housemates?',
    type: 'checklist',
    initialValue: [],
    options: ['Throughout each day', 'Every day', 'Weekends', 'Occasionally'],
    min: null,
    max: null,
  },
  {
    label: 'What are your favorite types of parties/events?',
    type: 'checklist',
    initialValue: [],
    options: [
      'Electronic music festival',
      'Cocktail mixer',
      'Company party',
      'Cuddle party',
      'Weird art party',
      'Gamer gathering',
      'Music club',
      'Sex party',
    ],
    min: null,
    max: null,
  },
  {
    label: 'On average, how often do you cook with or for others?',
    type: 'checklist',
    initialValue: [],
    options: ['Occasionally', 'Every week', 'I can all the time'],
    min: null,
    max: null,
  },
  {
    label: 'By what time do you usually go to sleep?',
    type: 'checklist',
    initialValue: [],
    options: ['before 10pm', '10-11 pm', '11pm - midnight', 'Past midnight'],
    min: null,
    max: null,
  },
  {
    label: 'How often do you speak up in groups (in person or electronically)?',
    type: 'checklist',
    initialValue: [],
    options: [
      'I almost always speak up',
      'I usually share my opinion',
      `I occasionally speak up only when I have
        something I feel strongly or confident
        about`,
      'Not often - I am flexible/prefer to listen',
    ],
    min: null,
    max: null,
  },
  {
    label:
      'We are seeking someone excited about cultivating a community. Do you consider yourself as a proactive person?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: 'How long do you plan on living in the Bay Area?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: 'Are you a mediator (in conflict situations)?',
    type: 'textarea',
    initialValue: '',
    options: null,
    min: null,
    max: null,
  },
  {
    label: "What's your conflict resolution style? ",
    type: 'checklist',
    initialValue: [],
    options: ['Immediately', 'First, I take a break'],
    min: null,
    max: null,
  },
  {
    label: 'How do you want to be approached in case of a conflict',
    type: 'checklist',
    initialValue: [],
    options: ['Email', 'In-person', 'Mutual friend', 'Mediator'],
    min: null,
    max: null,
  },
];

export default data;
