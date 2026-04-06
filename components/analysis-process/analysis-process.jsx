import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText, TextPlugin, Flip } from 'gsap/all';
import pastaCiciRecipe from  '../../assets/pasta-cici-recipe.jpg';
import PastaCiciText from './pastaCiciText';
import './analysis-process.scss'
import PastaCiciData from './pastaCiciData';

export default function AnalysisProcess({ animationToStart, animationComplete }) {

  useGSAP(() => {
    document.fonts.ready.then(() => {
      gsap.registerPlugin(SplitText);
      gsap.registerPlugin(TextPlugin);
      gsap.registerPlugin(Flip);

      const recipeSplit = SplitText.create(".pasta-cici-text", {
        type: "words, lines",
        mask: "lines"
      });

      function fadeOtherElements() {
        const tl = gsap.timeline({
          paused: false,
          onComplete: () => {animationComplete('fadeOtherElements')}
        });

        tl.to(".little-docs-area", {
          opacity: 0,
          duration: 0.8,
        });
        tl.to(".little-docs-area", {
          display: 'none'
        });
        tl.to(".playground", {
          opacity: 0,
          duration: 0.8,
        }, "-=.6");
        tl.to("h1.playground", {
          height: 0,
          margin: 0,
          padding: 0,
          duration: 0.8,
        });
        tl.to("nav", {
          height: 0,
          margin: 0,
          duration: 0.8,
        });
      }

      function realDocumentAppears() {
        const tl = gsap.timeline({
          paused: false,
          onComplete: () => {animationComplete('realDocumentAppears')}
        });

        tl.to("img.pasta-cici-recipe", {
          opacity: 1,
          duration: 0.8,
        });
      }

      function textAnalysisAppears() {
        const tl = gsap.timeline({
          paused: false,
          onComplete: () => {animationComplete('textAnalysisAppears')}
        });

        tl.to(".text-analysis", {
          opacity: 1,
          duration: 0.8,
        });
        tl.from(recipeSplit.words, {
          y: 80,
          autoAlpha: 0,
          stagger: {
            amount: 3.5,
          },
        });
      }

      function chunkingForVectorDb() {
        const SHIMMER_EARLY_PLAY = 2.7;
        const SHIMMER_STAGGER = 3.0;

        const tl = gsap.timeline({
          paused: false,
          onComplete: () => {animationComplete('chunkingForVectorDb')}
        });

        tl.to(recipeSplit.lines, {
          color: '#00ffff',
          stagger: {
            amount: SHIMMER_STAGGER,
          },
          duration: 0,
        });
        tl.to(recipeSplit.lines, {
          backgroundColor: '#555555',
          color: '#aaaaaa',
          stagger: {
            amount: SHIMMER_STAGGER,
          },
          duration: 0,
        }, `"-=${SHIMMER_EARLY_PLAY}"`);
        tl.to(recipeSplit.lines, {
          backgroundColor: '#ffffff',
          stagger: {
            amount: SHIMMER_STAGGER,
          },
          duration: 0,
        }, `"-=${SHIMMER_EARLY_PLAY}"`);
        tl.to(recipeSplit.lines, {
          color: '#000000',
          stagger: {
            amount: SHIMMER_STAGGER,
          },
          duration: 0,
        }, `"-=${SHIMMER_EARLY_PLAY}"`);
      }

      function dataAnalysisAppears() {
        const TEXT_EARLY_PLAY = 4.0;
        const TEXT_LINES_SPEED = 4.2;
        const DATA_EARLY_PLAY = 3.0;
        const DATA_LINES_SPEED = 3.3;
        // const TEXT_EARLY_PLAY = 6.0; // 4.0;
        // const TEXT_LINES_SPEED = 6.2; // 4.2;
        // const DATA_EARLY_PLAY = 3.0; // 3.0;
        // const DATA_LINES_SPEED = 5.3; // 3.3;

        // ------------------------------------------------- Data Div fades in.
        const dataDivTL = gsap.timeline({
          paused: false,
          onComplete: () => {gsap.delayedCall(2, beginLinesTimelines)}
        });

        // first make it appear
        dataDivTL.to(".text-data", {
          opacity: 1,
          duration: 0.8,
        });

        const dataSplit = SplitText.create(".text-data", {
          type: "lines",
        });

        const dataLinesTL = gsap.timeline({
          paused: true,
          onComplete: () => {animationComplete('dataAnalysisAppears')}
        });
        // then set up the lines to appear in order
        dataLinesTL.to(dataSplit.lines, {
          color: '#ff0000',
          stagger: {
            amount: DATA_LINES_SPEED,
          },
          duration: 0.3,
        });
        dataLinesTL.to(dataSplit.lines, {
          color: '#000000',
          stagger: {
            amount: DATA_LINES_SPEED,
          },
          duration: 0.3,
        }, `"-=${DATA_EARLY_PLAY}"`);

        // ------------------------------------------------- Recipe Lines flicker
        const textLinesTL = gsap.timeline({
          paused: true,
        });

        textLinesTL.to(recipeSplit.lines, {
          color: '#ff0000',
          stagger: {
            amount: TEXT_LINES_SPEED,
          },
          duration: 0,
        });
        textLinesTL.to(recipeSplit.lines, {
          color: '#000000',
          stagger: {
            amount: TEXT_LINES_SPEED,
          },
          duration: 0,
        }, `"-=${TEXT_EARLY_PLAY}"`);

        // ------------------------------------------------- onComplete function begins next timelines
        function beginLinesTimelines() {
          dataLinesTL.play();
          textLinesTL.play();
        }
      }

      console.log('little-docs received new animationToStart', animationToStart);
      switch (animationToStart) {
        case 'realDocumentAppears':
          fadeOtherElements();
          realDocumentAppears();
          break;
        case 'textAnalysisAppears':
          textAnalysisAppears();
          break;
        case 'chunkingForVectorDb':
          chunkingForVectorDb();
          break;
        case 'dataAnalysisAppears':
          dataAnalysisAppears();
          break;
        default:
          break;
      }
    });
  }, [animationToStart]);

  return (
    <div className='analysis-process'>
      <img
        className='pasta-cici-recipe'
        src={pastaCiciRecipe}
        data-flip-id='little-doc-5'
      />
      <div className='text-analysis'>
        <PastaCiciText />
      </div>

      <PastaCiciData />
    </div>
  );
}
