
"use client";
import "./style.css"
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import Image from 'next/image'

import { RiArrowDownDoubleFill } from "react-icons/ri";
import { useRef } from "react";
import { useRouter } from "next/navigation";
const Home = () => {
  const ref = useRef(null);
  const router = useRouter()

  const handleClick = () => {
    if (ref.current) {
      (ref.current as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });

  }
  };

return(
<>
 <div className="splash-screen">
  <div className="navigation-bar"><GoPencil />

    <span>Start Writing</span>
  </div>
  {/* <div>
<div className="splash-screen__logo">
  sadjfsladjflj
</div>
<div className="splash-screen__subtitle">
  <p>In-browser Markdown editor</p>

  <div className="social-icon">
                      <FaTwitter/>
                      <FaGithub />

                    </div>
</div>
</div> */}
<div>
  <div className="splash-screen__logo">
  <Image src="/typing.png" width={200} height={200}alt ="image not found"/>


  <h2 data-text="MarkDown Previewer">MarkDown Previewer</h2>

  </div>
  <div className="splash-screen__subtitle">
  <p>In-browser Markdown editor</p>
  
  <div className="social-icon">
                      <FaTwitter   onClick={()=>  window.open(
                        'https://twitter.com/i/flow/login?redirect_after_login=%2Fzestgeeks',
                        '_blank' 
                      )}/>
                      <FaGithub  onClick={()=>  window.open(
                        'https://github.com/loveheenavasu',
                        '_blank' 
                      )}
                      
                      
                    />

                    </div>
</div>
</div>
<div className="splash-screen__footer">
<RiArrowDownDoubleFill/>
  <span onClick={handleClick}>Read More</span>
</div>
</div>
<div  ref={ref}></div>
<div className="landing__content" >
  <h1>Unrivalled writing experience
</h1>
<hr className="hr-break"/>
<div className="row">
  <div className="column"> 
   <Image
      src="/markdown.png"
      className="markdown-img"
      width={500}
      height={280}
      alt="Picture of the author"
    /></div>
  <div className="feature">
    <h2>Rich Markdown editor
</h2>
<p>Markdown-Previewer Markdown syntax highlighting is unique. The refined text formatting of the editor helps you visualize the final rendering of your files.
</p>
  </div>
</div>

</div>
<div className="controls-tools">
<Image
src="/editorTools.png"
className="editor-tool-img"
 width={500}
 height={50}
 alt="Picture of the author"

/>
<h2>WYSIWYG controls</h2>
<p>Markdown-Previewer provides very handy formatting buttons and shortcuts, thanks to PageDown, the WYSIWYG-style Markdown editor used by Stack Overflow.</p>
</div>

<div className="controls-tools">

<h2>Live preview with Scroll Sync
</h2>
<p>Markdown-Previewer Scroll Sync feature accurately binds the scrollbars of the editor panel and the preview panel to ensure that you always keep an eye on the output while writing</p>
<Image
src="/ScrollSync.png"
className="editor-tool-img"
 width={1000}
 height={200}
 alt="Picture of the author"

/>
</div>

<div className="markdown-support">
  <h1>Extended Markdown support
</h1>
<div className="button" onClick={()=>router.push("/")}>Click Here to See Demo</div>
</div>

</>
)



  }
  
  export default Home;