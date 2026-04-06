import './document-organizer-preview.scss'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText, TextPlugin } from 'gsap/all';
import Narrator from '../narrator/narrator';
import LittleDocs from '../little-docs/little-docs';
import { useEffect, useState } from 'react';
import AnalysisProcess from '../analysis-process/analysis-process';

export default function DocumentOrganizerPreview({ showPreview = true }) {
  const [animationToStart, setAnimationToStart] = useState('');
  const [narrationText, setNarrationText] = useState('');

  // useEffect(() => {
  //   // REMOVE WHEN DONE TESTING!!!
  //   animationComplete('documentsOrganizing');
  // }, []);

  const animationComplete = (animationName) => {
    console.log(`sequencing: "${animationName}" complete!`);
    switch (animationName) {
      //
      //    DO     NOT      DELETE      -------------     DO      NOT     DELETE       ----------      DO   NOT    DELETE   ---
      //
      case 'titleSequence':
        console.log('sequencing: DONE - titleSequence');
        console.log('---');
        setAnimationToStart('documentsGathering');
        setNarrationText('Are piles of documents taking over your life?')
        break;
      case 'documentsGathering':
        console.log('sequencing: DONE - documentsGathering');
        console.log('---');
        setNarrationText('Dmitri can help.');
        setTimeout(() => {
          setAnimationToStart('documentsOrganizing');
          setNarrationText('Just upload your documents and we will keep track of them.');
        }, 2000)
        break;
      case 'documentsOrganizing':
        console.log('sequencing: DONE - documentsOrganizing');
        console.log('---');
        setAnimationToStart('overlayWithImage');
        setNarrationText('Lets take a look at a real document being processed.');
        setTimeout(() => {
          setAnimationToStart('realDocumentAppears')
        }, 1000)
        break;
      case 'realDocumentAppears':
        console.log('sequencing: DONE - realDocumentAppears');
        console.log('---');
        setAnimationToStart('textAnalysisAppears');
        setNarrationText('First we extract all the text in the document.');
        break;
      case 'textAnalysisAppears':
        console.log('sequencing: DONE - textAnalysisAppears');
        console.log('---');
        setNarrationText('Now our AI scans the text and extracts what\'s important.');
        setTimeout(() => {
          setAnimationToStart('dataAnalysisAppears');
        }, 6000);
        break;
      case 'dataAnalysisAppears':
        console.log('sequencing: DONE - dataAnalysisAppears');
        console.log('---');
        // next would be chunking, but for now we say "see you soon..."
        setTimeout(() => {
          setNarrationText('Wait until we show you Advanced Search!');
          setTimeout(() => {
            setNarrationText('Try it today!');
          }, 6000);
        }, 6000);
        break;

      default:
        break;
    }
  }

  useGSAP(() => {
    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(TextPlugin);

    document.fonts.ready.then(() => {
      const split = SplitText.create(".playground", {
        type: "chars, lines",
        mask: "lines"
      });

      function setup() {
        const tl = gsap.timeline();
        tl.from(split.chars, {
          y: 200,
          opacity: 1,
          autoAlpha: 0,
          stagger: {
            amount: 1.75,
          },
          delay: 0.5,
        })
        tl.to(split.chars, {
          backgroundColor: "#fff",
          color: "#000",
          border: "1px solid #000",
          stagger: 0.05,
        }, "-=.6");

        return tl;
      }

      if (showPreview) {
        const masterTimeline = gsap.timeline({
          onComplete: () => {
            animationComplete('titleSequence');
          },
        });
        masterTimeline
          .add(setup())
      }
    });
  });

  return (
    <div className="doc-organizer-preview">
      <h1 className='playground'>Dmitris Fabulous Document Organizer</h1>


      <div className='little-docs-area'>
        <LittleDocs animationToStart={animationToStart} animationComplete={animationComplete} />
      </div>

      {/* <img className='pasta-cici-recipe' src={pastaCiciRecipe} /> */}

      <div className='narrator-container' key={narrationText}>
        {narrationText && <Narrator nextText={narrationText} />}
      </div>

      <div className='analysis-process'>
        <AnalysisProcess animationToStart={animationToStart} animationComplete={animationComplete} />
      </div>
    </div>
  );
}
