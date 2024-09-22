import { useEffect, useState } from "react";
import baseUrl from "../Api/baseUrl";

const LandingPageHook = () => {
  const [loading, setLoadin] = useState(true);
  const [data, setData] = useState([]);
  const user = localStorage.getItem("UserData");
  const IsUsrHere = user ? JSON.parse(user) : null;

  const ViewAllData = () => {
    try {
      baseUrl
        .get(`/Task/User/${IsUsrHere?.userId}`, {
          headers: {
            Authorization: `Bearer ${IsUsrHere.token}`,
          },
        })
        .then((res) => setData(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadin(false);
    }
  };

  useEffect(() => {
    setLoadin(true);
    ViewAllData();
  }, []);

  [data, loading, ViewAllData];
};

export default LandingPageHook;
