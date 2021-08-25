import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Digit = styled.div`
  display: flex;
  font-size: 30px;
  color: #fff;
  border-radius: 5px;
  width: 50px;
  height: 60px;
  background: red;

  box-shadow: 0px 0px 40px red;
  text-shadow: 0px 0px 20px #fff;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

interface MonoProps {
  input: string;
}

const Mono: React.FC<MonoProps> = ({ input }) => (
  <>
    {input.split('').map((c) => (
      <Digit>{c}</Digit>
    ))}
  </>
);

const useTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let timer: any = undefined;
    const update = () => {
      timer = setTimeout(update, 1000);  
      setTime(new Date());
    };
    update();
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return time;
};

const Clock = () => {
  const time = useTime();

  return (
    <Mono
      input={
        time.getHours().toString().padStart(2, '0')
        + ':'
        + time.getMinutes().toString().padStart(2, '0')
        + ':'
        + time.getSeconds().toString().padStart(2, '0')
      }
    />
  );
};

export default Clock;
