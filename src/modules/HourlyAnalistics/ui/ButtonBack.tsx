interface ButtonBackProps {
  onClick: () => void;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ onClick }) => (
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
    onClick={onClick}
  >
    Назад
  </button>
);

export default ButtonBack;
