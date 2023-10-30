import "../styles/CircleBackgroundIcon.css";

const CircleBackgroundIcon = ({ icon: Icon, color, onClick }) => {
  return (
    <div className="icon-circle-container">
      <Icon fontSize="small" sx={{ color: color }} onClick = {onClick} />
    </div>
  );
};

export default CircleBackgroundIcon;
