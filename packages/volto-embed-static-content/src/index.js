import EmbedStatic from './Edit';
import EmbedStaticView from './View';

import sliderSVG from '@plone/volto/icons/slider.svg';
const applyConfig = (config) => {
  config.blocks.blocksConfig.embed_static_content = {
    id: 'embed_static_content',
    title: 'Embed static figure',
    icon: sliderSVG,
    group: 'data_visualizations',
    edit: EmbedStatic,
    view: EmbedStaticView,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  return config;
};

export default applyConfig;
