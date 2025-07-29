export default (function Data() {
  const store = (obj) => {
    localStorage.setItem("userData", JSON.stringify(obj));
  };

  const load = () => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
    } else {
      console.log("User data not found in storage.");
    }
    return userData;
  };

  return { store, load };
})();
