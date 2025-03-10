export const animateCSS = (element, animation, prefix = "animate__") =>
  new Promise((resolve) => {
    const node = document.querySelector(element);

    if (!node) {
      console.warn(`Element ${element} not found for animation`);
      return resolve("Element not found");
    }

    const animationName = `${prefix}${animation}`;

    node.classList.add(animationName);
    node.classList.add("animate__animated");

    function handleAnimationEnd() {
      node.classList.remove(animationName);
      node.classList.remove("animate__animated");
      node.removeEventListener("animationend", handleAnimationEnd);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
