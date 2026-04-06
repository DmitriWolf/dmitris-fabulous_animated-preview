import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText, TextPlugin, Flip } from 'gsap/all';
import { littleDocsData } from '../../data/little-docs-data';
import './little-docs.scss'

const DISTANCE_TO_FLY_IN = 300;
const VERTICAL_DISTANCE_VARIANCE = 200;
const ENDING_DISTANCE_VARIANCE = 5;
const DOCUMENT_STACK_SHIFT = 5;

export default function LittleDocs({ animationToStart, animationComplete }) {
  useGSAP(() => {
    document.fonts.ready.then(() => {
      gsap.registerPlugin(SplitText);
      gsap.registerPlugin(TextPlugin);
      gsap.registerPlugin(Flip);

      function createDocumentsGatheringAnimation() {
        const tl = gsap.timeline({ paused: false, onComplete: () => {animationComplete('documentsGathering')} });

        for (let i = 0; i < littleDocsData.length; i++) {
          const startingPointX = (Math.random() - 0.5) * VERTICAL_DISTANCE_VARIANCE;
          const startingPointY = (Math.random() < 0.5) ? -DISTANCE_TO_FLY_IN : DISTANCE_TO_FLY_IN;
          const endingPointX = (Math.random() - 0.5) * ENDING_DISTANCE_VARIANCE;
          const endingPointY = (Math.random() - 0.5) * -ENDING_DISTANCE_VARIANCE;
          const docClassToAnimate = `.little-doc-${i}`;

          tl.fromTo(docClassToAnimate, {
            duration: 0.3,
            y: startingPointX,
            x: startingPointY,
            alpha: 0,
          }, {
            alpha: 1,
            x: `${endingPointX}rem`,
            y: `${endingPointY}rem`,
          });
        }
      }

      function createDocumentsOrganizingAnimation() {
        const tl = gsap.timeline({
          paused: false,
          delay: 2,
          onComplete: () => {animationComplete('documentsOrganizing')}
        });

        for (let i = 0; i < littleDocsData.length; i++) {
          const docClassToAnimate = `.little-doc-${i}`;
          const shift = i * DOCUMENT_STACK_SHIFT;

          tl.to(docClassToAnimate, {
            duration: 0.25,
            rotate: '0deg',
            x: -300 + shift,
            y: shift,
          });
        }
      }

      function createOneBigDocAnimation() {
        const tl = gsap.timeline({
          paused: false,
          onComplete: () => {animationComplete('oneBigDoc')}
        });

        tl.to(".little-doc-5", {
          transform: "translate(0, 0)",
          scale: "+=2.5",
          top: -150,
          left: -50,
          xPercent: -50,
          yPercent: -50,
          duration: 0.8,
          borderRadius: 0,
        });
      }

      switch (animationToStart) {
        case 'documentsGathering':
          createDocumentsGatheringAnimation();
          break;
        case 'documentsOrganizing':
          createDocumentsOrganizingAnimation();
          break;
        case 'oneBigDoc':
          createOneBigDocAnimation();
          break;
        case 'overlayWithImage':
          overlayWithImage();
          break;
        default:
          break;
      }
    });
  }, [animationToStart]);

  return (
    <>
      {littleDocsData.map((littleDoc, index) => (
        <div
          className={`little-doc-${index} ${littleDoc.className}`}
          data-flip-id={`little-doc-${index}`}
          key={`little-doc-${index}`}
        >
          {littleDoc.bodyHtml}
        </div>
      ))}
    </>
  );
}
