import type { OpenSlideConfig } from '@open-slide/core';
import { en } from '@open-slide/core/locale';

const openSlideConfig: OpenSlideConfig = {
  locale: {
    ...en,
    home: {
      ...en.home,
      appTitle: 'CODEPOLITAN Junior',
    },
  },
};

export default openSlideConfig;
