// original code -------------------------------------------------

import { useContext, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { FaTrash, FaSlidersH } from "react-icons/fa";
import { LoginContext } from "../context/LoginContext";

function TodoPage() {
  const { setIsLoggedIn } = useContext(LoginContext);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const userData = JSON.parse(localStorage.getItem("data"));
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      const userData = JSON.parse(localStorage.getItem("data"));
      if (!userData?.token) {
        setIsLoggedIn(false);
        setError("Login First");
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
        if (response.status === 200) {
          setIsLoggedIn(true); // ✅ valid token
          filterItem(filter);
        }
      } catch (err) {
        localStorage.clear();
        console.log(err.response?.data?.message);
        setError("Session Expired!");
        setIsLoggedIn(false); // ❌ invalid token
      }
    };

    checkAuth();
  }, []);

  // useEffect(() => {
  //   filterItem(filter);
  // }, []);

  // fetched all todos without filter function

  const fetchTodos = async () => {
    if (!userData?.token) {
      setIsLoggedIn(false);
      // alert("Please Login First");
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}/api/todos`, {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setTodos(response.data.data);
    } catch (err) {
      console.error("Error is: ", err);
      setError("Session Expired!");
    }
  };

  const addTodo = async () => {
    if (!userData?.token) {
      setIsLoggedIn(false);
      alert("Please Login First");
      return;
    }
    if (todo.trim() === "") {
      setTodo("");
      return alert("Invalid Todo");
    }
    try {
      const res = await axios.post(
        `${apiUrl}/api/todos`,
        {
          title: todo,
          completed: false,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        },
      );
      setTodo("");
      filterItem(filter);
    } catch (err) {
      console.log(err);
      alert("Session Expired!");
      window.location.reload();
    }
  };

  const deleteTodo = async (id) => {
    if (!userData?.token) {
      setIsLoggedIn(false);
      alert("Please Login First");
      return;
    }
    try {
      await axios.delete(`${apiUrl}/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      filterItem(filter);
    } catch (err) {
      console.error("Error", err);
      alert("Session Expired!");
      window.location.reload();
    }
  };

  const markTodo = async (id) => {
    if (!userData?.token) {
      setIsLoggedIn(false);
      alert("Please Login First");
      return;
    }
    try {
      await axios.put(
        `${apiUrl}/api/todos/${id}`,
        {},
        { headers: { Authorization: `Bearer ${userData.token}` } },
      );
      filterItem(filter);
    } catch (err) {
      console.error("Error:", err);
      alert("Session Expired!");
      window.location.reload();
    }
  };

  const applyFilter = (e) => {
    const tempFilter = e.target.value;
    setFilter(tempFilter);
    filterItem(tempFilter);
  };

  const filterItem = async (filter) => {
    if (!userData?.token) {
      setIsLoggedIn(false);
      // alert("Please Login First");
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}/api/todos`, {
        params: {
          filter: filter,
        },
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setTodos(response.data);
      setError(response.data.message);
    } catch (err) {
      console.error("Error", err);
      alert("Session Expired!");
      window.location.reload();
    }
  };

  return (
    <div className="border py-4 rounded bg-gray-800 max-w-fit">
      <h1 className="text-2xl">To do Application</h1>
      <div>
        <input
          type="text"
          name="task"
          id="task"
          className="border m-2 rounded px-1 py-1"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? addTodo() : null)}
        />
        <button className="m-2 border px-2 py-1 rounded" onClick={addTodo}>
          Add Task
        </button>
      </div>
      <div className="flex justify-between gap-2 item-center px-8 my-1 py-2 bg-gray-600">
        <select
          name="mask"
          id="mask"
          className="border"
          value={filter}
          onChange={applyFilter}
        >
          <option value="all" className="text-black">
            All
          </option>
          <option value="pending" className="text-black">
            Pendings
          </option>
          <option value="completed" className="text-black">
            Completed
          </option>
          {/* <option value="deleted" className='text-black'>Deleted</option> */}
        </select>
        <FaSlidersH />
      </div>
      <div>
        {/* {console.log(typeof(todos))}
          {console.log(todos)} */}
        <ul className="flex flex-col justify-center items-start mx-6 my-2 gap-1">
          {Array.isArray(todos) && todos.length > 0 ? (
            todos.map((todo) => (
              <li
                className="flex justify-between w-full items-center"
                key={todo._id}
              >
                <div onClick={() => markTodo(todo._id)}>
                  <input
                    type="checkbox"
                    name="chktodo"
                    id="chktodo"
                    className="w-5 scale-150 mx-1"
                    checked={todo.completed}
                    // onChange={()=>markTodo(todo._id)}
                  />
                  {todo.completed ? (
                    <del>{todo.title}</del>
                  ) : (
                    <span>{todo.title}</span>
                  )}
                </div>
                <div>
                  <FaTrash
                    className="text-white"
                    onClick={() => deleteTodo(todo._id)}
                  />
                </div>
              </li>
            ))
          ) : (
            <span className="self-center pt-2 text-blue-300 font-semibold">
              {error}
            </span>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TodoPage;

// GPT generate improved code but not work as my expects.

// import { useContext, useEffect, useState } from "react";
// import "../App.css";
// import axios from "axios";
// import { FaTrash, FaSlidersH } from "react-icons/fa";
// import { LoginContext } from "../context/LoginContext";

// function TodoPage() {
//   const { setIsLoggedIn } = useContext(LoginContext);

//   const [todo, setTodo] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [error, setError] = useState("");

//   const apiUrl = import.meta.env.VITE_API_URL;

//   // ✅ helper to get fresh data every time
//   const getUserData = () => JSON.parse(localStorage.getItem("data"));

//   // ✅ common error extractor
//   const getErrorMessage = (err) => {
//     return err.response?.data?.message || err.message || "Something went wrong";
//   };

//   // ✅ verify + fetch todos
//   useEffect(() => {
//     const checkAuth = async () => {
//       const userData = getUserData();

//       if (!userData?.token) {
//         setIsLoggedIn(false);
//         setError("Please login first");
//         return;
//       }

//       try {
//         await axios.get(`${apiUrl}/api/auth/verify`, {
//           headers: {
//             Authorization: `Bearer ${userData.token}`,
//           },
//         });

//         setIsLoggedIn(true);
//         fetchTodos(filter);
//       } catch (err) {
//         localStorage.removeItem("data");
//         setIsLoggedIn(false);
//         setError(getErrorMessage(err));
//       }
//     };

//     checkAuth();
//   }, []);

//   // ✅ single function for all fetching
//   const fetchTodos = async (filterValue = "all") => {
//     const userData = getUserData();

//     try {
//       const response = await axios.get(`${apiUrl}/api/todos`, {
//         params: { filter: filterValue },
//         headers: {
//           Authorization: `Bearer ${userData.token}`,
//         },
//       });

//       setTodos(response.data?.data || []);
//       setError(""); // ✅ clear error
//     } catch (err) {
//       setError(getErrorMessage(err));
//       setTodos([]);
//     }
//   };

//   const addTodo = async () => {
//     if (!todo.trim()) {
//       return alert("Invalid Todo");
//     }

//     const userData = getUserData();

//     try {
//       const res = await axios.post(
//         `${apiUrl}/api/todos`,
//         { title: todo, completed: false },
//         {
//           headers: {
//             Authorization: `Bearer ${userData.token}`,
//           },
//         },
//       );

//       alert(res.data?.message);
//       setTodo("");
//       fetchTodos(filter);
//     } catch (err) {
//       alert(getErrorMessage(err));
//     }
//   };

//   const deleteTodo = async (id) => {
//     const userData = getUserData();

//     try {
//       await axios.delete(`${apiUrl}/api/todos/${id}`, {
//         headers: {
//           Authorization: `Bearer ${userData.token}`,
//         },
//       });

//       fetchTodos(filter);
//     } catch (err) {
//       alert(getErrorMessage(err));
//     }
//   };

//   const markTodo = async (id) => {
//     const userData = getUserData();

//     try {
//       await axios.put(
//         `${apiUrl}/api/todos/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${userData.token}`,
//           },
//         },
//       );

//       fetchTodos(filter);
//     } catch (err) {
//       alert(getErrorMessage(err));
//     }
//   };

//   const applyFilter = (e) => {
//     const value = e.target.value;
//     setFilter(value);
//     fetchTodos(value);
//   };

//   return (
//     <div className="border py-4 rounded bg-gray-800 max-w-fit">
//       <h1 className="text-2xl">To do Application</h1>

//       <div>
//         <input
//           type="text"
//           className="border m-2 rounded px-1 py-1"
//           value={todo}
//           onChange={(e) => setTodo(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && addTodo()}
//         />
//         <button className="m-2 border px-2 py-1 rounded" onClick={addTodo}>
//           Add Task
//         </button>
//       </div>

//       <div className="flex justify-between gap-2 px-8 my-1 py-2 bg-gray-600">
//         <select className="border" value={filter} onChange={applyFilter}>
//           <option value="all" className="text-black">
//             All
//           </option>
//           <option value="pending" className="text-black">
//             Pending
//           </option>
//           <option value="completed" className="text-black">
//             Completed
//           </option>
//         </select>
//         <FaSlidersH />
//       </div>

//       <ul className="flex flex-col mx-6 my-2 gap-1">
//         {error ? (
//           <span className="self-center pt-2 text-red-400">{error}</span>
//         ) : todos.length === 0 ? (
//           <span className="self-center pt-2">No Todos Found</span>
//         ) : (
//           todos.map((todo) => (
//             <li
//               className="flex justify-between w-full items-center"
//               key={todo._id}
//             >
//               <div onClick={() => markTodo(todo._id)}>
//                 <input
//                   type="checkbox"
//                   className="w-5 scale-150 mx-1"
//                   checked={todo.completed}
//                   readOnly
//                 />
//                 {todo.completed ? (
//                   <del>{todo.title}</del>
//                 ) : (
//                   <span>{todo.title}</span>
//                 )}
//               </div>

//               <FaTrash onClick={() => deleteTodo(todo._id)} />
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// }

// export default TodoPage;
