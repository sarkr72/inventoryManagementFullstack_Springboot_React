import { useEffect } from "react";
import { logout } from "./AuthService";

const INACTIVITY_LIMIT = 60 * 1000; // 1 minute

let inactivityTimer;

const resetTimer = () => {
  // clearTimeout(inactivityTimer);
  // inactivityTimer = setTimeout(() => {
  //   // alert("Session expired due to inactivity. Please log in again.");
  //   logout();
  //   window.location.reload();
  // }, INACTIVITY_LIMIT);
};

const InactivityTracker = () => {
  useEffect(() => {
    // window.addEventListener("mousemove", resetTimer);
    // window.addEventListener("keypress", resetTimer);
    // resetTimer(); 

    // return () => {
    //   window.removeEventListener("mousemove", resetTimer);
    //   window.removeEventListener("keypress", resetTimer);
    //   clearTimeout(inactivityTimer);
    // };
  }, []);

  return null;
};

export default InactivityTracker;
