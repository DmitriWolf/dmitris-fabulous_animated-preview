import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText, TextPlugin } from 'gsap/all';
import { useEffect, useState } from 'react';
import './text-swapper.scss';

export default function TextSwapper({ swapText = [] }) {
  const [initialized, setInitialized] = useState(false);
  const [swapClasses, setSwapClasses] = useState([]);
  const [swapperDomElements, setSwapperDomElements] = useState(null);
  console.log('text swapper mounted - ', swapText);

  useEffect(() => {
    // this function is to take the swapText and create the DOM elements for them.
    // DOM elements will be in `swapperDomElements` and inserted in the render function.
    // DOM classes will be recorded in `swapClasses` and used in `useGSAP` to find the
    // text to split.
    if (!initialized) {
      const classesToSet = [];
      const swapperElements = swapText.map((text, i) => {
        console.log('createing dom for ', text, 'index', i);
        classesToSet.push(`.swap-element-${i}`)
        return i % 2 === 0 ? (
          <div key={`swap-pair-${i}`} className='swap-text-pair-container'>
            <div className={`swap-text swap-element-${i}`}>
              {text}
            </div>
            <div className={`swap-text swap-element-${i+1}`}>
              {i+1 < swapText.length ? swapText[i+1] : ' \u00A0 '}
            </div>
          </div>
        ) : null;
      });
      setInitialized(true);
      console.log('swapText', swapText);
      console.log('classesToSet', classesToSet);
      setSwapClasses(classesToSet);
      setSwapperDomElements(swapperElements);
    }
  }, [initialized, swapText]);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      if (swapClasses.length) {
        console.log('swapClasses', swapClasses);
        gsap.registerPlugin(SplitText);
        gsap.registerPlugin(TextPlugin);

        const SWAP_DISTANCE = 100;

        const swapDocs = [];

        for (let i = 0; i < swapClasses.length; i++) {
          console.log(`creating for div swapClasses[${i}]`)
          swapDocs.push(SplitText.create(swapClasses[i], {
            type: "chars, lines",
            mask: "lines"
          }));
        };

        function addSwap(tl, text, direction) {
          tl.from(text.chars, {
            y: direction ? -SWAP_DISTANCE : SWAP_DISTANCE,
            opacity: 1,
            stagger: 0.01,
          }, "-=1");
          tl.to(text.chars, {
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #000",
            stagger: 0.05,
          });
          tl.to(text.chars, {
            y: direction ? -SWAP_DISTANCE : SWAP_DISTANCE,
            stagger: {
              amount: 0.5,
            },
          });

          return tl;
        }

        function createSwapper(tl, splitText) {
          for (let i = 0; i < splitText.length; i++) {
            console.log('creating swapper index', i, 'Boolean', Boolean(i%2))
            addSwap(tl, splitText[i], Boolean(i%2))
          }
        }

        console.log('run.', swapDocs);
        createSwapper(gsap.timeline(), swapDocs);
      }
    });
  }, [swapClasses]);

  return (
    <div className="swap-text-container">
      {swapperDomElements}
    </div>
  );
}
