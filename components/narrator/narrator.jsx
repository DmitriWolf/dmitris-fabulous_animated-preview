import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import './narrator.scss';

export default function Narrator({ nextText }) {
  useGSAP(() => {
    gsap.registerPlugin(SplitText);
    const splitText = SplitText.create(".display-text", {
      type: "chars, words, lines",
      mask: "lines"
    });

    const tl = gsap.timeline();

    tl.from(splitText.lines, {
      y: 60,
      autoAlpha: 0,
      stagger: {
        amount: 1,
      },
      delay: 0.3,
    })
  }, [nextText]);

  return (
    <div className="narrator">
      <div className="display-text">
        {nextText}
      </div>
    </div>
  );
};
