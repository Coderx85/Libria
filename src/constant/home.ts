import { FaBookReader, FaClock, FaStar, FaUserGraduate, FaMobileAlt, FaBook, FaBookmark } from 'react-icons/fa';
import { IoLibrary, IoBookSharp } from 'react-icons/io5';
import { MdSupportAgent, MdDevices } from 'react-icons/md';
import { IconType } from 'react-icons';

export const animations = {
  staggerChildren: {
    animate: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.1,
      },
    },
  },
  fadeInUp: {
    initial: {
      y: 60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },
  slideIn: {
    initial: {
      x: -60,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },
};

export interface HomeIcon {
  icon: IconType;
  title: string;
  description: string;
}

export const features: HomeIcon[] = [
  {
    icon: IoLibrary,
    title: 'Vast Collection',
    description: 'Access thousands of books across various genres and categories'
  },
  {
    icon: FaClock,
    title: '24/7 Access',
    description: 'Borrow and read books anytime, anywhere at your convenience'
  },
  {
    icon: FaStar,
    title: 'Personalized Experience',
    description: 'Get recommendations based on your reading preferences'
  },
  {
    icon: MdDevices,
    title: 'Multi-Device Support',
    description: 'Read seamlessly across all your devices'
  },
  {
    icon: MdSupportAgent,
    title: '24/7 Support',
    description: 'Get help whenever you need it with our dedicated support team'
  },
  {
    icon: FaBookmark,
    title: 'Easy Bookmarking',
    description: 'Save your favorite books and reading progress'
  }
];

export const stats = [
  { icon: IoBookSharp, number: '10,000+', label: 'Books Available' },
  { icon: FaUserGraduate, number: '5,000+', label: 'Active Readers' },
  { icon: FaBookReader, number: '1,000+', label: 'Daily Borrows' }
];

export const steps = [
  {
    icon: FaBook,
    title: 'Browse Collection',
    description: 'Explore our vast collection of books across different genres and categories'
  },
  {
    icon: FaMobileAlt,
    title: 'Choose Your Plan',
    description: 'Select a subscription plan that suits your reading needs'
  },
  {
    icon: FaBookmark,
    title: 'Start Reading',
    description: 'Borrow books and start reading instantly on any device'
  }
];

export const testimonials = [
  {
    quote: "Libria has transformed how I access and read books. The interface is intuitive and the collection is vast!",
    author: "Sarah Mitchell",
    role: "Student"
  },
  {
    quote: "The subscription plans are incredibly affordable, and the reading experience across devices is seamless.",
    author: "David Chen",
    role: "Professor"
  },
  {
    quote: "I love the personalized recommendations and how easy it is to keep track of my reading progress.",
    author: "Emma Williams",
    role: "Book Enthusiast"
  }
];

export const categories = [
  { name: 'Fiction', count: '2,500+' },
  { name: 'Science', count: '1,800+' },
  { name: 'Technology', count: '1,500+' },
  { name: 'History', count: '1,200+' },
  { name: 'Arts', count: '1,000+' },
  { name: 'Philosophy', count: '800+' },
  { name: 'Business', count: '1,300+' },
  { name: 'Literature', count: '900+' }
];

export const readingGoals = {
  goals: [
    { goal: 'Books per Month', progress: 70 },
    { goal: 'Reading Streaks', progress: 85 },
    { goal: 'Genres Explored', progress: 60 }
  ],
  stats: [
    { title: 'Monthly Goal', value: '8 Books' },
    { title: 'Current Streak', value: '15 Days' },
    { title: 'Books Read', value: '126' },
    { title: 'Reading Time', value: '250 Hours' }
  ]
};