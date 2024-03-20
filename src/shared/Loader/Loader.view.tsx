const Loader = () => {
  return (
    <div style={{
      display: "flex",
      padding: "10px",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        backgroundColor: "var(--secondary-color)",
        color: "var(--primary-color)",
        borderRadius: "5px"
      }}>
        Loading...
      </div>
    </div>
  );
};

export default Loader;