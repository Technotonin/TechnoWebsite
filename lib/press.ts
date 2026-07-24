// Press coverage shown in the "As featured in" marquee (home) and the
// "As seen in" row (investors). Both surfaces read this list so the logos and
// the stories they point at stay in sync. `href` is the article the logo links
// out to — e-Fest is a competition credit with no story, so it stays unlinked.
export type PressLogo = {
  src: string;
  alt: string;
  href?: string;
};

export const pressLogos: PressLogo[] = [
  {
    src: "/assets/logos/boston25-news-logo.png",
    alt: "Boston 25 News",
    href: "https://www.boston25news.com/news/local/purpose-helping-people-mass-college-students-win-national-award-with-wheelchair-innovation/ZTSS4TQT7VAGDFRQ2EVDEUFDJY/",
  },
  {
    src: "/assets/logos/gbh-news.png",
    alt: "GBH News",
    href: "https://www.wgbh.org/news/local/2024-11-25/electric-wheelchairs-can-be-prohibitively-expensive-these-local-college-students-want-to-change-that",
  },
  {
    src: "/assets/logos/boston-news.png",
    alt: "7 News Boston",
    href: "https://whdh.com/news/3-local-college-students-take-top-prize-in-national-competition-for-young-entrepreneurs/",
  },
  {
    src: "/assets/logos/spectrum-news-logo.png",
    alt: "Spectrum News 1",
    href: "https://spectrumnews1.com/ma/worcester/news/2025/04/25/wpi-students-compete-in-shark-tank-style-competition",
  },
  {
    src: "/assets/logos/bellingham-bulletin.png",
    alt: "Bellingham Bulletin",
    href: "https://www.bellinghambulletin.com/2025/09/25/547352/local-innovators-invent-game-changer-for-wheelchair-mobility",
  },
  {
    src: "/assets/logos/wpi-logo.png",
    alt: "WPI",
    href: "https://www.wpi.edu/news/announcements/wpi-student-entrepreneurs-win-prestigious-global-pitch-competition-innovative-wheelchair",
  },
  {
    src: "/assets/logos/bu-logo.png",
    alt: "Boston University",
    href: "https://www.bu.edu/innovate/mobility-made-easy-the-story-of-technotonin/",
  },
  {
    src: "/assets/logos/efest-logo.png",
    alt: "e-Fest Undergraduate Entrepreneurship Competition",
  },
];
