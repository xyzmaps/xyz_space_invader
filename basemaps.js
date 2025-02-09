import _ from 'lodash';

export function getBasemapScene(basemap, projection) {
  // deep copy the selected basemap object with lodash, to avoid modifying the original object
  var b = _.merge({}, basemaps[basemap]);
  // add the desired projection to the imports
  var p = getProjectionScene(projection);
  if (b.import && p) b.import = b.import.concat(p)
  return b;
}

export function getBasemapName(basemap) {
  // if the basemap looks like a number, return name from by index number
  // this is mostly for backwards compatibility, could be removed in future
  const index = parseInt(basemap);
  if (typeof index === 'number' && !isNaN(index)) {
    return Object.keys(basemaps)[index];
  }

  // otherwise just return the name
  return basemap;
}

export function getDefaultBasemapName() {
  return Object.keys(basemaps)[0];
}

export function getNextBasemap(basemap) {
  // return (index + 1) % Object.keys(basemaps).length;
  const names = Object.keys(basemaps);
  const index = names.indexOf(basemap);
  if (index > -1) {
    return names[(index + 1) % names.length]; // return next basemap if current one found
  }
  return names[0]; // otherwise just return first basemap
}

// add the base path of the current page to the URL
function addBasePath(url) {
  let base = window.location.origin + window.location.pathname;
  base = base.substr(0, base.lastIndexOf('/') + 1);
  if (base.slice(-1) !== '/') {
    base += '/';
  }
  return base + url;
}

// load the files for a named projection
export function getProjectionScene(projection) {
  if (typeof projection !== "undefined") {
    if (!projections[projection]) {
      throw new Error("Projection \""+projection+"\" not found");
    }
    return projections[projection].files;
  }
  else return null
}

export function getDefaultProjectionName() {
  return Object.keys(projections)[0]; // mercator
}

// skeletal structure of Invader viz scene, merged on top of underlying basemap, extended at run-time
// based on current viz settings
const xyzTangramBaseScene = addBasePath('tangram_xyz_scene.yaml');

// this gets merged into basemaps to change 'mapzen' vector tile source definitions to their XYZ HERE equivalent
// TODO: this does not yet override terrain/normal tiles for hillshading
const xyzTilezenSourceOverride = {
  sources: {
    mapzen: {
      url: 'https://tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt',
      url_params: {
        'api_key': 'global.sdk_api_key'
      }
    }
  }
};

// each basemap can reference one of these font presets for labels, or define its own inline instead
const labelFontPresets = {
  // for dark basemaps
  dark: {
    fill: [.9, .9, .1],
    size: '12px',
    stroke: {
      color: 'black',
      width: '4px'
    }
  },
  // for light basemaps
  light: {
    fill: 'darkred',
    size: '12px',
    stroke: {
      color: 'white',
      width: '4px'
    }
  }
};

export const basemaps = {
  'xyz-pixel': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-pixel/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  },
  'xyz-pixel-dark': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-pixel-dark/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.dark
    },
    ...xyzTilezenSourceOverride
  },
  'xyz-pixel-pastel': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-pixel-pastel/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  },
  'xyz-dots': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-dots/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  },
  'xyz-dots-dark': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-dots-dark/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.dark
    },
    ...xyzTilezenSourceOverride
  },
  'xyz-bw-texture': {
    import: [
      'https://raw.githubusercontent.com/sensescape/bw-texture/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  },
  'xyz-grid': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-grid/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  },
  'xyz-grid-dark': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-grid-dark/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.dark
    },
    ...xyzTilezenSourceOverride
  },
  'xyz-grid-color': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-grid-color/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  },
  'xyz-elevation-dots': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-elevation-dots/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.dark
    },
    ...xyzTilezenSourceOverride
  },
  'xyz-studio-spring-soft': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-studio-spring-soft/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  },
  'xyz-studio-spring-bright': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-studio-spring-bright/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  },
  'xyz-studio-miami-day': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-studio-miami-day/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  },
   'xyz-studio-light': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-studio-light/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  },
    'xyz-studio-dark': {
    import: [
      'https://raw.githubusercontent.com/sensescape/xyz-studio-dark/master/scene.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.dark
    },
    ...xyzTilezenSourceOverride
  },
     'xyz-reduction-light': {
    import: [
      'xyz-reduction-light.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  }, 
     'xyz-reduction-dark': {
    import: [
      'xyz-reduction-dark.yaml',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.dark
    },
    ...xyzTilezenSourceOverride
  }, 
  
  'mapzen-refill-dark': {
    import: [
      'https://www.nextzen.org/carto/refill-style/refill-style.zip',
      'https://www.nextzen.org/carto/refill-style/themes/color-gray-gold.zip',
      'https://www.nextzen.org/carto/refill-style/themes/label-4.zip',
      // 'https://www.nextzen.org/carto/refill-style/themes/terrain-shading-dark.zip',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.dark
    },
    ...xyzTilezenSourceOverride
  },
  'mapzen-refill': {
    import: [
      'https://www.nextzen.org/carto/refill-style/refill-style.zip',
      'https://www.nextzen.org/carto/refill-style/themes/label-4.zip',
      'https://www.nextzen.org/carto/refill-style/themes/terrain-shading-dark.zip',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  },
  'mapzen-walkabout': {
    import: [
      'https://www.nextzen.org/carto/walkabout-style/walkabout-style.zip',
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.light
    },
    ...xyzTilezenSourceOverride
  },
  'none': {
    import: [
      xyzTangramBaseScene
    ],
    global: {
      featureLabelFont: labelFontPresets.dark
    },
    scene: {
      background: {
        color: [0, 0, 0]
      }
    }
  },
};

export const projections = {
  'mercator': {
    files: ['mercator.yaml']
  },
  'albers': {
    files: ['albers.yaml']
  },
  'mollweide': {
    files: ['mollweide.yaml', 'mollweide-points.yaml']
  },
  'globe': {
    files: ['globe.yaml', 'globe-points.yaml']
  }
};

// array of projectable basemaps - if one of these is selected in the "basemap" menu,
// the "projection" menu will become available
const projectable = [
  "none",
  "xyz-reduction-light",
  "xyz-reduction-dark",
]

export function isProjectable(basemap) {
  return projectable.indexOf(basemap) > -1;
}