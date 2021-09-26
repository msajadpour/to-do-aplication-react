import React, { useContext } from "react";
import CreateContext from "../../context/context";
import "react-toastify/dist/ReactToastify.css";

import styles from "./style.css";
import { PropTypes } from "prop-types";
const Task = ({ handleDoneTask }) => {
    const context = useContext(CreateContext);
    return (
        <div>
            {context.statePersons.map(person => (
                <div className={`${styles.person} `} id={`task${person.id}`} key={person.id}>
                    <p className={`${styles.tasks} ${person.isDone ? styles.done : ""}`}>{`${person.task}`}</p>
                    <div style={{ width: "80%", display: "flex" }}>
                        <input className={styles.input} type="text" placeholder="بنویس تا ویرایش کنم" />
                        <button className={styles.delete} onClick={event => context.handleEditPersons(event, person.id)}>
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </button>
                        <button className={styles.delete} onClick={() => context.handleDeletePersons(person.id)}>
                            <i className="fa fa-trash-o" aria-hidden="true" style={{ color: "red" }}></i>
                        </button>
                        <button className={styles.delete} onClick={() => handleDoneTask(person.id)}>
                            <i className="fa fa-check" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
Task.propTypes = {
    handleDoneTask: PropTypes.func,
};

export default Task;
