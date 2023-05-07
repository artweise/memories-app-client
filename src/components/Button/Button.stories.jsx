import Button from "./Button";

export default {
  //👇 The title prop is optional.
  title: "Button",
  component: Button,
}

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary = {
  render: () => <Button>Primary</Button>,
};
export const Outlined = {
  render: () => <Button variant="outlined">Outlined</Button>,
};
export const Text = {
  render: () => <Button variant="text">Text</Button>,
};