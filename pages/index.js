import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import { ethers } from 'ethers';
import * as Constants from "../Utils/config"


function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClickMeLoading, setIsClickMeLoading] = useState(false);

  useEffect(() => {
    const connectToMetamask = async () => {
      try {
        if (window.ethereum) {

          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          console.log(await signer.getAddress());
          const contractInstance = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);
          var tasks = await contractInstance.getAllTasks();
          setTasks(tasks);
          console.log(tasks);
        }
        else {
          console.log("Metamask not found");
        }

      }
      catch (err) {
        console.error(err)
      }
    };

    connectToMetamask();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch('/api/addTask', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(task)
    });

    setIsLoading(false);

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
    }

    const resp = await response.json();
    const status = resp.message;
    console.log(status);
  }

  const handleChange = async (event) => {
    setTask(event.target.value);
  }

  const changeTaskStatus = async (taskId) => {
    setIsClickMeLoading(true);

    const response = await fetch ('/api/changeStatus', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(taskId)
    });

    setIsClickMeLoading(false);

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
    }

    const resp = await response.json();
    const status = resp.message;
    console.log(status);
  }

  return (
    <div>
      <div className={styles.container} style={{
        background: "linear-gradient(to right,#fb8999,#fb8999)",
        color: "#fff",
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "10px",
        fontWeight: "bold",
      }}>Todoist Decentralized</div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            placeholder="Create Task Here ..."
            onChange={handleChange}
            value={task}
            style={{
              background: "linear-gradient(to right,#ffffff,#ffffff)",
              color: "#333",
              border: "10px solid #fb8999",
              borderRadius: "15px",
              padding: "15px",
              fontWeight: "bold",
            }}
          />
          <button type="submit" disabled={isLoading} className={styles.button}>
            {isLoading && <div className={styles.spinner}></div>}
            {!isLoading && "Create New Task"}
          </button>
        </form>
      </div>
      <div className={styles.container} style={{
        background: "linear-gradient(to right,#cfcffb,#fb8999)",
        color: "#333",
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "10px",
        fontWeight: "bold",
      }}>
        <table style={{
          background: "linear-gradient(to right,#fb8999,#fb8999)",
          color: "#fff",
          border: "10px solid #fff",
          borderRadius: "10px",
          padding: "10px",
          fontWeight: "bold",
        }} >
          <thead>
            <tr>
              <th>ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
              <th>Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
              <th>Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
              <th>Event&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{task.desc}</td>
                <td>{task.status === 0 ? 'Pending' : 'Finished'}</td>
                <td>
                  {task.status === 0 ? (
                    <button
                      className={styles.button}
                      onClick={() => changeTaskStatus(index)}
                      disabled={isClickMeLoading}
                    >
                      {isClickMeLoading ? <div className={styles.spinner}></div> : "Done"}
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
<footer style={{ textAlign: "center", marginTop: "20px" }}>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <a href="https://github.com/querylab" target="_blank" rel="noopener noreferrer">
      <img src="https://repository-images.githubusercontent.com/322583197/e7958f30-5dcf-4101-9f18-63aa08a338bb" width={55} alt="GitHub" />
    </a>
    <p style={{ fontWeight: "bold", marginTop: "10px" }}>Made with ❤️ by querylab</p>
  </div>
  {/* agree more code*/}
</footer>
    </div>
  );
}

export default App;