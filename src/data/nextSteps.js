import prayerIcon from '../assets/yellow-prayer-hands.png';
import groupsIcon from '../assets/green-join-groups.png';
import moreIcon from '../assets/next-steps-hamburger.png';
import servingImg from '../assets/Serving.jpg';
import givingImg from '../assets/Giving.jpg';
import commitImg from '../assets/Commit.jpg';
import recommitImg from '../assets/Recommit.jpg';

export const NEXT_STEP_CARDS = [
  { id: 'prayer', title: 'Ask for Prayer', text: "We’d love to pray with you.", img: prayerIcon },
  { id: 'group', title: 'Join a PrayerGroup', text: 'Find the people you can grow, laugh, and pray with.', img: groupsIcon },
  { id: 'more', title: 'More Next Steps', text: 'Find the next step on your journey.', img: moreIcon },
];

export const FORM_COPY = {
  serving: { title: 'Start Serving', subtitle: 'Use your gifts to be part of what God is doing here.', submitLabel: 'Start Serving' },
  giving: { title: 'Start Giving', subtitle: 'Put God first in your finances.', submitLabel: 'Start Giving' },
  commit: { title: 'Commit to Christ', subtitle: 'Share your decision to follow Jesus so we can support you.', submitLabel: 'Share My Decision' },
  recommit: { title: 'Recommit to Christ', subtitle: 'Tell us about your decision and we’ll help build your faith.', submitLabel: 'Share My Decision' },
};

export const FORM_IMAGES = { serving: servingImg, giving: givingImg, commit: commitImg, recommit: recommitImg };
