const ProgressBar = ({ progress, height }) => {
  const parentDiv = {
    height: 20,
    width: "60%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    margin: 20,
  };

  const childDiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: "#449DA7",
    borderRadius: 40,
    textAlign: "right",
  };

  return (
    <div style={parentDiv}>
      <div style={childDiv} />
    </div>
  );
};

export default ProgressBar;
