import { Clicker } from './clicker';

export const MyScreenshot = (): JSX.Element => <Clicker />;

MyScreenshot.beforeScreenshot = async (element: HTMLElement): Promise<void> => {
  element?.querySelector<HTMLButtonElement>('#button')?.click();
};
