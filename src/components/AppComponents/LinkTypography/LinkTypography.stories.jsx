import LinkTypography from './LinkTypography';
import { NEUTRAL_SHADES } from '../../../utilities/globalStyles';

export default {
  //👇 The title prop is optional.
  title: 'LinkTypography',
  component: LinkTypography,
  argTypes: {
    text: {
      control: { type: 'text' },
    },
    variant: {
      options: [
        'body1',
        'body2',
        'button',
        'caption',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'inherit',
        'overline',
        'subtitle1',
        'subtitle2',
      ],
      control: { type: 'select' },
    },
    gutterBottom: {
      options: [true, false],
      control: { type: 'radio' },
    },
    noWrap: {
      options: [true, false],
      control: { type: 'radio' },
    },
    paragraph: {
      options: [true, false],
      control: { type: 'radio' },
    },
    align: {
      options: ['center', 'inherit', 'justify', 'left', 'right'],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => <LinkTypography {...args}>{args.text}</LinkTypography>;

export const ButtonStory = Template.bind({});
ButtonStory.args = {
  color: NEUTRAL_SHADES.BLACK,
  variant: 'body1',
  sx: {},
  gutterBottom: false,
  align: 'inherit',
  noWrap: false,
  paragraph: false,
  text: 'LinkTypography',
};
