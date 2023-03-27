import { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import RoleModal from "./RoleModal";
import { FetchRoles } from "./fetchRole";
import { useContext } from "react";
import { Authcontext } from "../../../Context/AuthContext";
const URL = "/role/";

const ViewRoles = () => {
  const [isRoles, setisRoles] = useState([]);
  const [isModalShow , setisModalShow] = useState(false);
  const [isCurrentid , setisCurrentid] = useState(0)
  const { isForcerender } =  useContext(Authcontext);

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
  useMemo(async() => {
    let roles = await FetchRoles();
    setisRoles(roles);
  }, [isForcerender]);

  return (
    <><Table striped bordered hover size="sm" responsive>
      <thead>
        <tr>
          <th>Role name</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {
        true ? isRoles.map((element) => {
          return (
            <tr>
              <td>{element?.Role_name}</td>
              <td>
                <Button id={element?.Role_id} variant="outline-dark" onClick={handleView}>
                  View
                </Button>
              </td>
            </tr>
          )}):<h5 className="text-center text-danger mt-3">You Have'nt Permission.Please Contact Your Super admin</h5>}
      </tbody>
    </Table>
     <RoleModal isModalShow={isModalShow}  HandleModal={HandleModal} isCurrentid={isCurrentid}/></>
  );
};
export default ViewRoles;
