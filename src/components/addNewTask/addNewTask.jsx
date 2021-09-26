import React, { useContext } from "react";
import CreateContext from "../../context/context";
import "react-toastify/dist/ReactToastify.css";
import styles from "./addNewTask.css";
// import {PropTypes} from "prop-types";
import Fragment from "./../../HOCFaragment";

const AddNewTask = ({ handleAddPersons }) => {
    // var PropTypes = require("prop-types");
    const context = useContext(CreateContext);

    return (
        <div className={styles.person}>
            <p className={styles.p}>
                کارهایی رو که داری اینجا میتونی اضافشون کنی
                <i className="fa fa-hand-o-down" style={{ marginRight: "10px" }} aria-hidden="true"></i>
            </p>
            <div style={{ width: "80%" }}>
                <form onSubmit={e => e.preventDefault()}>
                    <div style={{ display: "flex" }} className={styles.inputAdd}>
                        <input
                            id="task"
                            className={styles.input}
                            type="text"
                            placeholder="کارت رو اینجا بنویس..."
                            style={{ width: "100%" }}
                        />
                        <button type="submit" className={styles.add} onClick={handleAddPersons}>
                            <i className="fa fa-plus-square" aria-hidden="true"></i>
                        </button>
                    </div>
                </form>
                <div>
                    <p className={`error ${styles.p}`} style={context.stateShowError === true ? { display: "block" } : { display: "none" }}>
                        هیچکدوم از فیلد ها نباید خالی باشه!
                    </p>
                </div>
            </div>
        </div>
    );
};
// AddNewTask.propTypes = {
//     handleAddPersons: PropTypes.func,
// };

export default AddNewTask;
