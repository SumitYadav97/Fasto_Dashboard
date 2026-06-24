'use client';

import { Button } from "react-bootstrap";
import { Lock } from "react-bootstrap-icons";
import { TbWriting } from "react-icons/tb";

const kanban = () => {
  return (<>
  <section>
  <div><h3><b>Project Fasto V2.1</b></h3></div>
  </section>
  <div className="mt-3">Created by Lidya Chan on June 31, 2020</div>
<div className="">
  <Button variant="secondary"> <TbWriting/>Edit</Button>
  <Button variant="secondary" style={{marginLeft:"10px"}}> <Lock/>Private</Button>
  </div>
  
  </>
    
  )
}

export default kanban
