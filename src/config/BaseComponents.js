import { Input, Select, Radio, Checkbox, Button } from "antd";

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

export const baseComponents = [
  {
    title: "单行输入框",
    type: "input",
    name: "Input",
    key: "input",
    initProps: {
      placeholder: "请输入",
    },
    config: {},
    Component: Input,
  },
  {
    title: "下拉选择框",
    type: "select",
    name: "Select",
    key: "select",
    initProps: {
      placeholder: "请输入",
    },
    config: {},
    Component: Select,
  },
  {
    title: "单选框组",
    type: "radio",
    name: "Radio",
    key: "radio",
    initProps: {
      placeholder: "请输入",
    },
    config: {},
    Component: RadioGroup,
  },
  {
    title: "多选框组",
    type: "check",
    name: "Check",
    key: "check",
    initProps: {
      placeholder: "请输入",
    },
    config: {},
    Component: CheckboxGroup,
  },
  {
    title: "多行文本",
    type: "textArea",
    name: "TextArea",
    key: "textArea",
    initProps: {
      placeholder: "请输入",
    },
    config: {},
    Component: TextArea,
  },
  {
    title: "文字链接",
    type: "link",
    name: "Link",
    key: "link",
    initProps: {
      placeholder: "请输入",
    },
    config: {},
    Component: Button,
  },
];
