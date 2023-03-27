import { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import {Button} from "react-bootstrap";
import RuleModal from "./RuleModal";
import { FetchRules } from "./Fetch";

const ViewRules = () => {
  const [isRules, setisRules] = useState([]);
  const [isModalShow , setisModalShow] = useState(false);
  const [isCurrentid , setisCurrentid] = useState(0);
  const [isRerender , setisRerender] = useState(0);

  // handle reRender state
  const handleRender = () => {
    setisRerender(prev => prev + 1);
  }
  

  //handle view button
  const handleView = (event) => {
    setisCurrentid(event.target.id);
    setisModalShow(true);
  }

  // HandleModal
  const HandleModal = () => {
    setisModalShow(false);
  }
  
  // use Usememo hook for enchance the performance of app | only updated component re-render    
  useMemo(async () => {
    const Rules = await FetchRules();
    setisRules(Rules);
  }, [isRerender]);

  return (
    <><Table striped bordered hover size="sm" responsive>
      <thead>
        <tr>
          <th>Rule name</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {
            isRules.map((element) => {
                return(
                <tr>
                    <td>{element?.Rule_name}</td>
                    <td><Button id={element?.Rule_id} onClick={handleView} variant="outline-dark">View</Button></td>
                </tr>
                )
            })
        }
      </tbody>
    </Table>
    <RuleModal isModalShow={isModalShow}  HandleModal={HandleModal} isCurrentid={isCurrentid} isRules={isRules} handleRender={handleRender}/></>
  );
};
export default ViewRules;
