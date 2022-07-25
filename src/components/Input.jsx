import styled from "styled-components";

export default function TheInput({
  value,
  setValue,
  label,
  type,
  WithLabel,
  width,
}) {
  return (
    <div>
      {WithLabel && <StyledLabel htmlFor={label}>{label}</StyledLabel>}
      <StyledInput
        width={width}
        placeholder={label}
        type={type}
        id={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        pattern={type === "tel" ? "[0-9]{3}-[0-9]{3}-[0-9]{4}" : "false"}
        required
      />
    </div>
  );
}

const StyledInput = styled.input`
  width: ${(props) => props.width || "auto"};
  padding: 12px;
  margin-top: 0.3rem;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: whitesmoke;
  &:focus {
    border-bottom: 1px solid gray;
  }
`;

const StyledLabel = styled.label`
  margin: 0;
  font-weight: bold;
`;
