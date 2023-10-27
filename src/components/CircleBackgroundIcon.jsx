import "../styles/CircleBackgroundIcon.css";

const CircleBackgroundIcon = ({ icon: Icon, color }) => {
  return (
    <div className="icon-circle-container">
      <Icon fontSize="small" sx={{ color: color }} />
    </div>
  );
};

export default CircleBackgroundIcon;
