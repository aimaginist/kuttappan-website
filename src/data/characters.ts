export interface Character {
  name: string;
  role: string;
  tagline: string;
  description: string;
  image: string;
  faceImage: string;
  traits: string[];
}

export const characters: Character[] = [
  {
    name: "Kuttappan",
    role: "The Dreamer",
    tagline: "Big plans. Zero backup plans.",
    description:
      "Eight years old. Curly hair that has a mind of its own. Bare feet that know every shortcut in the village. And a plan that's definitely, absolutely, 100% going to work this time. Kuttappan sees the extraordinary in the ordinary — turning every lazy village afternoon into an epic adventure. His plans never go right, but somehow, everything turns out okay. Because the real treasure was never the plan — it was the chaos along the way.",
    image: "/images/characters/kuttappan-full-front.webp",
    faceImage: "/images/characters/kuttappan-face.webp",
    traits: ["Mischievous", "Optimistic", "Warm", "Curious", "Unstoppable"],
  },
  {
    name: "Shambhu",
    role: "The Loyal One",
    tagline: "Knows it'll fail. Joins anyway.",
    description:
      "Spiky hair, green tee, and the patience of a saint. Shambhu has seen enough of Kuttappan's plans to know exactly how they'll end. He joins anyway. Every single time. Because that's what best friends do. He's the voice of reason that nobody listens to, the one who says \"this is a bad idea\" while already climbing the tree.",
    image: "/images/characters/shambhu-hero.webp",
    faceImage: "/images/characters/shambhu-face.webp",
    traits: ["Loyal", "Cautious", "Brave (when it counts)", "Funny"],
  },
  {
    name: "Pakru",
    role: "The Heart (and Stomach)",
    tagline: "Snacks first. Adventure second.",
    description:
      "Chubby cheeks, buzz cut, orange tee, and a stomach that tells time better than any clock. Pakru's priorities are refreshingly simple: snacks first, adventure second, naps somewhere in between. But don't let the easy-going nature fool you — when his friends are in trouble, Pakru finds courage he didn't know he had. Usually while holding a half-eaten banana.",
    image: "/images/characters/pakru-hero.webp",
    faceImage: "/images/characters/pakru-face.webp",
    traits: ["Lovable", "Funny", "Brave", "Hungry (always)"],
  },
];

export const expressions = [
  { name: "Excited",  src: "/images/expressions/kuttappan-excited.webp"  },
  { name: "Shocked",  src: "/images/expressions/kuttappan-shocked.webp"  },
  { name: "Thinking", src: "/images/expressions/kuttappan-thinking.webp" },
  { name: "Laughing", src: "/images/expressions/kuttappan-laughing.webp" },
  { name: "Sad",      src: "/images/expressions/kuttappan-sad.webp"      },
  { name: "Proud",    src: "/images/expressions/kuttappan-proud.webp"    },
];
