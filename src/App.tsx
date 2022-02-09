import React, { useState } from "react";
import styled from "styled-components";

function App() {
  const [name, setName] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value }, } = event; // event.currentTarget.value
    setName(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Hello, ${name}`);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={name} onChange={onChange} type="text" placeholder="username" />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;