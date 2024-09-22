interface Iprops {
  msg: string;
}

const InputErrors = ({ msg }: Iprops) => {
  return msg ? <span className=" mx-2 text-warning">{msg}</span> : null;
};

export default InputErrors;
