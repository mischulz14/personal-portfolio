import { motion, useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import Footer from './layout/Footer';
import Navbar from './navbar/Navbar';
import About from './sections/About';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import TechStack from './sections/TechStack';
import SVGs from './SVGTransform';
import ProgressBar from './ui/ProgressBar';
import ScrollDiv from './ui/ScrollDiv';

export default function Home() {
  const [pathIndex, setPathIndex] = useState(0);
  const [navbarPercentage, setNavbarPercentage] = useState(0);
  const sectionsRef = useRef<any[]>([]);

  useEffect(() => {
    const numberOfSections = document.querySelectorAll('.section').length;
    // This observer has to be setup, because css-snap doesn't work properly with scroll event listeners. Also, due to each section having a height of 100vh, the scroll event listener doesn't fire when scrolling to the next section, because the section immediately enters the viewport on first page mount.
    const observer = new IntersectionObserver( // the intersection observer is an inbuilt api that allows us to observe elements in the viewport
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // entry is intersecting means that the section is in the viewport, which is the case when the section snaps to the top of the viewport
            // Assuming that the section's id is the same as its index
            setPathIndex(Number(entry.target.getAttribute('property'))); // we set the path index, which is used to determine which svg path to use in the svgs component
            const percentage =
              (Number(entry.target.getAttribute('property')) + 1) /
              numberOfSections;
            setNavbarPercentage(percentage * 100); // we set the navbar percentage, which is used to determine the width of the red line in the navbar
            // console.log('percentage', percentage);

            entry.target.classList.add('visible'); // we set the opacity of the section to 1, which is needed because the opacity is set to 0 in the initial state of the section

            if (Number(entry.target.getAttribute('property')) === 1) {
              hideScrollDiv();
            }

            // if (Number(entry.target.getAttribute('property')) === 0) {
            //   showScrollDiv();
            // }
          } else {
            entry.target.classList.remove('visible'); // we remove the visible class from the section, which is needed because the opacity is set to 0 in the initial state of the section
          }
        });
      },
      {
        threshold: 0.3, // the threshold is the percentage of the section that has to be in the viewport for the observer to fire. The smaller the threshold, the faster the observer fires, which is why I set it to 0.01
      },
    );

    sectionsRef.current.forEach((section) => observer.observe(section));

    return () => {
      sectionsRef.current.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div>
      <Navbar percentage={navbarPercentage} />
      <div
        className="relative h-screen w-screen main snap-mandatory snap-y overflow-auto"
        style={{ position: 'sticky', top: 0 }}
      >
        <SVGs pathIndex={pathIndex} />

        <section
          ref={(el) => (sectionsRef.current[0] = el)}
          id="hero"
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
          id="footer"
          property="4"
          className="section"
        >
          <Footer />
        </section>
      </div>
      <ScrollDiv />
      {/* <ProgressBar percentage={navbarPercentage} /> */}
    </div>
  );
}

function hideScrollDiv() {
  document.querySelector('.scroll-div')?.classList.add('hidden');
}

// function showScrollDiv() { // maybe use this later
//   document.querySelector('.scroll-div')?.classList.remove('hidden');
// }
