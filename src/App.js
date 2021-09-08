import { useSchemeJSON, useSortAble } from "./effect";
import { baseComponents } from "./config/BaseComponents";

import { Form } from "antd";
import styles from "./App.module.css";

function App() {
  const { json, updateJSONAfterMove, updateJSONByEditor, updateJSONAfterSort } =
    useSchemeJSON();
  const { baseComponentWrapRef, canvarsWrapRef } = useSortAble(
    updateJSONAfterMove,
    updateJSONAfterSort
  );
  console.log("json", json);
  // TODO
  const renderCanvarsChildren = () => {
    const items = json.children.map((item) => {
      const target = baseComponents.find((base) => base.type === item.type);
      const { wrapConfig = {}, Component, initProps } = target || {};
      return (
        <Form.Item {...wrapConfig} key={item.key}>
          <Component {...(initProps || {})} />
        </Form.Item>
      );
    });
    return (
      <Form name="demo" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        {items}
      </Form>
    );
  };

  return (
    <div className={styles["app"]}>
      <div className={styles["baseWrap"]}>
        <div>
          <div className={styles["base-title"]}>基础组件</div>
          <div className={styles["base-list"]} ref={baseComponentWrapRef}>
            {baseComponents.map((item) => (
              <div
                className={styles["base-item-com"]}
                data-type={item.key}
                key={item.key}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles["canvarsWrap"]} ref={canvarsWrapRef}>
        {/* {json.children.map((item) => (
          <div key={item.key}>{item.type}</div>
        ))} */}
        {renderCanvarsChildren()}
      </div>
      <div className={styles["editorWrap"]}>编辑区</div>
    </div>
  );
}

export default App;
