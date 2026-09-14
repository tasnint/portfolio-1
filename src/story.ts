import photoBorn from './assets/photo-born.jpg'
import photoBungee from './assets/photo-bungee.jpg'
import photoChildhood from './assets/photo-childhood.jpg'
import photoDhaka from './assets/photo-dhaka.jpg'
import photoFriends from './assets/photo-friends.jpg'
import photoMcmaster from './assets/photo-mcmaster.jpg'
import photoNow from './assets/photo-now.jpg'
import github from './assets/github.png'
import linkedin from './assets/linkedin.png'
import tiktok from './assets/tiktok.png'

// All geometry is in Figma pixels on the 1440×1024 "Desktop" frames.
export const STAGE = { width: 1440, height: 1024 }

export type Box = { x: number; y: number; w: number; h: number }

type Photo = {
  src: string
  alt: string
  box: Box
  radius: number
  // Figma crop, as % of the photo box. Omitted = object-fit: cover.
  crop?: { left: number; top: number; w: number; h: number }
  // Figma "Edge Shading" overlay.
  shaded?: boolean
}

// Title stays put across slides, at the highest position used in Figma (Desktop 9).
export const TITLE_TOP = 145

export type Slide = {
  caption: string
  barTop: number
  captionTop: number
  captionWidth: number
  clouds: Box[]
  photo?: Photo
  // Appends the "resume" button after the caption text.
  resumeLink?: boolean
}

export const RESUME_URL = '/Tanisha-Tasnin_Resume.pdf'

const clouds = (...list: [number, number, number, number][]): Box[] =>
  list.map(([x, y, w, h]) => ({ x, y, w, h }))

const CLOUDS_INTRO = clouds([108, 151, 298, 186], [580, 0, 280, 175], [0, 467, 144, 90], [1163, 83, 144, 90], [1255, 402, 194, 121])
const CLOUDS_EARLY = clouds([108, 151, 298, 186], [571, 47, 298, 186], [0, 467, 144, 90], [1111, 125, 144, 90], [1255, 402, 194, 121])
// Nudged variants so clouds drift between every pair of consecutive slides.
const CLOUDS_BORN = clouds([128, 138, 298, 186], [552, 36, 298, 186], [16, 452, 144, 90], [1135, 108, 144, 90], [1240, 420, 194, 121])
const CLOUDS_MCMASTER = clouds([92, 164, 298, 186], [612, 34, 268, 167], [0, 496, 144, 90], [1232, 142, 144, 90], [1250, 460, 194, 121])
const CLOUDS_DHAKA = clouds([108, 151, 298, 186], [571, 47, 298, 186], [12, 481, 144, 90], [1111, 125, 144, 90], [1233, 481, 194, 121])
const CLOUDS_LATE = clouds([108, 151, 298, 186], [595, 23, 268, 167], [12, 481, 144, 90], [1255, 125, 144, 90], [1233, 481, 194, 121])
const CLOUDS_NOW = clouds([108, 151, 298, 186], [596, 7, 247, 154], [12, 481, 144, 90], [1255, 125, 144, 90], [1233, 481, 194, 121])

// Slide 0 is the intro (Desktop 3); slides 1–6 are Desktop 4–9.
export const SLIDES: Slide[] = [
  {
    caption: 'To get to know me, drag the star all the way to the left!\nAnd if you’re in a rush, here’s my ',
    resumeLink: true,
    barTop: 762,
    captionTop: 833,
    captionWidth: 1023,
    clouds: CLOUDS_INTRO,
    photo: {
      src: photoBungee,
      alt: 'Tanisha smiling up at the camera at the bottom of a bungee jump',
      box: { x: 408, y: 290, w: 625, h: 416 },
      radius: 48,
      shaded: true,
    },
  },
  {
    caption: 'Let’s start with a fun fact: I have always been fascinated\nby the sky and its beautiful clouds. Blue is my favorite color!',
    barTop: 762,
    captionTop: 833,
    captionWidth: 1023,
    clouds: CLOUDS_EARLY,
    photo: { src: photoChildhood, alt: 'Tanisha as a little girl in a sari with a flower in her hair', box: { x: 527, y: 287, w: 381, h: 422 }, radius: 53 },
  },
  {
    caption: 'So it all started when my family moved to Canada for my dad’s PhD. Shortly after, I was born!',
    barTop: 762,
    captionTop: 833,
    captionWidth: 1023,
    clouds: CLOUDS_BORN,
    photo: { src: photoBorn, alt: 'Tanisha as a child with her family in Canada', box: { x: 524, y: 295, w: 392, h: 433 }, radius: 65 },
  },
  {
    caption: 'I was 4 when my dad finished his degree and we moved back home. Where is home? Dhaka, Bangladesh!!',
    barTop: 762,
    captionTop: 833,
    captionWidth: 1023,
    clouds: CLOUDS_DHAKA,
    photo: {
      src: photoDhaka,
      alt: 'Tanisha and her sister as kids in Dhaka',
      box: { x: 495, y: 298, w: 449, h: 428 },
      radius: 47,
      crop: { left: -0.07, top: -8.31, w: 100.14, h: 108.31 },
    },
  },
  {
    caption: 'I grew up in Dhaka. I met my best friends who I still talk to every other day and had some of the best of times there!',
    barTop: 762,
    captionTop: 833,
    captionWidth: 1023,
    clouds: CLOUDS_LATE,
    photo: {
      src: photoFriends,
      alt: 'Tanisha with her best friends at their graduation in Dhaka',
      box: { x: 435, y: 302, w: 618, h: 394 },
      radius: 46,
      crop: { left: 0, top: -17.51, w: 100, h: 117.51 },
    },
  },
  {
    caption: 'After finishing high school, I packed my life into two suitcases and moved to Canada for my undergrad at McMaster.',
    barTop: 762,
    captionTop: 833,
    captionWidth: 1023,
    clouds: CLOUDS_MCMASTER,
    photo: { src: photoMcmaster, alt: 'Tanisha on a city street at night', box: { x: 505, y: 277, w: 429, h: 449 }, radius: 48 },
  },
  {
    caption: 'Since then, I landed my first of many internships, grew a passion for AI and ML, and most importantly, met some really cool people who make my life what it is today!',
    barTop: 762,
    captionTop: 833,
    captionWidth: 1023,
    clouds: CLOUDS_NOW,
    photo: {
      src: photoNow,
      alt: 'Tanisha with her friends on a snowy mountain',
      box: { x: 499, y: 270, w: 440, h: 459 },
      radius: 48,
      crop: { left: -18.63, top: -42.73, w: 118.65, h: 151.82 },
    },
  },
]

export const BAR = { x: 444, width: 552, height: 40 }

// Sparkle stop centres, relative to the bar. The intro sits on the far right;
// dragging left starts the story, then it moves right one stop per slide.
export const STOPS = [20, 105, 190, 275, 360, 445, 530]
export const INTRO_STOP = STOPS.length - 1
export const slideForStop = (stop: number) => (stop === INTRO_STOP ? 0 : stop + 1)

export const SOCIALS = [
  // Centred in the strip below the card (card bottom 957 → stage bottom 1024).
  { label: 'GitHub', href: 'https://github.com/tasnint', icon: github, box: { x: 1154, y: 966, w: 49, h: 49 } },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tanishatasnin/', icon: linkedin, box: { x: 1236, y: 958, w: 66, h: 66 } },
  { label: 'TikTok', href: 'https://www.tiktok.com/@shiisha67', icon: tiktok, box: { x: 1335, y: 967, w: 47, h: 47 } },
]
