import { useEffect, useRef } from "react";
import Sortable from "sortablejs";

// 进行拖拽绑定
export const useSortAble = () => {
  const baseComponentWrapRef = useRef(null);
  const canvarsWrapRef = useRef(null);
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
        console.log("evt");
        console.log(evt);
      },
    });

    new Sortable(canvarsWrapRef.current, {
      group: "shared",
      animation: 150,
      onEnd: function (evt) {
        console.log("evt");
        console.log(evt);
      },
    });
  }, []);
  return {
    baseComponentWrapRef,
    canvarsWrapRef,
  };
};
