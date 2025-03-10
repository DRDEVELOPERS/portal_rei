export const animateCSS = (element, animation, prefix = "animate__") =>
  new Promise((resolve) => {
    const node = document.querySelector(element);
    node.classList.add(`${prefix}${animation}`);

    function handleAnimationEnd() {
      node.classList.remove(`${prefix}${animation}`);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
