import { useEffect, useRef } from "react";
import Sortable from "sortablejs";

// 进行拖拽绑定
export const useSortAble = () => {
  const baseComponentWrapRef = useRef(null);
  const canvarsWrapRef = useRef(null);
  let currentItemPath = { x: 0, y: 0 };
  useEffect(() => {
    new Sortable(baseComponentWrapRef.current, {
      group: {
        name: "shared",
        pull: "clone", // To clone: set pull to 'clone'
        put: false, // 不允许拖拽进这个列表
      },
      animation: 150,
      sort: false, // 设为false，禁止sort
      setData: function (dataTransfer, dragEl) {
        dataTransfer.setData("Text", dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
      },
      onEnd: function (evt) {
        // 拖拽结束后
        // 没有拖拽过去则不执行任何操作
        if (evt.to !== canvarsWrapRef.current) {
          return;
        }
        // 拖拽完毕，应该重置JSON-Sechema
        console.log(canvarsWrapRef.current.children);
      },
    });

    new Sortable(canvarsWrapRef.current, {
      group: "shared",
      animation: 150,
      onStart: (evt) => {
        // 记录目录起始位置，以便结束后对比，以节省性能
        currentItemPath.x = evt.item.offsetLeft;
        currentItemPath.y = evt.item.offsetTop;
      },
      onEnd: function (evt) {
        const { offsetLeft, offsetTop } = evt.item;
        // 位置没变化就不要浪费性能
        if (currentItemPath.x === offsetLeft && currentItemPath.y === offsetTop) {
          return;
        }
        // 拖拽完毕，应该重置JSON-Sechema
        console.dir(canvarsWrapRef.current.children);
      },
    });
  }, []);
  return {
    baseComponentWrapRef,
    canvarsWrapRef,
  };
};
