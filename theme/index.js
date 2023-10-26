import {useMainContext} from '../context/Main';

const {isEnabled} = useMainContext();
export const colors = {
  boxIcon: isEnabled ? 'bg-zinc-800' : 'bg-gray-100',
  userDetails: isEnabled
    ? 'bg-zinc-900 border-zinc-700'
    : 'bg-white border-gray-200',
};
