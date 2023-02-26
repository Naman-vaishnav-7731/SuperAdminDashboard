import { AlertContext } from "../../Context/AlertContext"
import { useContext } from "react"
import { Alert } from "react-bootstrap";


const DangerAlert = (props) => {
    const {isSignupAlert , setisSignupAlert} = useContext(AlertContext);
    if(isSignupAlert){
        return (
            <Alert variant={props.color} onClose={() => setisSignupAlert(false)}>
                {
                    props.message.map((element , index) => {
                        return(
                            <h6 key={index}>
                                {(props.color == "danger"?"❌":"✅") +  element }
                            </h6>
                        )
                    })
                }
            </Alert>
          );
    }  
}

export default DangerAlert;