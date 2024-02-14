"use client";
import "../app/editor/style.css";
import { FaMoon, FaSun, FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import Image from "next/image";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { AspectRatio, Icon, useColorMode } from "@chakra-ui/react";

const Home = () => {
  const ref = useRef(null);
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleClick = () => {
    if (ref.current) {
      (ref.current as HTMLElement)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="splash-screen">
        <div className="navigation-bar">
          <GoPencil />

          <span className="splash-screen-content">Initiate Your Markdown</span>
        </div>

        <Icon
          className="splash-screen-icon"
          color="white"
          as={colorMode === "dark" ? FaSun : FaMoon}
          width={25}
          height={30}
          cursor="pointer"
          onClick={toggleColorMode}
        />
        <div>
          <div className="splash-screen__logo">
            <Image
              src="/typing.png"
              width={200}
              height={200}
              alt="image not found"
            />

            <h2 data-text="MarkDown Generator">MarkDown Generator</h2>
          </div>
          <div className="splash-screen__subtitle">
            <p>In-browser Markdown editor</p>

            <div className="social-icon">
              <FaTwitter
                onClick={() =>
                  window.open(
                    "https://twitter.com/i/flow/login?redirect_after_login=%2Fzestgeeks",
                    "_blank"
                  )
                }
              />
              <FaGithub
                onClick={() =>
                  window.open("https://github.com/loveheenavasu", "_blank")
                }
              />
            </div>
          </div>
        </div>
        <div className="markdown-support">
          <div className="demo-button" onClick={() => router.push("/editor")}>
            Generate Now
          </div>
        </div>
        <div className="splash-screen__footer" onClick={handleClick}>
          <RiArrowDownDoubleFill />
          <span>Read More</span>
        </div>
      </div>
      <div ref={ref}></div>
      <div className="landing__content">
        <h1>Unrivalled writing experience</h1>
        <hr className="hr-break" />
        <div className="row">
          <div className="column">
            <Image
              src="/markDowneditor-img.gif"
              className="markdown-img"
              width={500}
              height={280}
              alt="Picture of the author"
            />
          </div>
          <div className="feature">
            <h2>Rich Markdown Editor</h2>
            <p>
              Markdown-Generator Markdown syntax highlighting is unique. The
              refined text formatting of the editor helps you visualize the
              final rendering of your files.
            </p>
          </div>
        </div>
      </div>
      <div className="row controls-container">
        <div className="controls-tools">
          <Image
            src="/editorTools.png"
            className="editor-tool-img"
            width={500}
            height={50}
            alt="Picture of the author"
          />
          <h2>WYSIWYG Controls</h2>
          <p>
            Markdown-Generator provides very handy formatting buttons and
            shortcuts, thanks to PageDown, the WYSIWYG-style Markdown editor
            used by Stack Overflow.
          </p>
        </div>

        <div className="controls-tools">
          <h2>Markdown Generator Live Preview</h2>
          <p>
            Markdown Generator Live Preview offers real-time transformation of
            Markdown syntax into formatted content, ensuring seamless editing
            without toggling between windows. With customizable themes and error
            highlighting, it enhances productivity and simplifies the editing
            process.
          </p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <Image
          src="/demo1.gif"
          className="editor-tool-img"
          width={720}
          height={600}
          alt="Picture of the author"
          objectFit="contain"
        />
      </div>

      <div className="markdown-support">
        <div className="button" onClick={() => router.push("/editor")}>
          Click Here to See Demo
        </div>
      </div>
    </>
  );
};

export default Home;
