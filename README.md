# Animated App Preview
### (Work in Progress)
The purpose of this app is to create an animated sequence of images and text to introduce the user to [Dmitri's Fabulous Document Organizer](documents.dmitrisfabulous.com) and how it uses AI to help manage all of your paperwork.

https://github.com/user-attachments/assets/d3c8225d-5365-4406-8857-513b7ee995ad

## Tech Stack
I used the [GSAP](https://gsap.com/) animation framework for the first time here and was very pleased. It is powerful and very fast, with no noticeable buffering or delays. The api is clean and easy to learn, it is thoughtfully put together, and it's open source and completely free.

GSAP does the work of tracking the location, position, rotation, scale, and other properties of HTML elements but there is still significant infrastructure required to coordinate ambitious sets of animation. Here you will see our complete implementation including how the app:
- Creates the element and places them in the DOM,
- Creates GSAP tweens and assembles them into timelines,
- Starts each timeline in sequence,
- Coordinates the different sets of timelines (title of the app, narrative text, example documents, sample data) to operate seamlessly.

## Major Components
[App.jsx](./App.jsx) is the main page for the "Hub" application, which displays and links to all of the Dmitri's Fabulous apps. (Currently the only one shown to the public is Dmitri's Fabulous Document Organizer. Coming soon is Dmtiri's Fabulous Kitchen Helper.) When you click on the "About" button for the app, the animated preview is launched.

On the launch of the app preview, [DocumentOrganizerPreview](./components/document-organizer-preview/document-organizer-preview.jsx) opens and immediately mounts the following components:
- [LittleDocs](./components/little-docs/little-docs.jsx), showing the big idea, document uploading, and the beginning of the process,
- [AnalysisProcess](./components/analysis-process/analysis-process.jsx) which shows how our AI processes documents, and
- [Narrator](./components/narrator/narrator.jsx), displaying explanatory text to the user about what is going on at each step.

Each of those documents have sets of animations that they use, safely wrapped in a [`useGSAP`](https://gsap.com/resources/React/#usegsap-hook-) hook, all centrally controlled.

## Animation Control
To control the many timelines in each of the four files, I set up a simple process. Each timeline's `onComplete` function fires `animationComplete()`  in [DocumentOrganizerPreview](./components/document-organizer-preview/document-organizer-preview.jsx#L14) with its name. There is a simple `switch` statements that begins the next process which is usually displaying some new text in the Narrator and triggering the next animation.

Animations are triggered by setting the `animationToStart` property which is passed down to each component as a simple prop. Each component compares the prop to its own animations and starts them accordingly. This works well for a small document tree as we have here. If the document were bigger there are several more robust solutions for handling events and listeners, but this works fine here.

If a delay is required before the start of the next animation, a simple `setTimeout` is used. Delays within timelines are done with native GSAP methods, but `useTimeout` is the most effective with native JavaScript.

