export const handleButton = (e) => {
  const clickBtn = document.querySelector("#lockInButton");

  if (!e) {
    return;
  } else {
    clickBtn.style.display = "flex";
  }
};
