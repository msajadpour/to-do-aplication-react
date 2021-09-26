import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import styles from "./index.css";
import CreateContext from "./context/context";
import AddNewTask from "./components/addNewTask/addNewTask";
import Task from "./components/Task/Task";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [showPersons, setShowPersons] = useState(true);
    const [showError, setShowError] = useState(false);
    const [counter, setCounter] = useState(1);

    useEffect(()=>{
        if(localStorage.getItem("clonePersons" !== null)){
            let starterData = JSON.parse(localStorage.getItem("clonePersons"))
            setPersons(starterData)
            console.log(starterData);
        }
    } , [])

    const handleShowPersons = () => {
        setPersons(JSON.parse(localStorage.getItem("clonePersons")));
        setShowPersons(!showPersons);
    };
    const handleDeletePersons = id => {
        let clonePersons = [...persons];
        let filteredPersons = clonePersons.filter(p => p.id !== id);
        localStorage.setItem("clonePersons", JSON.stringify(filteredPersons));
        setPersons(JSON.parse(localStorage.getItem("clonePersons")));
    };
    const handleEditPersons = (e, id) => {
        var inputValue = e.currentTarget.parentNode.querySelector("input");
        if (inputValue.value !== "") {
            let personsClone = [...persons];
            let selectedPersons = personsClone.filter(p => p.id === id);
            let personsIndex = personsClone.findIndex(p => p.id === id);
            selectedPersons[0].task = inputValue.value;
            personsClone[personsIndex] = selectedPersons[0];
            localStorage.setItem("clonePersons", JSON.stringify(personsClone));
            setPersons(JSON.parse(localStorage.getItem("clonePersons")));
            inputValue.value = "";
            setShowError(false);
        } else {
            setShowError(true);
        }
    };
    const handleAddPersons = () => {
        let newPerson = {};

        let idNumber = counter + 1;
        setCounter(idNumber);

        let task = document.querySelector("#task");
        newPerson.id = idNumber.toString();

        newPerson.isDone = false
        newPerson.task = task.value;
        if (task.value === "") {
            setShowError(true);
        } else {
            setShowError(false);
            let clonePersons = [...persons];
            clonePersons.unshift(newPerson);
            localStorage.setItem("clonePersons", JSON.stringify(clonePersons));
            console.log();
            setPersons(JSON.parse(localStorage.getItem("clonePersons")));
            task.value = "";
        }
    };
    const handleDoneTask = (id) => {
        let clonePersone = [... persons]
        let filteredPersonForCheckDone = clonePersone.filter(p => p.id === id)
        let personIndex = clonePersone.findIndex(p => p.id === id);
        filteredPersonForCheckDone[0].isDone = !filteredPersonForCheckDone[0].isDone
        clonePersone[personIndex] = filteredPersonForCheckDone[0]
        localStorage.setItem("clonePersons", JSON.stringify(clonePersone));
        setPersons(JSON.parse(localStorage.getItem("clonePersons")))
    }

    return (
        <React.Fragment>
            <CreateContext.Provider
                value={{
                    statePersons: persons,
                    stateShowError: showError,
                    handleDeletePersons: handleDeletePersons,
                    handleEditPersons: handleEditPersons,
                    // handleAddPersons: handleAddPersons,
                }}
            >
                <h2 className="py-4">مدیریت کننده کارهای روزانه</h2>
                <h5 className="py-2">
                    تعداد کارها امروزت <span style={{ color: "rgb(197 64 243)" }}>{persons.length}</span> دونه هستش , یادت نره انجامشون بدی
                    ها!
                    <i className="fa fa-smile-o" aria-hidden="true" style={{ marginRight: "10px" }}></i>
                </h5>
                <AddNewTask handleAddPersons={handleAddPersons}/>
                <button style={{ margin: "auto" }} className={styles.addTask} onClick={handleShowPersons}>
                    {showPersons === true ? (
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                    ) : (
                        <i className="fa fa-eye" aria-hidden="true"></i>
                    )}
                </button>
                {showPersons === true ? <Task  handleDoneTask={handleDoneTask}/> : null}
                <ToastContainer />
            </CreateContext.Provider>
        </React.Fragment>
    );
};

export default App;
