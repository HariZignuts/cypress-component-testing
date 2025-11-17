interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-cy="standard-button"
      style={{
        backgroundColor: disabled ? "grey" : "blue",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
      }}
    >
      {children}
    </button>
  );
};
