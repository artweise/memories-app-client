import Button from './Button';

export default {
  //👇 The title prop is optional.
  title: 'Button',
  component: Button,
  // parameters: { controls: { sort: 'requiredFirst' } },
  argTypes: {
    variant: {
      options: ['contained', 'outlined', 'text'],
      control: { type: 'radio' },
    },
    text: {
      control: { type: 'text' },
    },
    fullWidth: {
      options: [true, false],
      control: { type: 'radio' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
    loading: {
      options: [true, false],
      control: { type: 'radio' },
    },
    isFormButton: {
      options: [true, false],
      control: { type: 'radio' },
    },
    onClick: {
      control: false,
    },
    type: {
      control: false,
    },
  },
};

const Template = (args) => <Button {...args}>{args.text}</Button>;

export const ButtonStory = Template.bind({});
ButtonStory.args = {
  variant: 'contained',
  text: 'Primary',
  type: 'button',
  fullWidth: false,
  sx: {},
  onClick: null,
  loading: false,
  disabled: false,
  isFormButton: false,
};
