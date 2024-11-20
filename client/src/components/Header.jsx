import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const { user, logoutUser } = useUser();
  console.log(user);
  const navigate = useNavigate();
  const logout = async () => {
    const url = `${import.meta.env.VITE_API_URL}/auth/logout`;
    const response = await fetch(url, { credentials: "include" });
    const json = await response.json();
    logoutUser();
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white py-5 px-5 flex justify-between items-center">
      <h2 className="text-4xl ml-5 font-bold tracking-wide">Movies</h2>
      {/* Optional: Add a search bar, button, or navigation links */}
      {/* <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
          Explore More
        </button> */}
      <div style={styles.userSection}>
        <div className="mr-5">
          {user && (
            <>
              {user.avatarurl ? (
                <img
                  src={user.avatarurl}
                  alt="User Avatar"
                  style={styles.avatar}
                />
              ) : (
                <h2>{user.username}</h2>
              )}
            </>
          )}
        </div>
        {/* For testing purposes */}
        <button
          onClick={() => navigate("/movie/add")}
          style={styles.logoutButton}
        >
          Add Movie
        </button>
        <button
          onClick={() => navigate("/movie/create")}
          style={styles.logoutButton}
        >
          Create Movie
        </button>
        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>

    // <header style={styles.header}>
    //   <h1 style={styles.title}>MovieTrackr</h1>
    //   <div style={styles.userSection}>
    //     {user && (
    //       <>
    //         <img src={user.avatarurl} alt="User Avatar" style={styles.avatar} />
    //         <button onClick={logout} style={styles.logoutButton}>
    //           Logout
    //         </button>
    //       </>
    //     )}
    //   </div>
    // </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
  },
  title: {
    fontSize: "1.5em",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  logoutButton: {
    padding: "5px 10px",
    backgroundColor: "#ff4d4d",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    marginLeft: "10px",
  },
};
