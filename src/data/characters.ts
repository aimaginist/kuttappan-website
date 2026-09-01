import type { ImageMetadata } from 'astro';

import kuttappanAction from '../assets/characters/action/kuttappan-lane-action.png';
import shambhuAction from '../assets/characters/action/shambhu-run-action-v2.png';
import pakruAction from '../assets/characters/action/pakru-leap-action.png';
import ammachiAction from '../assets/characters/action/ammachi-verandah-action.png';
import appuppanAction from '../assets/characters/action/appuppan-flour-action.png';
import ratchasanAction from '../assets/characters/action/ratchasan-monsoon-action.png';
import kuttappanDetail from '../assets/characters/detail/kuttappan-planning-study.png';
import shambhuDetail from '../assets/characters/detail/shambhu-banana-leaf-study.png';
import pakruDetail from '../assets/characters/detail/pakru-jackfruit-study.png';

export type Character = {
  slug: string;
  name: string;
  relation: string;
  intro: string;
  canon: string;
  detailImage: ImageMetadata;
  detailImageAlt: string;
  actionImage: ImageMetadata;
  actionImageAlt: string;
  accent: 'laterite' | 'monsoon' | 'gold';
};

export const characters: Character[] = [
  {
    slug: 'kuttappan',
    name: 'Kuttappan',
    relation: 'The magnificent planner',
    intro: 'Ten years old. His plans are magnificent. His failures are more magnificent still.',
    canon: 'Rounded black curly hair, a cream shirt, brown shorts and bare feet.',
    detailImage: kuttappanDetail,
    detailImageAlt: 'Kuttappan cheerfully drawing his latest plan in the wet earth of a Kerala village lane.',
    actionImage: kuttappanAction,
    actionImageAlt: 'Kuttappan charging through a rain-filled laterite village lane.',
    accent: 'gold',
  },
  {
    slug: 'shambhu',
    name: 'Shambhu',
    relation: "Kuttappan's friend",
    intro: 'One of the friends at the heart of Kuttappan’s stories in Thottumkara.',
    canon: 'Messy black hair, a sage-green T-shirt, brown shorts, bare feet and a red thread bracelet on his right wrist.',
    detailImage: shambhuDetail,
    detailImageAlt: 'Shambhu steadying a banana leaf umbrella on a rain-washed Kerala village path.',
    actionImage: shambhuAction,
    actionImageAlt: 'Shambhu running through a rain-filled laterite village lane.',
    accent: 'monsoon',
  },
  {
    slug: 'pakru',
    name: 'Pakru',
    relation: "Kuttappan's friend",
    intro: 'One of Kuttappan’s friends in the comedy and commotion of village life.',
    canon: 'A rounder build, short black hair, an orange T-shirt, brown shorts and bare feet.',
    detailImage: pakruDetail,
    detailImageAlt: 'Pakru proudly carrying an enormous jackfruit across a rain-washed Kerala courtyard.',
    actionImage: pakruAction,
    actionImageAlt: 'Pakru making a joyful leap over a rain puddle on a Kerala village lane.',
    accent: 'laterite',
  },
];

export const supportingCharacters = [
  {
    name: 'Ammachi',
    image: ammachiAction,
    imageAlt: 'Ammachi stepping onto a rain-wet verandah in Thottumkara.',
  },
  {
    name: 'Appuppan',
    image: appuppanAction,
    imageAlt: 'Flour-covered Appuppan emerging into a Kerala village courtyard.',
  },
  {
    name: 'Ratchasan',
    image: ratchasanAction,
    imageAlt: 'Ratchasan charging through a monsoon puddle on a Kerala village lane.',
  },
];
