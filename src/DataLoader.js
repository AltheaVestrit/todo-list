export default (function Data() {
  const store = (obj) => {
    localStorage.setItem("userData", JSON.stringify(obj));
  };

  const load = () => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      return userData;
    } else {
      console.log("No existing user data found in local storage. Creating new user data object...");
      return false;
    }
  };

  return { store, load };
})();
