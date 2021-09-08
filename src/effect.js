import { useEffect, useRef } from "react";
import { useInitState } from "./lib/lifeHooks";
import createHash from './lib/createHash';

import Sortable from "sortablejs";

// 定义核心数据树,随时准备预览
export const useSchemeJSON = () => {
  const [json, setJson] = useInitState({
    children: [],
  });
  const updateJSONAfterSort = (oldIndex, newIndex) => {
    const { children = [] } = json;
    children[oldIndex] = children.splice(newIndex, 1, children[oldIndex])[0];
    setJson({
      children: [...children],
    });
  };
  const updateJSONAfterMove = (key, newIndex) => {
    const { children = [] } = json;
    children.splice(newIndex, 0, {
      type: key,
      key: key + createHash(5)  
    });
    setJson({
      children: [...children],
    });
  }
  const updateJSONByEditor = (key, type) => {
    const { children = [] } = json;
    const targetIndex = json.children.findIndex(
      (item) => item.key === targetIndex
    );
    if (!targetIndex) {
      console.error(`have no this key item! ${key}`);
      return;
    }
    if (type === "copy") {
      children.splice(targetIndex, 0, children[targetIndex]);
    } else {
      children.splice(targetIndex, 1);
    }
    setJson({
      children: [...children],
    });
  };
  return {
    json,
    updateJSONAfterSort,
    updateJSONByEditor,
    updateJSONAfterMove
  };
};

// 进行拖拽绑定
export const useSortAble = (updateJSONAfterMove, updateJSONAfterSort) => {
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
      onEnd: function (evt) {
        // 拖拽结束后
        // 没有拖拽过去则不执行任何操作
        if (evt.to !== canvarsWrapRef.current) {
          return;
        }
        // 拖拽完毕，应该重置JSON-Sechema
        console.log(canvarsWrapRef.current.children);
        canvarsWrapRef.current.removeChild(evt.item);
        updateJSONAfterMove(evt.item.dataset.type, evt.newIndex);
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
        if (
          currentItemPath.x === offsetLeft &&
          currentItemPath.y === offsetTop
        ) {
          return;
        }
        // 拖拽完毕，应该重置JSON-Sechema
        updateJSONAfterSort(evt.oldIndex, evt.newIndex);
      },
    });
  }, []);
  return {
    baseComponentWrapRef,
    canvarsWrapRef,
  };
};
