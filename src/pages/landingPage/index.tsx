import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineBulb,
  AiOutlineInstagram,
} from "react-icons/ai";
import { GiHamburgerMenu, GiSpeedometer } from "react-icons/gi";
import { MdDevices } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";
import { BsChevronDoubleUp } from "react-icons/bs";
import { ImLinkedin2, ImGithub } from "react-icons/im";
import kaioProfile from "../../assets/kaioProfile.jpeg";
import { Fade, Bounce } from "react-awesome-reveal";
import smoothscroll from 'smoothscroll-polyfill';

const LandingPage: React.FC = () => {
  const [arrowReaction, setArrowReaction] = useState(false);
  const [iconsLinkedinReactions, setIconsLinkedinReactions] = useState(false);
  const [iconsGithubReactions, setIconsGithubReactions] = useState(false);
  const [iconsInstagramReactions, setIconsInstagramReactions] = useState(false);
  const [visibleSection, setVisibleSection] = useState<{} | undefined>();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const headerRef = useRef<null | HTMLDivElement>(null);
  const fieldRefHome = useRef<null | HTMLDivElement>(null);
  const fieldRefAbout = useRef<null | HTMLDivElement>(null);
  const fieldRefProjects = useRef<null | HTMLDivElement>(null);
  const fieldRefContact = useRef<null | HTMLDivElement>(null);

  smoothscroll.polyfill();

  const scrollTo = useCallback((ele: HTMLDivElement | null) => {
    ele?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setNavbarOpen(false);
  }, []);

  const getDimensions = useCallback((ele: HTMLDivElement) => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;

    return {
      height,
      offsetTop,
      offsetBottom,
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sectionRefs = [
        { section: "home", ref: fieldRefHome },
        { section: "about", ref: fieldRefAbout },
        { section: "projects", ref: fieldRefProjects },
        { section: "contact", ref: fieldRefContact },
      ];

      if (headerRef.current) {
        const { height: headerHeight } = getDimensions(headerRef.current);
        const scrollPosition = window.scrollY + headerHeight;

        const selected = sectionRefs.find(({ section, ref }) => {
          const ele = ref.current;
          if (ele) {
            const { offsetBottom, offsetTop } = getDimensions(ele);
            return scrollPosition > offsetTop && scrollPosition < offsetBottom;
          } else {
            return undefined;
          }
        });

        if (selected && selected.section !== visibleSection) {
          setVisibleSection(selected.section);
        } else if (!selected && visibleSection) {
          setVisibleSection(undefined);
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection, getDimensions]);

  return (
    <>
      
      {/* Home */}
      <section
        id="home"
        ref={fieldRefHome}
        className=" relative overflow-hidden h-screen bg-hero-pattern"
      >
        <div className="container mx-auto px-6 md:px-12 relative h-full flex flex-col items-center justify-center  py-32 xl:py-40">
          <div className=" flex text-center justify-center items-center text-2xl lg:text-5xl">
            <p className="text-white mr-2">Hello, I'm</p>
            <p className="text-pink-600">Kaio Silva</p>
            <p className="text-white">.</p>
          </div>
          <h1 className="text-white mb-4 text-2xl lg:text-5xl">
            I'm a full-stack web developer.
          </h1>

          <div className=" flex text-center justify-center">
            <button
              className="flex text-center justify-center items-center transition duration-500 text-base lg:text-2xl text-white h-14 w-42 lg:w-56 border-2 border-solid p-4 rounded-sm hover:bg-primary hover:border-primary focus:outline-none"
              onMouseEnter={() => setArrowReaction(true)}
              onMouseLeave={() => setArrowReaction(false)}
              onClick={() => {
                scrollTo(fieldRefAbout.current);
              }}
            >
              View my work
              <div
                className={
                  arrowReaction
                    ? "transition duration-500 mt-1 ml-2 transform rotate-90"
                    : "transition duration-500 mt-1 ml-2  "
                }
              >
                <AiOutlineArrowRight size={20} />
              </div>
            </button>
          </div>
        </div>
      </section>

      <nav
        ref={headerRef}
        className="relative sticky top-0 z-10 flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-primary mb-3 border-b-2 border-solid border-white"
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex flex-col  justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <GiHamburgerMenu size={30} />
            </button>
            <div
              className={
                "lg:flex flex-grow items-center" +
                (navbarOpen ? " flex mt-2" : " hidden")
              }
              id="example-navbar-danger"
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <button
                    className={
                      visibleSection === "home"
                        ? "px-3 py-2 flex items-center text-md uppercase focus:outline-none font-bold leading-snug text-pink-600 hover:text-pink-600 transition duration-700"
                        : "px-3 py-2 flex items-center text-md uppercase focus:outline-none font-bold leading-snug text-white hover:text-pink-600 transition duration-700"
                    }
                    onClick={() => {
                      scrollTo(fieldRefHome.current);
                    }}
                  >
                    <span className="ml-2 ">HOME</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={
                      visibleSection === "about"
                        ? "px-3 py-2 flex items-center text-md uppercase focus:outline-none font-bold leading-snug text-pink-600 hover:text-pink-600 transition duration-700"
                        : "px-3 py-2 flex items-center text-md uppercase focus:outline-none font-bold leading-snug text-white hover:text-pink-600 transition duration-700"
                    }
                    onClick={() => {
                      scrollTo(fieldRefAbout.current);
                    }}
                  >
                    <span className="ml-2">ABOUT</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={
                      visibleSection === "projects"
                        ? "px-3 py-2 flex items-center text-md uppercase focus:outline-none font-bold leading-snug text-pink-600 hover:text-pink-600 transition duration-700"
                        : "px-3 py-2 flex items-center text-md uppercase focus:outline-none font-bold leading-snug text-white hover:text-pink-600 transition duration-700"
                    }
                    onClick={() => {
                      scrollTo(fieldRefProjects.current);
                    }}
                  >
                    <span className="ml-2">PORTFOLIO</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={
                      visibleSection === "contact"
                        ? "px-3 py-2 flex items-center text-md uppercase focus:outline-none font-bold leading-snug text-pink-600 hover:text-pink-600 transition duration-700"
                        : "px-3 py-2 flex items-center text-md uppercase focus:outline-none font-bold leading-snug text-white hover:text-pink-600 transition duration-700"
                    }
                    onClick={() => {
                      scrollTo(fieldRefContact.current);
                    }}
                  >
                    <span className="ml-2">CONTACT</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* About */}
      <div
        id="about"
        ref={fieldRefAbout}
        className="  container mx-auto px-6 md:px-12 block h-full flex flex-col items-center justify-center  py-36 "
      >
        <div className=" flex flex-col text-center justify-center items-center mb-10">
          <Fade direction="left" triggerOnce>
            <h1 className=" uppercase text-3xl lg:text-5xl  pb-4 font-bold">
              About
            </h1>
          </Fade>
          <Fade direction="left" delay={300} triggerOnce>
            <p>__________</p>
          </Fade>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:space-x-32">
          <div className="flex flex-col justify-center items-center ">
            <Fade direction="left" triggerOnce>
              <div className="flex items-center justify-center text-white rounded-full w-36 bg-primary p-10 ">
                <GiSpeedometer size={60} />
              </div>
            </Fade>

            <span className="text-gray-600 mt-4 text-3xl mb-2 font-bold">
              Fast
            </span>
            <span className="text-gray-500 ">Fast load times and lag free</span>
            <span className="text-gray-500">
              {" "}
              interaction, my highest priority.
            </span>
          </div>
          <div className="flex flex-col justify-center items-center mt-6 lg:mt-0">
            <Fade direction="left" triggerOnce>
              <div className="flex items-center justify-center text-white rounded-full w-36 bg-primary p-10 ">
                <MdDevices size={60} />
              </div>
            </Fade>
            <span className="text-gray-600 mt-4 text-3xl mb-2 font-bold">
              Responsive
            </span>
            <span className="text-gray-500 text-1xl">
              My layouts will work on any
            </span>
            <span className="text-gray-500">device, big or small.</span>
          </div>
          <div className="flex flex-col justify-center items-center mt-6 lg:mt-0">
            <Fade direction="left" triggerOnce>
              <div className="flex items-center justify-center text-white rounded-full w-36 bg-primary p-10 ">
                <AiOutlineBulb size={60} />
              </div>
            </Fade>
            <span className="text-gray-600 mt-4 text-3xl mb-2 font-bold">
              Intuitive
            </span>
            <span className="text-gray-500 text-1xl">
              Strong preference for easy to
            </span>
            <span className="text-gray-500">use, intuitive UX/UI.</span>
          </div>
          <div className="flex flex-col justify-center items-center mt-6 lg:mt-0">
            <Fade direction="left" triggerOnce>
              <div className="flex items-center justify-center text-white rounded-full w-36 bg-primary p-10 ">
                <IoRocketOutline size={60} />
              </div>
            </Fade>
            <span className="text-gray-600 mt-4 text-3xl mb-2 font-bold">
              Dynamic
            </span>
            <span className="text-gray-500 text-1xl">
              Websites don't have to be static, I love
            </span>
            <span className="text-gray-500">making pages come to life.</span>
          </div>
        </div>

        <div className="container mx-auto  mt-10 w-full">
          <div className="grid  grid-col-1 lg:grid-col-2 lg:grid-flow-col">
            <Fade direction="left" triggerOnce>
              <div className="flex flex-col justify-center  items-center ">
                <img
                  src={kaioProfile}
                  alt={"Kaio Profile"}
                  className="rounded-full w-60 lg:w-68"
                />
                <span className="text-gray-600 text-2xl mt-4 mb-4 font-bold">
                  Who's this guy?
                </span>
                <span className="text-justify lg:w-96 text-gray-500">
                  I'm a Front-End Developer for ChowNow in Los Angeles, CA. I
                  have serious passion for UI effects, animations and creating
                  intuitive, dynamic user experiences.
                </span>
                <button
                  className="px-3 py-2 flex items-center text-md uppercase focus:outline-none font-bold leading-snug text-primary"
                  onClick={() => {
                    scrollTo(fieldRefContact.current);
                  }}
                >
                  <span className="ml-2">Let's make something special.</span>
                </button>
              </div>
            </Fade>
            <div className="w-full lg:w-3/4 flex flex-col justify-center lg:mb-40 mt-8 lg:mt-0">
              <div className=" relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-primary">
                      CSS
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary-dark">
                      90%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: "90%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-dark"
                  ></div>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-primary">
                      HTML
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary-dark">
                      90%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: "90%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-dark"
                  ></div>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-primary">
                      React
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary-dark">
                      80%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: "80%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-dark"
                  ></div>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-primary">
                      JavaScript
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary-dark">
                      80%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: "80%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-dark"
                  ></div>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-primary">
                      TailwindCSS
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary-dark">
                      70%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: "70%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-dark"
                  ></div>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-primary">
                      Node.js
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary-dark">
                      60%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: "60%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-dark"
                  ></div>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-primary">
                      UI Design
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary-dark">
                      50%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: "50%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-dark"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div
        id="about"
        ref={fieldRefProjects}
        className="bg-gray-100 w-full pt-4"
      >
        <div className="container w-full mx-auto px-6 md:px-12 relative h-full flex flex-col items-center justify-center  py-32 xl:py-40">
          <div className=" flex flex-col text-center justify-center items-center mb-10">
            <Fade direction="left" triggerOnce>
              <h1 className=" uppercase text-3xl lg:text-5xl  pb-4 font-bold">
                Projects
              </h1>
            </Fade>
            <Fade direction="left" delay={300} triggerOnce>
              <p>__________</p>
            </Fade>
          </div>
          <div className=" grid grid-cols-1 lg:grid-cols-3  gap-4 mx-auto px-4 lg:px-0">
            <div className="items-center justify-center w-full ">
              <div className="lg:mb-32 px-4 py-10 bg-white  shadow-lg sm:rounded-3xl ">
                <div className="max-w-md mx-auto">
                  <div>
                    <p className="h-7 sm:h-8 font-bold text-primary text-2xl">
                      GoBarber{" "}
                    </p>
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <p>The best way to schedule your service!</p>
                      <p>Made with:</p>
                      <ul className="list-disc space-y-2">
                        <li className="flex items-start">
                          <span className="h-6 flex items-center sm:h-7">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-primary"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <p className="ml-2">ReactJS</p>
                        </li>
                        <li className="flex items-start">
                          <span className="h-6 flex items-center sm:h-7">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-primary"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <p className="ml-2">NodeJS</p>
                        </li>
                        <li className="flex items-start">
                          <span className="h-6 flex items-center sm:h-7">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-primary"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <p className="ml-2">Styled-components</p>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                      <p>Want to dig deeper into Gobarber?</p>
                      <p>
                        <a
                          href="https://github.com/kaioosilva/gobarber-web"
                          className="text-primary hover:text-primary-dark"
                        >
                          {" "}
                          Go to Github &rarr;{" "}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="items-center justify-center w-full ">
              <div className="px-4  py-10 bg-white shadow-lg sm:rounded-3xl">
                <div className="max-w-md mx-auto">
                  <div>
                    <p className="h-7 sm:h-8 font-bold text-primary text-2xl">
                      GoBarber{" "}
                    </p>
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <p>The best way to schedule your service!</p>
                      <p>Made with:</p>
                      <ul className="list-disc space-y-2">
                        <li className="flex items-start">
                          <span className="h-6 flex items-center sm:h-7">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-primary"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <p className="ml-2">ReactJS</p>
                        </li>
                        <li className="flex items-start">
                          <span className="h-6 flex items-center sm:h-7">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-primary"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <p className="ml-2">NodeJS</p>
                        </li>
                        <li className="flex items-start">
                          <span className="h-6 flex items-center sm:h-7">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-primary"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <p className="ml-2">Styled-components</p>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                      <p>Want to dig deeper into Gobarber?</p>
                      <p>
                        <a
                          href="https://github.com/kaioosilva/gobarber-web"
                          className="text-primary hover:text-primary-dark"
                        >
                          {" "}
                          Go to Github &rarr;{" "}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="items-center justify-center w-full ">
              <div className="px-4 py-10 mb-20 lg:mb-0 bg-white shadow-lg sm:rounded-3xl">
                <div className="max-w-md mx-auto">
                  <div>
                    <p className="h-7 sm:h-8 font-bold text-primary text-2xl">
                      Github explorer{" "}
                    </p>
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <p>Explore GitHub repositories.</p>
                      <p>Made with:</p>
                      <ul className="list-disc space-y-2">
                        <li className="flex items-start">
                          <span className="h-6 flex items-center sm:h-7">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-primary"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <p className="ml-2">ReactJS</p>
                        </li>
                        <li className="flex items-start">
                          <span className="h-6 flex items-center sm:h-7">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-primary"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <p className="ml-2">Using Github API</p>
                        </li>
                        <li className="flex items-start">
                          <span className="h-6 flex items-center sm:h-7">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-primary"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <p className="ml-2">Styled-components</p>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                      <p>Want to dig deeper into Github explorer?</p>
                      <p>
                        <a
                          href="https://github.com/kaioosilva/github-explorer"
                          className="text-primary hover:text-primary-dark"
                        >
                          {" "}
                          Go to Github &rarr;{" "}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div
        id="contact"
        ref={fieldRefContact}
        className="pb-20 relative block bg-gray-800"
      >
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: "80px", transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-800 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="bg-gray-800 w-full pt-4">
          <div className="container mx-auto body-font px-4 pt-24 sm:px-0">
            <section className="flex-col text-center justify-center align-center  ">
              <div className=" flex flex-col  mb-10 text-white">
                <Fade direction="left" triggerOnce>
                  <h1 className=" uppercase text-3xl lg:text-5xl  pb-4 font-bold">
                    Contact
                  </h1>
                </Fade>
                <Fade direction="right" delay={100} triggerOnce>
                  <p>__________</p>
                </Fade>
              </div>

              <Fade direction="right" delay={300} triggerOnce>
                <p className="text-primary">
                  Have a question or want to work together?
                </p>
              </Fade>

              <Bounce delay={800} triggerOnce>
                <div className="flex flex-col w-full justify-center items-center">
                  <form className="w-full lg:w-1/3 mt-6 flex flex-col justify-end items-end">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Name"
                      autoComplete="given-name"
                      className="block w-full p-3 mt-2 text-white bg-gray-900 appearance-none rounded focus:outline-none  focus:shadow-inner"
                      required
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter e-mail"
                      autoComplete="email"
                      className="block w-full p-3 mt-2 text-white bg-gray-900 appearance-none rounded focus:outline-none  focus:shadow-inner"
                      required
                    />
                    <textarea
                      className=" block w-full p-3 mt-2 text-white bg-gray-900 appearance-none rounded focus:outline-none focus:shadow-inner h-40"
                      id="message"
                      placeholder="Message..."
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="w-32 lg:w-24 py-3 mt-2 mb-10 font-medium tracking-widest text-center justify-center transition duration-500  text-white w-24 border-2 border-solid p-4 rounded-sm hover:bg-primary hover:border-primary focus:outline-none"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </Bounce>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col justify-center items-center bg-gray-900 w-full h-56">
        <div className="w-full ">
          <div className="flex justify-center items-center w-full ">
            <button
              className="relative -mt-20 p-3 font-bold transition duration-500 text-2xl bg-pink-600 text-white w-14 rounded-sm hover:bg-pink-500  focus:outline-none"
              onClick={() => {
                scrollTo(fieldRefHome.current);
              }}
            >
              <BsChevronDoubleUp size={30} />
            </button>
          </div>

          <div className="flex flex-row justify-center items-center w-full mb-10 mt-8">
            <a
              onMouseEnter={() => setIconsLinkedinReactions(true)}
              onMouseLeave={() => setIconsLinkedinReactions(false)}
              href="https://www.linkedin.com/in/kaio-oliveira-silva-54275b57/"
              className=" flex items-center justify-center w-14 h-14 bg-gray-800 text-white hover:bg-primary cursor-pointer rounded"
            >
              {iconsLinkedinReactions ? (
                <Bounce>
                  <ImLinkedin2 size={25} />
                </Bounce>
              ) : (
                <ImLinkedin2 size={25} />
              )}
            </a>
            <a
              onMouseEnter={() => setIconsGithubReactions(true)}
              onMouseLeave={() => setIconsGithubReactions(false)}
              href="https://github.com/kaioosilva"
              className="flex items-center justify-center w-14 h-14 bg-gray-800 text-white hover:bg-primary cursor-pointer ml-4 rounded"
            >
              {iconsGithubReactions ? (
                <Bounce>
                  <ImGithub size={25} />
                </Bounce>
              ) : (
                <ImGithub size={25} />
              )}
            </a>
            <a
              onMouseEnter={() => setIconsInstagramReactions(true)}
              onMouseLeave={() => setIconsInstagramReactions(false)}
              href="https://www.instagram.com/kaioo/"
              className="flex items-center justify-center w-14 h-14 bg-gray-800 text-white hover:bg-primary cursor-pointer ml-4 rounded"
            >
              {iconsInstagramReactions ? (
                <Bounce>
                  <AiOutlineInstagram size={25} />
                </Bounce>
              ) : (
                <AiOutlineInstagram size={25} />
              )}
            </a>
          </div>

          <div className="flex justify-center items-center w-full text-white text-sm">
            <p>KAIO OLIVEIRA SILVA</p>
            <p className="ml-2 text-pink-600">©2021</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
