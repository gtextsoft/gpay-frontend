import style from "../styles/authentication.module.css";

function TextInput({ field, form, type, name, placeholder, ariaLabel }) {
    const inputStyle = {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      color:"black"
    };
  
    const error = form.touched[field.name] && form.errors[field.name];

    return (
      <div>
        <input
          {...field} 
          type={type}
          id={name}
          placeholder={placeholder}
          aria-label={ariaLabel}
          className={style.input || ""}
          style={style.input ? null : inputStyle}
        />
       {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
      </div>
    );
  }

  export default TextInput