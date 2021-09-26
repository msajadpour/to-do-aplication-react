
import { createContext } from "react";
const CreateContext = createContext({
    statePersons: [],
    stateShowError: null,
    handleDeletePersons: null,
    handleEditPersons: null,
    handleAddPersons: null,
});
export default CreateContext;

