import { ObjectId } from "mongodb";
import type { BlogCategory, BlogEntry, BlogUser } from "./schema";

const defaultBlogCategories: BlogCategory[] = [
  {
    key: "news",
    value: "News",
  },
  {
    key: "fashion",
    value: "Fashion",
  },
  {
    key: "fitness",
    value: "Fitness",
  },
  {
    key: "diy",
    value: "DIY",
  },
  {
    key: "infographics",
    value: "Infographics",
  },
  {
    key: "listicles",
    value: "Listicles",
  },
  {
    key: "case_study",
    value: "Case Studies",
  },
  {
    key: "interviews",
    value: "Interviews",
  },
  {
    key: "business",
    value: "Business",
  },
  {
    key: "romance",
    value: "Romance",
  },
  {
    key: "other",
    value: "Other",
  },
];

const defaultBlogEntries: BlogEntry[] = [
  {
    title: "Why my test is the best",
    authorId: new ObjectId(),
    description: "Explanation of why this test is the best",
    categoryKey: "case_study",
    createdAt: Date.now(),
    editedAt: Date.now(),
    impressionCount: 3,
    contentElements: [
      { type: "h1", content: { text: "Question: Why is this test the best?" } },
      {
        type: "text",
        content: { text: "Answer: It contains beautiful text!" },
      },
    ],
    commentsAllowed: false,
    comments: [],
  },
  {
    title: "Nevermind, this one is better",
    authorId: new ObjectId(),
    description: "Explanation of why this test is actually better",
    categoryKey: "case_study",
    createdAt: Date.now(),
    editedAt: null,
    impressionCount: 4,
    contentElements: [
      {
        type: "h1",
        content: { text: "Question: Why is this test actually better?" },
      },
      {
        type: "link",
        content: {
          link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          displayText: "Answer: It contains an unbeatable link!",
        },
      },
    ],
    commentsAllowed: false,
    comments: [],
  },
  {
    title: "Nature is underrated",
    authorId: new ObjectId(),
    description: "See Title",
    categoryKey: "fitness",
    createdAt: Date.now(),
    editedAt: Date.now(),
    impressionCount: 1,
    contentElements: [
      {
        type: "text",
        content: {
          text: "Sure, training is easier in controlled environments, but don't you just love the smell of fresh air and feel of touching grass?",
        },
      },
    ],
    commentsAllowed: true,
    comments: [
      {
        blogId: new ObjectId(),
        authorId: new ObjectId(),
        text: "No",
        createdAt: Date.now(),
      },
    ],
  },
  {
    title: "Cool sitcom",
    authorId: new ObjectId(),
    description: "See Title",
    categoryKey: "other",
    createdAt: Date.now(),
    editedAt: Date.now(),
    impressionCount: 2,
    contentElements: [
      {
        type: "link",
        content: {
          link: "https://en.wikipedia.org/wiki/The_Office_(American_TV_series)",
          displayText: "The Office",
        },
      },
    ],
    commentsAllowed: true,
    comments: [
      {
        blogId: new ObjectId(),
        authorId: new ObjectId(),
        text: "Yes",
        createdAt: Date.now(),
      },
    ],
  },
  {
    title: "What are your thoughts on short sleeved shirts?",
    authorId: new ObjectId(),
    description: "See title",
    categoryKey: "fashion",
    createdAt: Date.now(),
    editedAt: Date.now(),
    impressionCount: 5,
    contentElements: [
      {
        type: "text",
        content: { text: "I don't like them, they expose too much skin..." },
      },
    ],
    commentsAllowed: true,
    comments: [
      {
        blogId: new ObjectId(),
        authorId: new ObjectId(),
        text: "Are you insane?",
        createdAt: Date.now(),
      },
      {
        blogId: new ObjectId(),
        authorId: new ObjectId(),
        text: "How do you survive summer?",
        createdAt: Date.now(),
      },
    ],
  },
];

const defaultBlogUsers: BlogUser[] = [
  {
    username: "yannialshoufi",
    firstName: "Yanni",
    lastName: "Alshoufi",
    email: "test@test.test",
    rawPassword: "1234",
  },
  {
    username: "yanni_casual",
    firstName: "Yanni",
    lastName: "",
    email: "test@test.test",
    rawPassword: "1234",
  },
  {
    username: "xdmoritz",
    firstName: "Moritz",
    lastName: "Bernhofer",
    email: "test@test.test",
    rawPassword: "1234",
  },
  {
    username: "max_mustermann",
    firstName: "Max",
    lastName: "Mustermann",
    email: "test@test.test",
    rawPassword: "1234",
  },
  {
    username: "m_musterfrau",
    firstName: "M.",
    lastName: "Musterfrau",
    email: "test@test.test",
    rawPassword: "1234",
  },
];

comments: [
  {
    blogId: new ObjectId(),
    authorId: new ObjectId(),
    text: "No",
    createdAt: Date.now(),
  },
  {
    blogId: new ObjectId(),
    authorId: new ObjectId(),
    text: "Yes",
    createdAt: Date.now(),
  },
  {
    blogId: new ObjectId(),
    authorId: new ObjectId(),
    text: "Are you insane?",
    createdAt: Date.now(),
  },
  {
    blogId: new ObjectId(),
    authorId: new ObjectId(),
    text: "How do you survive summer?",
    createdAt: Date.now(),
  },
];
