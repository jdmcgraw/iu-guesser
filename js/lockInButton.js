import { checkAnswer } from "./checkAnswer";

export const handleButton = (e) => {
  const showBtn = document.querySelector("#lockInButton-container");
  const clickBtn = document.querySelector("#lockInButton");
  if (!e) {
    return;
  } else {
    showBtn.style.display = "flex";
  }

  clickBtn.addEventListener("click", checkAnswer(e));
};
