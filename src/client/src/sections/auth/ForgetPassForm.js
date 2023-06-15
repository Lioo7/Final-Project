import { useState } from 'react';
import Identification from './Identification';
import ForgetPass from './ForgetPass';

export default function ForgetPassForm() {
  const [isShowed, setIsShowed] = useState(true);
  return (
    <>
      {isShowed && <Identification setIsShowed={setIsShowed} />}
      {!isShowed && <ForgetPass setIsShowed={setIsShowed} />}
    </>
  );
}
