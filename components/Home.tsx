import React, { useEffect, useRef, useState } from 'react';

import Navbar from './navbar/Navbar';
import About from './sections/About';
import Contact from './sections/Contact';
import Hero from './sections/Hero';
import MiniGames from './sections/MiniGames';
import Projects from './sections/Projects';
import TechStack from './sections/TechStack';
import SVGs from './SVGTransform';
import ProgressBar from './ui/ProgressBar';
import ScrollDiv from './ui/ScrollDiv';

export default function Home() {
  const [pathIndex, setPathIndex] = useState(0);
  const [progressBarPercentage, setProgressbarPercentage] = useState(0);
  const [hideNav, setHideNav] = useState(false); // used when the user opens the contact form, so the navbar doesn't overlap the contact form (for some reason the z-index doesn't work)
  const [hideScrollDiv, setHideScrollDiv] = useState(false); // this is used to hide the scroll div in the hero when the user is past the first section
  const sectionsRef = useRef<any[]>([]);

  useEffect(() => {
    return triggerSectionAnimationsOnScroll(
      sectionsRef,
      setPathIndex,
      setProgressbarPercentage,
      setHideScrollDiv,
    );
  }, []);

  return (
    <div className="overflow-hidden relative">
      <Navbar
        progressBarPercentage={progressBarPercentage}
        hideNav={hideNav}
        setHideScrollDiv={setHideScrollDiv}
      />
      <div
        className="relative h-screen w-screen main snap-mandatory snap-y overflow-auto"
        style={{ position: 'sticky', top: 0 }}
      >
        <SVGs pathIndex={pathIndex} />

        <section
          ref={(el) => (sectionsRef.current[0] = el)}
          id="/"
          property="0"
          className="section"
        >
          <Hero />
        </section>
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          id="about"
          property="1"
          className="section"
        >
          <About />
        </section>
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          id="stack"
          property="2"
          className="section"
        >
          <TechStack />
        </section>
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          id="portfolio"
          property="3"
          className="section"
        >
          <Projects />
        </section>
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          id="games"
          property="4"
          className="section"
        >
          <MiniGames />
        </section>
        {/* <section
          ref={(el) => (sectionsRef.current[5] = el)}
          id="feedback"
          property="5"
          className="section"
        >
          <Feedback />
        </section> */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          id="contact"
          property="5"
          className="section"
        >
          <Contact setHideNav={setHideNav} />
        </section>
      </div>
      {!hideScrollDiv && <ScrollDiv />}
      <ProgressBar percentage={progressBarPercentage} />
    </div>
  );
}

// UTILS FOR THIS COMPONENT

/**
 * @param sectionsRef  a ref to all the sections in the main element
 * @param setPathIndex  a function to set the path index, which is used to determine which svg path to use in the svgs component
 * @param setProgressbarPercentage  a function to set the percentage, which is used to determine the width of the progressbar in the ProgressBar component
 * @param setHideScrollDiv  a function to set the hideScrollDiv state, which is used to hide the scroll div in the hero when the user is past the first section
 * @returns  a function to stop the observer from firing when the component unmounts
 */
function triggerSectionAnimationsOnScroll(
  sectionsRef: React.MutableRefObject<any[]>,
  setPathIndex: React.Dispatch<React.SetStateAction<number>>,
  setProgressbarPercentage: React.Dispatch<React.SetStateAction<number>>,
  setHideScrollDiv: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const numberOfSections = document.querySelectorAll('.section').length;
  // This observer has to be setup, because css-snap doesn't work properly with scroll event listeners. Also, due to each section having a height of 100vh, the scroll event listener doesn't fire when scrolling to the next section (which took a bit to figure out), because each section immediately enters the viewport on first page mount.
  const observer = new IntersectionObserver( // the intersection observer is an inbuilt api that allows to observe elements in the viewport (just putting this here so I don't forget)
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // entry is intersecting means that the section is in the viewport, which is the case when the section snaps to the top of the viewport
          setPathIndex(Number(entry.target.getAttribute('property'))); // we set the path index though the property which I specified in the section html tag, which is used to determine which svg path to use in the svgs component
          handleUpdateProgressBar(
            entry,
            numberOfSections,
            setProgressbarPercentage,
          );
          handleUpdateScrollDiv(entry, setHideScrollDiv);

          entry.target.classList.add('visible'); // I set the opacity of the section to 1, which is needed because the opacity is set to 0 in the initial state of the section
        } else {
          entry.target.classList.remove('visible'); // remove the visible class from the section, which is needed because the opacity is set to 0 in the initial state of the section
        }
      });
    },
    {
      threshold: 0.3, // the threshold is the percentage of the section that has to be in the viewport for the observer to fire. The smaller the threshold, the faster the observer fires. The threshold I set now is set so it prevents any bugs when the user has a weird scroll behavior
    },
  );

  sectionsRef.current.forEach((section) => observer.observe(section)); // we observe each section of the sectionsRef, which is a ref to all the sections in the main element

  return () => {
    sectionsRef.current.forEach((section) => observer.unobserve(section)); // this is needed to prevent memory leaks and to stop the observer from firing when the component unmounts. For more info on why you need this in a useEffect hook, see https://react.dev/learn/synchronizing-with-effects#how-to-write-an-effect
  };
}

/**
 * @param entry  the entry of the section that is intersecting
 * @param numberOfSections  the number of sections in the main element
 * @param setProgressbarPercentage  a function to set the percentage, which is used to determine the width of the progressbar in the ProgressBar component
 */
function handleUpdateProgressBar(
  entry: IntersectionObserverEntry,
  numberOfSections: number,
  setProgressbarPercentage: React.Dispatch<React.SetStateAction<number>>,
) {
  const percentage =
    (Number(entry.target.getAttribute('property')) + 1) / numberOfSections;
  setProgressbarPercentage(percentage * 100); // I set the percentage, which is used to determine the width of the progressbar in the ProgressBar component
}

/**
 * @param entry the entry of the section that is intersecting
 * @param setHideScrollDiv  a function to set the hideScrollDiv state, which is used to hide the scroll div in the hero when the user is past the first section
 */
function handleUpdateScrollDiv(
  entry: IntersectionObserverEntry,
  setHideScrollDiv: React.Dispatch<React.SetStateAction<boolean>>,
) {
  if (Number(entry.target.getAttribute('property')) === 1) {
    setHideScrollDiv(true);
    // the scroll div is used in the hero to signal that the user should scroll down
    // if the user is past the first section (which has property 0), the scroll div is hidden
  }
}
