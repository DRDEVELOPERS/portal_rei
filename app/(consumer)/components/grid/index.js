// components/grid/index.js
import clsx from "clsx";

export function Grid(props) {
  return (
    <div
      {...props}
      className={clsx("grid grid-flow-row gap-4", props.className)}
    >
      {props.children}
    </div>
  );
}

export function GridItem(props) {
  return (
    <div
      {...props}
      className={clsx("aspect-square transition-opacity", props.className)}
    >
      {props.children}
    </div>
  );
}

Grid.Item = GridItem;
