const iqQuestions = [
  {
    id: 1,
    question: "Which number comes next in the series: 2, 4, 8, 16, ...?",
    options: ["20", "24", "32", "64"],
    correct: 2,
    category: "Logic",
    difficulty: "Easy",
    explanation: "Each number doubles the previous: 2×2=4, 4×2=8, 8×2=16, 16×2=32"
  },
  {
    id: 2,
    question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.",
    options: ["True", "False"],
    correct: 0,
    category: "Deduction",
    difficulty: "Easy",
    explanation: "If Bloops ⊆ Razzies ⊆ Lazzies, then Bloops ⊆ Lazzies. This is a classic syllogism."
  },
  {
    id: 3,
    question: "Which word does not belong with the others?",
    options: ["Apple", "Banana", "Carrot", "Grape"],
    correct: 2,
    category: "Categorization",
    difficulty: "Easy",
    explanation: "Apple, Banana, and Grape are fruits. Carrot is a vegetable."
  },
  {
    id: 4,
    question: "A train travels 60 miles in 1 hour. At the same speed, how far will it travel in 45 minutes?",
    options: ["40 miles", "45 miles", "50 miles", "55 miles"],
    correct: 1,
    category: "Math",
    difficulty: "Easy",
    explanation: "Speed = 60 mph. In 45 minutes (0.75 hours): 60 × 0.75 = 45 miles."
  },
  {
    id: 5,
    question: "Rearrange the letters 'T E R A W' to form a word. What is it?",
    options: ["Water", "Tearw", "Watre", "Ratew"],
    correct: 0,
    category: "Verbal",
    difficulty: "Easy",
    explanation: "The letters T-E-R-A-W rearrange to spell 'Water'."
  },
  {
    id: 6,
    question: "Complete the analogy: Book is to Reading as Fork is to ___",
    options: ["Cooking", "Eating", "Food", "Kitchen"],
    correct: 1,
    category: "Verbal",
    difficulty: "Medium",
    explanation: "A book is used for reading; a fork is used for eating."
  },
  {
    id: 7,
    question: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
    options: ["$0.10", "$0.05", "$0.15", "$0.01"],
    correct: 1,
    category: "Math",
    difficulty: "Medium",
    explanation: "Ball = x, Bat = x + 1.00. x + (x + 1.00) = 1.10 → 2x = 0.10 → x = 0.05"
  },
  {
    id: 8,
    question: "Which shape completes the sequence? △ → ◻ → ○ → △ → ◻ → ?",
    options: ["△", "◻", "○", "◇"],
    correct: 2,
    category: "Logic",
    difficulty: "Medium",
    explanation: "The pattern cycles through triangle, square, circle. After triangle, square, the next is circle."
  },
  {
    id: 9,
    question: "If you fold a square paper in half and then in half again, how many layers do you have?",
    options: ["2", "4", "8", "6"],
    correct: 1,
    category: "Spatial",
    difficulty: "Medium",
    explanation: "First fold doubles to 2 layers. Second fold doubles to 4 layers."
  },
  {
    id: 10,
    question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
    options: ["0°", "7.5°", "15°", "30°"],
    correct: 1,
    category: "Math",
    difficulty: "Medium",
    explanation: "At 3:15, minute hand is at 3, hour hand has moved 1/4 of the way to 4 = 7.5° past 3."
  },
  {
    id: 11,
    question: "All squares are rectangles. Some rectangles are polygons. Therefore:",
    options: ["All squares are polygons", "Some squares are polygons", "No squares are polygons", "Cannot be determined"],
    correct: 0,
    category: "Deduction",
    difficulty: "Hard",
    explanation: "All squares are rectangles, and all rectangles are polygons, therefore all squares are polygons."
  },
  {
    id: 12,
    question: "What is the next number in the sequence: 1, 1, 2, 3, 5, 8, 13, ?",
    options: ["18", "20", "21", "24"],
    correct: 2,
    category: "Logic",
    difficulty: "Hard",
    explanation: "This is the Fibonacci sequence: each number is the sum of the two preceding ones. 8 + 13 = 21."
  },
  {
    id: 13,
    question: "If you cut a cube through the center parallel to one face, how many faces have paint on them?",
    options: ["4", "5", "6", "8"],
    correct: 2,
    category: "Spatial",
    difficulty: "Hard",
    explanation: "The cut exposes two new internal faces, but the original 6 outer faces remain intact."
  },
  {
    id: 14,
    question: "Which word is the odd one out?",
    options: ["Ephemeral", "Fleeting", "Eternal", "Transient"],
    correct: 2,
    category: "Verbal",
    difficulty: "Hard",
    explanation: "Ephemeral, fleeting, and transient all mean short-lived. Eternal means lasting forever."
  },
  {
    id: 15,
    question: "Three friends each have a different favorite color: red, blue, or green. Sarah does not like red. Tom likes blue. What is Mike's favorite color?",
    options: ["Red", "Blue", "Green", "Cannot be determined"],
    correct: 0,
    category: "Deduction",
    difficulty: "Hard",
    explanation: "Tom = blue. Sarah ≠ red → Sarah = green. Mike = the remaining color = red."
  }
];

const mbtiQuestions = [
  {
    id: 1,
    text: "After a long week, I prefer to recharge by:",
    optionA: "Going out with friends or attending social events",
    optionB: "Spending quiet time alone or with one close friend",
    trait: "EI",
    direction: 1
  },
  {
    id: 2,
    text: "When learning something new, I focus more on:",
    optionA: "The practical, concrete facts and details",
    optionB: "The big picture, patterns, and future possibilities",
    trait: "SN",
    direction: 1
  },
  {
    id: 3,
    text: "When making a decision, I rely more on:",
    optionA: "Logic, objective analysis, and consistency",
    optionB: "Personal values, empathy, and harmony",
    trait: "TF",
    direction: 1
  },
  {
    id: 4,
    text: "I prefer my schedule and environment to be:",
    optionA: "Planned, organized, and decided in advance",
    optionB: "Flexible, spontaneous, and open to change",
    trait: "JP",
    direction: 1
  },
  {
    id: 5,
    text: "In conversation, I tend to:",
    optionA: "Think out loud and process by talking",
    optionB: "Think carefully before speaking my thoughts",
    trait: "EI",
    direction: 1
  },
  {
    id: 6,
    text: "I trust information that is:",
    optionA: "Based on direct experience and observable facts",
    optionB: "Based on insight, theory, and underlying meaning",
    trait: "SN",
    direction: 1
  },
  {
    id: 7,
    text: "When someone is upset, I tend to:",
    optionA: "Help them analyze the problem logically",
    optionB: "Offer emotional support and understanding",
    trait: "TF",
    direction: 1
  },
  {
    id: 8,
    text: "I feel most comfortable when:",
    optionA: "Things are settled, decided, and wrapped up",
    optionB: "Options are open and I can adapt as I go",
    trait: "JP",
    direction: 1
  }
];

const mbtiTypes = {
  INTJ: {
    label: "INTJ — The Architect",
    description: "Strategic, analytical, and independent. You see possibilities and drive toward improvement with focused determination.",
    strengths: ["Strategic thinking", "Long-term planning", "High standards", "Independent problem-solving"],
    weaknesses: ["Can be overly critical", "May dismiss emotional factors", "Tends toward perfectionism"],
    careers: ["Scientist", "Engineer", "Strategist", "Software Architect"]
  },
  INTP: {
    label: "INTP — The Thinker",
    description: "Innovative, curious, and logical. You love exploring ideas and understanding how systems work at a fundamental level.",
    strengths: ["Analytical reasoning", "Creative problem-solving", "Objective", "Deep focus"],
    weaknesses: ["Can get lost in theory", "May neglect practical details", "Struggles with routine"],
    careers: ["Philosopher", "Mathematician", "Programmer", "Professor"]
  },
  ENTJ: {
    label: "ENTJ — The Commander",
    description: "Bold, decisive, and strategic. You naturally take charge and drive teams toward ambitious goals.",
    strengths: ["Natural leadership", "Strategic vision", "Efficiency-driven", "Confident decision-making"],
    weaknesses: ["Can be domineering", "Impatient with inefficiency", "May overlook emotional needs"],
    careers: ["Executive", "Entrepreneur", "Management Consultant", "Lawyer"]
  },
  ENTP: {
    label: "ENTP — The Debater",
    description: "Quick-witted, innovative, and energetic. You thrive on intellectual challenge and enjoy exploring new possibilities.",
    strengths: ["Quick thinking", "Idea generation", "Charismatic", "Adaptable"],
    weaknesses: ["May argue for sport", "Easily bored with routine", "Can lack follow-through"],
    careers: ["Entrepreneur", "Inventor", "Journalist", "Venture Capitalist"]
  },
  INFJ: {
    label: "INFJ — The Advocate",
    description: "Insightful, compassionate, and principled. You have a deep understanding of people and a vision for a better world.",
    strengths: ["Deep empathy", "Creative insight", "Strong values", "Excellent listener"],
    weaknesses: ["Perfectionistic", "Easily overwhelmed", "Can be too idealistic"],
    careers: ["Counselor", "Writer", "Teacher", "Non-profit Director"]
  },
  INFP: {
    label: "INFP — The Mediator",
    description: "Idealistic, empathetic, and creative. You are guided by your core values and a desire for authenticity and meaning.",
    strengths: ["Deeply empathetic", "Creative", "Open-minded", "Committed to values"],
    weaknesses: ["Can be overly sensitive", "Struggles with conflict", "May neglect practical needs"],
    careers: ["Writer", "Artist", "Counselor", "Graphic Designer"]
  },
  ENFJ: {
    label: "ENFJ — The Protagonist",
    description: "Charismatic, inspiring, and diplomatic. You naturally bring people together and motivate them toward a common purpose.",
    strengths: ["Inspirational leader", "Excellent communicator", "Empathetic", "Organized"],
    weaknesses: ["Can be overly approval-seeking", "May neglect own needs", "Takes criticism personally"],
    careers: ["Teacher", "HR Manager", "Coach", "Public Relations"]
  },
  ENFP: {
    label: "ENFP — The Campaigner",
    description: "Enthusiastic, creative, and people-oriented. You see life as a tapestry of possibilities and connections.",
    strengths: ["Warm and engaging", "Creative thinker", "Highly adaptable", "Inspires others"],
    weaknesses: ["Can be disorganized", "Struggles with follow-through", "Overly optimistic"],
    careers: ["Journalist", "Counselor", "Actor", "Entrepreneur"]
  },
  ISTJ: {
    label: "ISTJ — The Inspector",
    description: "Practical, dependable, and thorough. You value order, responsibility, and following through on commitments.",
    strengths: ["Highly reliable", "Detail-oriented", "Strong work ethic", "Organized"],
    weaknesses: ["Can be rigid", "Struggles with ambiguity", "May resist change"],
    careers: ["Accountant", "Auditor", "Judge", "Military Officer"]
  },
  ISFJ: {
    label: "ISFJ — The Defender",
    description: "Warm, conscientious, and dedicated. You quietly support others and take pride in keeping things running smoothly.",
    strengths: ["Supportive and caring", "Detail-oriented", "Loyal", "Practical"],
    weaknesses: ["Takes on too much", "Avoids conflict", "May undervalue own needs"],
    careers: ["Nurse", "Teacher", "Social Worker", "Administrator"]
  },
  ESTJ: {
    label: "ESTJ — The Executive",
    description: "Efficient, organized, and direct. You naturally take charge and get things done through structure and clear systems.",
    strengths: ["Natural organizer", "Results-driven", "Dependable", "Strong leadership"],
    weaknesses: ["Can be inflexible", "May be blunt", "Struggles with nuance"],
    careers: ["Manager", "Military Officer", "Judge", "Politician"]
  },
  ESFJ: {
    label: "ESFJ — The Consul",
    description: "Social, caring, and organized. You bring people together and take pride in creating harmony and helping others.",
    strengths: ["Warm and sociable", "Practical help", "Highly organized", "Loyal"],
    weaknesses: ["Can be overly concerned with status", "Struggles with criticism", "May neglect own needs"],
    careers: ["Teacher", "Nurse", "Event Planner", "Social Worker"]
  },
  ISTP: {
    label: "ISTP — The Virtuoso",
    description: "Practical, hands-on, and adaptable. You understand how things work and excel at troubleshooting in real time.",
    strengths: ["Hands-on problem solver", "Calm under pressure", "Practical", "Resourceful"],
    weaknesses: ["May be private", "Can be bored by theory", "Struggles with long-term planning"],
    careers: ["Engineer", "Pilot", "Surgeon", "Mechanic"]
  },
  ISFP: {
    label: "ISFP — The Adventurer",
    description: "Gentle, artistic, and free-spirited. You experience life deeply through your senses and express yourself creatively.",
    strengths: ["Artistically gifted", "Deeply empathetic", "Flexible", "Observant"],
    weaknesses: ["Can be overly sensitive", "Avoids conflict", "Struggles with planning"],
    careers: ["Artist", "Designer", "Counselor", "Chef"]
  },
  ESTP: {
    label: "ESTP — The Entertainer",
    description: "Energetic, action-oriented, and charismatic. You live in the moment and excel at reading people and situations.",
    strengths: ["Charismatic", "Quick reactor", "Practical problem-solver", "Persuasive"],
    weaknesses: ["Can be risk-prone", "May be impatient", "Struggles with routine"],
    careers: ["Salesperson", "Entrepreneur", "Athlete", "Detective"]
  },
  ESFP: {
    label: "ESFP — The Performer",
    description: "Spontaneous, enthusiastic, and people-loving. You bring joy and energy to every situation and connect easily with others.",
    strengths: ["Warm and optimistic", "Charismatic", "Practical", "Adaptable"],
    weaknesses: ["May avoid deep thinking", "Can be easily distracted", "Struggles with planning"],
    careers: ["Performer", "Sales", "Tour Guide", "Coach"]
  }
};

const iqInterpretation = {
  genius: { min: 130, label: "Genius", description: "Exceptional cognitive ability. You are in the top 2% of the population.", color: "#7c3aed" },
  gifted: { min: 120, label: "Gifted", description: "Well above average intelligence. Strong problem-solving and reasoning skills.", color: "#2563eb" },
  aboveAverage: { min: 110, label: "Above Average", description: "Above average cognitive ability. You grasp complex concepts quickly.", color: "#059669" },
  average: { min: 90, label: "Average", description: "Average cognitive ability within the normal population range.", color: "#d97706" },
  belowAverage: { min: 80, label: "Below Average", description: "Below average in this assessment. Consider practicing cognitive exercises.", color: "#dc2626" },
  developing: { min: 0, label: "Developing", description: "Your cognitive skills are still developing. Regular practice can improve your score.", color: "#6b7280" }
};

const difficultyPoints = { Easy: 1, Medium: 2, Hard: 3 };

export { iqQuestions, mbtiQuestions, mbtiTypes, iqInterpretation, difficultyPoints };
