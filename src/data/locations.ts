export interface Location {
  name: string;
  image: string;
  description: string;
  span?: boolean;
}

export const locations: Location[] = [
  {
    name: "Kuttappan's Home",
    image: "/images/world/home-exterior.webp",
    description:
      "A traditional Kerala tharavadu with carved wooden pillars, a sloping terracotta roof, and a mango tree in the front yard that has witnessed every single one of Kuttappan's schemes. This is where brilliant plans are born — usually at the breakfast table.",
    span: true,
  },
  {
    name: "Inside the Home",
    image: "/images/world/home-interior.webp",
    description:
      "Red oxide floors that echo with running feet. A wooden swing that's seen three generations of daydreamers. A CRT television that only gets three channels. And a rotary phone that Kuttappan has never successfully used.",
  },
  {
    name: "The Village School",
    image: "/images/world/school.webp",
    description:
      "Terracotta roof, green-and-cream walls, and a bell that always rings too soon. Where Kuttappan stares out the window, drawing elaborate plan diagrams in the margins of his notebook.",
  },
  {
    name: "The Village Shop",
    image: "/images/world/village-shop.webp",
    description:
      "Brick walls lined with colourful snack packets. A wooden counter worn smooth by a thousand transactions. A glass jar of sweets that Pakru has memorised the contents of. This is where pocket money disappears and legends begin.",
  },
  {
    name: "The Paddy Fields",
    image: "/images/world/paddy-fields.webp",
    description:
      "Endless green stretching to the mountains, divided by mud paths and water channels. Where egrets stand like punctuation marks and the biggest adventures play out under the widest sky.",
  },
  {
    name: "The Backwaters",
    image: "/images/world/backwaters.webp",
    description:
      "Stepping stones across a lily-pad stream, coconut palms arching overhead, lotus flowers nodding in the breeze. This is Kuttappan's thinking spot — where plans are dreamed up and failures are forgotten.",
    span: true,
  },
  {
    name: "The Village Road",
    image: "/images/world/village-road.webp",
    description:
      "Suresh's chai stall where the elders debate everything. Vijaya Provisions where Pakru window-shops daily. Raju's barber saloon where gossip travels faster than the KSRTC bus that rumbles through every afternoon.",
  },
];
